import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { theme } from '../utils/theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

type QuickResetDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'QuickResetDetail'
>;
type QuickResetDetailScreenRouteProp = RouteProp<RootStackParamList, 'QuickResetDetail'>;

interface Props {
  navigation: QuickResetDetailScreenNavigationProp;
  route: QuickResetDetailScreenRouteProp;
}

export const QuickResetDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { reset } = route.params;
  const [isStarted, setIsStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(reset.duration);

  useEffect(() => {
    if (!isStarted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsStarted(false);
          return reset.duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, timeRemaining, reset.duration]);

  const handleStart = () => {
    setIsStarted(true);
    setTimeRemaining(reset.duration);
  };

  const handleStop = () => {
    setIsStarted(false);
    setTimeRemaining(reset.duration);
  };

  const handleComplete = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.emoji}>{reset.emoji}</Text>
          <Text style={styles.title}>{reset.name}</Text>
          <Text style={styles.description}>{reset.description}</Text>
        </View>

        {isStarted && (
          <Card style={styles.timerCard}>
            <Text style={styles.timer}>{timeRemaining}s</Text>
            <Text style={styles.timerLabel}>Time Remaining</Text>
          </Card>
        )}

        <Card>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {reset.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionRow}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </Card>

        <View style={styles.buttonContainer}>
          {!isStarted ? (
            <Button title="Start Practice" onPress={handleStart} />
          ) : (
            <Button title="Stop" onPress={handleStop} variant="secondary" />
          )}
          <Button
            title="Complete"
            onPress={handleComplete}
            variant="outline"
            style={styles.completeButton}
          />
        </View>
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
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  emoji: {
    fontSize: 60,
    marginBottom: theme.spacing.md,
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
  timerCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  timer: {
    ...theme.typography.h1,
    fontSize: 48,
    color: theme.colors.text,
  },
  timerLabel: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  instructionRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  stepNumber: {
    ...theme.typography.body,
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
    fontWeight: '600',
  },
  instructionText: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
  buttonContainer: {
    marginTop: theme.spacing.lg,
  },
  completeButton: {
    marginTop: theme.spacing.md,
  },
});
