/**
 * Intervention content organised by archetype and modality.  These
 * interventions are surfaced by Athena during cravings or as part of
 * daily practice.  Use them to provide emotionally resonant
 * substitutions—letters from loved ones, journaling prompts inspired
 * by Marcus Aurelius, and Ubuntu-style gratitude ceremonies—to
 * interrupt the ritual → compulsion → shame cycle.
 */

import type { Archetype } from './archetypes';
import type { MoodLog, Quadrant, Emotion } from '../checkin/moodTypes';
import type { InterventionSuggestion } from '../context/IFSContext';
import { archetypeProfiles } from './archetypes';

export interface LovedOneLetter {
  subject: string;
  body: string;
}

export type InterventionType =
  | 'lovedOneLetter'
  | 'wildernessJournal'
  | 'gratitudeRitual'
  | 'physiologicReset';

export interface Interventions {
  lovedOneLetters: Record<Archetype, LovedOneLetter[]>;
  wildernessJournal: Record<Archetype, string[]>;
  gratitudeRitual: Record<Archetype, string[]>;
}

export const interventions: Interventions = {
  lovedOneLetters: {
    Warrior: [
      {
        subject: 'Remember Your Strength',
        body:
          'Dear Brother,\n\nYou’ve overcome harder battles than this moment. Let your courage remind you why you started—your family, your freedom, your purpose. Take a breath, feel your heart beating. You are not alone.\n\nWith love,\nSomeone who believes in you',
      },
    ],
    Sage: [
      {
        subject: 'You Already Know the Way',
        body:
          'Dear Friend,\n\nInside you lies the wisdom you seek. When cravings arise, they are teachers disguised as obstacles. Ask yourself what story you’re telling and whether it serves you. Your insight will guide you back.\n\nWith respect,\nSomeone who trusts your wisdom',
      },
    ],
    Lover: [
      {
        subject: 'You Are Loved',
        body:
          'Dear Heart,\n\nWe love you more than you can imagine. When the urge appears, remember that connection heals. Reach out, share your feelings, and let others hold space for you. You deserve love and belonging.\n\nWith warmth,\nSomeone who cherishes you',
      },
    ],
    Seeker: [
      {
        subject: 'Adventure Awaits Within',
        body:
          'Dear Explorer,\n\nYour thirst for discovery is beautiful. This is an invitation to explore your inner world. What new insight will you find if you stay present? The journey inward is your greatest adventure.\n\nWith curiosity,\nSomeone who walks beside you',
      },
    ],
  },
  wildernessJournal: {
    Warrior: [
      'Describe a moment when you turned pain into power. How did it change you?',
      'Write a letter to the part of you that wants to fight. What does it need right now?',
    ],
    Sage: [
      'Reflect on a recent insight that reshaped your perspective. How can you apply it now?',
      'What does “truth” mean to you? Write a dialogue between your curious mind and your heart.',
    ],
    Lover: [
      'Recall a time when connection healed you. What feelings arise? How can you recreate that sense of belonging today?',
      'Write a note to your younger self, offering compassion and understanding.',
    ],
    Seeker: [
      'Describe a journey that changed you. What surprised you most?',
      'Imagine your future self guiding you through this craving. What wisdom do they share?',
    ],
  },
  gratitudeRitual: {
    Warrior: [
      'Perform a strength gratitude ceremony: list three times your discipline served others. Offer a moment of silence for each.',
      'Send a short message of appreciation to someone who stands by you in battle.',
    ],
    Sage: [
      'Express gratitude for three lessons learned from recent challenges. How have they shaped your character?',
      'Share a piece of wisdom that helped you with a friend or journal about its impact.',
    ],
    Lover: [
      'Light a candle and speak aloud three people you are thankful for, picturing their faces and emotions.',
      'Write or send a heartfelt thank-you to someone who has shown you unconditional love.',
    ],
    Seeker: [
      'Spend five minutes outdoors noticing beauty around you. Offer thanks for each thing you notice.',
      'Draw or write about a place that inspires awe and gratitude. How can you carry that feeling forward?',
    ],
  },
};

/**
 * Maps emotions to suggested intervention types.
 * Some emotions benefit more from specific interventions.
 */
