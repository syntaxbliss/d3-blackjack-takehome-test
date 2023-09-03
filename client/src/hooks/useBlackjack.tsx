import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useDealer from './useDealer';
import usePlayer from './usePlayer';
import { BlackjackService } from '../services';
import { GameResult, Participant } from '../types';

export default function useBlackjack(playerName: string, delay: number) {
  const dealer = useDealer();
  const player = usePlayer(playerName);
  const [shouldStartPlaying, setShouldStartPlaying] = useState(false);
  const [blockNewGame, setBlockNewGame] = useState(false);

  const isReadyToPlay = useMemo(() => dealer.isReady, [dealer.isReady]);
  const gameResult: GameResult = useMemo(() => {
    if (dealer.canContinuePlaying) {
      return { finished: false };
    }

    const winner = BlackjackService.getWinner(dealer.hand, player.hand);

    return {
      finished: true,
      winner,
      hand: winner === Participant.DEALER ? dealer.hand : player.hand,
    };
  }, [dealer.hand, dealer.canContinuePlaying, player.hand]);

  const playRound = useRef(() => {
    dealer.prepareForNewRound();
    player.prepareForNewRound();

    setShouldStartPlaying(true);
  }).current;

  const startRound = useCallback(() => {
    dealer.receiveCard(dealer.dealCard(true));
    player.receiveCard(dealer.dealCard());
    dealer.receiveCard(dealer.dealCard());
    player.receiveCard(dealer.dealCard());
  }, [dealer, player]);

  const hit = useCallback(() => {
    player.receiveCard(dealer.dealCard());
  }, [player, dealer]);

  const stay = useCallback(() => {
    dealer.playHand();
  }, [dealer]);

  useEffect(() => {
    if (player.score >= 21 && dealer.canContinuePlaying) {
      dealer.playHand();
    }
  }, [player.score, dealer]);

  useEffect(() => {
    if (shouldStartPlaying && isReadyToPlay) {
      setShouldStartPlaying(false);
      startRound();
    }
  }, [shouldStartPlaying, isReadyToPlay, startRound]);

  useEffect(() => {
    if (gameResult.finished) {
      setBlockNewGame(true);
    }
  }, [gameResult]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (blockNewGame) {
      timeout = setTimeout(() => {
        setBlockNewGame(false);
      }, delay * 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [delay, blockNewGame]);

  return {
    isReadyToPlay,
    playRound: blockNewGame ? undefined : playRound,
    gameResult,
    dealer: { hand: dealer.hand, busted: dealer.busted, score: dealer.score },
    player: {
      hand: player.hand,
      busted: player.busted,
      score: player.score,
      name: player.name,
      hit: gameResult.finished ? undefined : hit,
      stay: gameResult.finished ? undefined : stay,
    },
  };
}
