import { Intervention } from '../types';

export const interventions: Intervention[] = [
  // Warrior Interventions
  {
    id: 'warrior-letter',
    type: 'letter',
    archetype: 'Warrior',
    title: 'Letter to Your Inner Warrior',
    description: 'Write a letter acknowledging your strength and courage',
    prompt: 'Dear Warrior,\n\nI honor your courage and determination. Today I want to acknowledge...',
  },
  {
    id: 'warrior-journal',
    type: 'journal',
    archetype: 'Warrior',
    title: 'Warrior Journal: Victories & Challenges',
    description: 'Reflect on your recent victories and ongoing battles',
    prompt: 'What battles have I fought this week? What victories can I celebrate? Where do I need to gather my strength?',
  },
  {
    id: 'warrior-ubuntu',
    type: 'ubuntu',
    archetype: 'Warrior',
    title: 'Warrior Ubuntu Ritual',
    description: 'A grounding practice for the warrior spirit',
    prompt: 'Stand tall. Place your hand on your heart. Say aloud: "I am strong. I am capable. I fight for what matters." Take three deep breaths, feeling your inner strength.',
  },
  
  // Sage Interventions
  {
    id: 'sage-letter',
    type: 'letter',
    archetype: 'Sage',
    title: 'Letter to Your Inner Sage',
    description: 'Write to the wise part of yourself',
    prompt: 'Dear Sage,\n\nI seek your wisdom and clarity. What truth do I need to hear today?',
  },
  {
    id: 'sage-journal',
    type: 'journal',
    archetype: 'Sage',
    title: 'Sage Journal: Insights & Learnings',
    description: 'Document your insights and lessons learned',
    prompt: 'What have I learned recently? What patterns am I noticing? What wisdom wants to emerge?',
  },
  {
    id: 'sage-ubuntu',
    type: 'ubuntu',
    archetype: 'Sage',
    title: 'Sage Ubuntu Ritual',
    description: 'A contemplative practice for wisdom',
    prompt: 'Sit comfortably. Close your eyes. Place your hand on your third eye. Say silently: "I trust my inner wisdom. I see clearly." Breathe and listen to what arises.',
  },
  
  // Lover Interventions
  {
    id: 'lover-letter',
    type: 'letter',
    archetype: 'Lover',
    title: 'Letter to Your Inner Lover',
    description: 'Connect with your heart and capacity for love',
    prompt: 'Dear Lover,\n\nI honor my capacity for connection and compassion. Today I open my heart to...',
  },
  {
    id: 'lover-journal',
    type: 'journal',
    archetype: 'Lover',
    title: 'Lover Journal: Connections & Heart',
    description: 'Reflect on your relationships and emotional landscape',
    prompt: 'Who am I connected to? What relationships nourish me? Where can I offer more love - to myself or others?',
  },
  {
    id: 'lover-ubuntu',
    type: 'ubuntu',
    archetype: 'Lover',
    title: 'Lover Ubuntu Ritual',
    description: 'A heart-opening practice',
    prompt: 'Place both hands on your heart. Feel its rhythm. Say gently: "I am love. I am worthy of love. I belong." Breathe into your heart space, expanding with each breath.',
  },
  
  // Seeker Interventions
  {
    id: 'seeker-letter',
    type: 'letter',
    archetype: 'Seeker',
    title: 'Letter to Your Inner Seeker',
    description: 'Write to your adventurous, curious self',
    prompt: 'Dear Seeker,\n\nI honor my curiosity and desire for growth. What new path are you calling me toward?',
  },
  {
    id: 'seeker-journal',
    type: 'journal',
    archetype: 'Seeker',
    title: 'Seeker Journal: Questions & Exploration',
    description: 'Explore your questions and new discoveries',
    prompt: 'What am I curious about? What new territory am I exploring? What questions are alive in me right now?',
  },
  {
    id: 'seeker-ubuntu',
    type: 'ubuntu',
    archetype: 'Seeker',
    title: 'Seeker Ubuntu Ritual',
    description: 'A practice for opening to possibility',
    prompt: 'Stand with arms open wide. Look toward the horizon. Say aloud: "I am open. I am ready. I embrace the unknown." Take three expansive breaths, welcoming what comes next.',
  },
];