export const EMOTION_INTERVENTION_MAP: Partial<Record<Emotion, string[]>> = {
  // HIGH_UNPLEASANT emotions benefit from calming/grounding
  anxious: ['physiologicReset', 'wildernessJournal', 'gratitudeRitual'],
  stressed: ['physiologicReset', 'wildernessJournal', 'gratitudeRitual'],
  overwhelmed: ['physiologicReset', 'wildernessJournal', 'lovedOneLetter'],
  angry: ['physiologicReset', 'wildernessJournal', 'gratitudeRitual'],
  frustrated: ['wildernessJournal', 'physiologicReset', 'gratitudeRitual'],
  irritated: ['physiologicReset', 'wildernessJournal', 'gratitudeRitual'],

  // LOW_UNPLEASANT emotions benefit from connection/compassion
  sad: ['lovedOneLetter', 'gratitudeRitual', 'wildernessJournal'],
  lonely: ['lovedOneLetter', 'gratitudeRitual', 'wildernessJournal'],
  depressed: ['lovedOneLetter', 'gratitudeRitual', 'wildernessJournal'],
  hopeless: ['lovedOneLetter', 'wildernessJournal', 'gratitudeRitual'],
  disconnected: ['lovedOneLetter', 'gratitudeRitual', 'wildernessJournal'],
  tired: ['physiologicReset', 'gratitudeRitual', 'wildernessJournal'],

  // HIGH_PLEASANT emotions - celebrate and channel
  excited: ['gratitudeRitual', 'wildernessJournal', 'lovedOneLetter'],
  energized: ['gratitudeRitual', 'wildernessJournal', 'physiologicReset'],
  joyful: ['gratitudeRitual', 'lovedOneLetter', 'wildernessJournal'],

  // LOW_PLEASANT emotions - maintain and deepen
  calm: ['gratitudeRitual', 'wildernessJournal', 'lovedOneLetter'],
  peaceful: ['gratitudeRitual', 'wildernessJournal', 'lovedOneLetter'],
  content: ['gratitudeRitual', 'wildernessJournal', 'lovedOneLetter'],
};

/**
 * Quadrant fallback mapping
 */
export const QUADRANT_INTERVENTION_MAP: Record<Quadrant, string[]> = {
  [Quadrant.HIGH_UNPLEASANT]: ['physiologicReset', 'wildernessJournal', 'gratitudeRitual'],
  [Quadrant.LOW_UNPLEASANT]: ['lovedOneLetter', 'gratitudeRitual', 'wildernessJournal'],
  [Quadrant.HIGH_PLEASANT]: ['gratitudeRitual', 'wildernessJournal', 'lovedOneLetter'],
  [Quadrant.LOW_PLEASANT]: ['gratitudeRitual', 'wildernessJournal', 'lovedOneLetter'],
};

/**
 * Suggests interventions based on mood entry and archetype.
 */
export function suggestInterventionsForMood(
  entry: MoodLog,
  archetype: Archetype
): InterventionSuggestion[] {
  const profile = archetypeProfiles[archetype];
  const emotionPrefs = EMOTION_INTERVENTION_MAP[entry.emotion] || [];
  const quadrantPrefs = QUADRANT_INTERVENTION_MAP[entry.quadrant];
  const archetypePrefs = profile.substitutionPriority;

  const scores = new Map<string, number>();

  emotionPrefs.forEach((type, i) => {
    scores.set(type, (scores.get(type) || 0) + (10 - i * 2));
  });
  quadrantPrefs.forEach((type, i) => {
    scores.set(type, (scores.get(type) || 0) + (6 - i * 1.5));
  });
  archetypePrefs.forEach((type, i) => {
    scores.set(type, (scores.get(type) || 0) + (4 - i));
  });

  if (entry.intensity >= 4) {
    scores.set('physiologicReset', (scores.get('physiologicReset') || 0) + 3);
  }

  return Array.from(scores.entries())
    .map(([type, priority]) => ({
      type: type as InterventionSuggestion['type'],
      priority,
      reason: getInterventionReason(type, entry, archetype),
    }))
    .sort((a, b) => b.priority - a.priority);
}

/**
 * Returns a short explanation for why an intervention was chosen.
 */
function getInterventionReason(
  type: string,
  entry: MoodLog,
  archetype: Archetype
): string {
  const emotionLabel =
    entry.emotion.charAt(0).toUpperCase() + entry.emotion.slice(1);
  const intensity =
    entry.intensity >= 4 ? 'intense' : entry.intensity >= 3 ? 'moderate' : 'mild';

  switch (type) {
    case 'physiologicReset':
      return `A breathing exercise can help regulate ${intensity} ${entry.emotion} feelings.`;
    case 'lovedOneLetter':
      return `A letter from someone who cares can provide comfort when feeling ${entry.emotion}.`;
    case 'wildernessJournal':
      return `Journaling can help process ${emotionLabel} emotions and gain clarity.`;
    case 'gratitudeRitual':
      return `Gratitude practice can shift perspective when experiencing ${entry.emotion}.`;
    default:
      return `This aligns with your ${archetype} archetype’s preferred substitutions.`;
  }
}
