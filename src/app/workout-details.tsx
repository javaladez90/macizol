import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    getSavedWorkoutSets,
    type SavedWorkoutSet,
} from '../database/workout-sessions';

export default function WorkoutDetailsScreen() {
    const { sessionId } = useLocalSearchParams<{
        sessionId: string;
    }>();

    const [sets, setSets] = useState<SavedWorkoutSet[]>([]);

    useEffect(() => {
        const id = Number(sessionId);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return;
        }

        const savedSets = getSavedWorkoutSets(id);
        setSets(savedSets);
    }, [sessionId]);



    const groupedExercises = sets.reduce<
        Record<string, SavedWorkoutSet[]>
        >((groups, set) => {
            if (!groups[set.exercise_id]) {
                groups[set.exercise_id] = [];
            }

            groups[set.exercise_id].push(set);

            return groups;
        }, {});

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>WORKOUT DETAILS</Text>

            {sets.length === 0 ? (
                <Text style={styles.emptyText}>
                    No recorded sets found.
                </Text>
            ) : (
                Object.entries(groupedExercises).map(([exerciseId, exerciseSets]) => (
                    <View key={exerciseId} style={styles.setCard}>
                        <Text style={styles.exerciseName}>
                        {exerciseSets[0].exercise_name}
                        </Text>

                        {exerciseSets.map((set) => (
                            <View key={set.id} style={styles.setRow}>
                                <Text style={styles.setDetails}>
                                    Set {set.set_number}
                                </Text>

                                <Text style={styles.setDetails}>
                                    {set.weight} lbs
                                </Text>

                                <Text style={styles.setDetails}>
                                    {set.reps} reps
                                </Text>

                                <Text style={styles.setDetails}>
                                    {set.rir} RIR
                                </Text>
                    </View>
                ))}
                </View>
            ))
        )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0F0F',
        padding: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        marginTop: 20,
    },
    setCard: {
        backgroundColor: '#1E1E1E',
        padding: 20,
        borderRadius: 12,
        marginBottom: 12,
    },
    exerciseName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    setDetails: {
        color: '#CCCCCC',
        fontSize: 15,
        marginTop: 4,
    },
    emptyText: {
        color: '#888888',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 40,
    },
    setRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
});