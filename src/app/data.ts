export interface Pair {
  leftpart: string;
  rightpart: string;
  id: number;
}
export interface Option {
  option: string;
  correct: string;
  id: number;
}
export interface Label {
  id: number;
  label: string;
}

export const ANIMALS: Pair[] = [
  { id: 1, leftpart: 'dog', rightpart: 'mammal' },
  { id: 2, leftpart: 'blickbird', rightpart: 'bird' },
  { id: 3, leftpart: 'spider', rightpart: 'insect' },
  { id: 4, leftpart: 'turtle', rightpart: 'reptile' },
  { id: 5, leftpart: 'guppy', rightpart: 'fish' },
];
export const OPTIONS: Option[] = [
  {
    id: 1,
    option: 'Mass',
    correct: 'Kilogram',
  },
  {
    id: 2,
    option: 'Length',
    correct: 'Meter',
  },
  {
    id: 3,
    option: 'Force',
    correct: 'Newton',
  },
  {
    id: 3,
    option: 'Current',
    correct: 'Ampere',
  },
];
export const LABELS: Label[] = [
  {
    id: 1,
    label: 'Meter',
  },
  {
    id: 2,
    label: 'Newton',
  },
  {
    id: 3,
    label: 'Ampere',
  },
  {
    id: 4,
    label: 'Kilogram',
  },
];
