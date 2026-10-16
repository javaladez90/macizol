import { 
    compareSetPerformance,
    recommendProgression,
    recommendWorkoutProgression
 } from './progressive-overload';


const previous = {
    weight: 80,
    reps: 10,
    rir: 2,
};

const testCases = [
    {
        name: 'More reps at the same weight',
        current: { weight: 80, reps: 12, rir: 2},
        expected: 'improved',
    },
    {
        name: 'More weight with the same reps',
        current: { weight: 85, reps: 10, rir: 2 },
        expected: 'improved',
    },
    {
        name: 'Identical performance',
        current: { weight: 80, reps: 10, rir: 2 },
        expected: 'maintained',
    },
    {
        name: 'Fewer reps at the same weight',
        current: { weight: 80, reps: 8, rir: 2 },
        expected: 'declined',
    },
];

for (const test of testCases) {
    const result = compareSetPerformance(previous, test.current);

    if (result !== test.expected) {
        throw new Error(
            `${test.name}: expected ${test.expected}, got ${result}`
        );
    }

    console.log(`PASS: ${test.name}`);
}

const recommendationTests = [
    {
        name: 'Increase weight at top of rep range',
        performance: { weight: 80, reps: 12, rir: 2 },
        expected: 'increase_weight',
    },
    {
        name: 'Increase reps below top of range',
        performance: { weight: 80, reps: 10, rir: 2 },
        expected: 'increase_reps',
    },
    {
        name: 'Maintain when RIR is below target',
        performance: { weight: 80, reps: 12, rir: 0 },
        expected: 'maintain',
    },
    {
        name: 'Increase weight when reps exceed range',
        performance: { weight: 80, reps: 14, rir: 3 },
        expected: 'increase_weight',
    },
];

for (const test of recommendationTests) {
    const result = recommendProgression(
        test.performance,
        8,12,
        2
    );

    if (result !== test.expected) {
        throw new Error(
            `${test.name}: expected ${test.expected}, got ${result}`
        );
    }

    console.log(`PASS: ${test.name}`);
}

const multiSetTests = [
  {
    name: 'Increase weight when all sets reach the maximum',
    sets: [
      { weight: 80, reps: 12, rir: 2 },
      { weight: 80, reps: 12, rir: 2 },
      { weight: 80, reps: 12, rir: 2 },
    ],
    expected: 'increase_weight',
  },
  {
    name: 'Increase reps when all sets meet minimum targets',
    sets: [
      { weight: 80, reps: 12, rir: 2 },
      { weight: 80, reps: 10, rir: 2 },
      { weight: 80, reps: 9, rir: 2 },
    ],
    expected: 'increase_reps',
  },
  {
    name: 'Maintain when a set falls below the minimum',
    sets: [
      { weight: 80, reps: 12, rir: 2 },
      { weight: 80, reps: 9, rir: 2 },
      { weight: 80, reps: 7, rir: 1 },
    ],
    expected: 'maintain',
  },
  {
    name: 'Maintain when no sets are provided',
    sets: [],
    expected: 'maintain',
  },
];

for (const test of multiSetTests) {
  const result = recommendWorkoutProgression(
    test.sets,
    8,
    12,
    2
  );

  if (result !== test.expected) {
    throw new Error(
      `${test.name}: expected ${test.expected}, got ${result}`
    );
  }

  console.log(`PASS: ${test.name}`);
}