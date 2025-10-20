import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { colors, radius } from '../theme/tokens';
import { archetypeProfiles, Archetype } from '../data/archetypes';
import EmotionPicker, { Emotion } from './EmotionPicker';
import { interventions } from '../data/interventions';

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

type MoodEntry = {
  emotion: Emotion;
  intensity: number;
  valence: number;
  arousal: number;
  part?: Part | null;
  archetype?: Archetype | null;
  createdAt: string; // ISO
};

export default function IFSCheckIn() {
  const router = useRouter();
  const [archetype, setArchetype] = useState<Archetype>('Warrior');
  const [orderedParts, setOrderedParts] = useState<Part[]>([]);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Emotion state for this check-in
  const [emotionSelection, setEmotionSelection] = useState<{ emotion: Emotion; intensity: number; valence: number; arousal: number } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const savedArchetype = await AsyncStorage.getItem('archetype');
        if (savedArchetype && (savedArchetype as Archetype in archetypeProfiles)) {
          setArchetype(savedArchetype as Archetype);
        }
        const priority = archetypeProfiles[(savedArchetype as Archetype) || 'Warrior'].ifsSequence;
        const remaining = ALL_PARTS.filter(p => !priority.includes(p));
        setOrderedParts([...priority.filter(p => ALL_PARTS.includes(p as Part)) as Part[], ...remaining]);
        const stored = await AsyncStorage.getItem('ifsStreak');
        setStreak(stored ? parseInt(stored, 10) : 0);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleEmotionSelect = (choice: { emotion: Emotion; intensity: number; valence: number; arousal: number }) => {
    setEmotionSelection(choice);
  };

  const handleSubmit = async () => {
    if (!emotionSelection) return;

    const entry: MoodEntry = {
      emotion: emotionSelection.emotion,
      intensity: emotionSelection.intensity,
      valence: emotionSelection.valence,
      arousal: emotionSelection.arousal,
      part: selectedPart || null,
      archetype: archetype || null,
      createdAt: new Date().toISOString(),
    };

    // Persist mood history
    const raw = (await AsyncStorage.getItem('moodHistory')) || '[]';
    const history: MoodEntry[] = JSON.parse(raw);
    history.unshift(entry); // newest first
    await AsyncStorage.setItem('moodHistory', JSON.stringify(history.slice(0, 100))); // cap at 100

    // Update emotional streak (simple daily increment if last entry not today)
    try {
      const lastRaw = history[1]; // history[0] is current entry
      const lastDate = lastRaw ? new Date(lastRaw.createdAt).toDateString() : null;
      const today = new Date().toDateString();
      if (lastDate !== today) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        await AsyncStorage.setItem('ifsStreak', newStreak.toString());
      }
    } catch (e) {
      // ignore
    }

    // Award a small token for checking in
    const tokensRaw = await AsyncStorage.getItem('ubuntuTokens');
    const tokens = tokensRaw ? parseInt(tokensRaw, 10) : 0;
    await AsyncStorage.setItem('ubuntuTokens', String(tokens + 1));

    // Optionally surface a mood-aware intervention
    const moodKey = entry.emotion;
    const suggested = (interventions as any).moodMapping?.[moodKey] || [];
    if (suggested.length > 0) {
      // For now we simply navigate to the resets screen if a reset is recommended first
      if (suggested.includes('physiologicSigh') || suggested.includes('nostril') || suggested.includes('eft')) {
        router.push('/resets');
      }
    }

    // Reset selection for next time and navigate back
    setEmotionSelection(null);
    setSelectedPart(null);
    router.back();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: colors.text }}>Loading…</Text>
      </SafeAreaView>
    );
  }

  // Meter ratio for self-led visualization still uses streak
  const meterRatio = Math.min(streak % 7, 7) / 7;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.card}>
          <Text style={styles.heading}>Emotional Check‑In</Text>
          <Text style={styles.subHeading}>
            Name what you feel — a quick scan helps us support you before a slip.
          </Text>

          <EmotionPicker onSelect={handleEmotionSelect} initial={null} />

          {emotionSelection && (
            <>
              <Text style={styles.selectedText}>You picked: {emotionSelection.emotion} (intensity {emotionSelection.intensity})</Text>

              <Text style={[styles.subHeading, { marginTop: 12 }]}>Which part feels most active?</Text>
              <FlatList
                data={orderedParts}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.partItem, selectedPart === item && styles.partItemSelected]}
                    onPress={() => setSelectedPart(item)}
                  >
                    <Text style={[styles.partText, selectedPart === item && styles.partTextSelected]}>{item}</Text>
                  </TouchableOpacity>
                )}
                extraData={selectedPart}
                style={{ marginVertical: 12 }}
              />

              <View style={styles.meterContainer}>
                <View style={[styles.meterFill, { flex: meterRatio }]} />
                <View style={[styles.meterEmpty, { flex: 1 - meterRatio }]} />
              </View>
              <Text style={styles.streakText}>Self‑led days: {streak}</Text>

              <TouchableOpacity
                style={[styles.submitButton, !emotionSelection && styles.submitButtonDisabled]}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Log Check‑In</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, padding: 16 },
  heading: { fontSize: 20, fontWeight: '700', color: colors.text },
  subHeading: { color: colors.muted, marginTop: 6 },
  selectedText: { marginTop: 8, color: colors.text },
  partItem: { padding: 10, borderRadius: radius.sm, backgroundColor: colors.card, marginTop: 8 },
  partItemSelected: { backgroundColor: colors.accent2 + '22' },
  partText: { color: colors.text },
  partTextSelected: { color: colors.accent2, fontWeight: '700' },
  meterContainer: { flexDirection: 'row', height: 8, borderRadius: 12, overflow: 'hidden', marginTop: 12 },
  meterFill: { backgroundColor: colors.accent },
  meterEmpty: { backgroundColor: colors.cardAlt || '#2b2b2b20' },
  streakText: { marginTop: 8, color: colors.muted },
  submitButton: { marginTop: 12, backgroundColor: colors.accent, padding: 12, borderRadius: radius.md, alignItems: 'center' },
  submitButtonDisabled: { opacity: 0.5 },
  submitButtonText: { color: colors.bg, fontWeight: '700' },
});
