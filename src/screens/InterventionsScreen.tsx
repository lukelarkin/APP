import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Archetype } from '../types';
import { theme } from '../utils/theme';
import { Card } from '../components/Card';
import { interventions } from '../data/interventions';
import { getUserData } from '../utils/storage';

type InterventionsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Interventions'>;

interface Props {
  navigation: InterventionsScreenNavigationProp;
}

const typeEmojis = {
  letter: '✉️',
  journal: '📔',
  ubuntu: '🕉️',
};

export const InterventionsScreen: React.FC<Props> = ({ navigation }) => {
  const [archetype, setArchetype] = useState<Archetype | null>(null);

  useEffect(() => {
    loadArchetype();
  }, []);

  const loadArchetype = async () => {
    const userData = await getUserData();
    if (userData.archetype) {
      setArchetype(userData.archetype);
    }
  };

  const filteredInterventions = archetype
    ? interventions.filter((i) => i.archetype === archetype)
    : [];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {archetype ? `${archetype} Interventions` : 'Interventions'}
          </Text>
          <Text style={styles.description}>
            Practices designed specifically for your archetype
          </Text>
        </View>

        {filteredInterventions.map((intervention) => (
          <Card
            key={intervention.id}
            onPress={() =>
              navigation.navigate('InterventionDetail', { intervention })
            }
          >
            <View style={styles.interventionContent}>
              <Text style={styles.interventionEmoji}>
                {typeEmojis[intervention.type]}
              </Text>
              <View style={styles.interventionInfo}>
                <Text style={styles.interventionTitle}>
                  {intervention.title}
                </Text>
                <Text style={styles.interventionDescription}>
                  {intervention.description}
                </Text>
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
  interventionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interventionEmoji: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  interventionInfo: {
    flex: 1,
  },
  interventionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  interventionDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  arrow: {
    ...theme.typography.h1,
    color: theme.colors.textTertiary,
  },
});
