import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius } from '../theme/tokens';

/**
 * EmotionPicker
 *
 * Lightweight, fast mood selector inspired by How We Feel:
 * - Presents a compact set of common emotions mapped to valence/arousal
 * - Quick intensity (1–5) selection
 * - Calls onSelect({ emotion, intensity, valence, arousal }) when chosen
 *
 * Keep this interaction under ~15–30s inside the onboarding/check‑in flow.
 */

export type Emotion =
  | 'Calm'
  | 'Content'
  | 'Happy'
  | 'Relieved'
  | 'Sad'
  | 'Lonely'
  | 'Angry'
  | 'Anxious'
  | 'Overwhelmed'
  | 'Curious';

export interface EmotionChoice {
  emotion: Emotion;
  valence: number; // -1..1
  arousal: number; // -1..1
  color?: string;
}

const EMOTIONS: EmotionChoice[] = [
  { emotion: 'Calm', valence: 0.6, arousal: -0.4, color: '#6CCECB' },
  { emotion: 'Content', valence: 0.7, arousal: -0.1, color: '#8FD16F' },
  { emotion: 'Happy', valence: 0.9, arousal: 0.3, color: '#FFD166' },
  { emotion: 'Relieved', valence: 0.5, arousal: -0.2, color: '#9AD3FF' },
  { emotion: 'Sad', valence: -0.6, arousal: -0.3, color: '#7DA0FF' },
  { emotion: 'Lonely', valence: -0.5, arousal: -0.2, color: '#C79CD8' },
  { emotion: 'Angry', valence: -0.9, arousal: 0.7, color: '#FF6B6B' },
  { emotion: 'Anxious', valence: -0.7, arousal: 0.6, color: '#FF9F6B' },
  { emotion: 'Overwhelmed', valence: -0.8, arousal: 0.4, color: '#FFB86B' },
  { emotion: 'Curious', valence: 0.4, arousal: 0.5, color: '#7BE0A6' },
];

export default function EmotionPicker({
  onSelect,
  initial,
}: {
  onSelect: (choice: { emotion: Emotion; intensity: number; valence: number; arousal: number }) => void;
  initial?: Emotion | null;
}) {
  const [selected, setSelected] = useState<Emotion | null>(initial || null);
  const [intensity, setIntensity] = useState<number>(3);

  const handleChoose = (e: EmotionChoice) => {
    setSelected(e.emotion);
  };

  const handleConfirm = () => {
    if (!selected) return;
    const choice = EMOTIONS.find((c) => c.emotion === selected)!;
    onSelect({ emotion: choice.emotion, intensity, valence: choice.valence, arousal: choice.arousal });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>How are you feeling right now?</Text>

      <View style={styles.grid}>
        {EMOTIONS.map((e) => {
          const active = selected === e.emotion;
          return (
            <TouchableOpacity
              key={e.emotion}
              style={[
                styles.emotionButton,
                { borderColor: active ? e.color : 'transparent' },
                active && { backgroundColor: (e.color || '#000') + '22' },
              ]}
              onPress={() => handleChoose(e)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.emotionText, active && { color: e.color }]}>{e.emotion}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.intensityRow}>
        <Text style={styles.intensityLabel}>Intensity</Text>
        <View style={styles.pills}>
          {[1, 2, 3, 4, 5].map((n) => (
            <TouchableOpacity
              key={n}
              onPress={() => setIntensity(n)}
              style={[styles.pill, intensity === n && styles.pillActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: intensity === n }}
            >
              <Text style={[styles.pillText, intensity === n && styles.pillTextActive]}>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.confirmButton, !selected && styles.confirmDisabled]}
          onPress={handleConfirm}
          disabled={!selected}
        >
          <Text style={styles.confirmText}>Log mood</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12, paddingTop: 8 },
  label: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  emotionButton: {
    width: '48%',
    paddingVertical: 12,
    marginBottom: 8,
    borderRadius: radius.md,
    borderWidth: 1,
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  emotionText: { color: colors.text, fontWeight: '600' },
  intensityRow: { marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  intensityLabel: { color: colors.muted },
  pills: { flexDirection: 'row' },
  pill: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.card,
  },
  pillActive: { backgroundColor: colors.accent2, borderColor: colors.accent2 },
  pillText: { color: colors.text, fontWeight: '600' },
  pillTextActive: { color: colors.bg },
  actions: { marginTop: 12 },
  confirmButton: { backgroundColor: colors.accent, padding: 12, borderRadius: radius.md, alignItems: 'center' },
  confirmDisabled: { opacity: 0.5 },
  confirmText: { color: colors.bg, fontWeight: '700' },
});
