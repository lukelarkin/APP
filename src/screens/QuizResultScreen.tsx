import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { theme } from '../utils/theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { saveUserData } from '../utils/storage';

type QuizResultScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'QuizResult'>;
type QuizResultScreenRouteProp = RouteProp<RootStackParamList, 'QuizResult'>;

interface Props {
  navigation: QuizResultScreenNavigationProp;
  route: QuizResultScreenRouteProp;
}

const archetypeDescriptions = {
  Warrior: {
    emoji: '⚔️',
    description: 'You are driven by courage, strength, and determination. You face challenges head-on and fight for what matters to you.',
    qualities: ['Courageous', 'Determined', 'Strong', 'Action-oriented'],
  },
  Sage: {
    emoji: '🦉',
    description: 'You are guided by wisdom, insight, and understanding. You seek truth and share knowledge with others.',
    qualities: ['Wise', 'Thoughtful', 'Insightful', 'Contemplative'],
  },
  Lover: {
    emoji: '❤️',
    description: 'You are centered in compassion, connection, and love. You nurture deep relationships and lead with your heart.',
    qualities: ['Compassionate', 'Connected', 'Nurturing', 'Heart-centered'],
  },
  Seeker: {
    emoji: '🧭',
    description: 'You are fueled by curiosity, growth, and exploration. You embrace the unknown and seek new experiences.',
    qualities: ['Curious', 'Adventurous', 'Open-minded', 'Growing'],
  },
};

export const QuizResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const { result } = route.params;
  const archetypeInfo = archetypeDescriptions[result.primaryArchetype];

  const handleContinue = async () => {
    await saveUserData({
      archetype: result.primaryArchetype,
      quizCompleted: true,
    });
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.emoji}>{archetypeInfo.emoji}</Text>
          <Text style={styles.title}>You are a {result.primaryArchetype}</Text>
          <Text style={styles.description}>{archetypeInfo.description}</Text>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>Your Qualities</Text>
          {archetypeInfo.qualities.map((quality, index) => (
            <View key={index} style={styles.qualityRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.qualityText}>{quality}</Text>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Your Scores</Text>
          {(Object.keys(result.scores) as Array<keyof typeof result.scores>).map((archetype) => (
            <View key={archetype} style={styles.scoreRow}>
              <Text style={styles.archetypeName}>{archetype}</Text>
              <View style={styles.scoreBar}>
                <View
                  style={[
                    styles.scoreBarFill,
                    {
                      width: `${(result.scores[archetype] / 5) * 100}%`,
                      backgroundColor:
                        archetype === result.primaryArchetype
                          ? theme.colors.primary
                          : theme.colors.textTertiary,
                    },
                  ]}
                />
              </View>
              <Text style={styles.scoreValue}>{result.scores[archetype]}</Text>
            </View>
          ))}
        </Card>

        <Button title="Continue to TARU" onPress={handleContinue} />
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
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  emoji: {
    fontSize: 80,
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  qualityRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  bullet: {
    ...theme.typography.body,
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  qualityText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  archetypeName: {
    ...theme.typography.body,
    color: theme.colors.text,
    width: 80,
  },
  scoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.surface,
    borderRadius: 4,
    marginHorizontal: theme.spacing.sm,
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreValue: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    width: 20,
    textAlign: 'right',
  },
});
