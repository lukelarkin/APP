# Archetype Onboarding Quiz - Implementation Summary

This document provides an overview of the archetype onboarding quiz implementation for Phase 1 of the TARU app.

## Overview

The archetype onboarding quiz is a 5-question assessment that helps users discover their primary behavioral archetype (Warrior, Sage, Lover, or Seeker). The result personalizes their experience throughout the app, influencing Athena's conversational tone, IFS part sequencing, and intervention priorities.

## Components

### 1. ArchetypeQuiz.tsx (`phase1/onboarding/ArchetypeQuiz.tsx`)

**Purpose**: Interactive quiz component that guides users through 5 questions.

**Key Features**:
- 5 questions with 4 answers each
- Each answer maps directly to one archetype (+1 point)
- Progress indicator (e.g., "3 / 5")
- Back navigation to revise previous answers
- Disabled "Next" button until an option is selected
- "Reveal" button text on final question

**Data Flow**:
1. User selects an answer → option is highlighted
2. User taps "Next" → score is incremented, moves to next question
3. On final question → computes winner based on highest score
4. Stores archetype in AsyncStorage (`'archetype'` key)
5. Navigates to result screen with archetype parameter

**Styling**:
- Dark theme with accent highlights
- Card-based layout for readability
- Uses tokens from `phase1/theme/tokens.ts`

### 2. ArchetypeResult.tsx (`phase1/onboarding/ArchetypeResult.tsx`)

**Purpose**: Sacred, personalized result page shown after quiz completion.

**Key Features**:
- Displays archetype title and description
- "Begin Your Journey" CTA button
- Scrollable content for accessibility
- Sets `onboardingSeen` flag in AsyncStorage
- Uses `router.replace()` to prevent back navigation to quiz

**Data Flow**:
1. Receives archetype from route parameters
2. Loads corresponding profile from `archetypeProfiles`
3. On "Begin Your Journey" tap:
   - Sets `onboardingSeen` to `'true'` in AsyncStorage
   - Navigates to home screen (`/(tabs)/home`)

**Styling**:
- Centered card layout
- Large, bold archetype name (32pt, accent2 color)
- Left-aligned description for readability
- Consistent with dark theme

### 3. archetypes.ts (`phase1/data/archetypes.ts`)

**Purpose**: Central data definition for all four archetypes.

**Structure**:
```typescript
export type Archetype = 'Warrior' | 'Sage' | 'Lover' | 'Seeker';

export interface ArchetypeProfile {
  title: string;           // Human-readable name
  description: string;     // Sacred, affirming microcopy
  tone: string;           // Athena's conversational style
  ifsSequence: string[];  // Priority order for IFS parts
  substitutionPriority: string[]; // Priority for interventions
}
```

**Archetypes**:
- **Warrior**: Challenger tone, discipline-focused
- **Sage**: Mentor tone, wisdom-focused
- **Lover**: Comrade tone, connection-focused
- **Seeker**: Guide tone, exploration-focused

## Persistence & State

### AsyncStorage Keys

1. **`archetype`**: Stores the user's primary archetype
   - Set in: `ArchetypeQuiz.tsx` (line 124)
   - Type: `'Warrior' | 'Sage' | 'Lover' | 'Seeker'`
   - Used for: Personalizing app experience

2. **`onboardingSeen`**: Marks that user has completed onboarding
   - Set in: `ArchetypeResult.tsx` (line 32)
   - Type: `'true'`
   - Used for: Routing first-time vs. returning users

### First-Time User Flow

```
App Launch
    ↓
Check AsyncStorage for 'onboardingSeen'
    ↓
    ├─ If not found → Navigate to ArchetypeQuiz
    ├─ If 'true' → Navigate to Home
    ↓
ArchetypeQuiz (5 questions)
    ↓
ArchetypeResult
    ↓
Set 'onboardingSeen' = 'true'
    ↓
Navigate to Home
```

*Note: The actual routing logic for first-time users is implemented in the app's root layout or index file (not included in this phase).*

## Scoring & Tie-Breaker Logic

### Scoring System
- Each question has 4 options, one per archetype
- Selecting an option gives +1 point to that archetype
- After 5 questions, scores range from 0-5 per archetype
- The archetype with the highest score wins

### Tie-Breaker Priority
In case of tied scores, the following priority order is used:
1. **Warrior** (highest priority)
2. **Sage**
3. **Lover**
4. **Seeker** (lowest priority)

**Implementation**: The tie-breaker relies on JavaScript object key insertion order. Since scores are initialized as `{ Warrior: 0, Sage: 0, Lover: 0, Seeker: 0 }`, iterating with `Object.keys()` preserves this order.

