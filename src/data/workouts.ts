import type { Exercise } from '../types/exercise';

export const pushAExercises: Exercise[] = [
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    targetMuscle: 'Chest',
    minReps: 6,
    maxReps: 10,
    targetRir: 2,
    sets: [],
  },
  {
    id: 'machine-chest-press',
    name: 'Machine Chest Press',
    targetMuscle: 'Chest',
    minReps: 8,
    maxReps: 12,
    targetRir: 2,
    sets: [],
  },
  {
    id: 'cable-lateral-raise',
    name: 'Cable Lateral Raise',
    targetMuscle: 'Shoulders',
    minReps: 12,
    maxReps: 20,
    targetRir: 2,
    sets: [],
  },
  {
    id: 'triceps-pushdown',
    name: 'Triceps Pushdown',
    targetMuscle: 'Triceps',
    minReps: 10,
    maxReps: 15,
    targetRir: 2,
    sets: [],
  },
];