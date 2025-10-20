ArchetypeResult — tone & microcopy guidelines

Purpose
- The reveal should feel sacred and ritual-like: minimal chrome, warm language, gentle ceremony.
- Frame the archetype as a path forward, not a label. Always link copy back to the core job-to-be-done: "help me when I'm about to fall."

Structure
- Big heading: "You are the {Archetype Title}" — use the archetypeProfiles.title.
- Subheading: 1‑line affirmation that evokes the archetype's core theme (duty vs. intuition vs. tenderness vs. exploration).
- Short ritual paragraph: 1–2 sentences explaining how to use the archetype as a compass in hard moments.
- Primary CTA: "Begin your journey" — closes onboarding and navigates to Home.
- Secondary CTA: "See Athena’s tone" — previews how the assistant will speak.
- Optional: small "Explore other archetypes" link that does not overwrite the saved archetype (for curiosity, not for switching during the ritual).

Visuals & Personalisation
- If using bespoke visuals, extend archetypeProfiles with `color` and `image` fields:
  - color: hex string for accent/background on result card
  - image: local require() path used at the top of the result card
- Use the color subtly (accent buttons, small underline) rather than loud backgrounds to keep the ritual calm.

Accessibility
- Large, readable text.
- Buttons have clear labels.
- Provide a short accessible description for any image.

Analytics & Privacy
- Store only archetype key and optionally anonymised counts of answers for UX tuning.
- Do not export raw user answers without explicit consent.

Example microcopy
- Title: "You are the Warrior"
- Subheading: "A guardian of purpose. Courage is your way home."
- Ritual line: "This is not a label — it’s a map. When you feel the pull, return here for a steady reminder."