**Rationale**: 
- Simple, no extra configuration needed
- Action-oriented archetypes (Warrior, Seeker) prioritized
- Distinct behavioral patterns (Warrior, Sage) help differentiate ambiguous results

*Full details in `ArchetypeQuizMapping.md`.*

## Documentation Files

### ArchetypeResult.md
**Purpose**: Tone & microcopy guidelines for the result screen.

**Contents**:
- Core principles (sacred, personal, empowering, concise)
- Archetype-specific tone guidance
- UI copy standards (title, archetype name, description, CTA)
- Writing style guide (DOs and DON'Ts)
- Context integration notes
- Future iteration ideas
- Accessibility requirements

### ArchetypeQuizMapping.md
**Purpose**: Complete documentation of quiz mapping and tie-breaker logic.

**Contents**:
- Quiz structure overview
- Question-by-question answer mappings
- Scoring system explanation
- Tie-breaker priority and examples
- Rationale for tie-breaker order
- Implementation notes
- Testing edge cases

## Integration Points

### How Other Parts of the App Use Archetype

1. **Athena (AI Companion)**:
   - Reads `archetype` from AsyncStorage
   - Adopts corresponding `tone` (mentor, challenger, comrade, guide)
   - Adjusts language and prompts accordingly

2. **IFS Check-Ins**:
   - Reads `archetype` from AsyncStorage
   - Uses `ifsSequence` to determine which parts to surface first
   - Example: Warriors see "Inner Critic" first, Lovers see "Pleaser" first

3. **Substitution Interventions**:
   - Reads `archetype` from AsyncStorage
   - Uses `substitutionPriority` to order interventions during cravings
   - Example: Warriors get "wildernessJournal" first, Lovers get "lovedOneLetter" first

## Testing Considerations

### Manual Testing Scenarios
- ✅ Complete quiz selecting same archetype 5 times → verify correct result
- ✅ Complete quiz with varied selections → verify tie-breaker works
- ✅ Use back button to change answers → verify scores update correctly
- ✅ Complete quiz → verify `archetype` is stored in AsyncStorage
- ✅ Complete quiz → verify `onboardingSeen` is set to `'true'`
- ✅ Verify result screen displays correct archetype description
- ✅ Tap "Begin Your Journey" → verify navigation to home screen

### Edge Cases
- User navigates away mid-quiz → state should reset on return
- AsyncStorage write fails → app should handle gracefully
- Invalid archetype parameter → defaults to 'Warrior'
- All four archetypes tied → Warrior wins via tie-breaker

## File Locations

```
phase1/
├── data/
│   └── archetypes.ts              # Archetype definitions & profiles
├── onboarding/
│   ├── ArchetypeQuiz.tsx          # Quiz component
│   ├── ArchetypeResult.tsx        # Result screen component
│   ├── ArchetypeResult.md         # Tone & microcopy guidelines
│   └── ArchetypeQuizMapping.md    # Mapping & tie-breaker docs
└── theme/
    └── tokens.ts                  # Shared color & radius tokens
```

## Dependencies

- `react` - Component framework
- `react-native` - UI primitives
- `expo-router` - Navigation
- `@react-native-async-storage/async-storage` - Persistent storage

## Next Steps (Future Enhancements)

1. **App Integration**: Wire up the quiz to the app's initial routing logic
2. **Analytics**: Track quiz completion rates and archetype distribution
3. **A/B Testing**: Test different question phrasings or CTA button text
4. **Retake Option**: Allow users to retake the quiz from settings
5. **Visual Polish**: Add archetype-specific illustrations or icons
6. **Accessibility**: Add screen reader labels and test with VoiceOver/TalkBack

## Design Notes

### Visual Style
- **Dark theme**: Deep greenish black background (#171712)
- **Accent colors**: Golden yellow (#f5c947) for primary CTAs, calming green (#4ade80) for secondary
- **Typography**: Bold headers, clean sans-serif body text
- **Layout**: Card-based, centered content with ample padding

### Tone & Voice
- **Sacred**: Frame the quiz as a meaningful step in the user's hero's journey
- **Non-clinical**: Avoid diagnostic or pathologizing language
- **Empowering**: Focus on strengths, not limitations
- **Personal**: Use "you" language throughout

## Summary

The archetype onboarding quiz provides a quick (<90 seconds), meaningful way to personalize the TARU app experience. By mapping each answer directly to an archetype and using a simple scoring system with clear tie-breaker rules, the quiz efficiently determines the user's primary behavioral mode. The result screen affirms their journey and seamlessly transitions them into the app, where their archetype influences Athena's tone, IFS sequencing, and intervention priorities.
