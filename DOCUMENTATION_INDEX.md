# 📚 TARU Documentation Index

Welcome to the TARU project documentation! This index will help you quickly find the information you need.

---

## 🎯 Start Here

**New to the project?** Read these documents in order:

1. **[README.md](./README.md)** - Quick project overview and getting started
2. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Essential information at a glance
3. **[APP_SYNOPSIS.md](./APP_SYNOPSIS.md)** - Comprehensive feature status and roadmap

---

## 📖 Core Documentation

### [README.md](./README.md)
- Project introduction
- Current status summary (35% complete)
- Tech stack overview
- Quick links to other docs

### [APP_SYNOPSIS.md](./APP_SYNOPSIS.md) ⭐ **Most Comprehensive**
**Length:** ~18,000 words | **Read Time:** 30-45 minutes

Complete overview covering:
- ✅ Completed features (onboarding, IFS, resets, interventions, design system)
- ⚙️ In-progress features (community UI, trigger specs)
- 🔴 Not started features (backend, push notifications, browser extension, AI)
- Feature completion matrix
- Recommended next steps
- Security considerations
- Success metrics
- Monetization options

**When to read:** When you need complete context about what exists, what's planned, and what needs to be built.

### [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
**Length:** ~3,400 words | **Read Time:** 5-10 minutes

Fast reference for:
- What is TARU?
- Current status at a glance
- Project structure
- Key components (archetypes, IFS parts, resets, interventions)
- Tech stack summary
- Development priorities
- Philosophy overview

**When to read:** When you need a quick refresher or to onboard someone in 10 minutes.

### [ROADMAP.md](./ROADMAP.md) ⭐ **Most Visual**
**Length:** ~12,000 words | **Read Time:** 15-20 minutes

Visual guide featuring:
- ASCII art progress bars for each component
- Timeline visualization (Months 1-6)
- Critical path to MVP
- Component dependency graph
- User journey diagrams
- Feature prioritization matrix
- Success metrics checklist
- Security checklist
- Contributor guide

**When to read:** When you want to see progress visually or plan development timelines.

### [ARCHITECTURE.md](./ARCHITECTURE.md) ⭐ **Most Technical**
**Length:** ~23,000 words | **Read Time:** 30-40 minutes

Technical deep-dive including:
- Complete system architecture diagram
- Client layer (iOS app + browser extension)
- API gateway specifications
- Service layer (n8n, push notifications, AI)
- Data layer (database, cache, storage)
- Data models (TypeScript interfaces)
- Data flow diagrams
- Security architecture
- Deployment architecture
- API endpoint specifications
- Environment configuration
- Tech stack decisions

**When to read:** When you're ready to start building backend systems or need technical specifications.

---

## 📂 Technical Specifications

### [phase1/docs/trigger_spec.md](./phase1/docs/trigger_spec.md)
**Length:** ~2,000 words | **Read Time:** 10 minutes

Defines the trigger integration system:
- Event producers (browser extension, wearables)
- Delivery pipeline (webhook → n8n → push notification)
- Message format specification
- Latency requirements (5-second target)
- Security and privacy considerations

**When to read:** When implementing the browser extension or trigger pipeline.

### [phase1/docs/behavioral_rationale.md](./phase1/docs/behavioral_rationale.md)
**Length:** ~1,500 words | **Read Time:** 8 minutes

Explains the psychology behind design decisions:
- Archetype-based onboarding rationale
- IFS daily check-in psychology
- Community connection philosophy
- Substitution interventions strategy
- Trauma-informed considerations

**When to read:** When you need to understand *why* features are designed the way they are.

---

## 🎨 Code Documentation

### Component Files
All React Native components in `phase1/` include inline documentation:
- **[phase1/onboarding/ArchetypeQuiz.tsx](./phase1/onboarding/ArchetypeQuiz.tsx)** - Quiz implementation
- **[phase1/onboarding/ArchetypeResult.tsx](./phase1/onboarding/ArchetypeResult.tsx)** - Result display
- **[phase1/checkin/IFSCheckIn.tsx](./phase1/checkin/IFSCheckIn.tsx)** - Daily check-in
- **[phase1/resets/ResetSelection.tsx](./phase1/resets/ResetSelection.tsx)** - Reset picker
- **[phase1/resets/AlternateNostrilBreathing.tsx](./phase1/resets/AlternateNostrilBreathing.tsx)** - Breathing exercise
- **[phase1/resets/PhysiologicSigh.tsx](./phase1/resets/PhysiologicSigh.tsx)** - Sigh exercise
- **[phase1/resets/EFTTapping.tsx](./phase1/resets/EFTTapping.tsx)** - Tapping exercise
- **[phase1/community/CommunityConnection.tsx](./phase1/community/CommunityConnection.tsx)** - Community UI

### Data Definitions
- **[phase1/data/archetypes.ts](./phase1/data/archetypes.ts)** - Archetype profiles and types
- **[phase1/data/interventions.ts](./phase1/data/interventions.ts)** - Intervention content library
- **[phase1/data/resets.ts](./phase1/data/resets.ts)** - Reset exercise definitions

### Design System
- **[phase1/theme/tokens.ts](./phase1/theme/tokens.ts)** - Colors, spacing, and design tokens

---

## 🗺️ Documentation by Use Case

### "I want to understand what TARU does"
1. Read [README.md](./README.md) (5 min)
2. Read [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) (10 min)
3. Read [phase1/docs/behavioral_rationale.md](./phase1/docs/behavioral_rationale.md) (8 min)

