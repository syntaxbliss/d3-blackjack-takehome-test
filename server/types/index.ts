export enum Suit {
  HEARTS = 'hearts',
  SPADES = 'spades',
  DIAMONDS = 'diamonds',
  CLUBS = 'clubs',
}

export type Card = {
  number: number;
  suit: Suit;
};
