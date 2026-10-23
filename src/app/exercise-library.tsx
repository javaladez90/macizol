import { useEffect, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { getAllExercises } from '../database/exercise-library';
import type { LibraryExercise } from '../types/exercise-library';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import { useRouter } from 'expo-router';

export default function ExerciseLibraryScreen() {
    const [exercises, setExercises] = useState<LibraryExercise[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMuscle, setSelectedMuscle] = useState('All');
    const router = useRouter();

    const muscleGroups = [
        'All',
        'Chest',
        'Back',
        'Shoulders',
        'Biceps',
        'Triceps',
        'Quadriceps',
        'Hamstrings',
        'Glutes',
        'Calves',
        'Core',
    ];

    useEffect(() => {
        const savedExercises = getAllExercises();
        setExercises(savedExercises);
    }, []);

    const filteredExercises = exercises.filter((exercise) => {
        const matchesSearch = exercise.name
         .toLowerCase()
         .includes(searchQuery.trim().toLowerCase());
        
        const matchesMuscle = 
            selectedMuscle === 'All' ||
            exercise.primaryMuscle === selectedMuscle;

        return matchesSearch && matchesMuscle;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exercise Library</Text>

            <Text style={styles.subtitle}>
                {exercises.length} exercises available
            </Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Search exercises..."
                placeholderTextColor="#777777"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
            />

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterContainer}
            >
                {muscleGroups.map((muscle) => (
                    <Pressable
                        key={muscle}
                        onPress={() => setSelectedMuscle(muscle)}
                        style={[
                            styles.filterButton,
                            selectedMuscle === muscle && styles.filterButtonActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedMuscle === muscle && styles.filterTextActive,
                            ]}
                        >
                            {muscle}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>

            <FlatList
                data={filteredExercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable
                     style={styles.exerciseCard}
                     onPress={() =>
                        router.push({
                            pathname: '/exercise-details',
                            params: { id: item.id },
                        })
                     }
                    >
                        <Text style={styles.exerciseName}>
                            {item.name}
                        </Text>

                        <Text style={styles.exerciseDetails}>
                            {item.primaryMuscle} • {item.equipment}
                        </Text>
                    </Pressable>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No exercises found.
                    </Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: '#101014',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#AAAAAA',
        marginBottom: 24,
    },
    exerciseCard: {
        padding: 16,
        backgroundColor: '#1C1C22',
        borderRadius: 12,
        marginBottom: 12,
    },
    exerciseName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 6,
    },

    exerciseDetails: {
        fontSize: 13,
        color: '#AAAAAA',
    },

    emptyText: {
        color: '#AAAAAA',
        textAlign: 'center',
        marginTop: 40,
    },

    searchInput: {
        backgroundColor: '#1C1C22',
        color: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        marginBottom: 20,
    },

    filterContainer: {
        flexGrow: 0,
        marginBottom: 20,
    },

    filterButton: {
        backgroundColor: '#1C1C22',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 8,
    },

    filterButtonActive: {
        backgroundColor: '#FFFFFF',
    },

    filterText: {
        color: '#AAAAAA',
        fontSize: 13,
        fontWeight: '600',
    },

    filterTextActive: {
        color: '#101014',
    },
});