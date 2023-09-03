import { memo, useMemo } from 'react';
import classnames from 'classnames';

import { Suit, Card as CardType } from '../types';

type Props = {
  card: CardType;
  className?: string;
};

const imageSrcPrefixByCardNumber: Record<number, string> = {
  '1': 'A',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '10',
  '11': 'J',
  '12': 'Q',
  '13': 'K',
};

const imageSrcSuffixByCardSuit: Record<Suit, string> = {
  [Suit.CLUBS]: 'C',
  [Suit.DIAMONDS]: 'D',
  [Suit.HEARTS]: 'H',
  [Suit.SPADES]: 'S',
};

const getImageSource = (card: CardType) => {
  if (card.isFacingDown) {
    return '/img/back.png';
  }

  const prefix = imageSrcPrefixByCardNumber[card.number];
  const suffix = imageSrcSuffixByCardSuit[card.suit];

  return `/img/${prefix}${suffix}.png`;
};

function Card({ card, className }: Props): JSX.Element {
  const classes = useMemo(() => classnames('card', className), [className]);

  return (
    <div className={classes}>
      <img className="card__image" alt="card" src={getImageSource(card)} />
    </div>
  );
}

export default memo(Card);
