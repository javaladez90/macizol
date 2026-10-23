
import type { LibraryExercise } from '../types/exercise-library';

export const initialExercises: LibraryExercise[] = [
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Shoulders', 'Triceps'],
    equipment: 'Dumbbells',
    category: 'compound',
    instructions: [
      'Set the bench to a moderate incline.',
      'Position the dumbbells near your upper chest.',
      'Press the dumbbells upward with control.',
      'Lower the dumbbells slowly to the starting position.',
    ],
    coachingTips: [
      'Keep your shoulder blades stable against the bench.',
      'Use a controlled range of motion.',
    ],
    commonMistakes: [
      'Using excessive momentum.',
      'Setting the bench incline too steep.',
    ],
    illustrationPath: null,
    videoUrl: null,
  },
  {
    id: 'machine-chest-press',
    name: 'Machine Chest Press',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    equipment: 'Machine',
    category: 'compound',
    instructions: [
      'Adjust the seat so the handles align with your chest.',
      'Press the handles forward.',
      'Return slowly to the starting position.',
    ],
    coachingTips: [
      'Keep your back against the pad.',
      'Avoid bouncing the weight.',
    ],
    commonMistakes: [
      'Using too much weight.',
      'Lifting the shoulders off the pad.',
    ],
    illustrationPath: null,
    videoUrl: null,
  },
  {
    id: 'cable-lateral-raise',
    name: 'Cable Lateral Raise',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: [],
    equipment: 'Cable',
    category: 'isolation',
    instructions: [
      'Stand beside a low cable pulley.',
      'Raise your arm outward to approximately shoulder height.',
      'Lower slowly under control.',
    ],
    coachingTips: [
      'Keep your torso stable.',
      'Lead with your upper arm rather than shrugging.',
    ],
    commonMistakes: [
      'Swinging the torso.',
      'Using excessive weight.',
    ],
    illustrationPath: null,
    videoUrl: null,
  },
  {
    id: 'triceps-pushdown',
    name: 'Triceps Pushdown',
    primaryMuscle: 'Triceps',
    secondaryMuscles: [],
    equipment: 'Cable',
    category: 'isolation',
    instructions: [
      'Attach a handle to a high cable pulley.',
      'Keep your upper arms close to your torso.',
      'Extend your elbows to push the handle downward.',
      'Return slowly.',
    ],
    coachingTips: [
      'Keep your elbows relatively stationary.',
      'Control the eccentric portion.',
    ],
    commonMistakes: [
      'Swinging the upper arms.',
      'Leaning excessively into the movement.',
    ],
    illustrationPath: null,
    videoUrl: null,
  },
];
