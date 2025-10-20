import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, useRouter, usePathname } from 'expo-router';
import { colors } from '../phase1/theme/tokens';

/**
 * Root layout router guard
 *
 * - If onboardingSeen !== 'true' and the user is not already inside an
 *   onboarding route, replace the current route with /onboarding/quiz.
 * - Shows a neutral loading spinner while checking AsyncStorage to
 *   avoid flashing the home UI before redirect.
 *
 * Note: ensure the onboarding routes exist at /onboarding/quiz and
 * /onboarding/result (the wrappers below point to phase1/onboarding).
 */
export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const seen = await AsyncStorage.getItem('onboardingSeen');

        // Allowlist — don't redirect if we're already on onboarding routes
        const isOnboardingPath = Boolean(
          pathname?.startsWith('/onboarding') || pathname?.startsWith('/_onboarding')
        );

        if (!seen && !isOnboardingPath) {
          // Use replace so users cannot navigate back and skip onboarding
          router.replace('/onboarding/quiz');
        }
      } catch (err) {
        console.warn('Router guard failed to read onboarding flag', err);
      } finally {
        if (mounted) setChecking(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [pathname, router]);

  if (checking) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  // Render the app route tree
  return <Slot />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});