import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { pushAExercises } from "../data/workouts";
import ExerciseCard from '../components/exercise-card';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import type { Exercise } from '../types/exercise';
import { useRouter } from 'expo-router';
import {
  finishWorkoutSession,
  getWorkoutSets,
  getPreviousExerciseSets,
  type SavedWorkoutSet,
} from '../database/workout-sessions';


export default function WorkoutScreen() {

  const { sessionId } = useLocalSearchParams<{
    sessionId: string;
  }>();

  const [exercises, setExercises] = useState<Exercise[]>(() =>
  pushAExercises.map((exercise) => ({
    ...exercise,
    sets: exercise.sets.length > 0
      ? [...exercise.sets]
      : [
          {
            id: `${exercise.id}-set-1`,
            setNumber: 1,
            weight: 0,
            reps: 0,
            rir: 0,
          },
      ],
  }))
);
  const [previousSets, setPreviousSets] = useState<
    Record<string, SavedWorkoutSet[]>
    >({});
    

  useEffect(() => {
    const history: Record<string, SavedWorkoutSet[]> = {};

    for (const exercise of exercises) {
      history[exercise.id] = getPreviousExerciseSets(exercise.id);
    }

    setPreviousSets(history);
  }, []);

  const router = useRouter();
  const [isFinishing, setIsFinishing] = useState(false);

  const handleFinishWorkout = () => {
    if (isFinishing) return;

    const id = Number(sessionId);

    if (!Number.isSafeInteger(id) || id <= 0) {
      Alert.alert('Error', 'Invalid workout session.');
      return;
    }

    setIsFinishing(true);

    try {
      finishWorkoutSession(id, exercises);

      const savedSets = getWorkoutSets(id);

      console.log('SAVED WORKOUT SETS:', savedSets);
      console.log('Workout saved successfully:', id);

      Alert.alert(
        'Workout Complete!',
        'Your workout has been saved.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/'),
          },
        ]
      );
    } catch (error) {
      console.error('Failed to save workout:', error);
      Alert.alert('Save Failed', 'Your workout could not be saved.');
      setIsFinishing(false);
    }
  };

  console.log('Active workout session:', sessionId);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>CURRENT WORKOUT</Text>

        <Text style={styles.title}>Push A</Text>

        <Text style={styles.description}>Chest • Shoulders • Triceps</Text>
        <View style={styles.exerciseList}>
          {exercises.map((exercise) => (
  <ExerciseCard
    key={exercise.id}
    exercise={exercise}
    sets={exercise.sets}
    previousSets={previousSets[exercise.id] ?? []}
    onSetsChange={(updatedSets) => {
      setExercises((currentExercises) =>
        currentExercises.map((currentExercise) =>
          currentExercise.id === exercise.id
            ? {...currentExercise, sets: updatedSets }
            : currentExercise 
)
);
}}
/>
          ))}
        </View>
        <Pressable
          style={styles.finishButton}
          onPress={handleFinishWorkout}
          disabled={isFinishing}
        >
          <Text style={styles.finishButtonText}>
            {isFinishing ? 'SAVING...' : 'FINISH WORKOUT'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
  },

  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
  },

  label: {
    color: "#777777",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 10,
  },

  description: {
    color: "#999999",
    fontSize: 15,
    marginTop: 5,
  },

  exerciseList: {
    marginTop: 32,
    gap: 12,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  finishButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 32,
  },

  finishButtonText: {
    color: '#101010',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
