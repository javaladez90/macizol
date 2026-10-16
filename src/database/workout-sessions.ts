import { db } from './db';
import type { Exercise } from '../types/exercise';

export const createWorkoutSession = (workoutName: string): number => {
    const result = db.runSync(
        `INSERT INTO workout_sessions (workout_name, started_at)
        VALUES (?, ?)`,
        [workoutName, new Date().toISOString()]
    );

    return result.lastInsertRowId;
};

export const finishWorkoutSession = (
    sessionId: number,
    exercises: Exercise[]
): void => {
    db.withTransactionSync(() => {
        const session = db.getFirstSync<{ completed_at: string | null }>(
            `SELECT completed_at
            FROM workout_sessions
            WHERE id = ?`,
            [sessionId]
        );

        if (!session) {
        throw new Error('Workout session not found');
        }

        if (session.completed_at !== null) {
            throw new Error('This workout has already been completed');
        }

        for (const exercise of exercises) {
            for (const set of exercise.sets) {

                // skip sets that havent been performed
                if (set.reps <= 0) {
                    continue;
                }

                db.runSync(
                    `INSERT INTO workout_sets (
                    session_id,
                    exercise_id,
                    exercise_name,
                    set_number,
                    weight,
                    reps,
                    rir
                )   VALUES (?, ?, ?, ?, ?, ?, ?)`,
                   [
                    sessionId,
                    exercise.id,
                    exercise.name,
                    set.setNumber,
                    set.weight,
                    set.reps,
                    set.rir,
                   ]
                );
            }
        }
    
    db.runSync(
        `UPDATE workout_sessions
        SET completed_at =?
        WHERE id = ?`
    );
});
};

export const getWorkoutSets = (sessionId: number) => {
    return db.getAllSync<{
        exercise_name: String;
        set_number: Number;
        weight: Number;
        reps: Number;
        rir: Number;
    }>(
        `SELECT
          exercise_name,
          set_number,
          weight,
          reps,
          rir
        FROM workout_sets
        WHERE session_id = ?
        ORDER BY id ASC`,
        [sessionId]
    );
    };

export type CompletedWorkout = {
    id: number;
    workout_name: string;
    started_at: string;
    completed_at: string;
};

export const getCompletedWorkouts = (): CompletedWorkout[] => {
    return db.getAllSync<CompletedWorkout>(
        `SELECT
         id,
         workout_name,
         started_at
         completed_at
        FROM workout_sessions
        WHERE completed_at IS NOT NULL
        ORDER BY completed_at DESC`
    );
};

export type SavedWorkoutSet = {
    id: number;
    exercise_id: string;
    exercise_name: string;
    set_number: number;
    weight: number;
    reps: number;
    rir: number;
};

export const getSavedWorkoutSets = (
    sessionId: number
): SavedWorkoutSet[] => {
    return db.getAllSync<SavedWorkoutSet>(
        `SELECT
            id,
            exercise_id,
            exercise_name,
            set_number,
            weight,
            reps,
            rir
        FROM workout_sets
        WHERE session_id = ?
        ORDER BY id ASC`,
        [sessionId]
    );
};

export const getPreviousExerciseSet = (
    exerciseId: string
): SavedWorkoutSet | null => {
    return db.getFirstSync<SavedWorkoutSet>(
        `SELECT
          ws.id,
          ws.exercise_id,
          ws.exercise_name,
          ws.set_number,
          ws.weight,
          ws.reps,
          ws.rir
        FROM workout_sets AS ws
        INNER JOIN workout_sessions AS session
            ON ws.session_id = session.id
        WHERE ws.exercise_id = ?
            AND session.completed_at IS NOT NULL
        ORDER BY session.completed_at DESC,
            ws.set_number DESC,
        LIMIT 1`,
        [exerciseId]
    );
};

export const  getPreviousExerciseSets = (
    exerciseId: string
): SavedWorkoutSet[] => {
    return db.getAllSync<SavedWorkoutSet>(
        `SELECT
          ws.id,
          ws.exercise_id,
          ws.exercise_name,
          ws.set_number,
          ws.weight,
          ws.reps,
          ws.rir
        FROM workout_sets AS ws
        INNER JOIN workout_sessions AS session
            ON ws.session_id = session.id
        WHERE ws.exercise_id = ?
            AND session.completed_at IS NOT NULL
            AND ws.session_id = (
                SELECT previous.id
                From workout_sessions AS previous
                INNER JOIN workout_sets AS previous_set
                    ON previous_set.session_id = previous.id
                WHERE previous_set.exercise_id = ?
                    AND previous.completed_at IS NOT NULL
                ORDER BY previous.completed_at DESC,
                    previous.id DESC
                LIMIT 1
    )
        ORDER BY ws.set_number ASC`,
        [exerciseId, exerciseId]
    );
};