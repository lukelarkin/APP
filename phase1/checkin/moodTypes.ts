/**
 * Type definitions for mood logging in TARU's daily check-in flow.
 * 
 * The mood model uses a quadrant-based approach:
 * - Valence (pleasant vs. unpleasant)
 * - Arousal (high energy vs. low energy)
 * 
 * This allows the app to map emotions to appropriate interventions
 * and track emotional patterns over time.
 */

/**
 * Quadrants based on the circumplex model of affect:
 * - HIGH_PLEASANT: High arousal + pleasant (excited, energized, joyful)
 * - HIGH_UNPLEASANT: High arousal + unpleasant (anxious, angry, stressed)
 * - LOW_UNPLEASANT: Low arousal + unpleasant (sad, depressed, lonely)
 * - LOW_PLEASANT: Low arousal + pleasant (calm, peaceful, content)
 */
export enum Quadrant {
  HIGH_PLEASANT = 'HIGH_PLEASANT',
  HIGH_UNPLEASANT = 'HIGH_UNPLEASANT',
  LOW_UNPLEASANT = 'LOW_UNPLEASANT',
  LOW_PLEASANT = 'LOW_PLEASANT',
}

/**
 * Emotions organized by quadrant.
 * Based on the circumplex model with emotions distributed across
 * valence (pleasant/unpleasant) and arousal (high/low) dimensions.
 */
export type Emotion =
  // HIGH_PLEASANT: High arousal + pleasant
  | 'excited'
  | 'energized'
  | 'joyful'
  | 'happy'
  | 'enthusiastic'
  | 'inspired'
  // HIGH_UNPLEASANT: High arousal + unpleasant
  | 'anxious'
  | 'angry'
  | 'stressed'
  | 'frustrated'
  | 'irritated'
  | 'overwhelmed'
  // LOW_UNPLEASANT: Low arousal + unpleasant
  | 'sad'
  | 'depressed'
  | 'lonely'
  | 'hopeless'
  | 'tired'
  | 'disconnected'
  // LOW_PLEASANT: Low arousal + pleasant
  | 'calm'
  | 'peaceful'
  | 'content'
  | 'relaxed'
  | 'serene'
  | 'grounded';

/**
 * Intensity scale for emotions (1-5):
 * 1 = barely noticeable
 * 2 = mild
 * 3 = moderate
 * 4 = strong
 * 5 = overwhelming
 */
export type Intensity = 1 | 2 | 3 | 4 | 5;

/**
 * A single mood log entry capturing the user's emotional state
 * at a specific point in time.
 */
export interface MoodLog {
  /**
   * The specific emotion selected by the user
   */
  emotion: Emotion;
  
  /**
   * The quadrant this emotion belongs to
   */
  quadrant: Quadrant;
  
  /**
   * Intensity of the emotion (1-5)
   */
  intensity: Intensity;
  
  /**
   * ISO 8601 timestamp when this mood was logged
   */
  timestamp: string;
  
  /**
   * Optional note from the user about what triggered this emotion
   */
  note?: string;
}

/**
 * Maps each emotion to its quadrant based on valence and arousal.
 */
export const EMOTION_QUADRANT_MAP: Record<Emotion, Quadrant> = {
  // HIGH_PLEASANT
  excited: Quadrant.HIGH_PLEASANT,
  energized: Quadrant.HIGH_PLEASANT,
  joyful: Quadrant.HIGH_PLEASANT,
  happy: Quadrant.HIGH_PLEASANT,
  enthusiastic: Quadrant.HIGH_PLEASANT,
  inspired: Quadrant.HIGH_PLEASANT,
  // HIGH_UNPLEASANT
  anxious: Quadrant.HIGH_UNPLEASANT,
  angry: Quadrant.HIGH_UNPLEASANT,
  stressed: Quadrant.HIGH_UNPLEASANT,
  frustrated: Quadrant.HIGH_UNPLEASANT,
  irritated: Quadrant.HIGH_UNPLEASANT,
  overwhelmed: Quadrant.HIGH_UNPLEASANT,
  // LOW_UNPLEASANT
  sad: Quadrant.LOW_UNPLEASANT,
  depressed: Quadrant.LOW_UNPLEASANT,
  lonely: Quadrant.LOW_UNPLEASANT,
  hopeless: Quadrant.LOW_UNPLEASANT,
  tired: Quadrant.LOW_UNPLEASANT,
  disconnected: Quadrant.LOW_UNPLEASANT,
  // LOW_PLEASANT
  calm: Quadrant.LOW_PLEASANT,
  peaceful: Quadrant.LOW_PLEASANT,
  content: Quadrant.LOW_PLEASANT,
  relaxed: Quadrant.LOW_PLEASANT,
  serene: Quadrant.LOW_PLEASANT,
  grounded: Quadrant.LOW_PLEASANT,
};

/**
 * Computes the quadrant for a given emotion.
 * @param emotion - The emotion to map to a quadrant
 * @returns The corresponding quadrant
 */
export function computeQuadrant(emotion: Emotion): Quadrant {
  return EMOTION_QUADRANT_MAP[emotion];
}
