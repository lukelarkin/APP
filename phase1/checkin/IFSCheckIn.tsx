import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { colors, radius } from '../theme/tokens';
import { archetypeProfiles, Archetype } from '../data/archetypes';
import { useIFS, InterventionSuggestion } from '../context/IFSContext';
import EmotionPicker from './EmotionPicker';
import { Emotion, Quadrant, Intensity } from './moodTypes';

/**
 * Parts available for selection during the daily Internal Family Systems (IFS) check-in.
 * Each archetype defines its own recommended ordering to surface the most relevant parts first.
 */
const ALL_PARTS = [
  'Inner Critic',
  'Rebel',
  'Wounded Child',
  'Pleaser',
  'Analyzer',
  'Controller',
  'Explorer',
  'Protector',
] as const;
type Part = typeof ALL_PARTS[number];

export default function IFSCheckIn() {
  const router = useRouter();
  const { selfLedStreak, recordMood, recordPartWork } = useIFS();

  const [archetype, setArchetype] = useState<Archetype>('Warrior');
  const [orderedParts, setOrderedParts] = useState<Part[]>([]);
  const [selected, setSelected] = useState<Part | null>(null);
  const [loading, setLoading] = useState(true);

  // Flow state
  const [step, setStep] = useState<'mood' | 'part'>('mood');
  const [moodData, setMoodData] = useState<{
    emotion: Emotion;
    quadrant: Quadrant;
    intensity: Intensity;
  } | null>(null);
  const [interventionSuggestions, setInterventionSuggestions] = useState<
    InterventionSuggestion[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const savedArchetype = await AsyncStorage.getItem('archetype');
        if (savedArchetype && (savedArchetype as Archetype in archetypeProfiles)) {
          setArchetype(savedArchetype as Archetype);
        }

        const priority =
          archetypeProfiles[(savedArchetype as Archetype) || 'Warrior'].ifsSequence;
        const remaining = ALL_PARTS.filter((p) => !priority.includes(p));
        setOrderedParts([
          ...(priority.filter((p) => ALL_PARTS.includes(p as Part)) as Part[]),
          ...remaining,
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleMoodSelect = async (
    emotion: Emotion,
    quadrant: Quadrant,
    intensity: Intensity
  ) => {
    setMoodData({ emotion, quadrant, intensity });

    // Record mood in context and fetch AI-guided intervention suggestions
    const suggestions = await recordMood({
      emotion,
      quadrant,
      intensity,
      timestamp: new Date().toISOString(),
    });

    setInterventionSuggestions(suggestions);
    setStep('part');
  };

  const handleSubmit = async () => {
    if (!selected) return;

    await recordPartWork();

    setSelected(null);

    // Route user based on intervention type
    if (interventionSuggestions.length > 0) {
      const top = interventionSuggestions[0];
      switch (top.type) {
        case 'physiologicReset':
          router.push('/resets');
          break;
        case 'lovedOneLetter':
        case 'wildernessJournal':
        case 'gratitudeRitual':
          router.back();
          break;
        default:
          router.back();
      }
    } else {
      router.back();
    }
  };

  const renderItem = ({ item }: { item: Part }) => (
    <TouchableOpacity
      style={[styles.partItem, selected === item && styles.partItemSelected]}
      onPress={() => setSelected(item)}
    >
      <Text
        style={[styles.partText, selected === item && styles.partTextSelected]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: colors.text }}>Loading…</Text>
      </SafeAreaView>
    );
  }

  // Compute simple weekly self-meter
  const meterRatio = Math.min(selfLedStreak % 7, 7) / 7;

  // Step 1: Mood Selection
  if (step === 'mood') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <EmotionPicker onSelect={handleMoodSelect} />
        </View>
      </SafeAreaView>
    );
  }

  // Step 2: Part Selection
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Daily IFS Check-In</Text>
        <Text style={styles.subHeading}>
          Which part of you feels most active right now?
        </Text>

        <FlatList
          data={orderedParts}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          extraData={selected}
          style={{ marginVertical: 16 }}
        />

        <View style={styles.meterContainer}>
          <View style={[styles.meterFill, { flex: meterRatio }]} />
          <View style={[styles.meterEmpty, { flex: 1 - meterRatio }]} />
        </View>

        <Text style={styles.streakText}>Self-led days: {selfLedStreak}</Text>

        <TouchableOpacity
          style={[styles.submitButton, !selected && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!selected}
        >
          <Text style={styles.submitButtonText}>Log Check-In</Text>
        </TouchableOpacity>
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
    maxHeight: '90%',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  partItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.card,
    backgroundColor: colors.card,
    marginBottom: 8,
  },
  partItemSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  partText: {
    fontSize: 16,
    color: colors.text,
  },
  partTextSelected: {
    color: colors.bg,
    fontWeight: '600',
  },
  meterContainer: {
    flexDirection: 'row',
    height: 10,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: 8,
  },
  meterFill: {
    backgroundColor: colors.accent2,
  },
  meterEmpty: {
    backgroundColor: colors.card,
  },
  streakText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.sub,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: colors.accent2,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: colors.card,
    opacity: 0.5,
  },
  submitButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

