import type { WorkoutSet } from './workout-set';

export type Exercise = {
    id: string;
    name: string;
    targetMuscle: string;
    sets: WorkoutSet[];
};