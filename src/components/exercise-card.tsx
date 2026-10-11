import { useState } from 'react';
import {  StyleSheet, Text, View } from 'react-native';

import type { Exercise } from '../types/exercise';
import type { WorkoutSet } from '../types/workout-set';

type ExerciseCardProps = {
    exercise: Exercise;
};

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
    const [sets, setSets] = useState<WorkoutSet[]>([
      {
        id: 'set-1',
        setNumber: 1,
        weight: 0,
        reps: 0,
        rir: 0,
    },
  ]);

    const updateSet = (
      setId: string,
      field: 'weight' | 'reps' | 'rir',
      value: number 
    ) => {
      setSets((currentSets) =>
        currentSets.map((set) =>
          set.id === setId
            ? { ...set, [field]: value }
            : set
          )
        );
    };

    return (
  <View style={styles.exerciseCard}>
    <Text style={styles.exerciseName}>{exercise.name}</Text>

    <Text style={styles.targetMuscle}>
      {exercise.targetMuscle}
    </Text>

    <View style={styles.setHeader}>
      <Text style={styles.setHeaderText}>SET</Text>
      <Text style={styles.setHeaderText}>WEIGHT</Text>
      <Text style={styles.setHeaderText}>REPS</Text>
      <Text style={styles.setHeaderText}>RIR</Text>
    </View>

    {sets.map((set) => (
      <View key={set.id} style={styles.setRow}>
        <Text style={styles.setValue}>
          {set.setNumber}
        </Text>

        <Text style={styles.setValue}>
          {set.weight}
        </Text>

        <Text style={styles.setValue}>
          {set.reps}
        </Text>

        <Text style={styles.setValue}>
          {set.rir}
        </Text>
      </View>
    ))}
    </View>
  
);
}

const styles = StyleSheet.create({
  exerciseCard: {
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 18,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  targetMuscle: {
    color: '#777777',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  setHeader: {
    flexDirection: 'row',
    marginTop: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  setHeaderText: {
    color: '#666666',
    fontSize: 10,
    fontWeight: '700',
    width: '25%',
    textAlign: 'center',
  },
  setRow: {
    flexDirection: 'row',
    paddingTop: 12,
  },
  setValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    width: '25%',
    textAlign: 'center',
  },
  setInput: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    width: '25%',
    textAlign: 'center',
    padding: 0,
  },
});