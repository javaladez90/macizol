import { useCallback, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';

import {
    getCompletedWorkouts,
    type CompletedWorkout,
} from '../../database/workout-sessions';
import { useRouter } from 'expo-router'

export default function HistoryScreen() {
    const router = useRouter();
    const [workouts, setWorkouts] = useState<CompletedWorkout[]>([]);

    useFocusEffect(
        useCallback(() => {
            const completedWorkouts = getCompletedWorkouts();
            setWorkouts(completedWorkouts);
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>WORKOUT HISTORY</Text>

            <FlatList
                data={workouts}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No completed workouts yet.
                    </Text>
                }
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.workoutCard}
                        onPress={() =>
                            router.push({
                                pathname: '/workout-details',
                                params: {
                                    sessionId: String(item.id),
                                },
                            })
                        }
                        >
                            <Text style={styles.workoutName}>
                                {item.workout_name}
                            </Text>

                            <Text style={styles.workoutDate}>
                                {new Date(item.completed_at).toLocaleDateString()}
                            </Text>
                        </Pressable>
                )}
                />
        </View>
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
    list: {
        paddingBottom: 24,
        flexGrow: 1,
    },
    workoutCard: {
        backgroundColor: '#1E1E1E',
        padding: 20,
        borderRadius: 12,
        marginBottom: 12,
    },
    workoutName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    workoutDate: {
        color: '#AAAAAA',
        fontSize: 14,
        marginTop: 8,
    },
    emptyText: {
        color: '#888888',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 40,
    },
});