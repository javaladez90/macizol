import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { getExerciseById } from '../database/exercise-library';
import type { LibraryExercise } from '../types/exercise-library';

export default function ExerciseDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [exercise, setExercise] = useState<LibraryExercise | null>(null);

    useEffect(() => {
        if (typeof id === 'string') {
            setExercise(getExerciseById(id));
        }
    }, [id]);

    if (!exercise) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>Exercise not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{exercise.name}</Text>

            <Text style={styles.subtitle}>
                {exercise.primaryMuscle} • {exercise.equipment}
            </Text>

            <Text style={styles.sectionTitle}>HOW TO PERFORM</Text>
            {exercise.instructions.map((instruction, index) => (
                <Text key={index} style={styles.listItem}>
                    {index + 1}. {instruction}
                </Text>
            ))}

            <Text style={styles.sectionTitle}>COACHING TIPS</Text>
            {exercise.coachingTips.map((tip, index) => (
                <Text key={index} style={styles.listItem}>
                    • {tip}
                </Text>
            ))}
        </ScrollView>
    );
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101014',
        padding: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '800',
        marginTop: 20,
    },
    subtitle: {
        color: '#AAAAAA',
        fontSize: 14,
        marginTop: 8,
        marginBottom: 28,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 1,
        marginTop: 24,
        marginBottom: 12,
    },
    listItem: {
        color: '#BBBBBB',
        fontSize: 15,
        lineHeight: 24,
        marginBottom: 10,
    },
    emptyText: {
        color: '#AAAAAA',
        textAlign: 'center',
        marginTop: 40,
    },
});