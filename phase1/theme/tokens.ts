// Colour and radius palette for TARU Phase 1.  Reuse the same palette
// defined in the existing app so that new components integrate
// seamlessly.  Colours are dark‑themed with accent highlights.
// Colour palette derived from the Figma Nervous System Reset design.  The
// palette remains dark with rich accents inspired by the flower and
// heartbeat imagery.  Use `bg` and `card` for backgrounds, `text` for
// primary text, `sub` for secondary captions, and the accent colours
// for highlights and buttons.
export const colors = {
  // Primary backgrounds
  bg: '#171712', // deep greenish black
  card: '#26241c', // dark card background
  // Text colours
  text: '#ffffff', // primary text (white)
  sub: '#bab29c', // secondary text (warm grey)
  // Accents
  accent: '#f5c947', // golden yellow used for CTAs
  accent2: '#4ade80', // calming green (breathing)
  accent3: '#60a5fa', // soothing blue (exhale)
  accent4: '#f87171', // gentle red (block/pause)
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 28,
  pill: 999,
};