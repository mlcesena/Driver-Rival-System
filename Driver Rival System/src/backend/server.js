import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import fs from "fs"
import createTables from "./tables.js";

const app = express();
app.use(cors());
const PORT = 3001;

const db = new sqlite3.Database('./2025_drs_data.db');

// const fs = require('fs'); // For reading files
const trackData = JSON.parse(fs.readFileSync('trackData.json', 'utf8'));
const teamData = JSON.parse(fs.readFileSync('teamData.json', 'utf8'));

// Setup tables
db.serialize(() => {
    // db.all(`DROP TABLE teams`,
    //     [], (err, rows) => {
    //         if (err) {
    //             console.error(err.message);
    //             return;
    //         }
    //         console.log("All rows:", rows); // Logs an array of objects
    //     });
    createTables();
});

async function populateDrivers() {
    const url = "https://api.openf1.org/v1/drivers?session_key=latest";
    // const baseKey = 1254;
    // const url = `https://api.openf1.org/v1/drivers?meeting_key%3E%3D${baseKey}&meeting_key%3C%3D${baseKey+24}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const drivers = await response.json();
        // const data = await response.json();
        // let drivers = new Map();
        // data.forEach(driver => {
        //     if (!drivers.has(driver.driver_number)) {
        //         drivers.set(driver.driver_number, driver);
        //     }
        // })

        const statement = db.prepare(`
                INSERT OR REPLACE INTO drivers
                (driver_number, first_name, last_name, full_name, team, acronym, image)
                VALUES (?,?,?,?,?,?,?)
            `);

        await Promise.all(drivers.map(driver => {
            const base = "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/";
            const fnUp = driver.first_name[0].toUpperCase();
            const fnUpSub = driver.first_name.substring(0, 3).toUpperCase();
            const lnUpSub = driver.last_name.substring(0, 3).toUpperCase();
            const fn = driver.first_name;
            const ln = driver.last_name;
            const fnLowSub = driver.first_name.substring(0, 3).toLowerCase();
            const lnLowSub = driver.last_name.substring(0, 3).toLowerCase();

            statement.run(
                driver.driver_number,
                driver.first_name,
                driver.last_name,
                `${driver.first_name} ${driver.last_name}`,
                driver.team_name,
                driver.name_acronym,
                // driver.headshot_url !== null ? driver.headshot_url.slice(0, driver.headshot_url.indexOf(".transform")) : `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${driver.first_name[0].toUpperCase()}/${driver.first_name.substring(0, 3).toUpperCase()}${driver.last_name.substring(0, 3).toUpperCase()}01_${driver.first_name}_${driver.last_name}/${driver.first_name.substring(0, 3).toLowerCase()}${driver.last_name.substring(0, 3).toLowerCase()}01.png`
                driver.headshot_url !== null ? driver.headshot_url.slice(0, driver.headshot_url.indexOf(".transform")) : `${base}${fnUp}/${fnUpSub}${lnUpSub}01_${fn}_${ln}/${fnLowSub}${lnLowSub}01.png`
            );
        }));

        await new Promise((resolve, reject) => {
            statement.finalize(err => err ? reject(err) : resolve());
        });
        console.log("Drivers populated");
    }
    catch (error) {
        console.error(error.message)
    }
}

async function populateTeams() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('BEGIN TRANSACTION', (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                const updateStmt = db.prepare(`
                        INSERT OR REPLACE INTO teams
                        (team_name, location, image, founding_year, latest_year, active_year_count, team_principal, ceo, country_code)
                        VALUES (?,?,?,?,?,?,?,?,?)
                      `);

                try {
                    for (let i = 0; i < teamData.length; i++) {
                        let name = teamData[i].name;
                        let location = teamData[i].location;
                        let country_code = teamData[i].country_code;
                        let ceo = teamData[i].ceo;
                        let team_principal = teamData[i].team_principal;
                        let founding_year = teamData[i].founding_year;
                        let latest_year = teamData[i].latest_year;
                        let image = teamData[i].image;
                        // CHANGEME to different method
                        let active_count = latest_year - founding_year;

                        updateStmt.run(
                            name,
                            location,
                            image,
                            founding_year,
                            latest_year,
                            active_count,
                            team_principal,
                            ceo,
                            country_code
                        );
                    }

                    updateStmt.finalize((err) => {
                        if (err) {
                            console.log("Failed to populate team information");

                            db.run('ROLLBACK', () => reject(err));
                            return;
                        }

                        db.run('COMMIT', (err) => {
                            if (err) {
                                db.run('ROLLBACK', () => reject(err));
                            } else {
                                resolve();
                            }
                        });
                    });
                } catch (err) {
                    db.run('ROLLBACK', () => reject(err));
                }
            });
        });
    });
}

