import React from 'react';
import ArchetypeQuiz from '../../phase1/onboarding/ArchetypeQuiz';

/**
 * Route wrapper: /onboarding/quiz
 * Exposes the existing phase1 onboarding component as a route
 * so the root guard can navigate to '/onboarding/quiz'.
 */
export default function QuizRoute() {
  return <ArchetypeQuiz />;
}