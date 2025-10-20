/**
 * Reset definitions inspired by the Nervous System Reset Figma design.
 *
 * Each reset entry includes a title, a short description and an
 * identifier used for routing within the app.  These resets are
 * surfaced in the ResetSelection screen and provide quick somatic
 * interventions to disrupt cravings.  Additional metadata such as
 * durations, instructions or associated archetypes can be added as
 * needed.
 */

export interface ResetDefinition {
  key: string;
  title: string;
  description: string;
  image: any; // require(...) for local image
  route: string;
}

// Note: images are imported in the ResetSelection component to avoid
// circular dependencies between data and UI.  The image fields here
// are placeholders to document the expected asset names.
export const resets: Omit<ResetDefinition, 'image'>[] = [
  {
    key: 'nostril',
    title: 'Alternate Nostril Breathing',
    description: 'Reset mind & body in 1 min.',
    route: '/resets/nostril',
  },
  {
    key: 'sigh',
    title: 'Physiologic Sigh',
    description: 'Release tension in 30 sec.',
    route: '/resets/sigh',
  },
  {
    key: 'eft',
    title: 'EFT Tapping',
    description: 'Calm your nerves in 90 sec.',
    route: '/resets/eft',
  },
];