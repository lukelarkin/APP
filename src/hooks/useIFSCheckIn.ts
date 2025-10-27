import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IFSCheckInDTO } from '../types/IFSCheckInDTO';
import { postIFSCheckIn } from '../services/ifsApi';

const STORAGE_KEY = 'IFS_CHECKINS';

export function useIFSCheckIn(userId: string) {
  const [streak, setStreak] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateStreak = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setStreak(0);
        setLastCheckIn(null);
        return;
      }

      const checkIns: IFSCheckInDTO[] = JSON.parse(stored);
      const userCheckIns = checkIns.filter(ci => ci.userId === userId);
      
      if (userCheckIns.length === 0) {
        setStreak(0);
        setLastCheckIn(null);
        return;
      }

      // Sort by date descending
      const sortedCheckIns = userCheckIns.sort((a, b) => {
        const dateA = new Date(a.date || 0).getTime();
        const dateB = new Date(b.date || 0).getTime();
        return dateB - dateA;
      });

      setLastCheckIn(sortedCheckIns[0].date || null);

      // Calculate streak based on consecutive days (≤ 1.5 days gap)
      let currentStreak = 0;
      let lastDate = new Date();

      for (const checkIn of sortedCheckIns) {
        const checkInDate = new Date(checkIn.date || 0);
        const daysDiff = (lastDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (currentStreak === 0) {
          // First check-in
          currentStreak = 1;
          lastDate = checkInDate;
        } else if (daysDiff <= 1.5) {
          // Within 1.5 days, continue streak
          currentStreak++;
          lastDate = checkInDate;
        } else {
          // Gap too large, streak broken
          break;
        }
      }

      setStreak(currentStreak);
    } catch (error) {
      console.warn('updateStreak failed:', error);
      setStreak(0);
      setLastCheckIn(null);
    }
  };

  const submitCheckIn = async (payload: Omit<IFSCheckInDTO, 'id' | 'date' | 'synced'>) => {
    setLoading(true);
    
    try {
      const checkInData: IFSCheckInDTO = {
        ...payload,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        synced: false,
      };

      // Store locally
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const checkIns: IFSCheckInDTO[] = stored ? JSON.parse(stored) : [];
      checkIns.push(checkInData);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(checkIns));

      // Update local state
      await updateStreak();

      // Try to sync immediately
      try {
        await postIFSCheckIn(checkInData);
        
        // Mark as synced
        const updatedCheckIns = checkIns.map(ci => 
          ci.id === checkInData.id ? { ...ci, synced: true } : ci
        );
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCheckIns));
      } catch (syncError) {
        console.warn('Immediate sync failed, will retry later:', syncError);
      }

    } catch (error) {
      console.warn('submitCheckIn failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateStreak();
    // Note: syncIFSQueue would be called here if syncManager existed
    // syncIFSQueue();
  }, [userId]);

  return {
    submitCheckIn,
    streak,
    lastCheckIn,
    loading,
  };
}
