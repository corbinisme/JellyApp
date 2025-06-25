interface Animal {
  id: string;
  name: string;
  emoji: string;
  isEdible: boolean;
}
export type { Animal };
const animalsData = [
  { id: 'lion', name: 'Lion', emoji: '🦁', isEdible: false },
  { id: 'chicken', name: 'Chicken', emoji: '🐔', isEdible: true },
  { id: 'cow', name: 'Cow', emoji: '🐮', isEdible: true },
  { id: 'snake', name: 'Snake', emoji: '🐍', isEdible: false },
  { id: 'pig', name: 'Pig', emoji: '🐷', isEdible: false },
  { id: 'shark', name: 'Shark', emoji: '🦈', isEdible: false },
  { id: 'human', name: 'Human', emoji: '🙋', isEdible: false },
  { id: 'fox', name: 'Fox', emoji: '🦊', isEdible: false },
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰', isEdible: false },
  { id: 'turtle', name: 'Turtle', emoji: '🐢', isEdible: false },
  { id: 'cat', name: 'Cat', emoji: '🐱', isEdible: false },
  { id: 'dog', name: 'Dog', emoji: '🐶', isEdible: false },
  { id: 'elephant', name: 'Elephant', emoji: '🐘', isEdible: false },
  { id: 'duck', name: 'Duck', emoji: '🦆', isEdible: true },
  { id: 'goat', name: 'Goat', emoji: '🐐', isEdible: true},
  { id: 'sheep', name: 'Sheep', emoji: '🐑', isEdible: true },
  { id: 'horse', name: 'Horse', emoji: '🐴', isEdible: false },
  { id: 'deer', name: 'Deer', emoji: '🦌', isEdible: true },
  { id: 'bear', name: 'Bear', emoji: '🐻', isEdible: false },
  { id: 'monkey', name: 'Monkey', emoji: '🐒', isEdible: false },
  { id: 'panda', name: 'Panda', emoji: '🐼', isEdible: false },
  { id: 'carp', name: 'Carp', emoji: '🎏', isEdible: true },
  { id: 'crab', name: 'Crab', emoji: '🦀', isEdible: false },
  { id: 'octopus', name: 'Octopus', emoji: '🐙', isEdible: false},
  { id: 'blowfish', name: 'Blowfish', emoji: '🐡', isEdible: false},
  { id: 'shrimp', name: 'Shrimp', emoji: '🦐', isEdible: false}
  
];

export default animalsData;
