# TARU Technical Architecture

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TARU System Architecture                          │
│                                                                             │
│  Legend:  ✅ = Implemented    ⚠️ = Partial    ❌ = Not Started              │
└─────────────────────────────────────────────────────────────────────────────┘


┌──────────────────────── CLIENT LAYER ────────────────────────┐

    ┌──────────────────────────────────────────────────────┐
    │              iOS App (React Native)          ✅      │
    │                                                      │
    │  ┌────────────┐  ┌────────────┐  ┌────────────┐   │
    │  │ Onboarding │  │  IFS Check │  │   Resets   │   │
    │  │   Quiz     │  │     In     │  │  Exercises │   │
    │  │     ✅     │  │     ✅     │  │     ✅     │   │
    │  └────────────┘  └────────────┘  └────────────┘   │
    │                                                      │
    │  ┌────────────┐  ┌────────────┐  ┌────────────┐   │
    │  │ Community  │  │Intervention│  │   Profile  │   │
    │  │     ⚠️     │  │   Modal    │  │     ❌     │   │
    │  └────────────┘  └────────────┘  └────────────┘   │
    │                                                      │
    │  Data Storage: AsyncStorage ✅                      │
    │  Navigation: Expo Router ✅                         │
    │  Styling: Design Tokens ✅                          │
    └──────────────────────────────────────────────────────┘
                           │
                           │ HTTPS (❌ Not Connected)
                           │
    ┌──────────────────────────────────────────────────────┐
    │         Browser Extension (HealShield)       ❌      │
    │                                                      │
    │  ┌────────────┐  ┌────────────┐  ┌────────────┐   │
    │  │   Site     │  │  Sentiment │  │   Night    │   │
    │  │  Blocking  │  │  Analysis  │  │   Mode     │   │
    │  │     ❌     │  │     ❌     │  │     ❌     │   │
    │  └────────────┘  └────────────┘  └────────────┘   │
    │                                                      │
    │  Platforms: Chrome, Edge, Safari (❌)               │
    │  Event Types: 4 defined in spec (❌)                │
    └──────────────────────────────────────────────────────┘

┌──────────────────────── API GATEWAY ─────────────────────────┐

    ┌──────────────────────────────────────────────────────┐
    │           Backend API (Node.js/Express)      ❌      │
    │                                                      │
    │  Endpoints:                                          │
    │    POST   /auth/register                     ❌     │
    │    POST   /auth/login                        ❌     │
    │    GET    /users/profile                     ❌     │
    │    PUT    /users/archetype                   ❌     │
    │    POST   /checkins                          ❌     │
    │    GET    /interventions/:archetype          ❌     │
    │    POST   /community/messages                ❌     │
    │    POST   /webhooks/trigger                  ❌     │
    │                                                      │
    │  Authentication: JWT ❌                              │
    │  Rate Limiting: ❌                                   │
    │  CORS: ❌                                            │
    └──────────────────────────────────────────────────────┘

┌──────────────────────── SERVICE LAYER ───────────────────────┐

    ┌──────────────────────────────────────────────────────┐
    │        n8n Workflow Engine (Trigger Logic)   ❌      │
    │                                                      │
    │  Workflow Steps:                                     │
    │    1. Receive webhook from extension         ❌     │
    │    2. Validate token & user ID               ❌     │
    │    3. Fetch user archetype from DB           ❌     │
    │    4. Select intervention strategy           ❌     │
    │    5. Format push notification               ❌     │
    │    6. Send to FCM/Expo Push                  ❌     │
    │                                                      │
    │  Target Latency: < 5 seconds                         │
    └──────────────────────────────────────────────────────┘

    ┌──────────────────────────────────────────────────────┐
    │      Push Notification Service               ❌      │
    │                                                      │
    │  Provider: Firebase Cloud Messaging / Expo Push      │
    │                                                      │
    │  Features:                                           │
    │    • High-priority channel               ❌         │
    │    • Rich notifications                  ❌         │
    │    • Deep linking to app                 ❌         │
    │    • Offline retry logic                 ❌         │
    │    • Delivery tracking                   ❌         │
    └──────────────────────────────────────────────────────┘

    ┌──────────────────────────────────────────────────────┐
    │         AI Service (Athena Assistant)        ❌      │
    │                                                      │
    │  Provider: OpenAI / Anthropic Claude                 │
    │                                                      │
    │  Features:                                           │
    │    • Archetype-based system prompts      ❌         │
    │    • Context awareness                   ❌         │
    │    • Conversation history                ❌         │
    │    • Safety filters                      ❌         │
    └──────────────────────────────────────────────────────┘

