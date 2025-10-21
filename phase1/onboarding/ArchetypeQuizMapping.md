# Archetype Quiz: Mapping & Tie-Breaker Logic

This document explains how quiz answers map to archetypes and how ties are resolved.

## Quiz Structure

The archetype quiz consists of **5 questions**, each with **4 answer options**. Each answer option directly maps to exactly one of the four archetypes:

1. **Warrior** - Represents discipline, courage, and action
2. **Sage** - Represents reflection, wisdom, and understanding  
3. **Lover** - Represents compassion, connection, and relationships
4. **Seeker** - Represents curiosity, exploration, and adventure

## Answer Mapping

Each question offers one answer per archetype. When a user selects an answer, the corresponding archetype receives **+1 point**.

### Question 1: "When facing a challenge, what's your instinct?"
- "Charge ahead" → **Warrior**
- "Seek knowledge" → **Sage**
- "Reach out to loved ones" → **Lover**
- "Explore new possibilities" → **Seeker**

### Question 2: "Which environment feels most energising?"
- "A battlefield or gym" → **Warrior**
- "A library or workshop" → **Sage**
- "Home with loved ones" → **Lover**
- "Outdoors on an adventure" → **Seeker**

### Question 3: "What's your biggest motivation?"
- "Overcoming obstacles" → **Warrior**
- "Understanding truth" → **Sage**
- "Building meaningful relationships" → **Lover**
- "Discovering new horizons" → **Seeker**

### Question 4: "Which statement resonates with you?"
- "Strength comes from discipline" → **Warrior**
- "Wisdom is a lifelong pursuit" → **Sage**
- "Love is our greatest healer" → **Lover**
- "Curiosity leads to growth" → **Seeker**

### Question 5: "How do you handle stress?"
- "Work harder" → **Warrior**
- "Reflect and analyse" → **Sage**
- "Reach out to friends or family" → **Lover**
- "Get out and explore" → **Seeker**

## Scoring System

After completing all 5 questions:
- Each archetype has a score from **0 to 5**
- The archetype with the **highest score** is selected as the user's primary archetype
- Scores are tallied in real-time as the user progresses through the quiz

## Tie-Breaker Priority

In the event that two or more archetypes have the same highest score, the tie is resolved using a **priority order**:

**Priority Order (highest to lowest):**
1. **Warrior**
2. **Sage**
3. **Lover**
4. **Seeker**

### How It Works
The tie-breaker logic iterates through archetypes in the order they are defined in the scores object. Because JavaScript object keys maintain insertion order (as of ES2015+), and the scores are initialized as:

```typescript
{
  Warrior: 0,
  Sage: 0,
  Lover: 0,
  Seeker: 0,
}
```

When ties occur, **Warrior** takes precedence, followed by **Sage**, then **Lover**, then **Seeker**.

### Example Scenarios

**Scenario 1: Clear Winner**
- Warrior: 3 points
- Sage: 1 point
- Lover: 0 points
- Seeker: 1 point

**Result**: Warrior (highest score)

**Scenario 2: Two-Way Tie**
- Warrior: 2 points
- Sage: 2 points
- Lover: 1 point
- Seeker: 0 points

**Result**: Warrior (wins tie-breaker over Sage)

**Scenario 3: Four-Way Tie** (unlikely but possible if user varies answers)
- Warrior: 1 point
- Sage: 1 point
- Lover: 2 points
- Seeker: 1 point

**Result**: Lover (highest score)

**Scenario 4: Four-Way Perfect Tie** (extremely rare)
- Warrior: 1 point
- Sage: 1 point
- Lover: 1 point
- Seeker: 2 points

**Result**: Seeker (highest score)

If all four were equal:
- Warrior: 1 point
- Sage: 1 point
- Lover: 1 point
- Seeker: 1 point

**Result**: Warrior (wins four-way tie via priority order)

## Rationale for Tie-Breaker Order

The priority order (Warrior → Sage → Lover → Seeker) was chosen based on:

1. **Action-oriented defaults**: In cases of ambiguity, defaulting to more action-oriented archetypes (Warrior, Seeker) may help users feel empowered to take immediate steps.

2. **Differentiation value**: Warrior and Sage represent more distinct behavioral patterns, making them useful defaults when the user's preferences are truly balanced.

3. **Simplicity**: Using object key order maintains clean code without additional configuration.

## Implementation Notes

### Code Location
- Quiz component: `phase1/onboarding/ArchetypeQuiz.tsx`
- Tie-breaker logic: Lines 113-122 (in the `handleNext` function)

### Future Considerations

If tie-breaker behavior needs to change:

1. **Option A: Weighted scoring** - Assign different weights to certain questions
2. **Option B: Explicit priority array** - Define a custom priority order separate from object keys
3. **Option C: User choice** - Present tied archetypes and let the user choose
4. **Option D: Hybrid archetype** - Acknowledge multiple strong archetypes

For Phase 1, the current simple approach (first-match wins) keeps the quiz fast and low-friction.

## Persistence

Once the winning archetype is determined:
- Stored in AsyncStorage as `'archetype'` with value of the archetype name (e.g., `'Warrior'`)
- Used throughout the app to customize:
  - Athena's conversational tone
  - IFS part sequencing in daily check-ins
  - Substitution intervention priority during craving events

## Testing Edge Cases

Recommended test scenarios:
- ✅ User selects same archetype for all 5 questions
- ✅ User selects different archetype each time (tests tie-breaker)
- ✅ User navigates back and changes previous answers
- ✅ User completes quiz and verifies correct archetype is stored
- ✅ User completes quiz and verifies `onboardingSeen` flag is set