async function populateTeamRaceStats() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT dr.team AS name, 
                    SUM(race_wins) AS race_wins,
                    SUM(race_podiums) AS race_podiums,
                    SUM(race_points) AS race_points,
                    SUM(race_top_10) AS race_top_10,
                    SUM(race_pole_count) AS race_pole
                FROM driver_race_stats AS ds
                LEFT JOIN drivers AS dr 
                ON ds.driver_number = dr.driver_number
                GROUP BY dr.team
                ORDER BY name`, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.run('BEGIN TRANSACTION', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const updateStmt = db.prepare(`
                        INSERT OR REPLACE INTO team_race_stats
                        (team_name, race_wins, race_podiums, race_points, race_top_10, race_pole)
                        VALUES (?,?,?,?,?,?)
                      `);

                    try {
                        rows.forEach(row => {
                            if (row.name !== null) {
                                updateStmt.run(
                                    row.name || "",
                                    row.race_wins || 0,
                                    row.race_podiums || 0,
                                    row.race_points || 0,
                                    row.race_top_10 || 0,
                                    row.race_pole || 0
                                );
                            }
                        });

                        updateStmt.finalize((err) => {
                            if (err) {
                                console.log("Failed to populate team race statistics");

                                db.run('ROLLBACK', () => reject(err));
                                return;
                            }

                            db.run('COMMIT', (err) => {
                                if (err) {
                                    db.run('ROLLBACK', () => reject(err));
                                } else {
                                    resolve();
                                }
                            });
                        });
                    } catch (err) {
                        db.run('ROLLBACK', () => reject(err));
                    }
                });
            });
        });
    });
}

async function populateTeamSprintStats() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT dr.team AS name, 
                    SUM(sprint_wins) AS sprint_wins,
                    SUM(sprint_podium_count) AS sprint_podiums,
                    SUM(sprint_points) AS sprint_points,
                    SUM(sprint_top_8_count) AS sprint_top_8,
                    SUM(sprint_pole_count) AS sprint_pole
                FROM driver_sprint_stats AS ds
                LEFT JOIN drivers AS dr
                ON ds.driver_number = dr.driver_number
                GROUP BY dr.team
                ORDER BY name`, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.run('BEGIN TRANSACTION', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const updateStmt = db.prepare(`
                        INSERT OR REPLACE INTO team_sprint_stats
                        (team_name, sprint_wins, sprint_podiums, sprint_points, sprint_top_8, sprint_pole)
                        VALUES (?,?,?,?,?,?)
                      `);

                    try {
                        rows.forEach(row => {
                            if (row.name !== null) {
                                updateStmt.run(
                                    row.name || "",
                                    row.sprint_wins || 0,
                                    row.sprint_podiums || 0,
                                    row.sprint_points || 0,
                                    row.sprint_top_8 || 0,
                                    row.sprint_pole || 0
                                );
                            }
                        });

                        updateStmt.finalize((err) => {
                            if (err) {
                                console.log("Failed to populate team sprint race statistics");

                                db.run('ROLLBACK', () => reject(err));
                                return;
                            }

                            db.run('COMMIT', (err) => {
                                if (err) {
                                    db.run('ROLLBACK', () => reject(err));
                                } else {
                                    resolve();
                                }
                            });
                        });
                    } catch (err) {
                        db.run('ROLLBACK', () => reject(err));
                    }
                });
            });
        });
    });
}

async function populateSessions() {
    const date = new Date();
    // const url = `https://api.openf1.org/v1/sessions?date_start>=${date.getFullYear()}-01-01&date_end<=2025-07-06`
    const url = `https://api.openf1.org/v1/sessions?date_start>=${date.getFullYear()}-01-01&date_end<=2025-${date.getMonth()}-${date.getDay()}`

    try {
        let session_num = 1;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const sessions = await response.json();

        const statement = db.prepare(`
                INSERT OR REPLACE INTO sessions
                (session_key, meeting_key, race_id, circuit_name, session_name, session_type, year, session_num)
                VALUES (?,?,?,?,?,?,?,?)
            `);

        await Promise.all(sessions.map(session => {

            if (session.session_type === "Qualifying" || session.session_type === "Race") {
                statement.run(
                    session.session_key,
                    session.meeting_key,
                    session.circuit_key,
                    session.location,
                    session.session_name,
                    session.session_type,
                    session.year,
                    session_num
                );
                if (session.session_name === "Race")
                    session_num++;
            }

        }));
        await new Promise((resolve, reject) => {
            statement.finalize(err => err ? reject(err) : resolve());
        });
        console.log("Sessions populated");
    }
    catch (error) {
        console.error(error.message)
    }
}

