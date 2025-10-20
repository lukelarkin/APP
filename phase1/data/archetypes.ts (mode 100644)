/**
 * Definitions of each archetype used in the TARU onboarding flow.  Each
 * archetype encapsulates a core behavioural mode, the AI tone that
 * Athena should adopt, the recommended order of addressing IFS parts,
 * and the priority of substitution interventions.  These profiles
 * allow the app to personalise conversation style, intervention
 * sequencing and ritual recommendations based on the user's quiz
 * responses.
 */

export type Archetype = 'Warrior' | 'Sage' | 'Lover' | 'Seeker';

export interface ArchetypeProfile {
  /**
   * A short human‑readable title for the archetype.
   */
  title: string;
  /**
   * Microcopy shown when the archetype is revealed.  Should
   * feel sacred and affirm the user's hero’s journey.
   */
  description: string;
  /**
   * The tone Athena adopts in conversation: mentor, challenger,
   * comrade or guide.  Guides how the AI frames prompts and
   * interventions.
   */
  tone: 'mentor' | 'challenger' | 'comrade' | 'guide';
  /**
   * Ordered list of IFS parts (by name) to prioritise in daily
   * check‑ins.  This determines which parts are surfaced first
   * during daily practice.
   */
  ifsSequence: string[];
  /**
   * Ordered list of substitution interventions (by key) to try
   * during craving events.  For example, `lovedOneLetter`
   * indicates the app should surface letters from loved ones
   * before journaling prompts.
   */
  substitutionPriority: string[];
}

export const archetypeProfiles: Record<Archetype, ArchetypeProfile> = {
  Warrior: {
    title: 'Warrior',
    description:
      'You are the Warrior: courageous and disciplined. Your journey is about channeling strength toward your higher purpose. Let Athena challenge you when necessary and remind you of your resilience.',
    tone: 'challenger',
    ifsSequence: ['Inner Critic', 'Rebel', 'Wounded Child', 'Pleaser'],
    substitutionPriority: ['wildernessJournal', 'lovedOneLetter', 'gratitudeRitual'],
  },
  Sage: {
    title: 'Sage',
    description:
      'You are the Sage: thoughtful and reflective. You seek truth and understanding. Athena will adopt a gentle mentor tone, guiding you through deep inquiry and helping you reframe stories.',
    tone: 'mentor',
    ifsSequence: ['Analyzer', 'Inner Critic', 'Controller', 'Wounded Child'],
    substitutionPriority: ['gratitudeRitual', 'wildernessJournal', 'lovedOneLetter'],
  },
  Lover: {
    title: 'Lover',
    description:
      'You are the Lover: compassionate and connection‑oriented. Your path is to rediscover love for yourself and others. Athena will be your comrade, encouraging you to reach out and honour your need for connection.',
    tone: 'comrade',
    ifsSequence: ['Pleaser', 'Wounded Child', 'Critic', 'Rebel'],
    substitutionPriority: ['lovedOneLetter', 'gratitudeRitual', 'wildernessJournal'],
  },
  Seeker: {
    title: 'Seeker',
    description:
      'You are the Seeker: curious and adventurous. You are driven by discovery. Athena will be your guide, inviting exploration while keeping you grounded in purpose.',
    tone: 'guide',
    ifsSequence: ['Explorer', 'Rebel', 'Analyzer', 'Wounded Child'],
    substitutionPriority: ['wildernessJournal', 'gratitudeRitual', 'lovedOneLetter'],
  },
};