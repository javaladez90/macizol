import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>CURRENT WORKOUT</Text>

        <Text style={styles.title}>Push A</Text>

        <Text style={styles.description}>Chest • Shoulders • Triceps</Text>
      </View>
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
});
