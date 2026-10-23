import { db } from './db';
import type { LibraryExercise } from '../types/exercise-library';
import { initialExercises } from '../data/exercise-library-seed';

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

export const getExerciseById = (
  id: string
): LibraryExercise | null => {
  const row = db.getFirstSync<{
    id: string;
    namr: string;
    primary_muscle: string;
    secondary_muscles: string;
    equipment: string;
    category: 'compound' | 'isolation';
    instructions: string;
    coaching_tips: string;
    common_mistakes: string;
    illustration_path: string | null;
    video_url: string | null;
  }>(
    'SELECT * FROM exercise_library WHERE id = ?',
    [id]
  );

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.secondary_muscles,
    primaryMuscle: row.primary_muscle,
    secondaryMuscles: JSON.parse(row.secondary_muscles) as string[],
    equipment: row.equipment,
    category: row.category,
    instructions: JSON.parse(row.instructions) as string[],
    coachingTips: JSON.parse(row.coaching_tips) as string[],
    commonMistakes: JSON.parse(row.common_mistakes) as string[],
    illustrationPath: row.illustration_path,
    videoUrl: row.video_url,
  };
};

export const addExercise = (exercise: LibraryExercise): void => {
    db.runSync(
        `INSERT INTO exercise_library (
          id,
          name,
          primary_muscle,
          secondary_muscles,
          equipment,
          category,
          instructions,
          coaching_tips,
          common_mistakes,
          illustration_path,
          video_url,
          is_custom
        ) VAULES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            exercise.id,
            exercise.name,
            exercise.primaryMuscle,
            JSON.stringify(exercise.secondaryMuscles),
            exercise.equipment,
            exercise.category,
            JSON.stringify(exercise.instructions),
            JSON.stringify(exercise.coachingTips),
            JSON.stringify(exercise.commonMistakes),
            exercise.illustrationPath,
            exercise.videoUrl,
            0,
        ]
    );
};


export const seedExerciseLibrary = (): void => {
  db.withTransactionSync(() => {
    for (const exercise of initialExercises) {
      db.runSync(
        `INSERT OR IGNORE INTO exercise_library (
          id,
          name,
          primary_muscle,
          secondary_muscles,
          equipment,
          category,
          instructions,
          coaching_tips,
          common_mistakes,
          illustration_path,
          video_url,
          is_custom
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          exercise.id,
          exercise.name,
          exercise.primaryMuscle,
          JSON.stringify(exercise.secondaryMuscles),
          exercise.equipment,
          exercise.category,
          JSON.stringify(exercise.instructions),
          JSON.stringify(exercise.coachingTips),
          JSON.stringify(exercise.commonMistakes),
          exercise.illustrationPath,
          exercise.videoUrl,
          0,
        ]
      );
    }
  });
};
