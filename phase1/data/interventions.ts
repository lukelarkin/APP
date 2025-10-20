/**
 * Intervention content organised by archetype and modality.  These
 * interventions are surfaced by Athena during cravings or as part of
 * daily practice.  Use them to provide emotionally resonant
 * substitutions—letters from loved ones, journaling prompts inspired
 * by Marcus Aurelius, and Ubuntu‑style gratitude ceremonies—to
 * interrupt the ritual → compulsion → shame cycle.
 */

import type { Archetype } from './archetypes';

export interface LovedOneLetter {
  subject: string;
  body: string;
}

export type InterventionType = 'lovedOneLetter' | 'wildernessJournal' | 'gratitudeRitual' | 'reset';

export interface Interventions {
  lovedOneLetters: Record<Archetype, LovedOneLetter[]>;
  wildernessJournal: Record<Archetype, string[]>;
  gratitudeRitual: Record<Archetype, string[]>;
  moodMapping: Record<string, InterventionType[]>;
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
      'Write or send a heartfelt thank‑you to someone who has shown you unconditional love.',
    ],
    Seeker: [
      'Spend five minutes outdoors noticing beauty around you. Offer thanks for each thing you notice.',
      'Draw or write about a place that inspires awe and gratitude. How can you carry that feeling forward?',
    ],
  },
  moodMapping: {
    // Positive, high arousal emotions → gratitude or journaling
    Happy: ['gratitudeRitual', 'wildernessJournal'],
    Excited: ['gratitudeRitual', 'wildernessJournal'],
    // Positive, low arousal emotions → gratitude
    Calm: ['gratitudeRitual', 'lovedOneLetter'],
    Content: ['gratitudeRitual', 'wildernessJournal'],
    // Negative, high arousal emotions → reset first, then journaling
    Anxious: ['reset', 'wildernessJournal', 'lovedOneLetter'],
    Angry: ['reset', 'wildernessJournal'],
    Stressed: ['reset', 'wildernessJournal', 'lovedOneLetter'],
    // Negative, low arousal emotions → loved one letter, then journaling
    Sad: ['lovedOneLetter', 'wildernessJournal', 'gratitudeRitual'],
    Tired: ['lovedOneLetter', 'gratitudeRitual'],
    // Neutral → default to archetype priority
    Neutral: ['wildernessJournal', 'gratitudeRitual', 'lovedOneLetter'],
  },
};