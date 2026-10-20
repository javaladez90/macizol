import { db } from './db';
import type { LibraryExercise } from '../types/exercise-library';

export const getAllExercises = (): LibraryExercise[] => {
    const rows = db.getAllSync<{
        id: string;
        name: string;
        primary_muscle: string;
        secondary_muscle: string;
        equipment: string;
        category: 'compound' | 'isolation';
        instructions: string;
        coaching_tips: string;
        common_mistakes: string;
        illustration_path: string | null;
        video_url: string | null; 
    }>(
        `SELECT *
        FROM exercise_library
        ORDER BY name ASC`
    );

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
        primaryMuscle: row.primary_muscle,
        secondaryMuscles: JSON.parse(row.secondary_muscle) as string[],
        equipment: row.equipment,
        category: row.category,
        instructions: JSON.parse(row.instructions),
        coachingTips: JSON.parse(row.coaching_tips),
        commonMistakes: JSON.parse(row.common_mistakes),
        illustrationPath: row.illustration_path,
        videoUrl: row.video_url,
    }));
};