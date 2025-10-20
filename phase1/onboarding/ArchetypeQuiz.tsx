import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { colors, radius } from '../theme/tokens';
import type { Archetype } from '../data/archetypes';

/**
 * ArchetypeQuiz
 *
 * 5 short, evocative questions (~60–90s). Each option maps directly to
 * an archetype. The copy intentionally points back to the core job:
 * "help me when I’m about to fall."
 */

type ArchetypeKey = Archetype;

const QUESTIONS: {
  id: string;
  question: string;
  options: { label: string; archetype: ArchetypeKey }[];
}[] = [
  {
    id: 'q1',
    question: 'When the pressure mounts, you most want to:',
    options: [
      { label: 'Stand firm and do what must be done', archetype: 'Warrior' },
      { label: 'Pause, reflect, and choose wisely', archetype: 'Sage' },
      { label: 'Reach for someone who sees you', archetype: 'Lover' },
      { label: 'Step outside to find a clearer horizon', archetype: 'Seeker' },
    ],
  },
  {
    id: 'q2',
    question: 'Your friends rely on you for:',
    options: [
      { label: 'Courage when things get hard', archetype: 'Warrior' },
      { label: 'Calm insight in chaos', archetype: 'Sage' },
      { label: 'Warmth and steady presence', archetype: 'Lover' },
      { label: 'Fresh perspective and new energy', archetype: 'Seeker' },
    ],
  },
  {
    id: 'q3',
    question: 'When you feel the pull to relapse, you most need:',
    options: [
      { label: 'A clear plan to protect what matters', archetype: 'Warrior' },
      { label: 'A reminder of what you already know', archetype: 'Sage' },
      { label: 'A quick connection to someone who believes in you', archetype: 'Lover' },
      { label: 'A small adventure to change the story', archetype: 'Seeker' },
    ],
  },
  {
    id: 'q4',
    question: 'What keeps you moving forward today?',
    options: [
      { label: 'Duty to people and purpose', archetype: 'Warrior' },
      { label: 'A desire to learn and grow', archetype: 'Sage' },
      { label: 'Love, belonging and repair', archetype: 'Lover' },
      { label: 'Curiosity and freedom', archetype: 'Seeker' },
    ],
  },
  {
    id: 'q5',
    question: 'If you needed a single phrase in a hard moment, which helps most?',
    options: [
      { label: '“Stand—this is worth protecting.”', archetype: 'Warrior' },
      { label: '“You’ve seen this before — breathe.”', archetype: 'Sage' },
      { label: '“You are held. You are loved.”', archetype: 'Lover' },
      { label: '“There’s more ahead—keep exploring.”', archetype: 'Seeker' },
    ],
  },
];

export default function ArchetypeQuiz() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, ArchetypeKey | null>>(
    QUESTIONS.reduce((acc, q) => ({ ...acc, [q.id]: null }), {})
  );
  const [submitting, setSubmitting] = useState(false);

  const setAnswer = (qid: string, archetype: ArchetypeKey) => {
    setAnswers((prev) => ({ ...prev, [qid]: archetype }));
  };

  const allAnswered = Object.values(answers).every((a) => a !== null);

  const handleSubmit = async () => {
    if (!allAnswered || submitting) return;
    setSubmitting(true);

    // Count votes per archetype
    const counts: Record<ArchetypeKey, number> = {
      Warrior: 0,
      Sage: 0,
      Lover: 0,
      Seeker: 0,
    } as Record<ArchetypeKey, number>;

    Object.values(answers).forEach((a) => {
      if (a) counts[a] = (counts[a] || 0) + 1;
    });

    // Pick archetype with highest count; deterministic tie-breaker by fixed priority
    const priority: ArchetypeKey[] = ['Warrior', 'Sage', 'Lover', 'Seeker'];
    let best: ArchetypeKey = priority[0];
    let bestScore = -1;
    priority.forEach((k) => {
      const s = counts[k] || 0;
      if (s > bestScore) {
        best = k;
        bestScore = s;
      }
    });

    try {
      // Persist archetype + onboarding flag for routing
      await AsyncStorage.setItem('archetype', best);
      await AsyncStorage.setItem('onboardingSeen', 'true');
      await AsyncStorage.setItem('archetype_quiz_answers', JSON.stringify(answers));
      // Navigate to the sacred result page
      router.push('/onboarding/result');
    } catch (err) {
      console.warn('Failed to save archetype', err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderOption = (qid: string, option: { label: string; archetype: ArchetypeKey }) => {
    const selected = answers[qid] === option.archetype;
    return (
      <TouchableOpacity
        key={option.label}
        style={[styles.option, selected && styles.optionSelected]}
        onPress={() => setAnswer(qid, option.archetype)}
        accessibilityRole="button"
        accessibilityState={{ selected }}
      >
        <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{option.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find your archetype</Text>
        <Text style={styles.subtitle}>5 short questions — about 60–90 seconds. This helps us support you when you’re about to fall.</Text>
      </View>

      <FlatList
        data={QUESTIONS}
        keyExtractor={(q) => q.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.question}>{item.question}</Text>
            <View style={{ marginTop: 12 }}>{item.options.map((o) => renderOption(item.id, o))}</View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, (!allAnswered || submitting) && styles.submitDisabled]}
          onPress={handleSubmit}
          disabled={!allAnswered || submitting}
        >
          <Text style={styles.submitText}>{submitting ? 'Saving…' : 'Reveal my archetype'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    marginTop: 6,
    color: colors.muted,
  },
  card: {
    marginTop: 12,
    padding: 14,
    backgroundColor: colors.card,
    borderRadius: radius.md,
  },
  question: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  option: {
    marginTop: 8,
    padding: 10,
    borderRadius: radius.sm,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.cardBorder || '#2b2b2b20',
  },
  optionSelected: {
    backgroundColor: colors.accent2 + '22',
    borderColor: colors.accent2,
  },
  optionText: {
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.accent2,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 12,
  },
  submitButton: {
    backgroundColor: colors.accent,
    padding: 14,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  submitDisabled: {
    opacity: 0.5,
  },
  submitText: {
    color: colors.bg,
    fontWeight: '700',
  },
});