async function populateSessionResults() {
    const date = new Date();

    function getFirstSessionKey() {
        return new Promise((resolve, reject) => {
            db.get('SELECT session_key FROM sessions ORDER BY session_key ASC LIMIT 1', [], (err, row) => {
                if (err) return reject(err);
                resolve(row ? row.session_key : 0);
            });
        });
    }

    function getSessions() {
        return new Promise((resolve, reject) => {
            const sessionsMap = {}
            db.all("SELECT session_key, race_id, circuit_name, session_name, session_type, session_num FROM sessions", [], (err, rows) => {
                if (err) return reject(err);
                rows.forEach(row => {
                    sessionsMap[row.session_key] = row;
                });
                resolve(sessionsMap);
            })
        })
    }

    const sessions = await getSessions();
    const key = await getFirstSessionKey();
    const url = `https://api.openf1.org/v1/session_result?session_key%3E=${key}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const results = await response.json();

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run("BEGIN TRANSACTION", (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const insertStmt = db.prepare(`
                        INSERT OR REPLACE INTO session_results
                        (session_key, race_id, circuit_name, driver_number, position, points, laps, dnf, dns, dsq, session_name, session_num)
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
                        `);

                    results.forEach(result => {
                        const id = sessions[result.session_key]?.race_id ?? null;
                        const circuit = sessions[result.session_key]?.circuit_name ?? null;
                        const type = sessions[result.session_key]?.session_name ?? null;
                        const num = sessions[result.session_key]?.session_num ?? null;

                        insertStmt.run(
                            result.session_key,
                            id,
                            circuit,
                            result.driver_number,
                            result.position,
                            result.points,
                            result.number_of_laps,
                            result.dnf,
                            result.dns,
                            result.dsq,
                            type,
                            num,
                            (err) => {
                                if (err) {
                                    db.run("ROLLBACK", () => reject(err));
                                    return;
                                }
                            }
                        );
                    });

                    insertStmt.finalize((err) => {
                        if (err) {
                            db.run('ROLLBACK', () => reject(err));
                            return;
                        }
                    });

                    db.run("COMMIT", (err) => {
                        if (err) {
                            db.run("ROLLBACK", () => reject(err));
                        } else {
                            console.log("Session Results populated");
                            resolve();
                        }
                    });
                });
            });
        });
    }
    catch (error) {
        console.error(error.message)
    }
}


async function populateTracks() {
    try {
        const stmt = db.prepare(`
        INSERT OR REPLACE INTO tracks
        (circuit_name, location, init_year, latest_year, appearances, lap_distance_mi, lap_distance_km, lap_count, race_distance_mi, race_distance_km, altitude_imperial, altitude_metric, elevation_imperial, elevation_metric, corners, fastest_lap_time, fastest_lap_holder, fastest_lap_year, track_type, image, country_code, c1_compound, c2_compound, c3_compound, c4_compound, c5_compound, c6_compound, car_setup, air_temp_low_fah, air_temp_low_cel, air_temp_high_fah, air_temp_high_cel, support_race, sprint_race)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      `);

        trackData.forEach(item => {
            stmt.run(
                item.name,
                item.location,
                item.firstHeld,
                item.latestYear,
                item.appearanceCount,
                item.lapDistance.mi,
                item.lapDistance.km,
                item.lapCount,
                item.totalDistance.mi,
                item.totalDistance.km,
                item.altitudeImperial,
                item.altitudeMetric,
                item.elevationImperial,
                item.elevationMetric,
                item.corners,
                item.fastestLap.time,
                item.fastestLap.driver,
                item.fastestLap.year,
                item.trackType,
                item.image,
                item.countryCode,
                item.c1Compound,
                item.c2Compound,
                item.c3Compound,
                item.c4Compound,
                item.c5Compound,
                item.c6Compound,
                item.carSetup,
                item.airTempLow.fah,
                item.airTempLow.cel,
                item.airTempHigh.fah,
                item.airTempHigh.cel,
                item.supportRace,
                item.sprint
            )
        });
        console.log("Tracks populated");
    }
    catch (error) {
        console.error(error.message)
    }
}

async function updateDriverRaceStats() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT driver_number, 
                    COUNT(CASE WHEN session_name IN ('Race') AND dnf != 1 AND dns != 1 AND dsq != 1 THEN 1 END) AS complete_race_count,
                    COUNT(CASE WHEN session_name IN ('Race') AND (dnf = 1 OR dns = 1 OR dsq = 1) THEN 1 END) AS incomplete_race_count,
                    COUNT(CASE WHEN session_name IN ('Race') THEN 1 END) AS total_race_count,
                    SUM(CASE WHEN position = 1 AND session_name IN ('Race') THEN 1 ELSE 0 END) AS race_wins,
                    COUNT(CASE WHEN session_name IN ('Qualifying') AND position = 1 THEN 1 END) AS race_pole_count,
                    SUM(CASE WHEN position <= 3 AND session_name IN ('Race') THEN 1 ELSE 0 END) AS race_podiums,
                    SUM(CASE WHEN position <= 10 AND session_name IN ('Race') THEN 1 ELSE 0 END) AS race_top_10,
                    SUM(CASE WHEN session_name IN ('Race') THEN points END) AS race_points,
                    SUM(CASE WHEN session_name IN ('Race', 'Sprint') THEN laps END) AS laps,
                    COUNT(CASE WHEN session_name IN ('Qualifying') THEN 1 END) AS race_q1_count,
                    COUNT(CASE WHEN session_name IN ('Qualifying') AND position <= 15 THEN 1 END) AS race_q2_count,
                    COUNT(CASE WHEN session_name IN ('Qualifying') AND position <= 10 THEN 1 END) AS race_q3_count,
                    COUNT(CASE WHEN session_name IN ('Qualifying') AND position > 15 THEN 1 END) AS race_q1_exits,
                    COUNT(CASE WHEN session_name IN ('Qualifying') AND position > 10 AND position <= 15 THEN 1 END) AS race_q2_exits,
                    SUM(CASE WHEN session_name IN ('Race') AND dnf = 1 THEN 1 ELSE 0 END) AS race_dnf,
                    SUM(CASE WHEN session_name IN ('Race') AND dns = 1 THEN 1 ELSE 0 END) AS race_dns,
                    SUM(CASE WHEN session_name IN ('Race') AND dsq = 1 THEN 1 ELSE 0 END) AS race_dsq
                FROM session_results
                GROUP BY driver_number`, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.run('BEGIN TRANSACTION', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const updateStmt = db.prepare(`
            INSERT OR REPLACE INTO driver_race_stats
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
          `);

                    try {
                        rows.forEach(row => {
                            updateStmt.run(
                                row.driver_number,
                                row.complete_race_count || 0,
                                row.incomplete_race_count || 0,
                                row.total_race_count || 0,
                                row.race_wins || 0,
                                row.race_pole_count || 0,
                                row.race_podiums || 0,
                                row.race_top_10 || 0,
                                row.race_points || 0,
                                row.laps || 0,
                                row.race_q1_count || 0,
                                row.race_q2_count || 0,
                                row.race_q3_count || 0,
                                row.race_q1_exits || 0,
                                row.race_q2_exits || 0,
                                row.race_dnf || 0,
                                row.race_dns || 0,
                                row.race_dsq || 0
                            );
                        });

                        updateStmt.finalize((err) => {
                            if (err) {
                                console.log("Failed to update race statistics");

                                db.run('ROLLBACK', () => reject(err));
                                return;
                            }

                            db.run('COMMIT', (err) => {
                                if (err) {
                                    db.run('ROLLBACK', () => reject(err));
                                } else {
                                    resolve();
                                }
                            });
                        });
                    } catch (err) {
                        db.run('ROLLBACK', () => reject(err));
                    }
                });
            });
        });
    });
}

