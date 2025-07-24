import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 3001;

const db = new sqlite3.Database('./drivers.db');

// Setup tables
db.serialize(() => {
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS drivers (
    //       driver_number INTEGER PRIMARY KEY,
    //       first_name TEXT NOT NULL,
    //       last_name TEXT NOT NULL,
    //       full_name TEXT NOT NULL,
    //       team TEXT NOT NULL,
    //       acronym TEXT NOT NULL,
    //       image TEXT,
    //       wins INTEGER DEFAULT 0,
    //       podiums INTEGER DEFAULT 0,
    //       top_10 INTEGER DEFAULT 0,
    //       points INTEGER DEFAULT 0,
    //       laps INTEGER DEFAULT 0,
    //       complete_race_count INTEGER DEFAULT 0,
    //       incomplete_race_count INTEGER DEFAULT 0,
    //       total_race_count INTEGER DEFAULT 0,
    //       dnf INTEGER DEFAULT 0,
    //       dns INTEGER DEFAULT 0,
    //       dsq INTEGER DEFAULT 0,
    //       pole_count INTEGER DEFAULT 0,
    //       q1_count INTEGER DEFAULT 0,
    //       q2_count INTEGER DEFAULT 0,
    //       q3_count INTEGER DEFAULT 0,
    //       q1_exits INTEGER DEFAULT 0,
    //       q2_exits INTEGER DEFAULT 0
    //     )
    //   `);

    // db.run(`
    //     CREATE TABLE IF NOT EXISTS sessions (
    //       session_key INTEGER PRIMARY KEY,
    //       meeting_key INTEGER NOT NULL,
    //       race_id INTEGER,
    //       circuit_name TEXT,
    //       session_name TEXT,
    //       session_type TEXT,
    //       year INTEGER
    //     )
    //   `);

    // db.run(`
    //     CREATE TABLE IF NOT EXISTS session_results (
    //         result_id INTEGER PRIMARY KEY,
    //         session_key INTEGER,
    //         race_id INTEGER,
    //         circuit_name TEXT,
    //         driver_number INTEGER NOT NULL,
    //         position INTEGER,
    //         points INTEGER,
    //         laps INTEGER,
    //         dnf INTEGER,
    //         dns INTEGER,
    //         dsq INTEGER,
    //         session_name TEXT,

    //         FOREIGN KEY (race_id) REFERENCES sessions (race_id),
    //         FOREIGN KEY (circuit_name) REFERENCES sessions (circuit_name),
    //         FOREIGN KEY (driver_number) REFERENCES drivers (driver_number)
    //     )
    //     `);


});

async function populateDrivers() {
    const url = "https://api.openf1.org/v1/drivers?session_key=latest";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const drivers = await response.json();

        const statement = db.prepare(`
                INSERT OR REPLACE INTO drivers
                (driver_number, first_name, last_name, full_name, team, acronym, image)
                VALUES (?,?,?,?,?,?,?)
            `);

        await Promise.all(drivers.map(driver => {
            statement.run(
                driver.driver_number,
                driver.first_name,
                driver.last_name,
                `${driver.first_name} ${driver.last_name}`,
                driver.team_name,
                driver.name_acronym,
                driver.headshot_url !== null ? driver.headshot_url.slice(0, driver.headshot_url.indexOf(".transform")) : `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${driver.first_name[0].toUpperCase()}/${driver.first_name.substring(0, 3).toUpperCase()}${driver.last_name.substring(0, 3).toUpperCase()}01_${driver.first_name}_${driver.last_name}/${driver.first_name.substring(0, 3).toLowerCase()}${driver.last_name.substring(0, 3).toLowerCase()}01.png`
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

async function populateSessions() {
    const date = new Date();
    const url = `https://api.openf1.org/v1/sessions?date_start>=${date.getFullYear()}-01-01&date_end<=${date.getFullYear()}-12-31`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const sessions = await response.json();

        const statement = db.prepare(`
                INSERT OR REPLACE INTO sessions
                (session_key, meeting_key, race_id, circuit_name, session_name, session_type, year)
                VALUES (?,?,?,?,?,?,?)
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
                    session.year
                );
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
            db.all("SELECT session_key, race_id, circuit_name, session_name, session_type FROM sessions", [], (err, rows) => {
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
                        (session_key, race_id, circuit_name, driver_number, position, points, laps, dnf, dns, dsq, session_name)
                        VALUES (?,?,?,?,?,?,?,?,?,?,?)
                        `);

                    results.forEach(result => {
                        const id = sessions[result.session_key]?.race_id ?? null;
                        const circuit = sessions[result.session_key]?.circuit_name ?? null;
                        const type = sessions[result.session_key]?.session_name ?? null;


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

async function updateDriverStats() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`
                SELECT driver_number, 
                    SUM(CASE WHEN session_name IN ('Race', 'Sprint') THEN points END) AS points_total,
                    SUM(CASE WHEN position = 1 AND session_name IN ('Race', 'Sprint') THEN 1 ELSE 0 END) AS wins,
                    SUM(CASE WHEN position <= 3 AND session_name IN ('Race', 'Sprint') THEN 1 ELSE 0 END) AS podiums,
                    SUM(CASE WHEN position <= 10 AND session_name IN ('Race', 'Sprint') THEN 1 ELSE 0 END) AS top_10,
                    SUM(CASE WHEN session_name IN ('Race', 'Sprint') THEN laps END) AS laps,
                    COUNT(CASE WHEN session_name IN ('Race', 'Sprint') THEN 1 END) AS total_race_count,
                    COUNT(CASE WHEN session_name IN ('Race', 'Sprint') AND dnf != 1 AND dns != 1 AND dsq != 1 THEN 1 END) AS complete_race_count,
                    COUNT(CASE WHEN session_name IN ('Race', 'Sprint') AND (dnf = 1 OR dns = 1 OR dsq = 1) THEN 1 END) AS incomplete_race_count,
                    SUM(CASE WHEN session_name IN ('Race', 'Sprint') AND dnf = 1 THEN 1 ELSE 0 END) AS dnf,
                    SUM(CASE WHEN session_name IN ('Race', 'Sprint') AND dns = 1 THEN 1 ELSE 0 END) AS dns,
                    SUM(CASE WHEN session_name IN ('Race', 'Sprint') AND dsq = 1 THEN 1 ELSE 0 END) AS dsq,
                    COUNT(CASE WHEN session_name IN ('Qualifying', 'Sprint Qualifying') AND position = 1 THEN 1 END) AS pole_count,
                    COUNT(CASE WHEN session_name IN ('Qualifying', 'Sprint Qualifying') THEN 1 END) AS q1_count,
                    COUNT(CASE WHEN session_name IN ('Qualifying', 'Sprint Qualifying') AND position <= 15 THEN 1 END) AS q2_count,
                    COUNT(CASE WHEN session_name IN ('Qualifying', 'Sprint Qualifying') AND position <= 10 THEN 1 END) AS q3_count,
                    COUNT(CASE WHEN session_name IN ('Qualifying', 'Sprint Qualifying') AND position > 15 THEN 1 END) AS q1_exits,
                    COUNT(CASE WHEN session_name IN ('Qualifying', 'Sprint Qualifying') AND position > 10 AND position <= 15 THEN 1 END) AS q2_exits
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
            UPDATE drivers
            SET points = ?,
                wins = ?,
                podiums = ?,
                top_10 = ?,
                laps = ?,
                total_race_count = ?,
                complete_race_count = ?,
                incomplete_race_count = ?,
                dnf = ?,
                dns = ?,
                dsq = ?,
                pole_count = ?,
                q1_count = ?,
                q2_count = ?,
                q3_count = ?,
                q1_exits = ?,
                q2_exits = ?
            WHERE driver_number = ?
          `);

                    try {
                        rows.forEach(row => {
                            updateStmt.run(
                                row.points_total || 0,
                                row.wins || 0,
                                row.podiums || 0,
                                row.top_10 || 0,
                                row.laps || 0,
                                row.total_race_count || 0,
                                row.complete_race_count || 0,
                                row.incomplete_race_count || 0,
                                row.dnf || 0,
                                row.dns || 0,
                                row.dsq || 0,
                                row.pole_count || 0,
                                row.q1_count || 0,
                                row.q2_count || 0,
                                row.q3_count || 0,
                                row.q1_exits || 0,
                                row.q2_exits || 0,
                                row.driver_number
                            );
                        });

                        updateStmt.finalize((err) => {
                            if (err) {
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

await populateDrivers();
await populateSessions();
await populateSessionResults();
await updateDriverStats();


app.get("/api/drivers/", (req, res) => {
    db.all("SELECT * FROM drivers", [], (err, rows) => {
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});