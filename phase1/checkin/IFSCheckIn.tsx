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
import EmotionPicker, { EmotionSelection } from './EmotionPicker';
import { interventions } from '../data/interventions';

/**
 * Parts available for selection during the daily Internal Family Systems
 * (IFS) check‑in.  These cover common protective and wounded parts
 * identified in trauma‑informed therapy.  We use the archetype’s
 * recommended ordering to surface the most relevant parts first.
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

interface MoodEntry {
  timestamp: string;
  emotion: string;
  intensity: number;
  valence: string;
  arousal: string;
  part?: Part;
}

export default function IFSCheckIn() {
  const router = useRouter();
  const [archetype, setArchetype] = useState<Archetype>('Warrior');
  const [orderedParts, setOrderedParts] = useState<Part[]>([]);
  const [selected, setSelected] = useState<Part | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [showEmotionPicker, setShowEmotionPicker] = useState(true);
  const [emotionSelection, setEmotionSelection] = useState<EmotionSelection | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Retrieve the user’s archetype to prioritise parts
        const savedArchetype = await AsyncStorage.getItem('archetype');
        if (savedArchetype && (savedArchetype as Archetype in archetypeProfiles)) {
          setArchetype(savedArchetype as Archetype);
        }
        // Compose ordered parts: archetype priority first, then the rest
        const priority = archetypeProfiles[(savedArchetype as Archetype) || 'Warrior'].ifsSequence;
        const remaining = ALL_PARTS.filter(p => !priority.includes(p));
        setOrderedParts([...priority.filter(p => ALL_PARTS.includes(p as Part)) as Part[], ...remaining]);
        // Load current streak
        const stored = await AsyncStorage.getItem('ifsStreak');
        setStreak(stored ? parseInt(stored, 10) : 0);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleEmotionSelected = (selection: EmotionSelection) => {
    setEmotionSelection(selection);
    setShowEmotionPicker(false);
  };

  const handleSubmit = async () => {
    if (!selected || !emotionSelection) return;

    try {
      // Create mood entry with timestamp
      const entry: MoodEntry = {
        timestamp: new Date().toISOString(),
        emotion: emotionSelection.emotion,
        intensity: emotionSelection.intensity,
        valence: emotionSelection.valence,
        arousal: emotionSelection.arousal,
        part: selected,
      };

      // Load existing mood history
      const storedHistory = await AsyncStorage.getItem('moodHistory');
      const history: MoodEntry[] = storedHistory ? JSON.parse(storedHistory) : [];

      // Add new entry at the beginning (newest-first)
      history.unshift(entry);

      // Cap at 100 entries
      const cappedHistory = history.slice(0, 100);

      // Persist mood history
      await AsyncStorage.setItem('moodHistory', JSON.stringify(cappedHistory));

      // Check if last entry was today for streak tracking
      const today = new Date().toDateString();
      let newStreak = streak;
      
      if (history.length > 1) {
        const lastEntry = history[1]; // Second entry (first is current)
        const lastEntryDate = new Date(lastEntry.timestamp).toDateString();
        if (lastEntryDate !== today) {
          newStreak = streak + 1;
        }
      } else {
        // First entry ever
        newStreak = 1;
      }

      setStreak(newStreak);
      await AsyncStorage.setItem('ifsStreak', newStreak.toString());

      // Award +1 ubuntu token
      const storedTokens = await AsyncStorage.getItem('ubuntuTokens');
      const tokens = storedTokens ? parseInt(storedTokens, 10) : 0;
      await AsyncStorage.setItem('ubuntuTokens', (tokens + 1).toString());

      // Surface mood-aware interventions
      const moodInterventions = interventions.moodMapping[emotionSelection.emotion] || [];
      
      // If first intervention is 'reset', navigate to resets
      if (moodInterventions.length > 0 && moodInterventions[0] === 'reset') {
        router.push('/resets' as any);
      } else {
        router.back();
      }

      // Reset state for next check-in
      setSelected(null);
      setEmotionSelection(null);
      setShowEmotionPicker(true);
    } catch (error) {
      console.error('Error saving check-in:', error);
      router.back();
    }
  };

  const renderItem = ({ item }: { item: Part }) => (
    <TouchableOpacity
      style={[styles.partItem, selected === item && styles.partItemSelected]}
      onPress={() => setSelected(item)}
    >
      <Text style={[styles.partText, selected === item && styles.partTextSelected]}>
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

  // Compute a simple self‑meter ratio.  We cap at 7 for display to
  // encourage a weekly practice but do not limit underlying streak.
  const meterRatio = Math.min(streak % 7, 7) / 7;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {showEmotionPicker ? (
          <EmotionPicker onSelect={handleEmotionSelected} />
        ) : (
          <>
            <Text style={styles.heading}>Daily IFS Check‑In</Text>
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
            <Text style={styles.streakText}>Self‑led days: {streak}</Text>
            <TouchableOpacity
              style={[styles.submitButton, !selected && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!selected}
            >
              <Text style={styles.submitButtonText}>Log Check‑In</Text>
            </TouchableOpacity>
          </>
        )}
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