# Archetype Result: Tone & Microcopy Guidelines

This document outlines the tone, voice, and microcopy standards for the **Archetype Result** screen shown after completing the onboarding quiz.

## Core Principles

1. **Sacred & Affirming**: The result should feel like a meaningful revelation, not a casual personality test. Frame the archetype as part of the user's hero's journey.

2. **Personal & Direct**: Use "you" language. Speak directly to the user's archetype identity.

3. **Empowering**: Focus on strengths and purpose rather than limitations. Each archetype description should inspire the user to embrace their path.

4. **Concise**: Keep descriptions to 2-3 sentences. The user should be able to absorb their archetype's essence quickly.

## Archetype-Specific Tone

### Warrior
- **Tone**: Challenger
- **Voice**: Direct, action-oriented, honoring their discipline and courage
- **Key Themes**: Strength, resilience, purpose, discipline
- **Example Language**: "You are the Warrior: courageous and disciplined. Your journey is about channeling strength toward your higher purpose."

### Sage
- **Tone**: Mentor
- **Voice**: Gentle, reflective, honoring their pursuit of truth
- **Key Themes**: Wisdom, understanding, inquiry, reflection
- **Example Language**: "You are the Sage: thoughtful and reflective. You seek truth and understanding."

### Lover
- **Tone**: Comrade
- **Voice**: Warm, compassionate, honoring their capacity for connection
- **Key Themes**: Compassion, connection, love, relationships
- **Example Language**: "You are the Lover: compassionate and connection-oriented. Your path is to rediscover love for yourself and others."

### Seeker
- **Tone**: Guide
- **Voice**: Inviting, curious, honoring their adventurous spirit
- **Key Themes**: Curiosity, discovery, exploration, adventure
- **Example Language**: "You are the Seeker: curious and adventurous. You are driven by discovery."

## UI Copy Standards

### Title
- Always use: "Your Archetype"
- Font: 24pt, bold, accent color (#f5c947)
- Centered

### Archetype Name
- Display the archetype title (e.g., "Warrior", "Sage", "Lover", "Seeker")
- Font: 32pt, extra bold, accent2 color (#4ade80)
- Centered
- No additional decorators or emojis

### Description
- 2-3 sentences maximum
- Font: 16pt, regular weight, white text
- Left-aligned for readability
- Line height: 22pt for comfortable reading

### CTA Button
- Text: "Begin Your Journey"
- This language frames the app experience as a transformative path, not a clinical tool
- Font: 16pt, semibold
- Background: accent2 color (#4ade80)
- Alternative variations (if needed for A/B testing):
  - "Start Your Journey"
  - "Continue Forward"
  - "Enter the App"

## Writing Style Guide

### DO:
- ✅ Use second person ("you are", "your journey")
- ✅ Frame archetypes as strengths and paths
- ✅ Reference the hero's journey metaphor
- ✅ Keep language accessible and warm
- ✅ Use active voice

### DON'T:
- ❌ Use clinical or diagnostic language
- ❌ Frame archetypes as personality "types" or "categories"
- ❌ Make it feel like a test result
- ❌ Use jargon or overly complex language
- ❌ Include negative framing or limitations

## Context Integration

The archetype result connects to the broader app experience:

1. **Athena's Tone**: The AI companion (Athena) will adopt the archetype-specific tone (mentor, challenger, comrade, or guide) in all future interactions.

2. **IFS Sequencing**: Daily check-ins will prioritize IFS parts based on the archetype's `ifsSequence` array.

3. **Intervention Priority**: When craving events occur, substitution interventions will be offered in the order specified by `substitutionPriority`.

## Future Iterations

Potential enhancements to consider:

- Add archetype-specific imagery or icons
- Include a brief "What this means for you" section explaining how the archetype influences their app experience
- Offer a "Retake Quiz" option (though this should be de-emphasized to preserve the sacred feeling)
- Add social sharing capability with consent ("Share your archetype")

## Accessibility Notes

- Ensure color contrast meets WCAG AA standards (currently met with white text on dark backgrounds)
- Description text should be readable at default system font sizes
- Button touch targets should be at least 44x44pt
- Screen reader labels should clearly announce the archetype name and full description
