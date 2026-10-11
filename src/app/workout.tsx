import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { pushAExercises } from "../data/workouts";
import ExerciseCard from '../components/exercise-card';
import { useLocalSearchParams } from 'expo-router';


export default function WorkoutScreen() {

  const { sessionId } = useLocalSearchParams<{
    sessionId: string;
  }>();

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
          {pushAExercises.map((exercise) => (
  <ExerciseCard
    key={exercise.id}
    exercise={exercise}
  />
))}
        </View>
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
  
});
