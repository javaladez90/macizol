import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('macizol.db');

export const initializeDatabase = () => {

    db.execSync(`
        CREATE TABLE IF NOT EXISTS workout_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            workout_name TEXT NOT NULL,
            started_at TEXT NOT NULL,
            completed_at TEXT
        );

        CREATE TABLE IF NOT EXISTS workout_sets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id INTEGER NOT NULL,
            exercise_id TEXT NOT NULL,
            exercise_name TEXT NOT NULL,
            set_number INTEGER NOT NULL,
            weight REAL NOT NULL,
            reps INTEGER NOT NULL,
            rir INTEGER NOT NULL,
            FOREIGN KEY (session_id) REFERENCES workout_sessions(id)
        );
    `);

    const columns = db.getAllSync(
        'PRAGMA table_info(workout_sets);'
    );

    console.log('WORKOUT SETS TABLE COLUMNS:', columns);
};