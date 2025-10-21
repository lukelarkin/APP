import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { theme } from '../utils/theme';

// Screens
import { HomeScreen } from '../screens/HomeScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { QuizResultScreen } from '../screens/QuizResultScreen';
import { CheckInScreen } from '../screens/CheckInScreen';
import { InterventionsScreen } from '../screens/InterventionsScreen';
import { InterventionDetailScreen } from '../screens/InterventionDetailScreen';
import { QuickResetsScreen } from '../screens/QuickResetsScreen';
import { QuickResetDetailScreen } from '../screens/QuickResetDetailScreen';
import { CommunityScreen } from '../screens/CommunityScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen
          name="Main"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: 'Archetype Quiz' }}
        />
        <Stack.Screen
          name="QuizResult"
          component={QuizResultScreen}
          options={{ 
            title: 'Your Archetype',
            headerLeft: () => null, // Prevent going back
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CheckIn"
          component={CheckInScreen}
          options={{ title: 'Daily Check-In' }}
        />
        <Stack.Screen
          name="Interventions"
          component={InterventionsScreen}
          options={{ title: 'Interventions' }}
        />
        <Stack.Screen
          name="InterventionDetail"
          component={InterventionDetailScreen}
          options={{ title: 'Practice' }}
        />
        <Stack.Screen
          name="QuickResets"
          component={QuickResetsScreen}
          options={{ title: 'Quick Resets' }}
        />
        <Stack.Screen
          name="QuickResetDetail"
          component={QuickResetDetailScreen}
          options={{ title: 'Practice' }}
        />
        <Stack.Screen
          name="Community"
          component={CommunityScreen}
          options={{ title: 'Community' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
