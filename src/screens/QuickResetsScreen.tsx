import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { theme } from '../utils/theme';
import { Card } from '../components/Card';
import { quickResets } from '../data/quickResets';

type QuickResetsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'QuickResets'>;

interface Props {
  navigation: QuickResetsScreenNavigationProp;
}

export const QuickResetsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Quick Resets</Text>
          <Text style={styles.description}>
            60-90 second practices to calm your nervous system
          </Text>
        </View>

        {quickResets.map((reset) => (
          <Card
            key={reset.id}
            onPress={() => navigation.navigate('QuickResetDetail', { reset })}
          >
            <View style={styles.resetContent}>
              <Text style={styles.resetEmoji}>{reset.emoji}</Text>
              <View style={styles.resetInfo}>
                <Text style={styles.resetTitle}>{reset.name}</Text>
                <Text style={styles.resetDescription}>{reset.description}</Text>
                <Text style={styles.duration}>{reset.duration}s</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
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
  resetContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetEmoji: {
    fontSize: 40,
    marginRight: theme.spacing.md,
  },
  resetInfo: {
    flex: 1,
  },
  resetTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  resetDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  duration: {
    ...theme.typography.caption,
    color: theme.colors.accent,
  },
  arrow: {
    ...theme.typography.h1,
    color: theme.colors.textTertiary,
  },
});
