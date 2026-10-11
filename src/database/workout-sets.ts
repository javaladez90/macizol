import { db } from './db';
import type { WorkoutSet } from '../types/workout-set';

export const saveWorkoutSet = (
    sessionId: number,
    exerciseId: string,
    exerciseName: string,
    set: WorkoutSet
): number => {
    const result = db.runSync(
        `INSERT INTO workout_sets (
            session_id,
            exercise_id,
            exercise_name,
            set_number,
            weight,
            reps,
            rir
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            sessionId,
            exerciseId,
            exerciseName,
            set.setNumber,
            set.weight,
            set.reps,
            set.rir,
        ]
    );

    return result.lastInsertRowId;
};