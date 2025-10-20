import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors, radius } from '../theme/tokens';
import { useRouter } from 'expo-router';

/**
 * ResetSelection
 *
 * A selector page for nervous system resets inspired by the Figma
 * "Nervous System Reset Selection App" design.  This screen invites
 * the user to pick a short breathing or tapping exercise to help
 * them ride out a craving.  The tone remains compassionate and
 * non‑judgemental, reinforcing TARU’s mission to interrupt the
 * addiction cycle with quick, accessible interventions.
 */
export default function ResetSelection() {
  const router = useRouter();
  // In a real app this count would come from user stats in the backend.
  const resetsInterrupted = 4;

  const resetOptions = [
    {
      key: 'nostril',
      title: 'Alternate Nostril Breathing',
      description: 'Reset mind & body in 1 min.',
      image: require('../assets/resets/c69b139d237c51348d8376f28e3a5727139bd9ed.png'),
      route: '/resets/nostril',
    },
    {
      key: 'sigh',
      title: 'Physiologic Sigh',
      description: 'Release tension in 30 sec.',
      image: require('../assets/resets/5346fb0c3e34267b28ed00b6294918d314a43601.png'),
      route: '/resets/sigh',
    },
    {
      key: 'eft',
      title: 'EFT Tapping',
      description: 'Calm your nerves in 90 sec.',
      image: require('../assets/resets/d0b907f2f9cbd407a6c7f0f481ac21b3ac3c8b5c.png'),
      route: '/resets/eft',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Header: back button placeholder. In a parent navigator this would go back. */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          {/* simple chevron left icon */}
          <Text style={{ color: colors.text, fontSize: 24 }}>‹</Text>
        </TouchableOpacity>
      </View>

      {/* Stats message */}
      <View style={styles.statsRow}>
        <Text style={styles.statsText}>💡 You've interrupted {resetsInterrupted} cravings this week.</Text>
      </View>

      {/* Hero image. Use a calming scene from assets. */}
      <Image
        source={require('../assets/resets/0dc0fbd4c14fb49bd0fe14de17c8a59827b0c3c2.png')}
        style={styles.heroImage}
        resizeMode="cover"
      />

      {/* Main title and subtitle */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Let's break this wave together.</Text>
      </View>
      <View style={styles.subtitleRow}>
        <Text style={styles.subtitle}>90 seconds can change how you feel. Pick one.</Text>
      </View>

      {/* List of reset options */}
      {resetOptions.map((option) => (
        <View key={option.key} style={styles.optionWrapper}>
          <View style={styles.optionCard}>
            <Image source={option.image} style={styles.optionImage} resizeMode="cover" />
            <View style={styles.optionContent}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push(option.route)}
                style={styles.optionButton}
              >
                <Text style={styles.optionButtonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* Skip button */}
      <View style={styles.skipRow}>
        <TouchableOpacity onPress={() => router.back()} accessibilityLabel="Skip for now">
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  headerRow: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    alignItems: 'center',
    marginBottom: 8,
  },
  statsText: {
    color: colors.sub,
    fontSize: 14,
    textAlign: 'center',
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
  titleRow: {
    paddingHorizontal: 16,
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
  },
  subtitleRow: {
    paddingHorizontal: 16,
    paddingTop: 4,
    marginBottom: 12,
    alignItems: 'center',
  },
  subtitle: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
  optionWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  optionImage: {
    width: '100%',
    height: 160,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
  },
  optionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    color: colors.sub,
    fontSize: 14,
  },
  optionButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.md,
  },
  optionButtonText: {
    color: colors.bg,
    fontSize: 14,
    fontWeight: '600',
  },
  skipRow: {
    paddingTop: 16,
    alignItems: 'center',
  },
  skipText: {
    color: colors.sub,
    fontSize: 14,
  },
});