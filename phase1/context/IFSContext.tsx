import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoodLog, Quadrant } from '../checkin/moodTypes';
import { Archetype } from '../data/archetypes';

/**
 * Storage keys for IFS data
 */
const STORAGE_KEYS = {
  MOOD_LOGS: 'moodLogs',
  SELF_LED_STREAK: 'selfLedStreak',
  LAST_MOOD_DATE: 'lastMoodDate',
  LAST_PART_DATE: 'lastPartDate',
  UBUNTU_TOKENS: 'ubuntuTokens',
  SELF_ENERGY: 'selfEnergy',
  ARCHETYPE: 'archetype',
};

/**
 * Intervention suggestion returned after recording a mood
 */
export interface InterventionSuggestion {
  type: 'lovedOneLetter' | 'wildernessJournal' | 'gratitudeRitual' | 'physiologicReset';
  priority: number;
  reason: string;
}

/**
 * IFS Context state
 */
interface IFSContextValue {
  /**
   * Current self-led streak (increments when both mood AND part completed on same day)
   */
  selfLedStreak: number;
  
  /**
   * Total Ubuntu tokens earned (awarded for reconnective actions)
   */
  ubuntuTokens: number;
  
  /**
   * Self energy level (0-100, adjusted by mood quadrant)
   */
  selfEnergy: number;
  
  /**
   * User's archetype (used for intervention prioritization)
   */
  archetype: Archetype;
  
  /**
   * Record a mood entry. Persists the mood, updates streak (if applicable),
   * awards tokens, adjusts Self energy, and returns intervention suggestions.
   * 
   * @param entry - The mood log entry to record
   * @returns Promise resolving to intervention suggestions
   */
  recordMood: (entry: MoodLog) => Promise<InterventionSuggestion[]>;
  
  /**
   * Award Ubuntu tokens for reconnective actions
   * 
   * @param amount - Number of tokens to award
   * @param reason - Description of why tokens were awarded
   */
  awardUbuntuToken: (amount: number, reason: string) => Promise<void>;
  
  /**
   * Record that a part was worked with today (for streak tracking)
   */
  recordPartWork: () => Promise<void>;
  
  /**
   * Get all mood logs
   */
  getMoodLogs: () => Promise<MoodLog[]>;
}

const IFSContext = createContext<IFSContextValue | undefined>(undefined);

interface IFSProviderProps {
  children: ReactNode;
}

/**
 * IFSProvider manages centralized mood persistence, streak tracking,
 * token awarding, and Self-energy adjustments.
 */
