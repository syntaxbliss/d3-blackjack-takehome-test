import { useCallback, useMemo, useRef, useState } from 'react';
import { Card } from '../types';
import invariant from 'invariant';
import { DeckService } from '../services';

export default function useDeck() {
  const deckPointer = useRef(0);
  const [cards, setCards] = useState<Card[]>([]);

  const deckReady = useMemo(() => Boolean(cards.length), [cards]);

  const createDeck = useCallback(() => {
    deckPointer.current = 0;
    setCards([]);
    DeckService.createDeck().then(deck => setCards(deck));
  }, []);

  const nextCard = useCallback(() => {
    const card = cards[deckPointer.current];

    invariant(card, 'Cannot get a card from an empty deck');

    deckPointer.current++;

    return card;
  }, [cards]);

  return { nextCard, createDeck, isReady: deckReady };
}
