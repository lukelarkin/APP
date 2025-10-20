import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, radius } from '../theme/tokens';

/**
 * EFTTapping
 *
 * Implements a 90‑second Emotional Freedom Technique (EFT) tapping
 * sequence.  Users tap through a series of acupressure points while
 * repeating a self‑acceptance affirmation.  Each step lasts nine
 * seconds, and the UI uses colour cues to signify each tapping point.
 */
export default function EFTTapping() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);

  // Define tapping steps.  Each point is paired with a colour for
  // variety and Figma‑inspired accents.
  const steps = [
    { instruction: 'Tap the side of your hand (karate chop)', color: colors.accent2 },
    { instruction: 'Tap the top of your head', color: colors.accent3 },
    { instruction: 'Tap your eyebrow point', color: colors.accent4 },
    { instruction: 'Tap the side of your eye', color: colors.accent },
    { instruction: 'Tap under your eye', color: colors.accent2 },
    { instruction: 'Tap under your nose', color: colors.accent3 },
    { instruction: 'Tap your chin point', color: colors.accent4 },
    { instruction: 'Tap your collarbone', color: colors.accent },
    { instruction: 'Tap under your arm', color: colors.accent2 },
    { instruction: 'Tap the top of your head', color: colors.accent3 },
  ];

  // Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Step progression effect: 9 seconds per step (90 s / 10 steps)
  useEffect(() => {
    let stepInterval: NodeJS.Timeout;
    if (isActive) {
      stepInterval = setInterval(() => {
        setCurrentStep((step) => {
          const next = (step + 1) % steps.length;
          if (next === 0) {
            setCycles((c) => c + 1);
          }
          return next;
        });
      }, 9000);
    }
    return () => clearInterval(stepInterval);
  }, [isActive]);

  const handleToggle = () => setIsActive((prev) => !prev);
  const handleReset = () => {
    setIsActive(false);
    setCurrentStep(0);
    setCycles(0);
    setTimeLeft(90);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={{ color: colors.text, fontSize: 24 }}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EFT Tapping</Text>
      </View>

      <View style={styles.timerRow}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.cyclesText}>Rounds completed: {cycles}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.handWrapper}>
          <Text style={styles.handEmoji}>👏</Text>
          <View
            style={[styles.indicator, styles.indicatorLeft, { backgroundColor: steps[currentStep]?.color }]}
          />
          <View
            style={[styles.indicator, styles.indicatorRight, { backgroundColor: steps[currentStep]?.color }]}
          />
        </View>
        <Text style={styles.instructionText}>{steps[currentStep]?.instruction}</Text>
        <View style={styles.actionRow}>
          <Text style={{ color: steps[currentStep]?.color || colors.accent2, fontWeight: '600' }}>
            ↺ Tap
          </Text>
        </View>
      </View>

      <View style={styles.affRow}>
        <Text style={styles.affText}>
          Repeat: “Even though I feel this craving, I deeply and completely accept myself.”
        </Text>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity
          onPress={handleToggle}
          style={[styles.primaryButton, { backgroundColor: colors.accent }]}
        >
          <Text style={{ color: colors.bg, fontWeight: '600' }}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleReset}
          style={[styles.secondaryButton, { backgroundColor: colors.card }]}
        >
          <Text style={{ color: colors.text, fontWeight: '600' }}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 32,
  },
  timerRow: {
    alignItems: 'center',
    marginBottom: 8,
  },
  timerText: {
    color: colors.accent,
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cyclesText: {
    color: colors.sub,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.card,
    marginHorizontal: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  handWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  handEmoji: {
    fontSize: 60,
    lineHeight: 64,
    textAlign: 'center',
  },
  indicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  indicatorLeft: {
    top: -4,
    left: -4,
  },
  indicatorRight: {
    top: -4,
    right: -4,
  },
  instructionText: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  affRow: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 12,
  },
  affText: {
    color: colors.sub,
    textAlign: 'center',
    fontSize: 14,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 16,
  },
  primaryButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: radius.md,
  },
  secondaryButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: radius.md,
  },
});