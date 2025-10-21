import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Archetype, QuizResult } from '../types';
import { theme } from '../utils/theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { quizQuestions } from '../data/quizData';

type QuizScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Quiz'>;

interface Props {
  navigation: QuizScreenNavigationProp;
}

export const QuizScreen: React.FC<Props> = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<Archetype, number>>({
    Warrior: 0,
    Sage: 0,
    Lover: 0,
    Seeker: 0,
  });

  const handleAnswer = (archetype: Archetype, score: number) => {
    const newScores = {
      ...scores,
      [archetype]: scores[archetype] + score,
    };
    setScores(newScores);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz complete - calculate result
      const primaryArchetype = (Object.keys(newScores) as Archetype[]).reduce((a, b) =>
        newScores[a] > newScores[b] ? a : b
      );

      const result: QuizResult = {
        primaryArchetype,
        scores: newScores,
      };

      navigation.replace('QuizResult', { result });
    }
  };

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Discover Your Archetype</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1} of {quizQuestions.length}
          </Text>
        </View>

        <Card style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
        </Card>

        {question.options.map((option, index) => (
          <Card
            key={index}
            onPress={() => handleAnswer(option.archetype, option.score)}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </Card>
        ))}
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
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.surface,
    borderRadius: 2,
    marginBottom: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  progressText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  questionCard: {
    marginBottom: theme.spacing.lg,
  },
  questionText: {
    ...theme.typography.h3,
    color: theme.colors.text,
    textAlign: 'center',
  },
  optionText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
});
