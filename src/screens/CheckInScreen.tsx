import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { theme } from '../utils/theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ifsParts } from '../data/ifsParts';
import { addCheckIn, getUserData } from '../utils/storage';

type CheckInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CheckIn'>;

interface Props {
  navigation: CheckInScreenNavigationProp;
}

export const CheckInScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);

  useEffect(() => {
    checkIfAlreadyCheckedIn();
  }, []);

  const checkIfAlreadyCheckedIn = async () => {
    const userData = await getUserData();
    const today = new Date().toISOString().split('T')[0];
    const checkedInToday = userData.checkIns.some(
      (ci) => ci.date.split('T')[0] === today
    );
    setAlreadyCheckedIn(checkedInToday);
  };

  const handlePartSelect = (partId: string) => {
    setSelectedPart(partId);
  };

  const handleCheckIn = async () => {
    if (!selectedPart) {
      Alert.alert('Select a Part', 'Please select which part is active right now.');
      return;
    }

    const isSelf = selectedPart === 'self';
    
    await addCheckIn({
      date: new Date().toISOString(),
      activePart: selectedPart,
      selfState: isSelf,
      tokens: isSelf ? 2 : 1,
    });

    Alert.alert(
      'Check-In Complete! ✨',
      isSelf
        ? 'You earned 2 tokens for being in Self state! Keep up your streak! 🔥'
        : 'You earned 1 token for checking in! Notice this part with curiosity.',
      [
        {
          text: 'Done',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  if (alreadyCheckedIn) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.centerContent}>
            <Text style={styles.emoji}>✅</Text>
            <Text style={styles.title}>Already Checked In Today</Text>
            <Text style={styles.description}>
              Come back tomorrow to continue your journey and maintain your streak!
            </Text>
            <Button
              title="Back to Home"
              onPress={() => navigation.goBack()}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily IFS Check-In</Text>
          <Text style={styles.description}>
            Which part is most active in you right now?
          </Text>
        </View>

        {ifsParts.map((part) => {
          const isSelected = selectedPart === part.id;
          const cardStyle = isSelected
            ? [styles.partCard, styles.selectedCard]
            : styles.partCard;
          
          return (
            <Card
              key={part.id}
              onPress={() => handlePartSelect(part.id)}
              style={cardStyle}
            >
              <View style={styles.partContent}>
                <Text style={styles.partEmoji}>{part.emoji}</Text>
                <View style={styles.partInfo}>
                  <Text style={styles.partName}>{part.name}</Text>
                  <Text style={styles.partDescription}>{part.description}</Text>
                </View>
                {isSelected && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </Card>
          );
        })}

        <Button
          title="Complete Check-In"
          onPress={handleCheckIn}
          disabled={!selectedPart}
          style={styles.button}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing.xxl,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  emoji: {
    fontSize: 80,
    marginBottom: theme.spacing.lg,
  },
  partCard: {
    marginBottom: theme.spacing.md,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  partContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partEmoji: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  partInfo: {
    flex: 1,
  },
  partName: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  partDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  checkmark: {
    fontSize: 24,
    color: theme.colors.primary,
  },
  button: {
    marginTop: theme.spacing.lg,
  },
});