export function IFSProvider({ children }: IFSProviderProps) {
  const [selfLedStreak, setSelfLedStreak] = useState<number>(0);
  const [ubuntuTokens, setUbuntuTokens] = useState<number>(0);
  const [selfEnergy, setSelfEnergy] = useState<number>(50);
  const [archetype, setArchetype] = useState<Archetype>('Warrior');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize state from AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const [streakStr, tokensStr, energyStr, savedArchetype] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.SELF_LED_STREAK),
          AsyncStorage.getItem(STORAGE_KEYS.UBUNTU_TOKENS),
          AsyncStorage.getItem(STORAGE_KEYS.SELF_ENERGY),
          AsyncStorage.getItem(STORAGE_KEYS.ARCHETYPE),
        ]);

        setSelfLedStreak(streakStr ? parseInt(streakStr, 10) : 0);
        setUbuntuTokens(tokensStr ? parseInt(tokensStr, 10) : 0);
        setSelfEnergy(energyStr ? parseInt(energyStr, 10) : 50);
        if (savedArchetype && ['Warrior', 'Sage', 'Lover', 'Seeker'].includes(savedArchetype)) {
          setArchetype(savedArchetype as Archetype);
        }
      } finally {
        setIsInitialized(true);
      }
    })();
  }, []);

  /**
   * Record a mood entry and handle all side effects
   */
  const recordMood = async (entry: MoodLog): Promise<InterventionSuggestion[]> => {
    // 1. Persist the mood log
    const existingLogsJson = await AsyncStorage.getItem(STORAGE_KEYS.MOOD_LOGS);
    const existingLogs: MoodLog[] = existingLogsJson ? JSON.parse(existingLogsJson) : [];
    const updatedLogs = [...existingLogs, entry];
    await AsyncStorage.setItem(STORAGE_KEYS.MOOD_LOGS, JSON.stringify(updatedLogs));

    // 2. Check if we should update the streak
    // Streak increments only when BOTH mood and part completed on same calendar day
    const today = new Date().toISOString().split('T')[0];
    const lastMoodDate = await AsyncStorage.getItem(STORAGE_KEYS.LAST_MOOD_DATE);
    const lastPartDate = await AsyncStorage.getItem(STORAGE_KEYS.LAST_PART_DATE);
    
    // Record today's mood date
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_MOOD_DATE, today);

    // If both mood and part were completed today (or if this completes today's requirement)
    if (lastPartDate === today && lastMoodDate !== today) {
      const newStreak = selfLedStreak + 1;
      setSelfLedStreak(newStreak);
      await AsyncStorage.setItem(STORAGE_KEYS.SELF_LED_STREAK, newStreak.toString());
    }

    // 3. Adjust Self energy based on quadrant and intensity
    let energyDelta = 0;
    switch (entry.quadrant) {
      case Quadrant.HIGH_PLEASANT:
        energyDelta = 5 + entry.intensity; // +6 to +10
        break;
      case Quadrant.LOW_PLEASANT:
        energyDelta = 3 + entry.intensity; // +4 to +8
        break;
      case Quadrant.HIGH_UNPLEASANT:
        energyDelta = -(2 + entry.intensity); // -3 to -7
        break;
      case Quadrant.LOW_UNPLEASANT:
        energyDelta = -(3 + entry.intensity); // -4 to -8
        break;
    }

    const newEnergy = Math.max(0, Math.min(100, selfEnergy + energyDelta));
    setSelfEnergy(newEnergy);
    await AsyncStorage.setItem(STORAGE_KEYS.SELF_ENERGY, newEnergy.toString());

    // 4. Award tokens for mood check-in (reconnective action)
    await awardUbuntuToken(1, 'Daily mood check-in');

    // 5. Return intervention suggestions
    // Import from interventions.ts (will be created next)
    const { suggestInterventionsForMood } = await import('../data/interventions');
    return suggestInterventionsForMood(entry, archetype);
  };

  /**
   * Award Ubuntu tokens for reconnective actions
   */
  const awardUbuntuToken = async (amount: number, reason: string): Promise<void> => {
    const newTotal = ubuntuTokens + amount;
    setUbuntuTokens(newTotal);
    await AsyncStorage.setItem(STORAGE_KEYS.UBUNTU_TOKENS, newTotal.toString());
    
    // Log the award (could be displayed in a notification or history)
    console.log(`Awarded ${amount} Ubuntu token(s): ${reason}`);
  };

  /**
   * Record that a part was worked with today
   */
  const recordPartWork = async (): Promise<void> => {
    const today = new Date().toISOString().split('T')[0];
    const lastMoodDate = await AsyncStorage.getItem(STORAGE_KEYS.LAST_MOOD_DATE);
    const lastPartDate = await AsyncStorage.getItem(STORAGE_KEYS.LAST_PART_DATE);
    
    // Record today's part work
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_PART_DATE, today);

    // If both mood and part completed today (and this is completing the requirement)
    if (lastMoodDate === today && lastPartDate !== today) {
      const newStreak = selfLedStreak + 1;
      setSelfLedStreak(newStreak);
      await AsyncStorage.setItem(STORAGE_KEYS.SELF_LED_STREAK, newStreak.toString());
      
      // Award token for completing full daily practice
      await awardUbuntuToken(2, 'Completed both mood and part check-in');
    }
  };

  /**
   * Get all mood logs
   */
  const getMoodLogs = async (): Promise<MoodLog[]> => {
    const logsJson = await AsyncStorage.getItem(STORAGE_KEYS.MOOD_LOGS);
    return logsJson ? JSON.parse(logsJson) : [];
  };

  const value: IFSContextValue = {
    selfLedStreak,
    ubuntuTokens,
    selfEnergy,
    archetype,
    recordMood,
    awardUbuntuToken,
    recordPartWork,
    getMoodLogs,
  };

  // Don't render children until we've loaded initial state
  if (!isInitialized) {
    return null;
  }

  return <IFSContext.Provider value={value}>{children}</IFSContext.Provider>;
}

/**
 * Hook to access IFS context
 */
export function useIFS(): IFSContextValue {
  const context = useContext(IFSContext);
  if (!context) {
    throw new Error('useIFS must be used within an IFSProvider');
  }
  return context;
}
