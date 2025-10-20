import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { colors, radius } from '../theme/tokens';
import { archetypeProfiles, Archetype } from '../data/archetypes';

/**
 * Represents a single answer option in the quiz.  Each option
 * increments the score of its associated archetype by one point
 * when selected.
 */
interface Option {
  text: string;
  archetype: Archetype;
}

/**
 * A question consists of a prompt and a set of answer options.
 */
interface Question {
  prompt: string;
  options: Option[];
}

// Define the quiz content.  Each question is intentionally framed
// around behavioural responses or values rather than mental health
// status.  This keeps the quiz light (<90 sec) while still
// distinguishing archetypes.  You can reorder or adjust questions
// based on user testing feedback.
const questions: Question[] = [
  {
    prompt: 'When facing a challenge, what’s your instinct?',
    options: [
      { text: 'Charge ahead', archetype: 'Warrior' },
      { text: 'Seek knowledge', archetype: 'Sage' },
      { text: 'Reach out to loved ones', archetype: 'Lover' },
      { text: 'Explore new possibilities', archetype: 'Seeker' },
    ],
  },
  {
    prompt: 'Which environment feels most energising?',
    options: [
      { text: 'A battlefield or gym', archetype: 'Warrior' },
      { text: 'A library or workshop', archetype: 'Sage' },
      { text: 'Home with loved ones', archetype: 'Lover' },
      { text: 'Outdoors on an adventure', archetype: 'Seeker' },
    ],
  },
  {
    prompt: 'What’s your biggest motivation?',
    options: [
      { text: 'Overcoming obstacles', archetype: 'Warrior' },
      { text: 'Understanding truth', archetype: 'Sage' },
      { text: 'Building meaningful relationships', archetype: 'Lover' },
      { text: 'Discovering new horizons', archetype: 'Seeker' },
    ],
  },
  {
    prompt: 'Which statement resonates with you?',
    options: [
      { text: 'Strength comes from discipline', archetype: 'Warrior' },
      { text: 'Wisdom is a lifelong pursuit', archetype: 'Sage' },
      { text: 'Love is our greatest healer', archetype: 'Lover' },
      { text: 'Curiosity leads to growth', archetype: 'Seeker' },
    ],
  },
  {
    prompt: 'How do you handle stress?',
    options: [
      { text: 'Work harder', archetype: 'Warrior' },
      { text: 'Reflect and analyse', archetype: 'Sage' },
      { text: 'Reach out to friends or family', archetype: 'Lover' },
      { text: 'Get out and explore', archetype: 'Seeker' },
    ],
  },
];

export default function ArchetypeQuiz() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<Archetype, number>>({
    Warrior: 0,
    Sage: 0,
    Lover: 0,
    Seeker: 0,
  });
  const [selected, setSelected] = useState<number | null>(null);

  const currentQuestion = questions[currentIndex];

  const selectOption = (optionIndex: number) => {
    setSelected(optionIndex);
  };

  const handleNext = async () => {
    if (selected === null) return;
    const chosenOption = currentQuestion.options[selected];
    setScores(prev => ({
      ...prev,
      [chosenOption.archetype]: prev[chosenOption.archetype] + 1,
    }));
    setSelected(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Compute winner
      let winner: Archetype = 'Warrior';
      let max = -1;
      (Object.keys(scores) as Archetype[]).forEach((key) => {
        const total = scores[key] + (key === chosenOption.archetype ? 1 : 0);
        if (total > max) {
          max = total;
          winner = key;
        }
      });
      // Persist archetype in AsyncStorage
      await AsyncStorage.setItem('archetype', winner);
      // Navigate to result screen with archetype param
      router.push({ pathname: '/archetype-result', params: { archetype: winner } });
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
    setSelected(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.prompt}>{currentQuestion.prompt}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selected === index && styles.optionSelected,
            ]}
            onPress={() => selectOption(index)}
          >
            <Text
              style={[
                styles.optionText,
                selected === index && styles.optionTextSelected,
              ]}
            >
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={styles.navigation}>
          {currentIndex > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.nextButton, !selected && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={selected === null}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === questions.length - 1 ? 'Reveal' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.progress}>
          {currentIndex + 1} / {questions.length}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 24,
  },
  prompt: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 24,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.card,
    backgroundColor: colors.card,
    marginBottom: 12,
  },
  optionSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  optionText: {
    color: colors.text,
    fontSize: 16,
  },
  optionTextSelected: {
    color: colors.bg,
    fontWeight: '600',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  backButton: {
    flex: 1,
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 8,
  },
  backButtonText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
    backgroundColor: colors.accent2,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 8,
  },
  nextButtonDisabled: {
    backgroundColor: colors.card,
    opacity: 0.4,
  },
  nextButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  progress: {
    marginTop: 16,
    textAlign: 'center',
    color: colors.sub,
    fontSize: 14,
  },
});