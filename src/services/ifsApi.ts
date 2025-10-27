import axios from 'axios';
import { IFSCheckInDTO } from '../types/IFSCheckInDTO';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.taruapp.com/v1';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
});

// --- IFS Check-In --------------------------------------------------
export async function postIFSCheckIn(data: IFSCheckInDTO) {
  try {
    const res = await api.post('/ifs/checkin', data);
    return res.data;
  } catch (error) {
    console.warn('postIFSCheckIn failed:', error);
    throw error;
  }
}

export async function syncIFSBatch(items: IFSCheckInDTO[]) {
  try {
    const res = await api.post('/ifs/sync', { checkIns: items });
    return res.data;
  } catch (error) {
    console.warn('syncIFSBatch failed:', error);
    throw error;
  }
}
