import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { colors, radius } from '../theme/tokens';
import { archetypeProfiles, type Archetype } from '../data/archetypes';

/**
 * ArchetypeResult
 *
 * Sacred, personalised reveal. Reads archetype from storage, shows
 * title + description and offers two actions:
 * - Begin your journey (replace onboarding and go to home)
 * - See Athena’s tone (preview)
 *
 * If archetypeProfiles is extended with color/image, we use them here.
 */

export default function ArchetypeResult() {
  const router = useRouter();
  const [archetype, setArchetype] = useState<Archetype | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('archetype');
        if (stored && (stored in archetypeProfiles)) {
          setArchetype(stored as Archetype);
        }
      } catch (err) {
        console.warn('Failed to load archetype', err);
      }
    })();
  }, []);

  if (!archetype) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: colors.text }}>Loading…</Text>
      </SafeAreaView>
    );
  }

  const profile = archetypeProfiles[archetype];

  const handleBegin = async () => {
    // Ensure onboardingSeen persisted (defensive)
    try {
      await AsyncStorage.setItem('onboardingSeen', 'true');
    } catch (err) {
      /* swallow */
    }
    // Replace onboarding in flow and go to home / main screen
    router.replace('/');
  };

  const handlePreviewTone = () => {
    router.push('/onboarding/athenaPreview');
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, profile.color ? { borderColor: profile.color } : null]}>
          {profile.image ? (
            <Image source={profile.image} style={styles.heroImage} resizeMode="cover" accessibilityLabel={`${profile.title} illustration`} />
          ) : (
            <Text style={styles.celebrate}>✨</Text>
          )}

          <Text style={styles.title}>You are the {profile.title}</Text>
          <Text style={styles.description}>{profile.description}</Text>

          <View style={styles.ritual}>
            <Text style={styles.ritualText}>
              This archetype is a companion — not a cage. When the pull feels strongest, return here for a quiet reminder of who you’re becoming. If you want a single help line right now, pin your reminder below.
            </Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity onPress={handleBegin} style={[styles.primaryButton, profile.color ? { backgroundColor: profile.color } : null]}>
              <Text style={styles.primaryText}>Begin your journey</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePreviewTone} style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>See Athena’s tone</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  heroImage: {
    width: '100%',
    height: 140,
    borderRadius: radius.sm,
    marginBottom: 12,
  },
  celebrate: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    color: colors.muted,
    textAlign: 'center',
    marginBottom: 16,
  },
  ritual: {
    marginTop: 8,
    padding: 12,
    borderRadius: radius.sm,
    backgroundColor: colors.cardAlt || '#ffffff06',
  },
  ritualText: {
    color: colors.text,
    textAlign: 'center',
  },
  actions: {
    marginTop: 18,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.accent,
    padding: 14,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  primaryText: {
    color: colors.bg,
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 12,
    padding: 12,
    alignItems: 'center',
  },
  secondaryText: {
    color: colors.accent2,
    fontWeight: '700',
  },
});
