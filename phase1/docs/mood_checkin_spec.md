# Mood Check-In Specification

This document describes the mood logging and IFS check-in flow in TARU, including the quadrant-based emotion model, data structure, privacy considerations, gamification rules, and flow timing.

## Overview

The mood check-in is the first step in TARU's daily IFS practice. Users select an emotion and rate its intensity before proceeding to identify which inner "part" feels most active. This two-step flow accomplishes several goals:

1. **Emotional Awareness**: Helps users develop the capacity to name and locate their emotional state
2. **Self-Energy Tracking**: Adjusts the user's Self-energy level based on mood quadrant and intensity
3. **Personalized Interventions**: Suggests appropriate interventions (breathing exercises, journaling, gratitude rituals, etc.) based on emotional state and archetype
4. **Streak Gamification**: Awards Ubuntu tokens and tracks self-led streaks to encourage consistent practice

## Quadrant-Based Emotion Model

Emotions are organized using the **circumplex model of affect**, which maps emotions across two dimensions:

- **Valence**: Pleasant (positive) vs. Unpleasant (negative)
- **Arousal**: High energy vs. Low energy

This creates four quadrants:

### 1. High Pleasant (High Energy + Pleasant)
**Visual Color**: Green (`colors.accent2`)

Emotions:
- Excited
- Energized
- Joyful
- Happy
- Enthusiastic
- Inspired

**Typical Interventions**: Gratitude rituals, journaling to channel energy, community connection

**Self-Energy Impact**: +6 to +10 (base +5, plus intensity)

### 2. High Unpleasant (High Energy + Unpleasant)
**Visual Color**: Red (`colors.accent4`)

Emotions:
- Anxious
- Angry
- Stressed
- Frustrated
- Irritated
- Overwhelmed

**Typical Interventions**: Physiologic resets (breathing), journaling, grounding exercises

**Self-Energy Impact**: -3 to -7 (base -2, minus intensity)

### 3. Low Unpleasant (Low Energy + Unpleasant)
**Visual Color**: Blue (`colors.accent3`)

Emotions:
- Sad
- Depressed
- Lonely
- Hopeless
- Tired
- Disconnected

**Typical Interventions**: Loved-one letters, gratitude rituals, compassionate journaling

**Self-Energy Impact**: -4 to -8 (base -3, minus intensity)

### 4. Low Pleasant (Low Energy + Pleasant)
**Visual Color**: Yellow/Gold (`colors.accent`)

Emotions:
- Calm
- Peaceful
- Content
- Relaxed
- Serene
- Grounded

**Typical Interventions**: Gratitude rituals, mindful journaling, maintaining present state

**Self-Energy Impact**: +4 to +8 (base +3, plus intensity)

## Data Shape

### MoodLog Interface
```typescript
interface MoodLog {
  emotion: Emotion;        // Specific emotion selected
  quadrant: Quadrant;      // Computed quadrant
  intensity: 1 | 2 | 3 | 4 | 5;  // User-rated intensity
  timestamp: string;       // ISO 8601 timestamp
  note?: string;           // Optional user note
}
```

### Storage Keys
- `moodLogs`: Array of MoodLog entries (JSON)
- `lastMoodDate`: ISO date string of last mood entry
- `lastPartDate`: ISO date string of last part selection
- `selfLedStreak`: Number of consecutive days with both mood + part completed
- `ubuntuTokens`: Total tokens earned
- `selfEnergy`: Current Self-energy level (0-100)

## Privacy and Data Handling

### Local-First Storage
- All mood data is stored **locally** on the device using AsyncStorage
- No mood logs are transmitted to external servers unless explicitly enabled by the user
- Complies with Apple Health data privacy guidelines

### Optional Cloud Sync
- Users may opt-in to sync mood data to enable:
  - Cross-device access
  - Long-term trend analysis
  - AI-powered insights from Athena
- Synced data is encrypted in transit (HTTPS/TLS) and at rest
- Users can delete all cloud data at any time

### Anonymization for Research
- Aggregated, anonymized mood trends may be used for research (opt-in)
- No personally identifiable information is included
- Users receive clear consent prompts before any data sharing

## Gamification Rules

### Streak Tracking
The **self-led streak** measures consecutive days where the user completes **both** the mood check-in and part selection.

**Rules**:
1. Streak increments only when both mood AND part are logged on the same calendar day
2. If only mood is logged, no streak increment occurs (but tokens are still awarded)
3. If only part is logged, no streak increment occurs
4. Streak resets to 0 if a full day passes without completing both steps
5. Streak display caps at 7 days for the visual meter, but underlying value continues growing