┌──────────────────────── DATA LAYER ──────────────────────────┐

    ┌──────────────────────────────────────────────────────┐
    │         Primary Database (PostgreSQL)        ❌      │
    │                                                      │
    │  Tables:                                             │
    │    • users                               ❌         │
    │    • archetypes                          ❌         │
    │    • check_ins                           ❌         │
    │    • streaks                             ❌         │
    │    • interventions                       ❌         │
    │    • loved_one_letters                   ❌         │
    │    • community_messages                  ❌         │
    │    • trigger_events                      ❌         │
    │    • reset_completions                   ❌         │
    │                                                      │
    │  Indexes: ❌  |  Migrations: ❌  |  Backups: ❌      │
    └──────────────────────────────────────────────────────┘

    ┌──────────────────────────────────────────────────────┐
    │         Cache Layer (Redis)                  ❌      │
    │                                                      │
    │  Cached Data:                                        │
    │    • User sessions                       ❌         │
    │    • Archetype profiles                  ❌         │
    │    • Intervention content                ❌         │
    │    • Rate limiting counters              ❌         │
    └──────────────────────────────────────────────────────┘

    ┌──────────────────────────────────────────────────────┐
    │        Object Storage (S3 / Cloudinary)      ❌      │
    │                                                      │
    │  Assets:                                             │
    │    • User-uploaded letters               ❌         │
    │    • Audio recordings                    ❌         │
    │    • Profile images                      ❌         │
    │    • Custom intervention media           ❌         │
    └──────────────────────────────────────────────────────┘

┌──────────────────────── EXTERNAL INTEGRATIONS ───────────────┐

    ┌──────────────────────────────────────────────────────┐
    │         Apple Watch Integration              ❌      │
    │                                                      │
    │  Data Sources:                                       │
    │    • Step count                          ❌         │
    │    • Heart rate variability (HRV)        ❌         │
    │    • Sleep patterns                      ❌         │
    │    • Activity rings                      ❌         │
    │                                                      │
    │  Trigger Events:                                     │
    │    • steps_low                           ❌         │
    │    • hrv_spike                           ❌         │
    │    • poor_sleep                          ❌         │
    └──────────────────────────────────────────────────────┘

    ┌──────────────────────────────────────────────────────┐
    │         Analytics & Monitoring               ❌      │
    │                                                      │
    │  Tools:                                              │
    │    • Sentry (error tracking)             ❌         │
    │    • Mixpanel (analytics)                ❌         │
    │    • DataDog (infrastructure)            ❌         │
    │    • LogRocket (session replay)          ❌         │
    └──────────────────────────────────────────────────────┘
```

---

## 📁 Data Models

### User
```typescript
interface User {
  id: string;                    // UUID
  email: string;                 // Unique
  password_hash: string;         // Bcrypt
  archetype: Archetype;          // Warrior, Sage, Lover, Seeker
  created_at: Date;
  last_active: Date;
  push_token?: string;           // FCM/Expo token
  extension_token?: string;      // Browser extension auth
  timezone: string;
  bedtime?: string;              // HH:MM format
  settings: UserSettings;
}

interface UserSettings {
  notifications_enabled: boolean;
  site_blocking_enabled: boolean;
  quiet_hours: { start: string; end: string; };
  mentor_id?: string;
}
```

### CheckIn (IFS)
```typescript
interface CheckIn {
  id: string;
  user_id: string;
  part: string;                  // Which IFS part was active
  timestamp: Date;
  notes?: string;
}
```

### Streak
```typescript
interface Streak {
  id: string;
  user_id: string;
  type: 'self_led' | 'abstinence';
  current: number;
  best: number;
  last_check_in: Date;
}
```

### TriggerEvent
```typescript
interface TriggerEvent {
  id: string;
  user_id: string;
  event_type: 'site_blocked' | 'late_night' | 'sentiment_high' | 'idle_warning';
  timestamp: Date;
  payload: Record<string, any>;
  intervention_id?: string;      // Which intervention was sent
  user_response?: 'completed' | 'dismissed' | 'ignored';
}
```

### LovedOneLetter
```typescript
interface LovedOneLetter {
  id: string;
  user_id: string;
  subject: string;
  body: string;
  author_name?: string;
  audio_url?: string;            // Optional audio recording
  created_at: Date;
  last_used?: Date;
}
```

### CommunityMessage
```typescript
interface CommunityMessage {
  id: string;
  sender_id: string;
  recipient_id?: string;         // Null for group messages
  message_type: 'gratitude' | 'support' | 'ritual';
  content: string;
  timestamp: Date;
  is_public: boolean;
}
```

---

## 🔄 Data Flow Diagrams

### Onboarding Flow (Current - Working)
```
┌──────┐     ┌──────┐     ┌──────────┐     ┌────────────┐
│ User │────►│ Quiz │────►│Calculate │────►│   Store    │
│      │     │  Q&A │     │Archetype │     │AsyncStorage│
└──────┘     └──────┘     └──────────┘     └────────────┘
                                                    │
                                                    ▼
                                            ┌──────────────┐
                                            │ Show Result  │
                                            │   Screen     │
                                            └──────────────┘
