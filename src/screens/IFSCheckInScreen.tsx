import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { useIFSCheckIn } from '../hooks/useIFSCheckIn';

export default function IFSCheckInScreen() {
  const [reflection, setReflection] = useState('');
  const { submitCheckIn, streak, loading } = useIFSCheckIn('user123');

  const handleSubmit = async () => {
    await submitCheckIn({
      userId: 'user123',
      archetype: 'Warrior',
      partStage: 'Notice',
      reflection,
    });
    setReflection('');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>
        Self-Connection Streak: {streak} 🔥
      </Text>

      <TextInput
        placeholder="What part of you needs attention today?"
        value={reflection}
        onChangeText={setReflection}
        multiline
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          minHeight: 100,
        }}
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Submit Check-In" onPress={handleSubmit} />
      )}
    </View>
  );
}
