# IFS Check-In Feature Documentation

## Overview

The IFS (Internal Family Systems) Check-In feature allows users to record daily reflections about their internal parts and track their self-connection streak. The feature includes both frontend (React Native) and backend (Node.js/Express) components with offline-first architecture.

## Architecture

### Frontend (React Native)
- **Screen**: `src/screens/IFSCheckInScreen.tsx`
- **Hook**: `src/hooks/useIFSCheckIn.ts`
- **API Service**: `src/services/ifsApi.ts`
- **Types**: `src/types/IFSCheckInDTO.ts`

### Backend (Node.js/Express)
- **Routes**: `src/routes/ifs.ts`
- **Database**: PostgreSQL with Prisma ORM
- **Model**: `IFSCheckIn` in Prisma schema

## Data Flow

```
User Input → Local Storage → API Sync → Database
     ↓              ↓           ↓         ↓
Reflection → AsyncStorage → Backend → PostgreSQL
```

1. User enters reflection in the UI
2. Data is immediately saved to AsyncStorage (offline-first)
3. Hook attempts to sync with backend API
4. Backend saves to PostgreSQL database
5. Streak is calculated based on consecutive daily check-ins

## API Endpoints

### POST /ifs/checkin
Creates a single IFS check-in record.

**Request Body:**
```json
{
  "userId": "string",
  "archetype": "string",
  "partStage": "string", 
  "reflection": "string"
}
```

**Response:**
```json
{
  "id": "cmh9krztf0001c4noptx1e4zy",
  "userId": "test123",
  "archetype": "Warrior",
  "partStage": "Notice",
  "reflection": "Test reflection",
  "createdAt": "2025-10-27T20:13:23.860Z",
  "updatedAt": "2025-10-27T20:13:23.860Z"
}
```

### POST /ifs/sync
Batch sync for offline queue processing.

**Request Body:**
```json
{
  "checkIns": [
    {
      "userId": "string",
      "archetype": "string",
      "partStage": "string",
      "reflection": "string"
    }
  ]
}
```

**Response:**
```json
{
  "count": 1
}
```

## Data Transfer Objects (DTOs)

### IFSCheckInDTO
```typescript
export interface IFSCheckInDTO {
  id?: string;
  userId: string;
  date?: string; // ISO date string
  archetype?: string;
  partStage?: string;
  reflection?: string;
  tokens?: number;
  activePart?: string;
  selfState?: boolean;
  synced?: boolean;
}
```

### Database Model
```prisma
model IFSCheckIn {
  id          String   @id @default(cuid())
  userId      String
  archetype   String
  partStage   String
  reflection  String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("ifs_check_ins")
}
```

## Testing with cURL

### Test Single Check-In
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user-123",
    "archetype": "Warrior",
    "partStage": "Notice",
    "reflection": "I noticed my inner critic was very active today during the meeting."
  }' \
  http://localhost:3000/ifs/checkin
```

### Test Batch Sync
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{
    "checkIns": [
      {
        "userId": "test-user-123",
        "archetype": "Sage",
        "partStage": "Unblend",
        "reflection": "I was able to unblend from my protector part during meditation."
      },
      {
        "userId": "test-user-123", 
        "archetype": "Lover",
        "partStage": "Integrate",
        "reflection": "I felt more connected to my authentic self today."
      }
    ]
  }' \
  http://localhost:3000/ifs/sync
```

### Test Health Check
```bash
curl http://localhost:3000/health
```

## Database Management with Prisma Studio

### Start Prisma Studio
```bash
cd /Users/lukelarkin/Downloads/APP-backend
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can:
- View all IFS check-ins in the `ifs_check_ins` table
- Edit records directly
- Filter and search data
- Monitor database changes in real-time

### Database Operations

#### View All Check-Ins
```bash
cd /Users/lukelarkin/Downloads/APP-backend
npx prisma db seed
```

#### Reset Database (Development Only)
```bash
cd /Users/lukelarkin/Downloads/APP-backend
npx prisma migrate reset --force
```

#### Generate Prisma Client
```bash
cd /Users/lukelarkin/Downloads/APP-backend
npx prisma generate
```

## Frontend Testing

### Start Development Servers
```bash
# Terminal 1 - Backend
cd /Users/lukelarkin/Downloads/APP-backend
npm run dev

# Terminal 2 - Frontend  
cd /Users/lukelarkin/Downloads/APP
npx expo start -c
```

### Test Flow
1. Open app in Expo Go or web browser
2. Navigate to "IFS Check-In" screen
3. Enter a reflection about your internal parts
4. Submit the check-in
5. Verify data appears in Prisma Studio
6. Test offline functionality by disconnecting network

## Streak Calculation Logic

The streak is calculated based on consecutive daily check-ins with a 1.5-day tolerance:

```typescript
// Pseudo-code for streak calculation
let currentStreak = 0;
let lastDate = new Date();

for (const checkIn of sortedCheckIns) {
  const checkInDate = new Date(checkIn.date);
  const daysDiff = (lastDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
  
  if (currentStreak === 0) {
    currentStreak = 1;
    lastDate = checkInDate;
  } else if (daysDiff <= 1.5) {
    currentStreak++;
    lastDate = checkInDate;
  } else {
    break; // Streak broken
  }
}
```

## Environment Variables

### Frontend (.env)
```
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### Backend (.env)
```
DATABASE_URL="postgresql://lukelarkin@localhost:5432/taru_dev?schema=public"
JWT_SECRET="your-secret-key-change-in-production"
PORT=3000
NODE_ENV=development
```

## Error Handling

### Frontend
- Network errors are caught and logged
- Data is always saved locally first
- Failed syncs are retried on next app launch
- Graceful degradation when offline

### Backend
- Input validation for required fields
- Database connection error handling
- Proper HTTP status codes
- Detailed error logging

## Troubleshooting

### Common Issues

1. **"Table does not exist" error**
   ```bash
   cd /Users/lukelarkin/Downloads/APP-backend
   npx prisma db push
   ```

2. **"Connection refused" error**
   - Check if backend is running: `ps aux | grep nodemon`
   - Verify port 3000 is free: `lsof -i :3000`

3. **Frontend can't reach backend**
   - Check `EXPO_PUBLIC_API_URL` in frontend `.env`
   - Ensure backend is running on correct port

4. **Database connection issues**
   - Verify PostgreSQL is running
   - Check `DATABASE_URL` in backend `.env`
   - Test connection: `npx prisma db push`

## Development Notes

- The feature uses offline-first architecture for reliability
- AsyncStorage provides local persistence
- Prisma provides type-safe database operations
- The streak calculation allows for 1.5-day gaps to account for timezone differences
- All API calls include proper error handling and logging
