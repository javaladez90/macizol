import { db } from './db';

export const createWorkoutSession = (workoutName: string): number => {
    const result = db.runSync(
        `INSERT INTO workout_sessions (workout_name, started_at)
        VALUES (?, ?)`,
        [workoutName, new Date().toISOString()]
    );

    return result.lastInsertRowId;
};