export const Default = {
  DRAGGABLE_PERCENT: 80,
  COLLAPSE_DURATION: 300,
  DEBOUNCE_DURATION: 50,
} as const;

export type Default = (typeof Default)[keyof typeof Default];

export const Direction = {
  X: 'x',
  Y: 'y',
} as const;

export type Direction = (typeof Direction)[keyof typeof Direction];
