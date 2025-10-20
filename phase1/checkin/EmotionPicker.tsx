import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors, radius } from '../theme/tokens';
import {
  Emotion,
  Quadrant,
  Intensity,
  computeQuadrant,
  EMOTION_QUADRANT_MAP,
} from './moodTypes';

/**
 * Grouped emotions by quadrant for easier selection.
 * Each quadrant has a label, color, and list of emotions.
 */
const EMOTION_GROUPS = [
  {
    quadrant: Quadrant.HIGH_PLEASANT,
    label: 'Energized & Positive',
    color: colors.accent2, // green
    emotions: [
      'excited',
      'energized',
      'joyful',
      'happy',
      'enthusiastic',
      'inspired',
    ] as Emotion[],
  },
  {
    quadrant: Quadrant.HIGH_UNPLEASANT,
    label: 'Activated & Tense',
    color: colors.accent4, // red
    emotions: [
      'anxious',
      'angry',
      'stressed',
      'frustrated',
      'irritated',
      'overwhelmed',
    ] as Emotion[],
  },
  {
    quadrant: Quadrant.LOW_UNPLEASANT,
    label: 'Low & Heavy',
    color: colors.accent3, // blue
    emotions: [
      'sad',
      'depressed',
      'lonely',
      'hopeless',
      'tired',
      'disconnected',
    ] as Emotion[],
  },
  {
    quadrant: Quadrant.LOW_PLEASANT,
    label: 'Calm & At Peace',
    color: colors.accent, // yellow
    emotions: [
      'calm',
      'peaceful',
      'content',
      'relaxed',
      'serene',
      'grounded',
    ] as Emotion[],
  },
];

interface EmotionPickerProps {
  /**
   * Callback invoked when the user selects an emotion and intensity.
   * Returns the emotion, its quadrant, and intensity.
   */
  onSelect: (emotion: Emotion, quadrant: Quadrant, intensity: Intensity) => void;
  
  /**
   * Optional currently selected emotion
   */
  selectedEmotion?: Emotion;
  
  /**
   * Optional currently selected intensity
   */
  selectedIntensity?: Intensity;
}

/**
 * EmotionPicker allows users to select how they're feeling from a
 * quadrant-based emotion wheel and rate the intensity.
 */
export default function EmotionPicker({
  onSelect,
  selectedEmotion,
  selectedIntensity,
}: EmotionPickerProps) {
  const [emotion, setEmotion] = useState<Emotion | null>(selectedEmotion || null);
  const [intensity, setIntensity] = useState<Intensity | null>(selectedIntensity || null);

  const handleEmotionPress = (newEmotion: Emotion) => {
    setEmotion(newEmotion);
    // If intensity is already selected, call onSelect immediately
    if (intensity !== null) {
      const quadrant = computeQuadrant(newEmotion);
      onSelect(newEmotion, quadrant, intensity);
    }
  };

  const handleIntensityPress = (newIntensity: Intensity) => {
    setIntensity(newIntensity);
    // If emotion is already selected, call onSelect immediately
    if (emotion !== null) {
      const quadrant = computeQuadrant(emotion);
      onSelect(emotion, quadrant, newIntensity);
    }
  };

  // Capitalize first letter of emotion for display
  const formatEmotion = (e: string) => e.charAt(0).toUpperCase() + e.slice(1);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>How are you feeling?</Text>
      <Text style={styles.subHeading}>Choose the emotion that best describes your state</Text>

      {EMOTION_GROUPS.map((group) => (
        <View key={group.quadrant} style={styles.quadrantGroup}>
          <View style={[styles.quadrantHeader, { backgroundColor: group.color + '20' }]}>
            <Text style={[styles.quadrantLabel, { color: group.color }]}>
              {group.label}
            </Text>
          </View>
          <View style={styles.emotionsGrid}>
            {group.emotions.map((e) => (
              <TouchableOpacity
                key={e}
                style={[
                  styles.emotionButton,
                  emotion === e && { backgroundColor: group.color, borderColor: group.color },
                ]}
                onPress={() => handleEmotionPress(e)}
              >
                <Text
                  style={[
                    styles.emotionText,
                    emotion === e && styles.emotionTextSelected,
                  ]}
                >
                  {formatEmotion(e)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {emotion && (
        <View style={styles.intensitySection}>
          <Text style={styles.intensityHeading}>
            How intense is this feeling?
          </Text>
          <View style={styles.intensityButtons}>
            {([1, 2, 3, 4, 5] as Intensity[]).map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.intensityButton,
                  intensity === level && styles.intensityButtonSelected,
                ]}
                onPress={() => handleIntensityPress(level)}
              >
                <Text
                  style={[
                    styles.intensityText,
                    intensity === level && styles.intensityTextSelected,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.intensityLabels}>
            <Text style={styles.intensityLabelText}>Mild</Text>
            <Text style={styles.intensityLabelText}>Strong</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 14,
    color: colors.sub,
    marginBottom: 24,
    textAlign: 'center',
  },
  quadrantGroup: {
    marginBottom: 20,
  },
  quadrantHeader: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    marginBottom: 12,
  },
  quadrantLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emotionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.card,
    backgroundColor: colors.card,
    marginRight: 8,
    marginBottom: 8,
  },
  emotionText: {
    fontSize: 14,
    color: colors.text,
  },
  emotionTextSelected: {
    color: colors.bg,
    fontWeight: '600',
  },
  intensitySection: {
    marginTop: 24,
    marginBottom: 16,
  },
  intensityHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  intensityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  intensityButton: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.card,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  intensityButtonSelected: {
    backgroundColor: colors.accent2,
    borderColor: colors.accent2,
  },
  intensityText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.sub,
  },
  intensityTextSelected: {
    color: colors.bg,
  },
  intensityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  intensityLabelText: {
    fontSize: 12,
    color: colors.sub,
  },
});