```

### Trigger-to-Intervention Flow (Planned - Not Working)
```
┌──────────┐   event   ┌─────────┐   webhook   ┌──────────┐
│ Browser  │──────────►│Extension│────────────►│  Backend │
│ Activity │           │  Logic  │             │  Webhook │
└──────────┘           └─────────┘             └──────────┘
                                                     │
                                                     ▼
                                              ┌─────────┐
                                              │   n8n   │
                                              │Workflow │
                                              └─────────┘
                                                     │
                        ┌────────────────────────────┴────┐
                        ▼                                 ▼
                  ┌──────────┐                    ┌──────────┐
                  │ Fetch    │                    │ Select   │
                  │Archetype │                    │Intervent.│
                  └──────────┘                    └──────────┘
                        │                                 │
                        └────────────┬────────────────────┘
                                     ▼
                             ┌───────────────┐
                             │  Format &     │
                             │  Send Push    │
                             │  Notification │
                             └───────────────┘
                                     │
                                     ▼
                             ┌───────────────┐
                             │  Mobile App   │
                             │   Receives    │
                             │  Notification │
                             └───────────────┘
                                     │
                                     ▼
                             ┌───────────────┐
                             │  Open Modal   │
                             │   Display     │
                             │ Intervention  │
                             └───────────────┘
```

### IFS Check-In Flow (Current - Working)
```
┌──────┐     ┌───────────┐     ┌──────────┐     ┌────────────┐
│ User │────►│  Select   │────►│Increment │────►│   Update   │
│      │     │IFS Part   │     │ Streak   │     │AsyncStorage│
└──────┘     └───────────┘     └──────────┘     └────────────┘
                                                        │
                                                        ▼
                                                ┌──────────────┐
                                                │ Update Meter │
                                                │   Display    │
                                                └──────────────┘
```

---

## 🔐 Security Architecture

### Authentication Flow (Planned)
```
┌──────────┐                    ┌──────────┐
│  Mobile  │──── JWT Token ────►│ Backend  │
│   App    │◄─── Refresh ───────│   API    │
└──────────┘                    └──────────┘
                                      │
                                      ▼
                               ┌─────────────┐
                               │  Verify &   │
                               │  Authorize  │
                               └─────────────┘

┌──────────┐                    ┌──────────┐
│ Browser  │── Extension Token ►│ Backend  │
│Extension │◄── Validation ─────│ Webhook  │
└──────────┘                    └──────────┘
```

### Data Encryption
- **In Transit:** TLS 1.3 (❌ Not configured)
- **At Rest:** AES-256 (❌ Not configured)
- **Sensitive Fields:** Additional encryption layer (❌ Not implemented)
- **Key Management:** AWS KMS / HashiCorp Vault (❌ Not configured)

---

## 🚀 Deployment Architecture (Planned)

```
┌─────────────────── Production Environment ───────────────────┐
│                                                               │
│  ┌─────────────┐         ┌─────────────┐                    │
│  │   CDN       │         │  App Store  │                    │
│  │ (Images)    │         │  (iOS App)  │                    │
│  └─────────────┘         └─────────────┘                    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Load Balancer (AWS ALB / Cloudflare)        │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                    │
│         ┌────────────────┼────────────────┐                 │
│         ▼                ▼                ▼                 │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐           │
│  │   API    │     │   API    │     │   API    │           │
│  │ Server 1 │     │ Server 2 │     │ Server 3 │           │
│  └──────────┘     └──────────┘     └──────────┘           │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│                          ▼                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Database (Primary + Replica)           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Redis     │    │    n8n      │    │  Worker     │     │
│  │   Cache     │    │  Instance   │    │   Queue     │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                               │
└───────────────────────────────────────────────────────────────┘

Hosting Options:
  • AWS (ECS/Fargate, RDS, ElastiCache)
  • Heroku (simplest for MVP)
  • Railway / Render (good middle ground)
  • DigitalOcean App Platform
```

---

## 📊 Monitoring & Observability (Planned)

```
┌─────────────────── Monitoring Stack ─────────────────────┐
│                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Sentry    │  │  Mixpanel   │  │   DataDog   │     │
│  │   Errors    │  │  Analytics  │  │Infrastructure│     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                           │
│  Metrics to Track:                                       │
│    • API response times                                  │
│    • Error rates                                         │
│    • Push notification delivery                          │
│    • Database query performance                          │
│    • User session duration                               │
│    • Feature usage                                       │
│    • Trigger-to-intervention latency (< 5s goal)        │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing Strategy (Not Yet Implemented)