async function updateDriverSprintStats() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT driver_number, 
                    COUNT(CASE WHEN session_name IN ('Sprint') AND dnf != 1 AND dns != 1 AND dsq != 1 THEN 1 END) AS complete_sprint_count,
                    COUNT(CASE WHEN session_name IN ('Sprint') AND (dnf = 1 OR dns = 1 OR dsq = 1) THEN 1 END) AS incomplete_sprint_count,
                    COUNT(CASE WHEN session_name IN ('Sprint') THEN 1 END) AS total_sprint_count,
                    SUM(CASE WHEN position = 1 AND session_name IN ('Sprint') THEN 1 ELSE 0 END) AS sprint_wins,
                    COUNT(CASE WHEN session_name IN ('Sprint Qualifying') AND position = 1 THEN 1 END) AS sprint_pole_count,
                    SUM(CASE WHEN position <= 3 AND session_name IN ('Sprint') THEN 1 ELSE 0 END) AS sprint_podiums,
                    SUM(CASE WHEN position <= 8 AND session_name IN ('Sprint') THEN 1 ELSE 0 END) AS sprint_top_8_count,
                    COUNT(CASE WHEN session_name IN ('Sprint Qualifying') THEN 1 END) AS sprint_q1_count,
                    COUNT(CASE WHEN session_name IN ('Sprint Qualifying') AND position <= 15 THEN 1 END) AS sprint_q2_count,
                    COUNT(CASE WHEN session_name IN ('Sprint Qualifying') AND position <= 10 THEN 1 END) AS sprint_q3_count,
                    COUNT(CASE WHEN session_name IN ('Sprint Qualifying') AND position > 15 THEN 1 END) AS sprint_q1_exits,
                    COUNT(CASE WHEN session_name IN ('Sprint Qualifying') AND position > 10 AND position <= 15 THEN 1 END) AS sprint_q2_exits,
                    SUM(CASE WHEN session_name IN ('Sprint') AND dnf = 1 THEN 1 ELSE 0 END) AS sprint_dnf,
                    SUM(CASE WHEN session_name IN ('Sprint') AND dns = 1 THEN 1 ELSE 0 END) AS sprint_dns,
                    SUM(CASE WHEN session_name IN ('Sprint') AND dsq = 1 THEN 1 ELSE 0 END) AS sprint_dsq,
                    SUM(CASE WHEN session_name IN ('Sprint') THEN points END) AS sprint_points
                FROM session_results
                GROUP BY driver_number`, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.run('BEGIN TRANSACTION', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const updateStmt = db.prepare(`
            INSERT OR REPLACE INTO driver_sprint_stats
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
          `);

                    try {
                        rows.forEach(row => {
                            updateStmt.run(
                                row.driver_number,
                                row.complete_sprint_count || 0,
                                row.incomplete_sprint_count || 0,
                                row.total_sprint_count || 0,
                                row.sprint_wins || 0,
                                row.sprint_pole_count || 0,
                                row.sprint_podiums || 0,
                                row.sprint_top_8_count || 0,
                                row.sprint_points || 0,
                                row.sprint_q1_count || 0,
                                row.sprint_q2_count || 0,
                                row.sprint_q3_count || 0,
                                row.sprint_q1_exits || 0,
                                row.sprint_q2_exits || 0,
                                row.sprint_dnf || 0,
                                row.sprint_dns || 0,
                                row.sprint_dsq || 0
                            );
                        });

                        updateStmt.finalize((err) => {
                            if (err) {
                                console.log("Failed to update driver sprint statistics");

                                db.run('ROLLBACK', () => reject(err));
                                return;
                            }

                            db.run('COMMIT', (err) => {
                                if (err) {
                                    db.run('ROLLBACK', () => reject(err));
                                } else {
                                    resolve();
                                }
                            });
                        });
                    } catch (err) {
                        db.run('ROLLBACK', () => reject(err));
                    }
                });
            });
        });
    });
}

async function updateSessionResults() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT session_results.driver_number, 
                    session_results.position,
                    session_results.session_key,
                    session_results.dnf,
                    session_results.dns,
                    session_results.dsq,
                    drivers.team,
                    drivers.full_name,
                    sessions.session_num
                FROM session_results
                LEFT JOIN drivers ON session_results.driver_number = drivers.driver_number
                LEFT JOIN sessions ON session_results.session_key = sessions.session_key
                GROUP BY session_results.driver_number, session_results.session_key`, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.run('BEGIN TRANSACTION', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const updateStmt = db.prepare(`
                        UPDATE session_results
                        SET position = ?,
                        team_name = ?,
                        driver_name = ?,
                        session_num = ?
                        WHERE driver_number = ? AND session_key = ?
                      `);

                    try {
                        rows.forEach(row => {
                            let newPos = row.position;
                            if (newPos == null) {
                                if (row.dnf)
                                    newPos = "DNF";
                                else if (row.dns)
                                    newPos = "DNS";
                            }
                            // console.log(newPos);

                            updateStmt.run(
                                newPos,
                                row.team,
                                row.full_name,
                                row.session_num,
                                row.driver_number,
                                row.session_key
                            );
                        });

                        updateStmt.finalize((err) => {
                            if (err) {
                                console.log("Failed to update driver information");

                                db.run('ROLLBACK', () => reject(err));
                                return;
                            }

                            db.run('COMMIT', (err) => {
                                if (err) {
                                    db.run('ROLLBACK', () => reject(err));
                                } else {
                                    resolve();
                                }
                            });
                        });
                    } catch (err) {
                        db.run('ROLLBACK', () => reject(err));
                    }
                });
            });
        });
    });
}

