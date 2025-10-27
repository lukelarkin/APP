/src/hooks/useIFSCheckIn.ts
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IFSCheckInDTO } from '../types/IFSCheckInDTO';
import { postIFSCheckIn } from '../lib/api';
import { syncIFSQueue } from '../lib/syncManager';

const STORAGE_KEY = 'IFS_CHECKINS';

export function useIFSCheckIn(userId: string) {
  const [streak, setStreak] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Helpers ---------------------------------------------------
  const loadCheckIns = async (): Promise<IFSCheckInDTO[]> => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  const saveCheckIns = async (items: IFSCheckInDTO[]) =>
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));

  // --- Core submit logic -----------------------------------------
  const submitCheckIn = useCallback(
    async (payload: Omit<IFSCheckInDTO, 'id' | 'createdAt'>) => {
      setLoading(true);
      const checkIn: IFSCheckInDTO = {
        ...payload,
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        synced: false,
      };

      const existing = await loadCheckIns();
      const updated = [...existing, checkIn];
      await saveCheckIns(updated);

      // try to sync in background
      try {
        await postIFSCheckIn(checkIn);
        checkIn.synced = true;
        await saveCheckIns(updated.map(c => c.id === checkIn.id ? checkIn : c));
      } catch {
        // offline → will sync later
      }

      await updateStreak();
      setLoading(false);
    },
    []
  );

  // --- Streak logic ----------------------------------------------
  const updateStreak = async () => {
    const all = await loadCheckIns();
    if (!all.length) return setStreak(0);
    const sorted = all.sort(
      (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
    setLastCheckIn(sorted[0].createdAt || null);

    // count consecutive daily check-ins
    let s = 1;
    for (let i = 1; i < sorted.length; i++) {
      const diff =
        (new Date(sorted[i - 1].createdAt!).getTime() -
          new Date(sorted[i].createdAt!).getTime()) /
        (1000 * 60 * 60 * 24);
      if (diff <= 1.5) s++;
      else break;
    }
    setStreak(s);
  };

  useEffect(() => {
    updateStreak();
    syncIFSQueue(); // background sync on mount
  }, []);

  return { submitCheckIn, streak, lastCheckIn, loading };
}
