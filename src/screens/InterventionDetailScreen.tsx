import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { theme } from '../utils/theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

type InterventionDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InterventionDetail'
>;
type InterventionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'InterventionDetail'
>;

interface Props {
  navigation: InterventionDetailScreenNavigationProp;
  route: InterventionDetailScreenRouteProp;
}

export const InterventionDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { intervention } = route.params;
  const [text, setText] = useState(intervention.prompt);

  const handleComplete = () => {
    Alert.alert(
      'Practice Complete! ✨',
      'Your words have been received. Remember, this is for you.',
      [
        {
          text: 'Done',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{intervention.title}</Text>
          <Text style={styles.description}>{intervention.description}</Text>
        </View>

        <Card>
          <TextInput
            style={styles.textInput}
            multiline
            value={text}
            onChangeText={setText}
            placeholder="Write your thoughts here..."
            placeholderTextColor={theme.colors.textTertiary}
            textAlignVertical="top"
          />
        </Card>

        <Button title="Complete Practice" onPress={handleComplete} />
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
    marginBottom: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  textInput: {
    ...theme.typography.body,
    color: theme.colors.text,
    minHeight: 300,
    padding: 0,
  },
});
