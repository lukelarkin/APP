import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, radius } from '../theme/tokens';

/**
 * AlternateNostrilBreathing
 *
 * A guided breathing exercise inspired by the "Nervous System Reset"
 * Figma design.  This component walks users through a cycle of
 * alternate nostril breathing (Nadi Shodhana), switching between
 * blocking, inhaling and exhaling through each nostril.  It uses
 * colour cues to signal the current action: red = block, green =
 * inhale, blue = exhale.  The exercise lasts 60 seconds, and users
 * can pause or reset at any time.  Upon completion the timer
 * automatically pauses.
 */
export default function AlternateNostrilBreathing() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  // Sequence of actions with instructions and which nostril is affected.
  const steps = [
    { instruction: 'Place your thumb on your right nostril', nostril: 'right', action: 'block' },
    { instruction: 'Inhale through your left nostril', nostril: 'left', action: 'inhale' },
    { instruction: 'Block your left nostril with your ring finger', nostril: 'left', action: 'block' },
    { instruction: 'Release your thumb and exhale through right nostril', nostril: 'right', action: 'exhale' },
    { instruction: 'Inhale through your right nostril', nostril: 'right', action: 'inhale' },
    { instruction: 'Block your right nostril with your thumb', nostril: 'right', action: 'block' },
    { instruction: 'Release your ring finger and exhale through left nostril', nostril: 'left', action: 'exhale' },
  ];

  // Timer effect: counts down once per second when active.
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Stop the exercise when time runs out
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Step progression: change step every 4 seconds while active.
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

  const handleToggle = () => {
    // Start or pause the timer
    setIsActive((prev) => !prev);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentStep(0);
    setCycles(0);
    setTimeLeft(60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine indicator colour based on the current step and nostril.
  const getIndicatorColor = (nostril: 'left' | 'right') => {
    const step = steps[currentStep];
    if (!step) return 'transparent';
    if (step.nostril !== nostril) return 'transparent';
    switch (step.action) {
      case 'block':
        return colors.accent4; // red
      case 'inhale':
        return colors.accent2; // green
      case 'exhale':
        return colors.accent3; // blue
      default:
        return 'transparent';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={{ color: colors.text, fontSize: 24 }}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alternate Nostril Breathing</Text>
      </View>

      {/* Timer and cycles */}
      <View style={styles.timerRow}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.cyclesText}>Cycles completed: {cycles}</Text>
      </View>

      {/* Instruction card */}
      <View style={styles.card}>
        {/* Nose emoji with indicators */}
        <View style={styles.noseWrapper}>
          <Text style={styles.noseEmoji}>👃</Text>
          {/* Right nostril indicator */}
          <View
            style={[styles.nostrilIndicator, styles.nostrilRight, { backgroundColor: getIndicatorColor('right') }]}
          />
          {/* Left nostril indicator */}
          <View
            style={[styles.nostrilIndicator, styles.nostrilLeft, { backgroundColor: getIndicatorColor('left') }]}
          />
        </View>
        <Text style={styles.instructionText}>{steps[currentStep]?.instruction}</Text>
        {/* Action label */}
        <View style={styles.actionRow}>
          {steps[currentStep]?.action === 'inhale' && (
            <Text style={{ color: colors.accent2, fontWeight: '600' }}>↑ Inhale</Text>
          )}
          {steps[currentStep]?.action === 'exhale' && (
            <Text style={{ color: colors.accent3, fontWeight: '600' }}>↓ Exhale</Text>
          )}
          {steps[currentStep]?.action === 'block' && (
            <Text style={{ color: colors.accent4, fontWeight: '600' }}>● Block</Text>
          )}
        </View>
      </View>

      {/* Hand instruction */}
      <View style={styles.handRow}>
        <Text style={styles.handText}>
          Use your right hand. Thumb blocks right nostril, ring finger blocks left nostril.
        </Text>
      </View>

      {/* Controls */}
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
    marginRight: 32, // to align centre because of back icon
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
  noseWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  noseEmoji: {
    fontSize: 60,
    lineHeight: 64,
    textAlign: 'center',
  },
  nostrilIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  nostrilRight: {
    top: -4,
    right: -4,
  },
  nostrilLeft: {
    top: -4,
    left: -4,
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