```
┌─────────────────── Test Pyramid ─────────────────────┐
│                                                       │
│                      ┌───────┐                       │
│                      │  E2E  │  (Detox)              │
│                      └───────┘                       │
│                   ┌─────────────┐                    │
│                   │ Integration │  (Jest + React)    │
│                   └─────────────┘                    │
│              ┌─────────────────────┐                 │
│              │   Unit Tests        │  (Jest)         │
│              └─────────────────────┘                 │
│                                                       │
│  Current Coverage: 0%                                │
│  Target Coverage: 80%                                │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## 📦 Tech Stack Summary

### Frontend (✅ Decided, Partially Implemented)
- **Framework:** React Native + TypeScript
- **Navigation:** Expo Router
- **State:** React Hooks + AsyncStorage
- **Styling:** StyleSheet + Design Tokens
- **Build:** Expo (EAS Build for production)

### Backend (❌ Not Decided or Implemented)
- **API Framework:** Node.js + Express (recommended)
  - Alternatives: NestJS, Fastify, Koa
- **Database:** PostgreSQL (recommended)
  - Alternatives: MySQL, MongoDB, Firestore
- **Cache:** Redis
- **Storage:** AWS S3 / Cloudinary
- **Queue:** Bull / BullMQ (for async jobs)

### Workflow Automation (⚠️ Specified)
- **Engine:** n8n (specified in docs)
  - Alternative: Zapier, Temporal, custom Node.js

### Push Notifications (❌ Not Implemented)
- **Service:** Firebase Cloud Messaging + Expo Push
  - iOS: APNs via Firebase
  - Android: FCM (if expanding)

### AI (❌ Not Implemented)
- **Provider:** OpenAI GPT-4 or Anthropic Claude
- **Framework:** LangChain (for conversation management)

### Browser Extension (❌ Not Implemented)
- **Framework:** WebExtension API
- **Build:** Webpack + TypeScript
- **Supported:** Chrome, Edge, Safari (MV3)

---

## 🔗 API Endpoints (Planned)

### Authentication
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
POST   /api/v1/auth/forgot-password
```

### Users
```
GET    /api/v1/users/me
PUT    /api/v1/users/me
DELETE /api/v1/users/me
PUT    /api/v1/users/archetype
GET    /api/v1/users/stats
```

### Check-Ins
```
POST   /api/v1/checkins
GET    /api/v1/checkins
GET    /api/v1/checkins/:id
GET    /api/v1/streaks
```

### Interventions
```
GET    /api/v1/interventions/:archetype
POST   /api/v1/letters
GET    /api/v1/letters
PUT    /api/v1/letters/:id
DELETE /api/v1/letters/:id
```

### Community
```
POST   /api/v1/messages
GET    /api/v1/messages
GET    /api/v1/rituals
POST   /api/v1/rituals/:id/join
```

### Triggers (Webhook)
```
POST   /api/v1/webhooks/trigger
```

---

## 📝 Configuration Management (Needed)

### Environment Variables
```bash
# App
NODE_ENV=production
PORT=3000
API_BASE_URL=https://api.taru.app

# Database
DATABASE_URL=postgresql://user:pass@host:5432/taru
REDIS_URL=redis://host:6379

# Auth
JWT_SECRET=xxx
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=xxx
REFRESH_TOKEN_EXPIRES_IN=30d

# Push Notifications
FIREBASE_PROJECT_ID=xxx
FIREBASE_PRIVATE_KEY=xxx
EXPO_PUSH_TOKEN=xxx

# AI
OPENAI_API_KEY=xxx
ANTHROPIC_API_KEY=xxx

# Storage
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
S3_BUCKET=taru-assets

# Monitoring
SENTRY_DSN=xxx
MIXPANEL_TOKEN=xxx
DATADOG_API_KEY=xxx
```

---

## 🎯 Next Steps: Architecture Implementation

### Phase 1: Foundation (Weeks 1-2)
1. Set up project repository structure
2. Initialize backend API with Express
3. Configure PostgreSQL database
4. Implement JWT authentication
5. Create initial database migrations
6. Set up development environment

### Phase 2: Core Features (Weeks 3-5)
1. Build user profile endpoints
2. Implement check-in system (backend)
3. Create intervention delivery system
4. Set up push notification service
5. Build basic browser extension

### Phase 3: Integration (Weeks 6-8)
1. Connect mobile app to backend
2. Implement trigger webhook
3. Configure n8n workflows
4. Test end-to-end trigger flow
5. Add error handling and monitoring

### Phase 4: Enhancement (Weeks 9-12)
1. Community features backend
2. AI assistant integration
3. Advanced analytics
4. Performance optimization
5. Security hardening

---

*This architecture document represents the planned technical implementation of TARU. It will be updated as components are built and deployed.*
