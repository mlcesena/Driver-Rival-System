import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./2025_drs_data.db');

const TABLES_TO_CREATE = [
    `CREATE TABLE IF NOT EXISTS driver_race_results (
        session_key INTEGER,
        race_id INTEGER,
        circuit_name TEXT,
        driver_name TEXT,
        driver_position INTEGER DEFAULT 0,
        driver_points INTEGER DEFAULT 0,
        driver_post_position INTEGER DEFAULT 0,
        driver_post_points INTEGER DEFAULT 0,
        session_num INTEGER DEFAULT NULL,

        FOREIGN KEY (race_id) REFERENCES sessions (race_id),
        FOREIGN KEY (circuit_name) REFERENCES sessions (circuit_name),
        FOREIGN KEY (driver_name) REFERENCES drivers (full_name),

        PRIMARY KEY (session_key, driver_name)
    );`,
    `CREATE TABLE IF NOT EXISTS driver_race_stats (
      driver_number INTEGER PRIMARY KEY,
      complete_race_count INTEGER DEFAULT 0,
      incomplete_race_count INTEGER DEFAULT 0,
      total_race_count INTEGER DEFAULT 0,
      race_wins INTEGER DEFAULT 0,
      race_pole_count INTEGER DEFAULT 0,
      race_podiums INTEGER DEFAULT 0,
      race_top_10 INTEGER DEFAULT 0,
      race_points INTEGER DEFAULT 0,
      laps INTEGER DEFAULT 0,
      race_q1_count INTEGER DEFAULT 0,
      race_q2_count INTEGER DEFAULT 0,
      race_q3_count INTEGER DEFAULT 0,
      race_q1_exits INTEGER DEFAULT 0,
      race_q2_exits INTEGER DEFAULT 0,
      race_dnf INTEGER DEFAULT 0,
      race_dns INTEGER DEFAULT 0,
      race_dsq INTEGER DEFAULT 0,

      FOREIGN KEY (driver_number) REFERENCES drivers (driver_number),
      FOREIGN KEY (driver_number) REFERENCES driver_sprint_stats (driver_number)
    );`,
    `CREATE TABLE IF NOT EXISTS driver_season_results (
        circuit_name TEXT,
        driver_name TEXT,
        driver_position INTEGER DEFAULT 0,
        driver_points INTEGER DEFAULT 0,
        session_num INTEGER DEFAULT 0,

        FOREIGN KEY (circuit_name) REFERENCES sessions (circuit_name),
        FOREIGN KEY (driver_name) REFERENCES drivers (full_name),

        PRIMARY KEY (circuit_name, driver_name)
    );`,
    `CREATE TABLE IF NOT EXISTS driver_sprint_race_results (
        session_key INTEGER,
        race_id INTEGER,
        circuit_name TEXT,
        driver_name TEXT,
        driver_position INTEGER DEFAULT 0,
        driver_points INTEGER DEFAULT 0,
        driver_post_position INTEGER DEFAULT 0,
        driver_post_points INTEGER DEFAULT 0,
        session_num INTEGER DEFAULT NULL,

        FOREIGN KEY (race_id) REFERENCES sessions (race_id),
        FOREIGN KEY (circuit_name) REFERENCES sessions (circuit_name),
        FOREIGN KEY (driver_name) REFERENCES drivers (full_name),

        PRIMARY KEY (session_key, driver_name)
    );`,
    `CREATE TABLE IF NOT EXISTS driver_sprint_stats (
      driver_number INTEGER PRIMARY KEY,
      complete_sprint_count INTEGER DEFAULT 0,
      incomplete_sprint_count INTEGER DEFAULT 0,
      total_sprint_count INTEGER DEFAULT 0,
      sprint_wins INTEGER DEFAULT 0,
      sprint_pole_count INTEGER DEFAULT 0,
      sprint_podium_count INTEGER DEFAULT 0,
      sprint_top_8_count INTEGER DEFAULT 0,
      sprint_points INTEGER DEFAULT 0,
      sprint_q1_count INTEGER DEFAULT 0,
      sprint_q2_count INTEGER DEFAULT 0,
      sprint_q3_count INTEGER DEFAULT 0,
      sprint_q1_exits INTEGER DEFAULT 0,
      sprint_q2_exits INTEGER DEFAULT 0,
      sprint_dnf INTEGER DEFAULT 0,
      sprint_dns INTEGER DEFAULT 0,
      sprint_dsq INTEGER DEFAULT 0,

      FOREIGN KEY (driver_number) REFERENCES drivers (driver_number),
      FOREIGN KEY (driver_number) REFERENCES driver_race_stats (driver_number)
    );`,
    `CREATE TABLE IF NOT EXISTS drivers (
        driver_number INTEGER PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        full_name TEXT NOT NULL,
        team TEXT NOT NULL,
        acronym TEXT NOT NULL,
        image TEXT,

        FOREIGN KEY (driver_number) REFERENCES driver_race_stats (driver_number),
        FOREIGN KEY (driver_number) REFERENCES driver_sprint_stats (driver_number)
    );`,
    `CREATE TABLE IF NOT EXISTS session_results (
        session_key INTEGER,
        race_id INTEGER,
        circuit_name TEXT,
        driver_number INTEGER NOT NULL,
        position INTEGER,
        points INTEGER,
        laps INTEGER,
        dnf INTEGER,
        dns INTEGER,
        dsq INTEGER,
        session_name TEXT,
        team_name TEXT,
        driver_name TEXT,
        session_num INTEGER,

        FOREIGN KEY (race_id) REFERENCES sessions (race_id),
        FOREIGN KEY (circuit_name) REFERENCES sessions (circuit_name),
        FOREIGN KEY (session_num) REFERENCES sessions (session_num),
        FOREIGN KEY (driver_number) REFERENCES drivers (driver_number),

        PRIMARY KEY (session_key, driver_number)
    );`,
    `CREATE TABLE IF NOT EXISTS sessions (
      session_key INTEGER PRIMARY KEY,
      meeting_key INTEGER NOT NULL,
      race_id INTEGER,
      circuit_name TEXT,
      session_name TEXT,
      session_type TEXT,
      year INTEGER,
      session_num INTEGER
    );`,
    `CREATE TABLE IF NOT EXISTS team_race_results (
        session_key INTEGER,
        race_id INTEGER,
        circuit_name TEXT,
        team_name TEXT,
        driver_1_position INTEGER DEFAULT 0,
        driver_1_points INTEGER DEFAULT 0,
        driver_1_name TEXT,
        driver_2_position INTEGER DEFAULT 0,
        driver_2_points INTEGER DEFAULT 0,
        driver_2_name TEXT,
        team_post_position INTEGER DEFAULT 0,
        team_post_points INTEGER DEFAULT 0,
        min_pit_stop FLOAT DEFAULT 0.0,
        max_pit_stop FLOAT DEFAULT 0.0,
        avg_pit_stop FLOAT DEFAULT 0.0,

        FOREIGN KEY (race_id) REFERENCES sessions (race_id),
        FOREIGN KEY (circuit_name) REFERENCES sessions (circuit_name),
        FOREIGN KEY (team_name) REFERENCES teams (name),

        PRIMARY KEY (session_key, team_name)
    );`,
    `CREATE TABLE IF NOT EXISTS team_race_stats (
      team_name TEXT PRIMARY KEY,
      race_wins INTEGER DEFAULT 0,
      race_podiums INTEGER DEFAULT 0,
      race_points INTEGER DEFAULT 0,
      race_top_10 INTEGER DEFAULT 0,
      race_pole INTEGER DEFAULT 0,

      FOREIGN KEY (team_name) REFERENCES teams (team_name),
      FOREIGN KEY (team_name) REFERENCES team_sprint_race_stats (team_name)
    );`,
    `CREATE TABLE IF NOT EXISTS team_season_results (
        circuit_name TEXT,
        team_name TEXT,
        team_position INTEGER DEFAULT 0,
        team_points INTEGER DEFAULT 0,
        session_num INTEGER DEFAULT 0,

        FOREIGN KEY (circuit_name) REFERENCES sessions (circuit_name),
        FOREIGN KEY (team_name) REFERENCES teams (name),

        PRIMARY KEY (circuit_name, team_name)
    );`,
    `CREATE TABLE IF NOT EXISTS team_sprint_race_results (
        session_key INTEGER,
        race_id INTEGER,
        circuit_name TEXT,
        team_name TEXT,
        driver_1_position INTEGER DEFAULT 0,
        driver_1_points INTEGER DEFAULT 0,
        driver_1_name TEXT,
        driver_2_position INTEGER DEFAULT 0,
        driver_2_points INTEGER DEFAULT 0,
        driver_2_name TEXT,
        team_post_position INTEGER DEFAULT 0,
        team_post_points INTEGER DEFAULT 0,
        min_pit_stop FLOAT DEFAULT 0.0,
        max_pit_stop FLOAT DEFAULT 0.0,
        avg_pit_stop FLOAT DEFAULT 0.0,

        FOREIGN KEY (race_id) REFERENCES sessions (race_id),
        FOREIGN KEY (circuit_name) REFERENCES sessions (circuit_name),
        FOREIGN KEY (team_name) REFERENCES teams (name),

        PRIMARY KEY (session_key, team_name)
    );`,
    `CREATE TABLE IF NOT EXISTS team_sprint_stats (
      team_name TEXT PRIMARY KEY,
      sprint_wins INTEGER DEFAULT 0,
      sprint_podiums INTEGER DEFAULT 0,
      sprint_points INTEGER DEFAULT 0,
      sprint_top_8 INTEGER DEFAULT 0,
      sprint_pole INTEGER DEFAULT 0,

      FOREIGN KEY (team_name) REFERENCES teams (team_name),
      FOREIGN KEY (team_name) REFERENCES team_race_stats (team_name)
    );`,
    `CREATE TABLE IF NOT EXISTS teams (
      team_name TEXT PRIMARY KEY,
      location TEXT,
      image TEXT,
      founding_year INTEGER,
      latest_year INTEGER,
      active_year_count INTEGER DEFAULT 0,
      team_principal TEXT,
      ceo TEXT,
      constructors_count INTEGER DEFAULT 0,
      country_code TEXT,
      min_pit_stop FLOAT DEFAULT 0.0,
      max_pit_stop FLOAT DEFAULT 0.0,
      avg_pit_stop FLOAT DEFAULT 0.0,

      FOREIGN KEY (team_name) REFERENCES team_race_stats (team_name),
      FOREIGN KEY (team_name) REFERENCES team_sprint_race_stats (team_name)
    );`,
    `CREATE TABLE IF NOT EXISTS tracks (
      circuit_name TEXT PRIMARY KEY,
      location TEXT NOT NULL,
      init_year INTEGER,
      latest_year INTEGER,
      appearances INTEGER DEFAULT 0,
      lap_distance_mi FLOAT DEFAULT 0.0,
      lap_distance_km FLOAT DEFAULT 0.0,
      lap_count INTEGER DEFAULT 0,
      race_distance_mi FLOAT DEFAULT 0.0,
      race_distance_km FLOAT DEFAULT 0.0,
      altitude_imperial FLOAT DEFAULT 0.0,
      altitude_metric FLOAT DEFAULT 0.0,
      elevation_imperial FLOAT DEFAULT 0.0,
      elevation_metric FLOAT DEFAULT 0.0,
      corners INTEGER DEFAULT 0,
      fastest_lap_time TEXT,
      fastest_lap_holder TEXT,
      fastest_lap_year INTEGER,
      track_type TEXT,
      image TEXT,
      country_code TEXT,
      c1_compound INTEGER DEFAULT 0,
      c2_compound INTEGER DEFAULT 0,
      c3_compound INTEGER DEFAULT 0,
      c4_compound INTEGER DEFAULT 0,
      c5_compound INTEGER DEFAULT 0,
      c6_compound INTEGER DEFAULT 0,
      car_setup TEXT,
      air_temp_low_fah FLOAT DEFAULT 0.0,
      air_temp_low_cel FLOAT DEFAULT 0.0,
      air_temp_high_fah FLOAT DEFAULT 0.0,
      air_temp_high_cel FLOAT DEFAULT 0.0,
      support_race TEXT DEFAULT 'No',
      sprint_race TEXT DEFAULT 'No'
    );`
]

// db.run(`
//     DROP TABLE tracks
//   `);

// db.run(`
//     ALTER TABLE new_session_results
//     RENAME TO session_results
//   `);

// db.run(`
//     DELETE FROM tracks
//   `);

// db.run(`
//     ALTER TABLE tracks
//     ADD COLUMN car_setup TEXT
//   `);

// db.run(`
//     ALTER TABLE team_race_results
//     DROP COLUMN session_num
//   `);

// db.run(`
//     INSERT INTO new_tracks
//     SELECT *
//     FROM tracks
//   `);

async function createTables() {
    for (const table of TABLES_TO_CREATE) {
        await db.run(table)
    }
    console.log("Selected tables created");
}

export default createTables;