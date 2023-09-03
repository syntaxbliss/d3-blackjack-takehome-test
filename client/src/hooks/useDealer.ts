import { useCallback, useMemo, useState } from 'react';

import { Card } from '../types';
import useDeck from './useDeck';
import { BlackjackService } from '../services';

export default function useDealer() {
  const { nextCard: getCardFromDeck, createDeck: getNewDeck, isReady: isDeckReady } = useDeck();
  const [hand, setHand] = useState<Card[]>([]);

  const score = useMemo(() => {
    if (!hand[0]?.isFacingDown) {
      return BlackjackService.calculateScore(hand);
    }

    return 0;
  }, [hand]);
  const busted = useMemo(() => score > 21, [score]);
  const canContinuePlaying = useMemo(() => score < 17, [score]);

  const dealCard = useCallback(
    (facingDown?: boolean) => {
      const card = getCardFromDeck();

      if (facingDown) {
        card.isFacingDown = true;
      }

      return card;
    },
    [getCardFromDeck]
  );

  const receiveCard = useCallback((card: Card) => {
    setHand(currentHand => {
      const newHand = [...currentHand];

      newHand.push(card);

      return newHand;
    });
  }, []);

  const showHiddenCard = useCallback(() => {
    setHand(currentHand => {
      const newHand = [...currentHand];

      newHand[0].isFacingDown = undefined;

      return newHand;
    });
  }, []);

  const playHand = useCallback(() => {
    showHiddenCard();
    setHand(currentHand => {
      const newHand = [...currentHand];
      let score = BlackjackService.calculateScore(newHand);

      while (score < 17) {
        newHand.push(getCardFromDeck());
        score = BlackjackService.calculateScore(newHand);
      }

      return newHand;
    });
  }, [showHiddenCard, getCardFromDeck]);

  const prepareForNewRound = useCallback(() => {
    setHand([]);
    getNewDeck();
  }, [getNewDeck]);

  return {
    isReady: isDeckReady,
    dealCard,
    playHand,
    hand,
    score,
    busted,
    canContinuePlaying,
    receiveCard,
    prepareForNewRound,
  };
}
