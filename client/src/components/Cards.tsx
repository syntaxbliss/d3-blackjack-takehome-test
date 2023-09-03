import { memo, useMemo } from 'react';
import classnames from 'classnames';

import Card from './Card';
import { Card as CardType } from '../types';

type Props = {
  cards: CardType[];
  className?: string;
};

function Cards({ cards, className }: Props): JSX.Element {
  const classes = useMemo(() => classnames('cards', className), [className]);

  return (
    <div className={classes}>
      {cards.map((card, index) => (
        <div key={`${card.number}-${card.suit}-${index}`} className="cards__card">
          <Card card={card} />
        </div>
      ))}
    </div>
  );
}

export default memo(Cards);
