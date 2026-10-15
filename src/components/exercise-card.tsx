import {  Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import WeightInput from './weight-input';

import type { Exercise } from '../types/exercise';
import type { WorkoutSet } from '../types/workout-set';

type ExerciseCardProps = {
    exercise: Exercise;
    sets: WorkoutSet[];
    onSetsChange: (sets: WorkoutSet[]) => void;
};

export default function ExerciseCard({
  exercise,
  sets,
  onSetsChange,
}: ExerciseCardProps) {

    const updateSet = (
      setId: string,
      field: 'weight' | 'reps' | 'rir',
      value: number 
    ) => {
      const updatedSets = sets.map((set) =>
      set.id === setId ? { ...set, [field]: value } : set
    );

    onSetsChange(updatedSets);
    };

    const addSet = () => {
      const nexteSetNumber = sets.length + 1;

      const newSet: WorkoutSet = {
        id: `set-${Date.now()}-${Math.random()}`,
        setNumber: nexteSetNumber,
        weight: 0,
        reps: 0,
        rir: 0,
      };
      onSetsChange([...sets, newSet]);
    };

    const removeSet = (setId: string) => {
      const updatedSets = sets
        .filter((set) => set.id !== setId)
        .map((set, index) => ({
          ...set,
          setNumber: index + 1,
        }));
      
      onSetsChange(updatedSets);
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
        <View style={styles.setNumberContainer}>
          <Text style={styles.setNumber}>
            {set.setNumber}
          </Text>

          {sets.length > 1 && (
            <Pressable onPress={() => removeSet(set.id)}>
              <Text style={styles.removeSetText}>×</Text>
            </Pressable>
            )}
        </View>

        <WeightInput
          value={set.weight}
          onChange={(value) =>
            updateSet(set.id, 'weight', value)
          }
        />

        <TextInput
          style={styles.setInput}
          value={set.reps.toString()}
          onChangeText={(text) =>
            updateSet(set.id, 'reps', Number(text))
          }
          keyboardType="number-pad"
          selectTextOnFocus
        />

        <TextInput
          style={styles.setInput}
          value={set.rir.toString()}
          onChangeText={(text) =>
            updateSet(set.id, 'rir', Number(text))
          }
          keyboardType="number-pad"
          selectTextOnFocus
        />
      </View>
    ))}
    
    <Pressable style={styles.addSetButton} onPress={addSet}>
      <Text style={styles.addSetText}>+ ADD SET</Text>
    </Pressable>
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
  addSetButton: {
    marginTop: 18,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#303030',
    alignItems: 'center',
  },
  addSetText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  setNumberContainer: {
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  setNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  removeSetText: {
    color: '#FF6B6B',
    fontSize: 20,
    fontWeight: '700',
  },
});