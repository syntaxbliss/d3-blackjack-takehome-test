import { useCallback, useMemo, useState } from 'react';
import { Card } from '../types';
import { BlackjackService } from '../services';

export default function usePlayer(name: string) {
  const [hand, setHand] = useState<Card[]>([]);

  const score = useMemo(() => BlackjackService.calculateScore(hand), [hand]);
  const busted = useMemo(() => score > 21, [score]);

  const receiveCard = useCallback((card: Card) => {
    setHand(currentHand => {
      const newHand = [...currentHand];

      newHand.push(card);

      return newHand;
    });
  }, []);

  const prepareForNewRound = useCallback(() => setHand([]), []);

  return { name, hand, score, busted, receiveCard, prepareForNewRound };
}
