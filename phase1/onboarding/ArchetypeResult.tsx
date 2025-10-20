import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Pull in theme tokens and archetype definitions.  The dark theme
// colours defined in `theme/tokens.ts` ensure consistent styling with
// the rest of the app.  Archetype profiles contain the tone,
// description and other metadata for each result.
import { colors, radius } from '../theme/tokens';
import { archetypeProfiles, Archetype } from '../data/archetypes';

/**
 * A simple result page shown after the user completes the archetype
 * quiz.  It receives the `archetype` parameter via the router and
 * displays the corresponding profile information.  Users can tap
 * through to begin using the app from here.
 */
export default function ArchetypeResult() {
  const router = useRouter();
  // Extract the archetype name from the route parameters.  If
  // undefined, default to 'Warrior' to avoid crashing.
  const { archetype } = useLocalSearchParams<{ archetype?: string }>();
  const key: Archetype = (archetype as Archetype) || 'Warrior';
  const profile = archetypeProfiles[key];

  // Navigate into the home tab.  Replace rather than push so that
  // users cannot navigate back to the result screen via the back
  // button and accidentally re-run the quiz.
  const handleContinue = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.title}>Your Archetype</Text>
          <Text style={styles.archetype}>{profile.title}</Text>
          <Text style={styles.description}>{profile.description}</Text>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Begin Your Journey</Text>
          </TouchableOpacity>
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
  scroll: {
    flexGrow: 1,
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 12,
    textAlign: 'center',
  },
  archetype: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.accent2,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 24,
    lineHeight: 22,
    textAlign: 'left',
  },
  button: {
    marginTop: 12,
    backgroundColor: colors.accent2,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});