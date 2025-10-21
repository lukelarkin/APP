import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { theme } from '../utils/theme';
import { Card } from '../components/Card';

type CommunityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Community'>;

interface Props {
  navigation: CommunityScreenNavigationProp;
}

export const CommunityScreen: React.FC<Props> = ({ navigation }) => {
  const communityFeatures = [
    {
      emoji: '🌟',
      title: 'Connect with Others',
      description: 'Find people on similar journeys of self-discovery',
    },
    {
      emoji: '💬',
      title: 'Share Your Story',
      description: 'Express your experiences in a safe, supportive space',
    },
    {
      emoji: '🤝',
      title: 'Support Groups',
      description: 'Join archetype-specific support circles',
    },
    {
      emoji: '📚',
      title: 'Resources',
      description: 'Access shared wisdom and learning materials',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Community</Text>
          <Text style={styles.description}>
            Connect with others on the journey to Self
          </Text>
        </View>

        <Card style={styles.comingSoonCard}>
          <Text style={styles.comingSoonEmoji}>🚧</Text>
          <Text style={styles.comingSoonTitle}>Coming Soon</Text>
          <Text style={styles.comingSoonText}>
            We're building a safe and supportive community space. This feature will be available soon!
          </Text>
        </Card>

        {communityFeatures.map((feature, index) => (
          <Card key={index}>
            <View style={styles.featureContent}>
              <Text style={styles.featureEmoji}>{feature.emoji}</Text>
              <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          </Card>
        ))}
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
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  comingSoonCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  comingSoonEmoji: {
    fontSize: 60,
    marginBottom: theme.spacing.md,
  },
  comingSoonTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  comingSoonText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  featureDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
});
