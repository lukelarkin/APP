import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData, CheckIn } from '../types';

const USER_DATA_KEY = '@taru_user_data';

const DEFAULT_USER_DATA: UserData = {
  quizCompleted: false,
  checkIns: [],
  selfStreak: 0,
  totalTokens: 0,
};

export const getUserData = async (): Promise<UserData> => {
  try {
    const data = await AsyncStorage.getItem(USER_DATA_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return DEFAULT_USER_DATA;
  } catch (error) {
    console.error('Error loading user data:', error);
    return DEFAULT_USER_DATA;
  }
};

export const saveUserData = async (userData: Partial<UserData>): Promise<void> => {
  try {
    const currentData = await getUserData();
    const updatedData = { ...currentData, ...userData };
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const addCheckIn = async (checkIn: Omit<CheckIn, 'id'>): Promise<void> => {
  try {
    const userData = await getUserData();
    const today = new Date().toISOString().split('T')[0];
    
    // Check if already checked in today
    const alreadyCheckedIn = userData.checkIns.some(
      (ci) => ci.date.split('T')[0] === today
    );
    
    if (alreadyCheckedIn) {
      console.log('Already checked in today');
      return;
    }
    
    const newCheckIn: CheckIn = {
      id: Date.now().toString(),
      date: checkIn.date || new Date().toISOString(),
      activePart: checkIn.activePart,
      selfState: checkIn.selfState,
      tokens: checkIn.tokens,
    };
    
    // Calculate streak
    let newStreak = userData.selfStreak;
    if (checkIn.selfState) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      const hadYesterdayCheckIn = userData.lastCheckInDate?.split('T')[0] === yesterdayStr;
      
      if (hadYesterdayCheckIn || userData.selfStreak === 0) {
        newStreak = userData.selfStreak + 1;
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 0;
    }
    
    // Add tokens (1 token per check-in, 2 if in Self state)
    const tokensToAdd = checkIn.selfState ? 2 : 1;
    
    await saveUserData({
      checkIns: [...userData.checkIns, newCheckIn],
      selfStreak: newStreak,
      totalTokens: userData.totalTokens + tokensToAdd,
      lastCheckInDate: newCheckIn.date,
    });
  } catch (error) {
    console.error('Error adding check-in:', error);
  }
};

export const clearUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};
