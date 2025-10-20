Emotional Check‑In — design & implementation notes

Sources
- Permission‑to‑Feel (Marc Brackett) — use framing and language that validates emotion, reduces shame.
- How We Feel App — UX pattern for quick, dynamic mood selection using valence/arousal + intensity.

UX goals
- Keep the interaction ≤90 seconds; emotional check‑in should take ~15–45 seconds within the IFS check‑in flow.
- Ask the user to name what they feel (emotion) and indicate intensity (1–5).
- Use the emotion to prioritise interventions and personalise Athena’s tone.
- Frame check‑ins as self‑care and not tracking for judgement — microcopy emphasises “help me when I’m about to fall”.

Technical
- EmotionPicker component supplies { emotion, intensity, valence, arousal }.
- Persist mood entries under AsyncStorage key 'moodHistory' (array, newest first, cap ~100).
- Persist tokens under 'ubuntuTokens' and daily streak under 'ifsStreak' (or new 'emotionalCheckinStreak' if preferred).
- Interventions map includes moodMapping: Emotion -> intervention keys.

Gamification
- Reward users for reflection (e.g., +1 ubuntu token for each check‑in).
- Track short streaks (self‑led days) but avoid punitive behaviour; use streak as gentle encouragement.
- Use Self‑meter to visualise weekly consistency; do not surface long leaderboards.

Privacy & ethics
- Treat mood data sensitively; do not export raw mood history without opt‑in.
- Use anonymised aggregates for product tuning only.
