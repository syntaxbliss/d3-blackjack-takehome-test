import { useCallback, useEffect, useState } from 'react';
import { Card } from '../types';
import invariant from 'invariant';
import { DeckService } from '../services';

export default function useDeck() {
  const [cards, setCards] = useState<Card[]>([]);
  const [deckReady, setDeckReady] = useState(false);

  const createNewDeck = useCallback(() => {
    setDeckReady(false);
    setCards([]);
    DeckService.createDeck().then(deck => setCards(deck));
  }, []);

  const nextCard = useCallback(async () => {
    return new Promise<Card>(resolve => {
      setCards(deck => {
        invariant(deck.length, 'Cannot get a card from an empty deck');

        const [card, ...rest] = deck;

        resolve(card);

        return rest;
      });
    });
  }, []);

  useEffect(() => setDeckReady(() => Boolean(cards.length)), [cards]);

  return { nextCard, createNewDeck, isReady: deckReady };
}
