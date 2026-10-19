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

        CREATE TABLE IF NOT EXISTS exercise_library (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            primary_muscle TEXT NOT NULL,
            secondary_muscles TEXT NOT NULL DEFAULT '[]'
            equipment TEXT NOT NULL,
            category TEXT NOT NULL,
            instructions TEXT NOT NULL DEFAULT '[]',
            coaching_tips TEXT NOT NULL DEFAULT '[]',
            common_mistakes TEXT NOT NULL DEFAULT '[]',
            illustration_path TEXT,
            video_url TEXT,
            is_custom INTEGER NOT NULL DEFAULT 0
        );
            `);

        const columns = db.getAllSync(
            'PRAGMA table_info(exercise_library);'
        );

        console.log('EXERCISE LIBRARY TABLE COLUMNS:', columns);
};