import { StyleSheet, Text, View } from 'react-native';

import {
    recommendWorkoutProgression,
    type SetPerformance,
} from '../utils/progressive-overload';

type ProgressionRecommendationProps = {
    sets: SetPerformance[];
    minReps: number;
    maxReps: number;
    targetRir: number;
};

export default function ProgressionRecommendation({
    sets,
    minReps,
    maxReps,
    targetRir,
}: ProgressionRecommendationProps) {
    if (sets.length === 0) {
        return null;
    }

    const recommendation = recommendWorkoutProgresssion(
        sets,
        minReps,
        maxReps,
        targetRir
);

const message = {
    increase_weight: 'Consider increasing weight next workout.',
    increase_reps: 'Aim to increase repetitions next workout.',
    maintain: 'Maintain your current weight and focus on your targets.',
};

return (
    <View style={styles.container}>
        <Text style={styles.label}>PROGRESSION SUGGESTION</Text>
        <Text style={styles.message}>
            {messages[recommendation]}
        </Text>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#26352B',
        padding: 14,
        borderRadius: 10,
        marginTop: 12,
    },
    label: {
        color: '#86EFAC',
        fontSize: 11,
        fontWeight: '700',
        marginBottom: 6,
    },
    message: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
});