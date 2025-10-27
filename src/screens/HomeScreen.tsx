import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { theme } from '../utils/theme';
import { Card } from '../components/Card';
import { getUserData } from '../utils/storage';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [userName, setUserName] = useState<string>('');
  const [archetype, setArchetype] = useState<string>('');
  const [streak, setStreak] = useState<number>(0);
  const [tokens, setTokens] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const data = await getUserData();
    setArchetype(data.archetype || '');
    setStreak(data.selfStreak);
    setTokens(data.totalTokens);
    setQuizCompleted(data.quizCompleted);
  };

  // Refresh data when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>TARU</Text>
          <Text style={styles.subtitle}>Your journey to Self</Text>
        </View>

        {quizCompleted && archetype && (
          <Card>
            <Text style={styles.archetypeLabel}>Your Archetype</Text>
            <Text style={styles.archetypeText}>{archetype}</Text>
          </Card>
        )}

        <Card>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>🔥 {streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>🪙 {tokens}</Text>
              <Text style={styles.statLabel}>Tokens</Text>
            </View>
          </View>
        </Card>

        {!quizCompleted && (
          <Card onPress={() => navigation.navigate('Quiz')}>
            <View style={styles.actionCard}>
              <Text style={styles.actionEmoji}>🎯</Text>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Discover Your Archetype</Text>
                <Text style={styles.actionDescription}>
                  Take the 5-question quiz to find your path
                </Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </Card>
        )}

        <Card onPress={() => navigation.navigate('CheckIn')}>
          <View style={styles.actionCard}>
            <Text style={styles.actionEmoji}>✨</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Daily Check-In</Text>
              <Text style={styles.actionDescription}>
                Connect with your parts
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </View>
        </Card>

        <Card onPress={() => navigation.navigate('IFSCheckIn')}>
          <View style={styles.actionCard}>
            <Text style={styles.actionEmoji}>🧘</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>IFS Check-In</Text>
              <Text style={styles.actionDescription}>
                Deep reflection and self-connection
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </View>
        </Card>

        {quizCompleted && archetype && (
          <Card onPress={() => navigation.navigate('Interventions')}>
            <View style={styles.actionCard}>
              <Text style={styles.actionEmoji}>📝</Text>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Interventions</Text>
                <Text style={styles.actionDescription}>
                  Letters, journals, and rituals for {archetype}
                </Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </Card>
        )}

        <Card onPress={() => navigation.navigate('QuickResets')}>
          <View style={styles.actionCard}>
            <Text style={styles.actionEmoji}>🌬️</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Quick Resets</Text>
              <Text style={styles.actionDescription}>
                60-90s calming techniques
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </View>
        </Card>

        <Card onPress={() => navigation.navigate('Community')}>
          <View style={styles.actionCard}>
            <Text style={styles.actionEmoji}>🤝</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Community</Text>
              <Text style={styles.actionDescription}>
                Connect with others on this journey
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  archetypeLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  archetypeText: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionEmoji: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  actionDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  arrow: {
    ...theme.typography.h1,
    color: theme.colors.textTertiary,
  },
});
