import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, radius } from '../theme/tokens';

/**
 * PhysiologicSigh
 *
 * Guides the user through a 30‑second physiologic sigh — a two‑part
 * breath pattern (double inhale followed by a long exhale) shown to
 * rapidly calm the nervous system.  The flow closely mirrors the
 * Alternate Nostril Breathing screen, preserving the Figma aesthetic.
 */
export default function PhysiologicSigh() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  // Each cycle consists of two inhales and one exhale.  Each step lasts 4
  // seconds so that 3 steps = 12 seconds.  Over a 30 second session
  // roughly 2.5 cycles are completed.
  const steps = [
    { instruction: 'Inhale deeply through your nose', action: 'inhale' },
    { instruction: 'Take another quick sip of air', action: 'inhale' },
    { instruction: 'Exhale slowly through your mouth', action: 'exhale' },
  ];

  // Countdown timer effect
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

  // Step progression effect
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
      }, 4000);
    }
    return () => clearInterval(stepInterval);
  }, [isActive]);

  const handleToggle = () => setIsActive((prev) => !prev);
  const handleReset = () => {
    setIsActive(false);
    setCurrentStep(0);
    setCycles(0);
    setTimeLeft(30);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getIndicatorColor = () => {
    const step = steps[currentStep];
    if (!step) return 'transparent';
    return step.action === 'inhale' ? colors.accent2 : colors.accent3;
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
        <Text style={styles.headerTitle}>Physiologic Sigh</Text>
      </View>

      <View style={styles.timerRow}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.cyclesText}>Cycles completed: {cycles}</Text>
      </View>

      {/* Instruction card */}
      <View style={styles.card}>
        <View style={styles.lungsWrapper}>
          <Text style={styles.lungsEmoji}>🫁</Text>
          {/* Left and right indicator dots share the same colour because both lungs participate equally */}
          <View
            style={[styles.indicator, styles.indicatorLeft, { backgroundColor: getIndicatorColor() }]}
          />
          <View
            style={[styles.indicator, styles.indicatorRight, { backgroundColor: getIndicatorColor() }]}
          />
        </View>
        <Text style={styles.instructionText}>{steps[currentStep]?.instruction}</Text>
        <View style={styles.actionRow}>
          {steps[currentStep]?.action === 'inhale' && (
            <Text style={{ color: colors.accent2, fontWeight: '600' }}>↑ Inhale</Text>
          )}
          {steps[currentStep]?.action === 'exhale' && (
            <Text style={{ color: colors.accent3, fontWeight: '600' }}>↓ Exhale</Text>
          )}
        </View>
      </View>

      <View style={styles.handRow}>
        <Text style={styles.handText}>Breathe gently. Two inhales, one long sigh.</Text>
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
  lungsWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  lungsEmoji: {
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
  handRow: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 12,
  },
  handText: {
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