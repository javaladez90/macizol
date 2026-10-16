export type LibraryExercise = {
    id: string;
    name: string;

    primaryMuscle: string;
    secondaryMuscles: string[];

    equipment: string;
    category: 'compound' | 'isolation';

    instructions: string[];
    coachingTips: string[];
    commonMistakes: string[];

    illustrationPath: string | null;
    videoUrl: string | null;
};