export type SetPerformance = {
    weight: number;
    reps: number;
    rir: number;
};

export type PerformanceResult = 
    | 'improved'
    | 'maintained'
    | 'declined';

export const compareSetPerformance = (
    previous: SetPerformance,
    current: SetPerformance
): PerformanceResult => {
    if (
        current.weight > previous.weight &&
        current.reps >= previous.reps &&
        current.rir >= previous.rir
    ) {
        return 'improved';
    }

    if (
        current.weight === previous.weight &&
        current.reps > previous.reps &&
        current.rir >= previous.rir
    ) {
        return 'improved';
    }

    if (
        current.weight === previous.weight &&
        current.reps === previous.reps &&
        current.rir === previous.rir
    ) {
        return 'maintained';
    }

    return 'declined';
};

export type ProgressionRecommendation =
    | 'increase_weight'
    | 'increase_reps'
    | 'maintain';

export const recommendProgression = (
    performance: SetPerformance,
    minReps: number,
    maxReps: number,
    targetRir: number
): ProgressionRecommendation => {
    if (
        performance.reps >= maxReps &&
        performance.rir >= targetRir
    ) {
        return 'increase_weight';
    }

    if (
        performance.reps < maxReps &&
        performance.rir >= targetRir
    ) {
        return 'increase_reps';
    }

    return 'maintain';
};

export const recommendWorkoutProgression = (
    sets: SetPerformance[],
    minReps: number,
    maxReps: number,
    targetRir: number
): ProgressionRecommendation => {
    if (sets.length === 0) {
        return 'maintain';
    }

    const allSetsReady = sets.every(
        (set) =>
            set.reps >=maxReps &&
        set.rir >= targetRir
    );

    if (allSetsReady) {
        return 'increase_weight';
    }

    const allSetsWithinRange = sets.every(
        (set) =>
            set.reps >= minReps &&
            set.rir >= targetRir
    );

    if (allSetsWithinRange) {
        return 'increase_reps';
    }

    return 'maintain';
};