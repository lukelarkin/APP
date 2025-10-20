import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { colors, radius } from '../theme/tokens';
import { archetypeProfiles, Archetype } from '../data/archetypes';

/**
 * Parts available for selection during the daily Internal Family Systems
 * (IFS) check‑in.  These cover common protective and wounded parts
 * identified in trauma‑informed therapy.  We use the archetype’s
 * recommended ordering to surface the most relevant parts first.
 */
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

export default function IFSCheckIn() {
  const router = useRouter();
  const [archetype, setArchetype] = useState<Archetype>('Warrior');
  const [orderedParts, setOrderedParts] = useState<Part[]>([]);
  const [selected, setSelected] = useState<Part | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Retrieve the user’s archetype to prioritise parts
        const savedArchetype = await AsyncStorage.getItem('archetype');
        if (savedArchetype && (savedArchetype as Archetype in archetypeProfiles)) {
          setArchetype(savedArchetype as Archetype);
        }
        // Compose ordered parts: archetype priority first, then the rest
        const priority = archetypeProfiles[(savedArchetype as Archetype) || 'Warrior'].ifsSequence;
        const remaining = ALL_PARTS.filter(p => !priority.includes(p));
        setOrderedParts([...priority.filter(p => ALL_PARTS.includes(p as Part)) as Part[], ...remaining]);
        // Load current streak
        const stored = await AsyncStorage.getItem('ifsStreak');
        setStreak(stored ? parseInt(stored, 10) : 0);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    if (!selected) return;
    // Increment streak by one and persist
    const newStreak = streak + 1;
    setStreak(newStreak);
    await AsyncStorage.setItem('ifsStreak', newStreak.toString());
    // Reset selection for the next day
    setSelected(null);
    // Optionally navigate back to home or show a success message
    router.back();
  };

  const renderItem = ({ item }: { item: Part }) => (
    <TouchableOpacity
      style={[styles.partItem, selected === item && styles.partItemSelected]}
      onPress={() => setSelected(item)}
    >
      <Text style={[styles.partText, selected === item && styles.partTextSelected]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: colors.text }}>Loading…</Text>
      </SafeAreaView>
    );
  }

  // Compute a simple self‑meter ratio.  We cap at 7 for display to
  // encourage a weekly practice but do not limit underlying streak.
  const meterRatio = Math.min(streak % 7, 7) / 7;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Daily IFS Check‑In</Text>
        <Text style={styles.subHeading}>
          Which part of you feels most active right now?
        </Text>
        <FlatList
          data={orderedParts}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          extraData={selected}
          style={{ marginVertical: 16 }}
        />
        <View style={styles.meterContainer}>
          <View style={[styles.meterFill, { flex: meterRatio }]} />
          <View style={[styles.meterEmpty, { flex: 1 - meterRatio }]} />
        </View>
        <Text style={styles.streakText}>Self‑led days: {streak}</Text>
        <TouchableOpacity
          style={[styles.submitButton, !selected && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!selected}
        >
          <Text style={styles.submitButtonText}>Log Check‑In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
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
    marginBottom: 12,
    textAlign: 'center',
  },
  partItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.card,
    backgroundColor: colors.card,
    marginBottom: 8,
  },
  partItemSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  partText: {
    fontSize: 16,
    color: colors.text,
  },
  partTextSelected: {
    color: colors.bg,
    fontWeight: '600',
  },
  meterContainer: {
    flexDirection: 'row',
    height: 10,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: 8,
  },
  meterFill: {
    backgroundColor: colors.accent2,
  },
  meterEmpty: {
    backgroundColor: colors.card,
  },
  streakText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.sub,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: colors.accent2,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: colors.card,
    opacity: 0.5,
  },
  submitButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});