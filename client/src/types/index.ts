export enum Suit {
  HEARTS = 'hearts',
  SPADES = 'spades',
  DIAMONDS = 'diamonds',
  CLUBS = 'clubs',
}

export enum Participant {
  DEALER = 'dealer',
  PLAYER = 'player',
}

export type Card = {
  number: number;
  suit: Suit;
  isFacingDown?: true;
};

export type GameResult =
  | { finished: true; winner: Participant | null; hand: Card[] }
  | { finished: false };

export type GameResultObjectCard = Pick<Card, 'number' | 'suit'>;

export type GameResultObject = Record<'winner' | 'draw', GameResultObjectCard[]>;

type ParticipantType = {
  hand: Card[];
  score: number;
  busted: boolean;
};

export type Dealer = ParticipantType;

export type Player = ParticipantType & { name: string };