async function populateDriverRaceResults() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT driver_name,
                session_key,
                race_id,
                circuit_name,
                session_num,
                points AS driver_points,
                position AS driver_position
                FROM session_results
                WHERE session_name = "Race"
                GROUP BY driver_name, session_key, race_id, circuit_name
                ORDER BY session_num ASC;
               `, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.run('BEGIN TRANSACTION', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const insertStmt = db.prepare(`
                        INSERT OR REPLACE INTO driver_race_results
                        (session_key, race_id, circuit_name, driver_name, driver_position, driver_points, driver_post_points, session_num)
                        VALUES (?,?,?,?,?,?,?,?)
                      `);

                    try {
                        rows.forEach(row => {
                            // console.log(row);

                            if (row.driver_name != null) {
                                insertStmt.run(
                                    row.session_key || null,
                                    row.race_id || null,
                                    row.circuit_name || null,
                                    row.driver_name || null,
                                    row.driver_position || null,
                                    row.driver_points || 0,
                                    row.driver_points,
                                    row.session_num || 0
                                );
                            }
                        });

                        insertStmt.finalize((err) => {
                            if (err) {
                                console.log("Failed to update team race results");

                                db.run('ROLLBACK', () => reject(err));
                                return;
                            }

                            db.run('COMMIT', (err) => {
                                if (err) {
                                    db.run('ROLLBACK', () => reject(err));
                                } else {
                                    resolve();
                                }
                            });
                        });
                    } catch (err) {
                        db.run('ROLLBACK', () => reject(err));
                    }
                });
            });
        });
    });
}

async function populateDriverSprintRaceResults() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT driver_name,
                session_key,
                race_id,
                circuit_name,
                session_num,
                points AS driver_points,
                position AS driver_position
                FROM session_results
                WHERE session_name = "Sprint"
                GROUP BY driver_name, session_key, race_id, circuit_name
                ORDER BY session_num ASC;
                `, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.run('BEGIN TRANSACTION', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const insertStmt = db.prepare(`
                        INSERT OR REPLACE INTO driver_sprint_race_results
                        (session_key, race_id, circuit_name, driver_name, driver_position, driver_points, driver_post_points, session_num)
                        VALUES (?,?,?,?,?,?,?,?)
                      `);


                    try {
                        rows.forEach(row => {
                            if (row.driver_name != null) {
                                insertStmt.run(
                                    row.session_key || null,
                                    row.race_id || null,
                                    row.circuit_name || null,
                                    row.driver_name || null,
                                    row.driver_position || null,
                                    row.driver_points || 0,
                                    row.driver_points,
                                    row.session_num || 0
                                );
                            }
                        });

                        insertStmt.finalize((err) => {
                            if (err) {
                                console.log("Failed to update team race results");

                                db.run('ROLLBACK', () => reject(err));
                                return;
                            }

                            db.run('COMMIT', (err) => {
                                if (err) {
                                    db.run('ROLLBACK', () => reject(err));
                                } else {
                                    resolve();
                                }
                            });
                        });
                    } catch (err) {
                        db.run('ROLLBACK', () => reject(err));
                    }
                });
            });
        });
    });
}

