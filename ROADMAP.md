# TARU Development Roadmap

## 🗺️ Visual Project Status

```
┌─────────────────────────────────────────────────────────────────┐
│                    TARU Phase 1 Progress                        │
│                        ~35% Complete                             │
└─────────────────────────────────────────────────────────────────┘

                    ███████████░░░░░░░░░░░░░░░░░░░░░


┌─────────────────────────────────────────────────────────────────┐
│  ✅ COMPLETED (Ready for Use)                                    │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐
    │   Onboarding     │  100% ████████████
    │   System         │  • Archetype quiz (5 questions)
    └──────────────────┘  • 4 archetypes (Warrior/Sage/Lover/Seeker)
                          • Personalized result screen
                          • AsyncStorage persistence

    ┌──────────────────┐
    │   IFS Check-In   │  100% ████████████
    │   System         │  • 8 internal parts
    └──────────────────┘  • Archetype-ordered parts
                          • Streak counter
                          • Self-meter visualization

    ┌──────────────────┐
    │   Nervous System │  100% ████████████
    │   Resets         │  • Alternate Nostril Breathing (60s)
    └──────────────────┘  • Physiologic Sigh (30s)
                          • EFT Tapping (90s)
                          • Visual guides + timers

    ┌──────────────────┐
    │   Intervention   │  100% ████████████
    │   Content        │  • Loved one letters (4)
    └──────────────────┘  • Wilderness journal prompts (8)
                          • Gratitude rituals (8)
                          • Archetype-personalized

    ┌──────────────────┐
    │   Design System  │  100% ████████████
    │   & Theme        │  • Dark theme colors
    └──────────────────┘  • Typography tokens
                          • Consistent spacing
                          • Semantic color names


┌─────────────────────────────────────────────────────────────────┐
│  ⚠️  PARTIALLY COMPLETE                                          │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐
    │   Community      │   40% ████░░░░░░░
    │   Features       │  ✅ UI components complete
    └──────────────────┘  ❌ Backend not connected
                          ❌ Real-time messaging
                          ❌ Ritual scheduling
                          ❌ Mentor matching

    ┌──────────────────┐
    │   Trigger System │    0% (Specified) ░░░░░░░░░░
    │   Integration    │  ✅ Full specification written
    └──────────────────┘  ❌ Browser extension
                          ❌ Webhook API
                          ❌ n8n workflow
                          ❌ Push notifications


┌─────────────────────────────────────────────────────────────────┐
│  🔴 NOT STARTED (Critical Path)                                  │
└─────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐
    │   Backend API    │    0% ░░░░░░░░░░
    │   & Database     │  Priority: CRITICAL
    └──────────────────┘  • User authentication
                          • Profile management
                          • Data persistence
                          • API endpoints

    ┌──────────────────┐
    │   Push           │    0% ░░░░░░░░░░
    │   Notifications  │  Priority: HIGH
    └──────────────────┘  • Firebase/Expo Push setup
                          • Notification permissions
                          • Intervention modal
                          • Deep linking

    ┌──────────────────┐
    │   Browser        │    0% ░░░░░░░░░░
    │   Extension      │  Priority: HIGH
    └──────────────────┘  • Site blocking
                          • Trigger detection
                          • Event emission
                          • Settings UI

    ┌──────────────────┐
    │   AI Assistant   │    0% ░░░░░░░░░░
    │   "Athena"       │  Priority: MEDIUM
    └──────────────────┘  • LLM integration
                          • Archetype-based prompting
                          • Conversation UI
                          • Context awareness

    ┌──────────────────┐
    │   Wearable       │    0% ░░░░░░░░░░
    │   Integration    │  Priority: LOW
    └──────────────────┘  • Apple Watch support
                          • HRV monitoring
                          • Step tracking
                          • Activity triggers


┌─────────────────────────────────────────────────────────────────┐
│  📅 DEVELOPMENT TIMELINE                                         │
└─────────────────────────────────────────────────────────────────┘

Month 1: Foundation
├─ Week 1-2:  Project setup (package.json, deps, build config)
├─ Week 2-3:  Backend API + authentication + database
└─ Week 3-4:  Push notification infrastructure

Month 2: Core Features
├─ Week 5-6:  Browser extension MVP
├─ Week 6-7:  Trigger integration pipeline
└─ Week 7-8:  Community backend (messaging + persistence)

Month 3: Enhancement
├─ Week 9-10:  AI assistant integration (Athena)
├─ Week 10-11: Additional content + intervention types
└─ Week 11-12: Beta testing + bug fixes

Month 4-6: Polish & Launch
├─ Analytics & tracking
├─ Wearable integration
├─ Advanced gamification
├─ App Store submission
└─ Marketing & user acquisition


┌─────────────────────────────────────────────────────────────────┐
│  🎯 CRITICAL PATH TO MVP                                         │
└─────────────────────────────────────────────────────────────────┘

The following MUST be completed for a functional MVP:

  1. ✅ UI Components (DONE)
  2. ❌ Backend API + Auth (8-10 days)
  3. ❌ Push Notifications (5-7 days)
  4. ❌ Browser Extension (10-14 days)
  5. ❌ Trigger Pipeline (5-7 days)
  6. ❌ Testing + QA (7-10 days)

  Estimated MVP Timeline: 6-8 weeks from start


┌─────────────────────────────────────────────────────────────────┐
│  🔧 TECHNICAL DEBT & INFRASTRUCTURE                              │
└─────────────────────────────────────────────────────────────────┘

Current State:
  ✅ TypeScript components
  ✅ Well-structured code
  ✅ Good documentation

Missing:
  ❌ package.json / dependency management
  ❌ Build configuration
  ❌ Unit tests
  ❌ Integration tests
  ❌ CI/CD pipeline
  ❌ Error tracking (Sentry)
  ❌ Analytics (Mixpanel/Amplitude)
  ❌ App Store deployment config
  ❌ Environment configuration
  ❌ API versioning


┌─────────────────────────────────────────────────────────────────┐
│  💡 FEATURE PRIORITIZATION MATRIX                                │
└─────────────────────────────────────────────────────────────────┘

                    High Impact
                         │
         Browser Ext     │    Push Notif
         Backend API     │    Auth System
    ──────────────────────┼──────────────────────
         Wearables       │    AI Assistant
         Advanced        │    Community
         Gamification    │    Features
                         │
                    Low Impact


┌─────────────────────────────────────────────────────────────────┐
│  📊 COMPONENT DEPENDENCY GRAPH                                   │
└─────────────────────────────────────────────────────────────────┘

                    ┌─────────────┐
                    │   Backend   │
                    │     API     │
                    └──────┬──────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
    │  Auth   │      │  Push   │      │ Community│
    │ System  │      │  Notif  │      │ Backend  │
    └────┬────┘      └────┬────┘      └────┬────┘
         │                 │                 │
         │      ┌──────────┴────┐            │
         │      │               │            │
    ┌────▼──────▼───┐    ┌─────▼─────┐  ┌──▼────┐
    │   Browser     │    │Intervention│  │ Real- │
    │   Extension   │    │   Modal    │  │ Time  │
    └───────┬───────┘    └─────┬─────┘  │ Chat  │
            │                  │         └───────┘
            │      ┌───────────┘
            │      │
       ┌────▼──────▼────┐
       │  n8n Workflow  │
       │   (Triggers)   │
       └────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│  🎨 USER JOURNEY (Current State)                                 │
└─────────────────────────────────────────────────────────────────┘

Onboarding Flow:
  [Install App] ──► [Archetype Quiz] ──► [Result Screen] ──► [Home]
      ✅                  ✅                   ✅              ❌

Daily Use Flow:
  [Home] ──► [IFS Check-In] ──► [Streak Update] ──► [Home]
    ❌           ✅                    ✅              ❌

Craving Intervention (Planned):
  [Trigger Detected] ──► [Push Notif] ──► [Intervention Modal] ──► [Reset Exercise]
         ❌                   ❌                   ❌                      ✅

Community Flow (Planned):
  [Home] ──► [Community] ──► [Send Message/Join Ritual] ──► [Gratitude]
    ❌          ⚠️                      ❌                        ✅


┌─────────────────────────────────────────────────────────────────┐
│  📈 SUCCESS METRICS (Not Yet Tracked)                            │
└─────────────────────────────────────────────────────────────────┘

User Acquisition:
  • [ ] Daily active users (DAU)
  • [ ] Weekly active users (WAU)
  • [ ] Monthly active users (MAU)
  • [ ] Retention rate (D1, D7, D30)

Engagement:
  • [ ] Check-in completion rate
  • [ ] Reset exercise usage
  • [ ] Average session length
  • [ ] Notification response rate

Efficacy:
  • [ ] Successful craving interruptions
  • [ ] Average streak length
  • [ ] Self-reported wellness
  • [ ] Relapse reduction

Community:
  • [ ] Messages sent per user
  • [ ] Ritual participation rate
  • [ ] Mentor session completion
  • [ ] User-to-user connections


┌─────────────────────────────────────────────────────────────────┐
│  🔐 SECURITY CHECKLIST                                           │
└─────────────────────────────────────────────────────────────────┘

  ❌ Authentication system
  ❌ Secure token storage
  ❌ HTTPS/TLS for all APIs
  ❌ Data encryption at rest
  ❌ End-to-end encryption for messages
  ❌ Privacy policy
  ❌ Terms of service
  ❌ GDPR compliance
  ❌ Health data compliance (Apple HealthKit)
  ❌ User data export
  ❌ User data deletion
  ❌ Sensitive data minimization
  ❌ Audit logging


┌─────────────────────────────────────────────────────────────────┐
│  🎓 LEARNING & RESOURCES                                         │
└─────────────────────────────────────────────────────────────────┘

Recommended Reading:
  • Internal Family Systems Therapy (Richard Schwartz)
  • In the Realm of Hungry Ghosts (Gabor Maté)
  • Man and His Symbols (Carl Jung)
  • Meditations (Marcus Aurelius)
  • Letting Go (David Hawkins)

Technical Resources:
  • React Native Documentation
  • Expo Router Guide
  • Firebase Cloud Messaging
  • n8n Workflow Automation
  • TypeScript Best Practices


┌─────────────────────────────────────────────────────────────────┐
│  📞 NEXT STEPS FOR CONTRIBUTORS                                  │
└─────────────────────────────────────────────────────────────────┘

If you're new to the project:
  1. Read APP_SYNOPSIS.md (comprehensive overview)
  2. Read QUICK_REFERENCE.md (quick start guide)
  3. Review phase1/docs/ (specifications)
  4. Check existing components in phase1/
  5. Pick a task from the roadmap above
  6. Open a PR with your contribution

Priority Areas for Contribution:
  🔴 Backend API development
  🔴 Authentication system
  🔴 Push notification setup
  🔴 Browser extension development
  🟡 Testing infrastructure
  🟡 Documentation improvements
  🟢 UI/UX enhancements
  🟢 Content creation (interventions)


┌─────────────────────────────────────────────────────────────────┐
│  💬 QUESTIONS & FEEDBACK                                         │
└─────────────────────────────────────────────────────────────────┘

This roadmap represents the current state of TARU development.
For detailed feature specifications, see APP_SYNOPSIS.md.
For questions or suggestions, please open an issue.

---
Last Updated: October 2025
Version: Phase 1 - Foundation Components
