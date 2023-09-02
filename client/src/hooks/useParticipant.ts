import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Participant, Card } from '../types';
import invariant from 'invariant';
import useDeck from './useDeck';

export default function useParticipant(type: Participant) {
  const { nextCard: getNextCard, createNewDeck, isReady: deckReady } = useDeck();
  const [hand, setHand] = useState<Card[]>([]);
  const [score, setScore] = useState(0);
  const [busted, setBusted] = useState(false);
  const [pendingDealerPlay, setPendingDealerPlay] = useState(true);
  const playingDealerHand = useRef(false);

  const isReadyToPlay = useMemo(() => {
    if (type === Participant.PLAYER) {
      return true;
    }

    return deckReady;
  }, [type, deckReady]);

  const reset = useCallback(() => {
    setHand([]);
    setPendingDealerPlay(true);

    if (type === Participant.DEALER) {
      createNewDeck();
    }
  }, [type, createNewDeck]);

  const dealCard = useCallback(async () => {
    invariant(type === Participant.DEALER, 'Only dealers can manipulate the deck');

    const card = await getNextCard();

    return card;
  }, [type, getNextCard]);

  const receiveCard = useCallback((card: Card, isFacingDown?: true) => {
    setHand(currentHand => [...currentHand, { ...card, isFacingDown }]);
  }, []);

  const flipFirstCard = useCallback(() => {
    invariant(type === Participant.DEALER, 'Only dealers can flip the facing-down card');

    setHand(currentHand => {
      const newHand = [...currentHand];

      newHand[0].isFacingDown = undefined;

      return newHand;
    });
  }, [type]);

  const playDealerHand = useCallback(() => {
    playingDealerHand.current = true;
    flipFirstCard();
  }, [flipFirstCard]);

  useEffect(() => {
    if (type === Participant.DEALER && hand[0]?.isFacingDown) {
      return;
    }

    let score = 0;

    hand.forEach(card => {
      if (card.number > 10) {
        score += 10;
      } else if (card.number >= 2) {
        score += card.number;
      } else {
        if (score + 11 > 21) {
          score += 1;
        } else {
          score += 11;
        }
      }
    });

    setScore(score);
  }, [hand, type]);

  useEffect(() => {
    setBusted(score > 21);

    if (playingDealerHand.current) {
      if (score < 17) {
        dealCard().then(card => {
          setHand(currentHand => {
            const newHand = [...currentHand];

            newHand.push(card);

            return newHand;
          });
        });
      } else {
        playingDealerHand.current = false;
        setPendingDealerPlay(false);
      }
    }
  }, [score, dealCard]);

  useEffect(() => {
    if (type === Participant.DEALER && !isReadyToPlay) {
      createNewDeck();
    }
  }, [type, isReadyToPlay, createNewDeck]);

  return {
    hand,
    receiveCard,
    score,
    busted,
    playDealerHand,
    pendingDealerPlay,
    isReadyToPlay,
    dealCard,
    reset,
  };
}