### "I want to contribute to the project"
1. Read [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) (10 min)
2. Read [APP_SYNOPSIS.md](./APP_SYNOPSIS.md) - "Next Steps" section (5 min)
3. Read [ROADMAP.md](./ROADMAP.md) - "Next Steps for Contributors" section (5 min)
4. Pick a task and start coding!

### "I need to build the backend"
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) (30-40 min)
2. Review data models and API specifications
3. Read [phase1/docs/trigger_spec.md](./phase1/docs/trigger_spec.md) (10 min)
4. Start with authentication system

### "I need to build the browser extension"
1. Read [phase1/docs/trigger_spec.md](./phase1/docs/trigger_spec.md) (10 min)
2. Read [ARCHITECTURE.md](./ARCHITECTURE.md) - "Browser Extension" section (5 min)
3. Read [APP_SYNOPSIS.md](./APP_SYNOPSIS.md) - "Trigger Integration System" (5 min)

### "I want to understand the psychology"
1. Read [phase1/docs/behavioral_rationale.md](./phase1/docs/behavioral_rationale.md) (8 min)
2. Read [APP_SYNOPSIS.md](./APP_SYNOPSIS.md) - "Key Insights" section (5 min)
3. Review archetype definitions in [phase1/data/archetypes.ts](./phase1/data/archetypes.ts)

### "I need to see the project timeline"
1. Read [ROADMAP.md](./ROADMAP.md) (15-20 min)
2. Check "Development Timeline" section
3. Review "Critical Path to MVP"

### "I need technical specifications"
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) (30-40 min)
2. Review specific sections as needed (data models, API endpoints, etc.)

---

## 📊 Documentation Statistics

| Document | Words | Read Time | Status | Focus |
|----------|-------|-----------|--------|-------|
| README.md | ~500 | 2 min | ✅ Complete | Overview |
| QUICK_REFERENCE.md | ~3,400 | 10 min | ✅ Complete | Quick facts |
| APP_SYNOPSIS.md | ~18,000 | 40 min | ✅ Complete | Comprehensive status |
| ROADMAP.md | ~12,000 | 20 min | ✅ Complete | Visual timeline |
| ARCHITECTURE.md | ~23,000 | 40 min | ✅ Complete | Technical specs |
| trigger_spec.md | ~2,000 | 10 min | ✅ Complete | Trigger system |
| behavioral_rationale.md | ~1,500 | 8 min | ✅ Complete | Psychology |

**Total:** ~60,400 words of documentation | ~130 minutes of reading time

---

## 🎯 Quick Status Summary

### What's Working Right Now
- ✅ Archetype quiz and personalization
- ✅ IFS daily check-in with streaks
- ✅ 3 guided nervous system reset exercises
- ✅ Intervention content library (letters, prompts, rituals)
- ✅ Professional dark theme design system

### What's Not Working Yet
- ❌ Backend API and authentication
- ❌ Push notifications
- ❌ Browser extension
- ❌ Trigger-to-intervention pipeline
- ❌ Real-time community features
- ❌ AI assistant "Athena"
- ❌ Wearable integration

### What to Build Next (Priority Order)
1. **Backend API + Authentication** (Critical)
2. **Push Notification System** (Critical)
3. **Browser Extension MVP** (High)
4. **Trigger Integration Pipeline** (High)
5. **Community Backend** (Medium)
6. **AI Assistant** (Medium)
7. **Wearable Integration** (Low)

---

## 🔄 Document Update Policy

- **APP_SYNOPSIS.md** - Updated when major features are completed
- **ROADMAP.md** - Updated monthly or when timeline changes
- **ARCHITECTURE.md** - Updated when technical decisions are made
- **README.md** - Updated when project status changes significantly
- **QUICK_REFERENCE.md** - Updated to stay in sync with APP_SYNOPSIS.md

Last comprehensive update: October 2025

---

## 💡 Tips for Reading

### For Developers
- Start with QUICK_REFERENCE.md
- Deep dive into ARCHITECTURE.md when ready to build
- Refer to APP_SYNOPSIS.md for feature context
- Check ROADMAP.md for task prioritization

### For Designers
- Start with behavioral_rationale.md
- Review existing components in phase1/
- Check design tokens in phase1/theme/tokens.ts
- See ROADMAP.md for UI that needs designing

### For Product Managers
- Start with APP_SYNOPSIS.md
- Use ROADMAP.md for timeline planning
- Reference trigger_spec.md for feature requirements
- Check behavioral_rationale.md for user stories

### For Stakeholders
- Read README.md and QUICK_REFERENCE.md
- Review "Feature Completion Summary" in APP_SYNOPSIS.md
- Check timeline in ROADMAP.md
- Review "Key Insights" in APP_SYNOPSIS.md

---

## 🙋 Have Questions?

If you can't find what you're looking for:
1. Check if your question is in the FAQ section of APP_SYNOPSIS.md
2. Search across all docs (they're all markdown)
3. Open a GitHub issue with the `documentation` label
4. Ask in the project Discord/Slack (if available)

---

## 📝 Contributing to Documentation

To improve these docs:
1. Fork the repository
2. Make your changes
3. Ensure consistency with existing style
4. Submit a PR with a clear description
5. Tag with `documentation` label

Documentation improvements are always welcome! Especially:
- Fixing typos or unclear explanations
- Adding diagrams or visual aids
- Expanding technical specifications
- Adding code examples
- Creating tutorials or how-to guides

---

*This documentation represents the complete knowledge base for TARU as of October 2025. Happy building! 🚀*