async function populateTeamRaceResults() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT team_name,
                session_key,
                race_id,
                circuit_name,
                session_num,
                GROUP_CONCAT(DISTINCT driver_number) AS drivers,
                MAX(CASE WHEN rn = 1 THEN points ELSE 0 END) AS driver_1_points,
                MAX(CASE WHEN rn = 1 THEN position ELSE null END) AS driver_1_position,
                MAX(CASE WHEN rn = 1 THEN driver_name ELSE null END) AS driver_1_name,
                MAX(CASE WHEN rn = 2 THEN points ELSE 0 END) AS driver_2_points,
                MAX(CASE WHEN rn = 2 THEN position ELSE null END) AS driver_2_position,
                MAX(CASE WHEN rn = 2 THEN driver_name ELSE null END) AS driver_2_name
                FROM (
                    SELECT
                    *, ROW_NUMBER() OVER (
                        PARTITION BY team_name, session_key, race_id, circuit_name
                        ORDER BY driver_number
                    ) AS rn
                    FROM session_results
                    WHERE session_name = "Race"
                ) ranked
                GROUP BY team_name, session_key, race_id, circuit_name
                ORDER BY session_num ASC;
               `, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.run('BEGIN TRANSACTION', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const insertStmt = db.prepare(`
                        INSERT OR REPLACE INTO team_race_results
                        (session_key, race_id, circuit_name, team_name, driver_1_position, driver_1_points, driver_1_name, driver_2_position, driver_2_points, driver_2_name, team_post_points, session_num)
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
                      `);

                    try {
                        rows.forEach(row => {
                            // console.log(row);

                            if (row.team_name != null) {
                                const totalPoints = (row.driver_1_points || 0) + (row.driver_2_points || 0);

                                insertStmt.run(
                                    row.session_key || null,
                                    row.race_id || null,
                                    row.circuit_name || null,
                                    row.team_name || null,
                                    row.driver_1_position || null,
                                    row.driver_1_points || 0,
                                    row.driver_1_name || null,
                                    row.driver_2_position || null,
                                    row.driver_2_points || 0,
                                    row.driver_2_name || null,
                                    totalPoints,
                                    row.session_num || 0
                                );
                            }
                        });

                        insertStmt.finalize((err) => {
                            if (err) {
                                console.log("Failed to update team race results");

                                db.run('ROLLBACK', () => reject(err));
                                return;
                            }

                            db.run('COMMIT', (err) => {
                                if (err) {
                                    db.run('ROLLBACK', () => reject(err));
                                } else {
                                    resolve();
                                }
                            });
                        });
                    } catch (err) {
                        db.run('ROLLBACK', () => reject(err));
                    }
                });
            });
        });
    });
}

async function populateTeamSprintRaceResults() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT team_name,
                session_key,
                race_id,
                circuit_name,
                session_num,
                GROUP_CONCAT(DISTINCT driver_number) AS drivers,
                MAX(CASE WHEN rn = 1 THEN points ELSE 0 END) AS driver_1_points,
                MAX(CASE WHEN rn = 1 THEN position ELSE null END) AS driver_1_position,
                MAX(CASE WHEN rn = 1 THEN driver_name ELSE null END) AS driver_1_name,
                MAX(CASE WHEN rn = 2 THEN points ELSE 0 END) AS driver_2_points,
                MAX(CASE WHEN rn = 2 THEN position ELSE null END) AS driver_2_position,
                MAX(CASE WHEN rn = 2 THEN driver_name ELSE null END) AS driver_2_name
                FROM (
                    SELECT
                    *, ROW_NUMBER() OVER (
                        PARTITION BY team_name, session_key, race_id, circuit_name
                        ORDER BY driver_number
                    ) AS rn
                    FROM session_results
                    WHERE session_name = "Sprint"
                ) ranked
                GROUP BY team_name, session_key, race_id, circuit_name
                ORDER BY session_num ASC;
                `, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.run('BEGIN TRANSACTION', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const insertStmt = db.prepare(`
                        INSERT OR REPLACE INTO team_sprint_race_results
                        (session_key, race_id, circuit_name, team_name, driver_1_position, driver_1_points, driver_1_name, driver_2_position, driver_2_points, driver_2_name, team_post_points, session_num)
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
                      `);


                    try {
                        rows.forEach(row => {
                            if (row.team_name !== null) {
                                const totalPoints = (row.driver_1_points || 0) + (row.driver_2_points || 0);

                                insertStmt.run(
                                    row.session_key || null,
                                    row.race_id || null,
                                    row.circuit_name || null,
                                    row.team_name || null,
                                    row.driver_1_position || null,
                                    row.driver_1_points || 0,
                                    row.driver_1_name || null,
                                    row.driver_2_position || null,
                                    row.driver_2_points || 0,
                                    row.driver_2_name || null,
                                    totalPoints,
                                    row.session_num || 0
                                );
                            }
                        });

                        insertStmt.finalize((err) => {
                            if (err) {
                                console.log("Failed to update team race results");

                                db.run('ROLLBACK', () => reject(err));
                                return;
                            }

                            db.run('COMMIT', (err) => {
                                if (err) {
                                    db.run('ROLLBACK', () => reject(err));
                                } else {
                                    resolve();
                                }
                            });
                        });
                    } catch (err) {
                        db.run('ROLLBACK', () => reject(err));
                    }
                });
            });
        });
    });
}

async function populateDriverSeasonResults() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT dr.driver_name,
                dr.circuit_name,
                dr.session_num,
                dr.driver_points AS driver_race_points,
                sr.driver_points AS driver_sprint_points
                FROM driver_race_results AS dr
                LEFT JOIN driver_sprint_race_results AS sr
                ON dr.circuit_name = sr.circuit_name AND dr.driver_name = sr.driver_name
                GROUP BY dr.circuit_name, dr.driver_name
                ORDER BY dr.session_num ASC;
               `, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.run('BEGIN TRANSACTION', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const insertStmt = db.prepare(`
                        INSERT OR REPLACE INTO driver_season_results
                        (circuit_name, driver_name, driver_points, session_num)
                        VALUES (?,?,?,?)
                      `);


                    try {
                        const driverTotals = {}
                        rows.forEach(row => {
                            // console.log(row);

                            if (row.driver_name != null) {
                                if (!driverTotals[row.driver_name]) {
                                    driverTotals[row.driver_name] = 0;
                                }
                                driverTotals[row.driver_name] += ((row.driver_race_points || 0) + (row.driver_sprint_points || 0));

                                insertStmt.run(
                                    row.circuit_name || null,
                                    row.driver_name || null,
                                    driverTotals[row.driver_name],
                                    row.session_num
                                );
                            }
                        });

                        insertStmt.finalize((err) => {
                            if (err) {
                                console.log("Failed to update driver season results");

                                db.run('ROLLBACK', () => reject(err));
                                return;
                            }

                            db.run('COMMIT', (err) => {
                                if (err) {
                                    db.run('ROLLBACK', () => reject(err));
                                } else {
                                    resolve();
                                }
                            });
                        });
                    } catch (err) {
                        db.run('ROLLBACK', () => reject(err));
                    }
                });
            });
        });
    });
}

async function updateDriverSeasonPositions() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT 
                circuit_name,
                driver_name,
                driver_points,
                RANK() OVER (PARTITION BY session_num ORDER BY driver_points DESC) AS driver_rank
                FROM driver_season_results
                GROUP BY circuit_name, driver_name
               `,
                (err, rows) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    db.run('BEGIN TRANSACTION', (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        const updateStmt = db.prepare(`
                        UPDATE driver_season_results
                        SET driver_position = ?
                        WHERE driver_name = ? AND circuit_name = ?
                      `);


                        try {
                            rows.forEach(row => {
                                // console.log(row);

                                if (row.driver_name != null) {
                                    updateStmt.run(
                                        row.driver_rank || null,
                                        row.driver_name || null,
                                        row.circuit_name || null
                                    );
                                }
                            });

                            updateStmt.finalize((err) => {
                                if (err) {
                                    console.log("Failed to update driver season positions");

                                    db.run('ROLLBACK', () => reject(err));
                                    return;
                                }

                                db.run('COMMIT', (err) => {
                                    if (err) {
                                        db.run('ROLLBACK', () => reject(err));
                                    } else {
                                        resolve();
                                    }
                                });
                            });
                        } catch (err) {
                            db.run('ROLLBACK', () => reject(err));
                        }
                    });
                });
        });
    });
}

