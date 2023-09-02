import { useCallback, useEffect, useMemo, useState } from 'react';
import { Participant, GameResult } from '../types';
import useParticipant from './useParticipant';

export default function useBlackjack(playerName: string, delay: number) {
  const {
    hand: dealerHand,
    score: dealerScore,
    busted: dealerBusted,
    playDealerHand,
    pendingDealerPlay,
    isReadyToPlay: dealerIsReadyToPlay,
    dealCard,
    receiveCard: giveCardToDealer,
    reset: resetDealer,
  } = useParticipant(Participant.DEALER);
  const {
    hand: playerHand,
    score: playerScore,
    busted: playerBusted,
    receiveCard: giveCardToPlayer,
    reset: resetPlayer,
  } = useParticipant(Participant.PLAYER);
  const [gameResult, setGameResult] = useState<GameResult>({ finished: false });
  const [newGameBlocked, setNewGameBlocked] = useState(false);

  const startNewGame = useCallback(async () => {
    giveCardToDealer(await dealCard(), true);
    giveCardToPlayer(await dealCard());
    giveCardToDealer(await dealCard());
    giveCardToPlayer(await dealCard());
  }, [dealCard, giveCardToDealer, giveCardToPlayer]);

  const playAgain = useCallback(() => {
    if (newGameBlocked) {
      return;
    }

    if (gameResult.finished) {
      resetDealer();
      resetPlayer();
      setGameResult({ finished: false });
    }
  }, [resetDealer, resetPlayer, newGameBlocked, gameResult.finished]);

  const playerHits = useCallback(async () => {
    const card = await dealCard();

    giveCardToPlayer(card);
  }, [giveCardToPlayer, dealCard]);

  const playerStays = useCallback(() => {
    playDealerHand();
  }, [playDealerHand]);

  useEffect(() => {
    if (playerBusted) {
      playDealerHand();
    }
  }, [playerBusted, playDealerHand]);

  useEffect(() => {
    if (pendingDealerPlay) {
      return;
    }

    if (playerBusted && !dealerBusted) {
      setGameResult({ finished: true, winner: Participant.DEALER, hand: dealerHand });
    } else if (dealerBusted && !playerBusted) {
      setGameResult({ finished: true, winner: Participant.PLAYER, hand: playerHand });
    } else if (playerBusted && dealerBusted) {
      setGameResult({ finished: true, winner: null, hand: dealerHand });
    } else {
      const dealerDiff = 21 - dealerScore;
      const playerDiff = 21 - playerScore;

      if (dealerDiff < playerDiff) {
        setGameResult({ finished: true, winner: Participant.DEALER, hand: dealerHand });
      } else if (playerDiff < dealerDiff) {
        setGameResult({ finished: true, winner: Participant.PLAYER, hand: playerHand });
      } else {
        setGameResult({ finished: true, winner: null, hand: dealerHand });
      }
    }
  }, [
    pendingDealerPlay,
    dealerBusted,
    playerBusted,
    dealerHand,
    playerHand,
    dealerScore,
    playerScore,
  ]);

  useEffect(() => {
    if (playerScore === 21) {
      playerStays();
    }
  }, [playerScore, playerStays]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    setNewGameBlocked(() => {
      if (gameResult.finished) {
        timeout = setTimeout(() => {
          setNewGameBlocked(false);
        }, delay * 1000);

        return true;
      }

      return false;
    });

    return () => {
      clearTimeout(timeout);
    };
  }, [gameResult.finished, delay, dealerIsReadyToPlay]);

  const readyToPlay = useMemo(() => {
    if (!dealerIsReadyToPlay) {
      return false;
    }

    return !newGameBlocked;
  }, [dealerIsReadyToPlay, newGameBlocked]);

  return {
    readyToPlay,
    dealer: { hand: dealerHand, score: dealerScore, busted: dealerBusted },
    player: {
      hand: playerHand,
      score: playerScore,
      busted: playerBusted,
      name: playerName,
      hit: playerHits,
      stay: playerStays,
    },
    gameResult,
    startNewGame,
    playAgain,
  };
}
