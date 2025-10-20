/**
 * Expo Router wrapper for the IFS Check-In flow.
 * 
 * This provides the IFSProvider context to IFSCheckIn component,
 * enabling centralized mood/part tracking, streak management,
 * and intervention routing.
 * 
 * Route: /checkin
 */
import React from 'react';
import { IFSProvider } from '../../phase1/context/IFSContext';
import IFSCheckIn from '../../phase1/checkin/IFSCheckIn';

export default function CheckInRoute() {
  return (
    <IFSProvider>
      <IFSCheckIn />
    </IFSProvider>
  );
}