### Ubuntu Token Awards

**Tokens are awarded for reconnective actions**, not just completion:

| Action | Tokens | Reasoning |
|--------|--------|-----------|
| Daily mood check-in | 1 | Reconnecting with emotions |
| Part selection | 0 | Preparatory step (no token until combined) |
| Both mood + part in one day | +2 bonus | Full daily practice completed |
| Completing a suggested intervention | 3 | Active engagement with healing |
| Sharing gratitude in community | 2 | Ubuntu principle: "I am because we are" |
| Reaching out when triggered | 5 | Courage to seek connection |

**Token Philosophy**: Tokens celebrate **connection** and **courage**, not mere routine. This prevents gamification from becoming addictive itself.

### Self-Energy Adjustments

Self-energy represents the user's capacity to lead from Self (IFS concept). It's influenced by mood:

- **High Pleasant emotions boost energy**: Feeling joyful or inspired increases Self capacity
- **Low Pleasant emotions sustain energy**: Calm and content maintain equilibrium
- **High Unpleasant emotions drain energy**: Anxiety and anger tax the nervous system
- **Low Unpleasant emotions drain energy more**: Depression and hopelessness require more recovery

Self-energy is capped at 0-100 and is used to:
- Suggest rest when energy is low (<30)
- Recommend physiologic resets or community connection when depleted
- Celebrate high energy states (>70) by suggesting gratitude practices

## Flow and Timing

### Ideal Check-In Timing

**Morning (8-10 AM)**: Recommended default
- Establishes emotional baseline for the day
- Allows time to complete suggested interventions
- Aligns with cortisol awakening response

**Alternative Times**:
- Before bed (reflection on the day)
- During craving events (just-in-time intervention)
- After stressful episodes (processing and grounding)

### Flow Steps

1. **User navigates to `/checkin` route**
   - IFSProvider loads streak, tokens, archetype from AsyncStorage
   - Screen displays EmotionPicker

2. **Step 1: Emotion Selection**
   - User selects emotion from quadrant-organized list
   - User rates intensity (1-5)
   - Calls `recordMood()` which:
     - Persists MoodLog to AsyncStorage
     - Updates Self-energy based on quadrant + intensity
     - Awards 1 Ubuntu token
     - Returns intervention suggestions ranked by priority

3. **Step 2: Part Selection**
   - Screen transitions to part selection
   - Parts are ordered by archetype preference
   - User selects active part (e.g., Inner Critic, Wounded Child)
   - Calls `recordPartWork()` which:
     - Records today's part work
     - If both mood + part done today, increments streak and awards +2 bonus tokens

4. **Intervention Routing**
   - Based on top intervention suggestion, user is routed to:
     - `/resets` for physiologic resets (breathing exercises)
     - Loved-one letter screen (future)
     - Journaling prompt screen (future)
     - Gratitude ritual screen (future)
   - Fallback: Return to home screen

### Notification Timing (Future)

- **Daily Reminder**: 9 AM (customizable)
- **Evening Reflection**: 8 PM if morning check-in was skipped
- **Craving-Triggered**: Within 5 seconds of browser extension trigger

## Intervention Prioritization Logic

Interventions are scored based on three factors:

1. **Emotion-specific preferences** (highest weight): Certain emotions benefit most from specific interventions (e.g., anxious → breathing)
2. **Quadrant preferences** (medium weight): Fallback based on quadrant
3. **Archetype preferences** (base weight): User's substitution priority from archetype profile

**Intensity modifier**: High-intensity emotions (4-5) boost physiologic resets

Example scoring for a Warrior feeling "anxious" at intensity 5:
- `physiologicReset`: 10 (emotion) + 6 (quadrant) + 2 (archetype) + 3 (intensity) = 21
- `wildernessJournal`: 8 (emotion) + 4.5 (quadrant) + 4 (archetype) = 16.5
- `lovedOneLetter`: 0 + 0 + 3 (archetype) = 3

→ User is routed to physiologic reset (breathing exercise)

## Future Enhancements

1. **AI-Powered Patterns**: Athena analyzes mood trends and surfaces insights
2. **Voice Journaling**: Speak emotions instead of typing
3. **Biometric Integration**: Import HRV, sleep quality from wearables to contextualize mood
4. **Social Mood Sharing**: Opt-in to share mood anonymously with community for solidarity
5. **Intervention Efficacy Tracking**: Measure how well interventions shift mood over time

---

This specification provides the foundation for TARU's mood-aware, trauma-informed check-in flow. Always prioritize emotional safety, privacy, and authentic connection over metrics or engagement loops.