async function populateTeamSeasonResults() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT tr.team_name,
                tr.circuit_name,
                tr.session_num,
                tr.team_post_points AS team_race_points,
                sr.team_post_points AS team_sprint_points
                FROM team_race_results AS tr
                LEFT JOIN team_sprint_race_results AS sr
                ON tr.circuit_name = sr.circuit_name AND tr.team_name = sr.team_name
                GROUP BY tr.circuit_name, tr.team_name
                ORDER BY tr.session_num ASC;
               `, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.run('BEGIN TRANSACTION', (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const insertStmt = db.prepare(`
                        INSERT OR REPLACE INTO team_season_results
                        (circuit_name, team_name, team_points, session_num)
                        VALUES (?,?,?,?)
                      `);


                    try {
                        const teamTotals = {}
                        rows.forEach(row => {
                            // console.log(row);

                            if (row.team_name != null) {
                                if (!teamTotals[row.team_name]) {
                                    teamTotals[row.team_name] = 0;
                                }
                                teamTotals[row.team_name] += ((row.team_race_points || 0) + (row.team_sprint_points || 0));

                                insertStmt.run(
                                    row.circuit_name || null,
                                    row.team_name || null,
                                    teamTotals[row.team_name],
                                    row.session_num
                                );
                            }
                        });

                        insertStmt.finalize((err) => {
                            if (err) {
                                console.log("Failed to update team season results");

                                db.run('ROLLBACK', () => reject(err));
                                return;
                            }

                            db.run('COMMIT', (err) => {
                                if (err) {
                                    db.run('ROLLBACK', () => reject(err));
                                } else {
                                    resolve();
                                }
                            });
                        });
                    } catch (err) {
                        db.run('ROLLBACK', () => reject(err));
                    }
                });
            });
        });
    });
}

async function updateTeamSeasonPositions() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT 
                circuit_name,
                team_name,
                team_points,
                RANK() OVER (PARTITION BY session_num ORDER BY team_points DESC) AS team_rank
                FROM team_season_results
                GROUP BY circuit_name, team_name
               `,
                (err, rows) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    db.run('BEGIN TRANSACTION', (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        const updateStmt = db.prepare(`
                        UPDATE team_season_results
                        SET team_position = ?
                        WHERE team_name = ? AND circuit_name = ?
                      `);

                        try {
                            rows.forEach(row => {
                                // console.log(row);

                                if (row.team_name != null) {
                                    updateStmt.run(
                                        row.team_rank || null,
                                        row.team_name || null,
                                        row.circuit_name || null
                                    );
                                }
                            });

                            updateStmt.finalize((err) => {
                                if (err) {
                                    console.log("Failed to update team season ranks");

                                    db.run('ROLLBACK', () => reject(err));
                                    return;
                                }

                                db.run('COMMIT', (err) => {
                                    if (err) {
                                        db.run('ROLLBACK', () => reject(err));
                                    } else {
                                        resolve();
                                    }
                                });
                            });
                        } catch (err) {
                            db.run('ROLLBACK', () => reject(err));
                        }
                    });
                });
        });
    });
}


app.get("/api/drivers/", (req, res) => {
    db.all(`SELECT * FROM drivers
        LEFT JOIN driver_race_stats ON driver_race_stats.driver_number = drivers.driver_number
        LEFT JOIN driver_sprint_stats ON driver_sprint_stats.driver_number = drivers.driver_number
        `, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    })
});

app.get("/api/driver_images/", (req, res) => {
    db.all("SELECT image FROM drivers", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    })
});

app.get("/api/race_results/", (req, res) => {
    db.all(`
        SELECT * FROM session_results
        WHERE session_name = "Race"
        ORDER BY session_num
        `, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        const resultsMap = {};

        rows.forEach(row => {

            const circuit = row.circuit_name;

            if (!resultsMap[circuit]) {
                resultsMap[circuit] = {};
            }

            resultsMap[circuit][row.driver_number] = {
                driver_number: row.driver_number,
                position: row.position,
                points: row.points,
                laps: row.laps,
                dnf: row.dnf,
                dns: row.dns,
                dsq: row.dsq
            };
        });

        res.json(resultsMap);
    })
});

app.get("/api/qualifying_results/", (req, res) => {
    db.all(`
        SELECT * FROM session_results
        WHERE session_name = "Qualifying"
        ORDER BY session_num
        `, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        const resultsMap = {};

        rows.forEach(row => {

            const circuit = row.circuit_name;

            if (!resultsMap[circuit]) {
                resultsMap[circuit] = {};
            }

            resultsMap[circuit][row.driver_number] = {
                driver_number: row.driver_number,
                position: row.position,
                dnf: row.dnf,
                dns: row.dns,
                dsq: row.dsq
            };
        });

        res.json(resultsMap);
    })
});

