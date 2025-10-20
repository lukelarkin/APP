import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius } from '../theme/tokens';

/**
 * EmotionPicker
 * 
 * A How-We-Feel inspired emotion selector that presents 10 common
 * emotions in a grid layout with intensity pills (1-5).  Returns
 * emotion, intensity, valence (positive/negative), and arousal
 * (high/low energy) to the caller for mood tracking and mood-aware
 * intervention selection.
 */

// Emotion definitions with valence and arousal metadata
export interface EmotionData {
  label: string;
  valence: 'positive' | 'negative' | 'neutral';
  arousal: 'high' | 'low';
}

export interface EmotionSelection {
  emotion: string;
  intensity: number;
  valence: 'positive' | 'negative' | 'neutral';
  arousal: 'high' | 'low';
}

const EMOTIONS: EmotionData[] = [
  { label: 'Happy', valence: 'positive', arousal: 'high' },
  { label: 'Calm', valence: 'positive', arousal: 'low' },
  { label: 'Excited', valence: 'positive', arousal: 'high' },
  { label: 'Content', valence: 'positive', arousal: 'low' },
  { label: 'Anxious', valence: 'negative', arousal: 'high' },
  { label: 'Sad', valence: 'negative', arousal: 'low' },
  { label: 'Angry', valence: 'negative', arousal: 'high' },
  { label: 'Tired', valence: 'negative', arousal: 'low' },
  { label: 'Stressed', valence: 'negative', arousal: 'high' },
  { label: 'Neutral', valence: 'neutral', arousal: 'low' },
];

interface EmotionPickerProps {
  onSelect: (selection: EmotionSelection) => void;
}

export default function EmotionPicker({ onSelect }: EmotionPickerProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionData | null>(null);
  const [intensity, setIntensity] = useState<number>(3);

  const handleEmotionPress = (emotion: EmotionData) => {
    setSelectedEmotion(emotion);
  };

  const handleIntensityPress = (level: number) => {
    setIntensity(level);
  };

  const handleConfirm = () => {
    if (selectedEmotion) {
      onSelect({
        emotion: selectedEmotion.label,
        intensity,
        valence: selectedEmotion.valence,
        arousal: selectedEmotion.arousal,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you feeling?</Text>
      <Text style={styles.subHeading}>Choose the emotion that fits best</Text>

      {/* Emotion Grid */}
      <View style={styles.emotionGrid}>
        {EMOTIONS.map((emotion) => {
          const isSelected = selectedEmotion?.label === emotion.label;
          return (
            <TouchableOpacity
              key={emotion.label}
              style={[
                styles.emotionButton,
                isSelected && styles.emotionButtonSelected,
              ]}
              onPress={() => handleEmotionPress(emotion)}
            >
              <Text
                style={[
                  styles.emotionText,
                  isSelected && styles.emotionTextSelected,
                ]}
              >
                {emotion.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Intensity Pills */}
      {selectedEmotion && (
        <View style={styles.intensityContainer}>
          <Text style={styles.intensityLabel}>How intense?</Text>
          <View style={styles.intensityPills}>
            {[1, 2, 3, 4, 5].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.intensityPill,
                  intensity === level && styles.intensityPillSelected,
                ]}
                onPress={() => handleIntensityPress(level)}
              >
                <Text
                  style={[
                    styles.intensityPillText,
                    intensity === level && styles.intensityPillTextSelected,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Confirm Button */}
      <TouchableOpacity
        style={[
          styles.confirmButton,
          !selectedEmotion && styles.confirmButtonDisabled,
        ]}
        onPress={handleConfirm}
        disabled={!selectedEmotion}
      >
        <Text style={styles.confirmButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
    marginBottom: 20,
    textAlign: 'center',
  },
  emotionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  emotionButton: {
    width: '48%',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.card,
    backgroundColor: colors.card,
    marginBottom: 12,
    alignItems: 'center',
  },
  emotionButtonSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  emotionText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  emotionTextSelected: {
    color: colors.bg,
    fontWeight: '600',
  },
  intensityContainer: {
    marginBottom: 24,
  },
  intensityLabel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  intensityPills: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  intensityPill: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.card,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  intensityPillSelected: {
    backgroundColor: colors.accent2,
    borderColor: colors.accent2,
  },
  intensityPillText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  intensityPillTextSelected: {
    color: colors.bg,
  },
  confirmButton: {
    backgroundColor: colors.accent2,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: colors.card,
    opacity: 0.5,
  },
  confirmButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
