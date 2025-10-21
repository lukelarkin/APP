# TARU - Quick Reference Guide

## What is TARU?

TARU is a trauma-informed addiction recovery app that helps people heal from tech-based addictions (primarily porn and gambling) through:
- **Jungian Archetypes** - Personalized identity framework
- **Internal Family Systems** - Daily self-awareness practice  
- **Just-in-time Interventions** - Quick exercises during cravings
- **Ubuntu Philosophy** - Community-based healing ("I am because we are")

---

## Current Status: Phase 1 - UI Foundation

✅ **What Works Now:**
- Archetype quiz and personalization
- IFS daily check-ins with streak tracking
- 3 guided nervous system reset exercises
- Complete intervention content library
- Professional dark theme design

🔧 **What's Coming Next:**
- Backend API and user authentication
- Push notification system
- Browser extension for trigger detection
- Real-time community features
- AI assistant "Athena"

See [APP_SYNOPSIS.md](./APP_SYNOPSIS.md) for full details.

---

## Project Structure

```
/phase1
  /onboarding       - Archetype quiz and results
  /checkin          - IFS daily check-in screen
  /resets           - 3 nervous system reset exercises
  /community        - Community connection UI (frontend only)
  /data             - Archetypes, interventions, reset definitions
  /theme            - Design system (colors, spacing)
  /assets/resets    - Images for reset exercises
  /docs             - Technical specs and rationale
```

---

## Key Components

### Archetypes (4 Types)
- **Warrior** - Courageous, disciplined (tone: challenger)
- **Sage** - Thoughtful, reflective (tone: mentor)
- **Lover** - Compassionate, connection-oriented (tone: comrade)
- **Seeker** - Curious, adventurous (tone: guide)

### IFS Parts (8 Types)
Inner Critic, Rebel, Wounded Child, Pleaser, Analyzer, Controller, Explorer, Protector

### Nervous System Resets (3 Exercises)
1. **Alternate Nostril Breathing** - 60 seconds
2. **Physiologic Sigh** - 30 seconds
3. **EFT Tapping** - 90 seconds

### Interventions (3 Types)
1. **Loved One Letters** - Pre-written encouragement
2. **Wilderness Journal** - Reflective prompts
3. **Gratitude Rituals** - Ubuntu-style ceremonies

---

## Tech Stack

- **Framework:** React Native (TypeScript) with Expo Router
- **Storage:** AsyncStorage for local persistence
- **Navigation:** File-based routing via Expo Router
- **Styling:** StyleSheet with design tokens

---

## Development Priorities

1. **Immediate:** Backend API + user auth
2. **Short-term:** Push notifications + browser extension MVP
3. **Medium-term:** Trigger pipeline + community backend + AI
4. **Long-term:** Wearables + advanced gamification + App Store launch

---

## Key Documentation

- **[APP_SYNOPSIS.md](./APP_SYNOPSIS.md)** - Comprehensive overview of all features
- **[phase1/docs/trigger_spec.md](./phase1/docs/trigger_spec.md)** - Technical spec for trigger system
- **[phase1/docs/behavioral_rationale.md](./phase1/docs/behavioral_rationale.md)** - Psychology and design principles

---

## Philosophy

TARU uses trauma-informed, non-shaming approaches inspired by:
- Carl Jung (archetypes)
- Internal Family Systems therapy
- Ubuntu philosophy (Gabor Maté)
- Marcus Aurelius (stoic journaling)
- Patrick Carnes & Tony Robbins (state/story shifting)
- David Hawkins (letting go)

The goal: Help users reconnect with their authentic selves through compassionate intervention, not shame or willpower.