app.get("/api/sprint_race_results/", (req, res) => {
    db.all(`
        SELECT * FROM session_results
        WHERE session_name = "Sprint"
        ORDER BY session_num
        `, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        const resultsMap = {};

        rows.forEach(row => {

            const circuit = row.circuit_name;

            if (!resultsMap[circuit]) {
                resultsMap[circuit] = {};
            }

            resultsMap[circuit][row.driver_number] = {
                driver_number: row.driver_number,
                position: row.position,
                points: row.points,
                laps: row.laps,
                dnf: row.dnf,
                dns: row.dns,
                dsq: row.dsq
            };
        });

        res.json(resultsMap);
    })
});

app.get("/api/sprint_qualifying_results/", (req, res) => {
    db.all(`
        SELECT * FROM session_results
        WHERE session_name = "Sprint Qualifying"
        ORDER BY session_num
        `, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        const resultsMap = {};

        rows.forEach(row => {

            const circuit = row.circuit_name;

            if (!resultsMap[circuit]) {
                resultsMap[circuit] = {};
            }

            resultsMap[circuit][row.driver_number] = {
                driver_number: row.driver_number,
                position: row.position,
                dnf: row.dnf,
                dns: row.dns,
                dsq: row.dsq
            };
        });

        res.json(resultsMap);
    })
});

app.get("/api/teams/", (req, res) => {
    db.all(`SELECT * FROM teams
        LEFT JOIN team_race_stats ON team_race_stats.team_name = teams.team_name
        LEFT JOIN team_sprint_stats ON team_sprint_stats.team_name = teams.team_name
        `, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    })
});

app.get("/api/team_race_results/", (req, res) => {
    db.all(`
        SELECT * FROM team_race_results`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        const resultsMap = {};

        rows.forEach(row => {

            const circuit = row.circuit_name;

            if (!resultsMap[circuit]) {
                resultsMap[circuit] = {};
            }

            resultsMap[circuit][row.team_name] = {
                team_name: row.team_name,
                driver_1_position: row.driver_1_position,
                driver_1_points: row.driver_1_points,
                driver_1_name: row.driver_1_name,
                driver_2_position: row.driver_2_position,
                driver_2_points: row.driver_2_points,
                driver_2_name: row.driver_2_name,
                team_post_position: row.team_post_position,
                team_post_points: row.team_post_points,
                min_pit_stop: row.min_pit_stop,
                max_pit_stop: row.max_pit_stop,
                avg_pit_stop: row.avg_pit_stop
            };
        });

        res.json(resultsMap);
    })
});

app.get("/api/team_sprint_race_results/", (req, res) => {
    db.all(`
        SELECT * FROM team_sprint_race_results`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        const resultsMap = {};

        rows.forEach(row => {

            const circuit = row.circuit_name;

            if (!resultsMap[circuit]) {
                resultsMap[circuit] = {};
            }

            resultsMap[circuit][row.team_name] = {
                team_name: row.team_name,
                driver_1_position: row.driver_1_position,
                driver_1_points: row.driver_1_points,
                driver_1_name: row.driver_1_name,
                driver_2_position: row.driver_2_position,
                driver_2_points: row.driver_2_points,
                driver_2_name: row.driver_2_name,
                team_post_position: row.team_post_position,
                team_post_points: row.team_post_points,
                min_pit_stop: row.min_pit_stop,
                max_pit_stop: row.max_pit_stop,
                avg_pit_stop: row.avg_pit_stop
            };
        });

        res.json(resultsMap);
    })
});

app.get("/api/driver_season_results/", (req, res) => {
    db.all(`
        SELECT * FROM driver_season_results`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        const resultsMap = {};

        rows.forEach(row => {
            const circuit = row.circuit_name;

            if (!resultsMap[circuit]) {
                resultsMap[circuit] = {};
            }

            resultsMap[circuit][row.driver_name] = {
                driver_name: row.driver_name,
                driver_position: row.driver_position,
                driver_points: row.driver_points,
                session_num: row.session_num
            };
        });

        res.json(resultsMap);
    })
});

app.get("/api/team_season_results/", (req, res) => {
    db.all(`
        SELECT * FROM team_season_results`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        const resultsMap = {};

        rows.forEach(row => {

            const circuit = row.circuit_name;

            if (!resultsMap[circuit]) {
                resultsMap[circuit] = {};
            }

            resultsMap[circuit][row.team_name] = {
                team_name: row.team_name,
                team_position: row.team_position,
                team_points: row.team_points,
                session_num: row.session_num
            };
        });

        res.json(resultsMap);
    })
});

app.get("/api/tracks/", (req, res) => {
    db.all("SELECT * FROM tracks", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    })
});

// await populateDrivers();
await populateTeams();
// await populateSessions();
// await populateSessionResults();
// await updateSessionResults();
// await updateDriverRaceStats();
// await updateDriverSprintStats();
// await populateTeamRaceStats();
// await populateTeamSprintStats();
// await populateTracks();
// await populateDriverRaceResults();
// await populateDriverSprintRaceResults();
// await populateDriverSeasonResults();
// await updateDriverSeasonPositions();
// await populateTeamRaceResults();
// await populateTeamSprintRaceResults();
// await populateTeamSeasonResults();
// await updateTeamSeasonPositions();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});