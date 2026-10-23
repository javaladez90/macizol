import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'
import { createWorkoutSession } from '../../database/workout-sessions';

export default function HomeScreen() {
    const router = useRouter();
    
    const todaysWorkout = 'Push A';

    const handleStartWorkout = () => {
        const sessionId = createWorkoutSession(todaysWorkout);

  

        console.log('Workout session created:', sessionId);

        router.push({
            pathname: '/workout',
            params: { sessionId: String(sessionId) },
        });
    };

      const handleOpenExerciseLibrary = () => {
        router.push('/exercise-library');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.brand}>MACIZOL</Text>
                        <Text style={styles.subtitle}>BUILD SOMETHING SOLID.</Text>
                    </View>

                    <Text style={styles.sun}>☀</Text>
                </View>

                {/* Today's workout */}
                <View style={styles.workoutCard}>
                    <Text style={styles.cardLabel}>TODAY&apos;S TRAINING</Text>

                    <Text style={styles.workoutName}>{todaysWorkout}</Text>

                    <Text style={styles.workoutDetails}>
                        Chest • Shoulders • Triceps
                    </Text>

                    <Pressable
                        style={styles.startButton}
                        onPress={handleStartWorkout}
                    >
                        <Text style={styles.startButtonText}>START WORKOUT</Text>
                    </Pressable>
                </View>
                    <Pressable
                     style={styles.libraryButton}
                     onPress={handleOpenExerciseLibrary}
                    >
                        <View>
                            <Text style={styles.libraryButtonTitle}>
                                EXERCISE LIBRARY
                            </Text>
                            <Text style={styles.libraryButtonSubtitle}>
                                Browse exercises and techniques
                            </Text>
                        </View>

                        <Text style={styles.libraryArrow}>→</Text>
                    </Pressable>
                {/* Progress preview */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>THIS WEEK</Text>

                    <View style={styles.statRow}>
                        <View>
                            <Text style={styles.statNumber}>3</Text>
                            <Text style={styles.statLabel}>WORKOUTS</Text>
                        </View>

                        <View>
                            <Text style={styles.statNumber}>42</Text>
                            <Text style={styles.statLabel}>WORKING SETS</Text>
                        </View>

                        <View>
                            <Text style={styles.statNumber}>2</Text>
                            <Text style={styles.statLabel}>PRs</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101010',
    },

    content: {
        flex: 1,
        paddingHorizontal: 22,
        paddingTop: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },

    brand: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: '900',
        letterSpacing: 3,
    },

    subtitle: {
        color: '#777777',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.5,
        marginTop: 4,
    },

    sun: {
        fontSize: 34,
    },

    workoutCard: {
        backgroundColor: '#1B1B1B',
        borderRadius: 20,
        padding: 24,
    },

    cardLabel: {
        color: '#888888',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.5,
    },

    workoutName: {
        color: '#FFFFFF',
        fontSize: 34,
        fontWeight: '900',
        marginTop: 10,
    },

    workoutDetails: {
        color: '#999999',
        fontSize: 15,
        marginTop: 5,
    },

    startButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 28,
    },

    startButtonText: {
        color: '#111111',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
    },

    section: {
        marginTop: 36,
    },

    sectionTitle: {
        color: '#777777',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.5,
        marginBottom: 18,
    },

    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    statNumber: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '800',
    },

    statLabel: {
        color: '#666666',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        marginTop: 3,
    },

    libraryButton: {
        backgroundColor: '#1B1B1B',
        borderRadius: 16,
        padding: 20,
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    libraryButtonTitle: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 1,
    },

    libraryButtonSubtitle: {
        color: '#888888',
        fontSize: 12,
        marginTop: 6,
    },

    libraryArrow: {
        color: '#FFFFFF',
        fontSize: 24,
    },
});