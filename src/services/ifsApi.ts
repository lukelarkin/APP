import axios from 'axios';
import { IFSCheckInDTO } from '../types/IFSCheckInDTO';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.taruapp.com/v1';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
});

// --- IFS Check-In --------------------------------------------------
export async function postIFSCheckIn(data: IFSCheckInDTO) {
  console.info('🔄 [IFS API] Starting check-in sync', {
    userId: data.userId,
    archetype: data.archetype,
    partStage: data.partStage,
    reflectionLength: data.reflection?.length || 0
  });

  try {
    const res = await api.post('/ifs/checkin', data);
    console.info('✅ [IFS API] Check-in sync successful', {
      id: res.data.id,
      userId: data.userId,
      timestamp: res.data.createdAt
    });
    return res.data;
  } catch (error) {
    console.error('❌ [IFS API] Check-in sync failed', {
      userId: data.userId,
      error: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
}

export async function syncIFSBatch(items: IFSCheckInDTO[]) {
  console.info('🔄 [IFS API] Starting batch sync', {
    itemCount: items.length,
    userIds: [...new Set(items.map(item => item.userId))]
  });

  try {
    const res = await api.post('/ifs/sync', { checkIns: items });
    console.info('✅ [IFS API] Batch sync successful', {
      syncedCount: res.data.count,
      totalItems: items.length
    });
    return res.data;
  } catch (error) {
    console.error('❌ [IFS API] Batch sync failed', {
      itemCount: items.length,
      error: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
}
