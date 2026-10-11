import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native'

type WeightInputProps = {
    value: number;
    onChange: (value: number) => void;
};

export default function WeightInput({
    value,
    onChange,
}: WeightInputProps) {
    const [text, setText] = useState(value.toString());

    const handleChange = (input: string) => {
        //Allow digits and one decimal point
        if (!/^\d*\.?\d*$/.test(input)) {
            return;
        }

        setText(input);

        if (input !== '' && input !== '.') {
            onChange(Number(input));
        }
    };

    return (
        <TextInput
            style={styles.input}
            value={text}
            onChangeText={handleChange}
            keyboardType="decimal-pad"
            selectTextOnFocus
        />
    );
}

const styles = StyleSheet.create({
    input: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        width: '25%',
        textAlign: 'center',
        padding: 0,
    },
});