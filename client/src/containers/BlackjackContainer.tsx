import { useEffect, useMemo, useState } from 'react';
import { Cards, LoadingSpinner, StatusPanel, Table } from '../components';
import { useBlackjack } from '../hooks';
import { GameResultObject } from '../types';

type Props = {
  delay: number;
  playerName: string;
};

export default function BlackjackContainer({ delay, playerName }: Props): JSX.Element {
  const { isReadyToPlay, dealer, player, playRound, gameResult } = useBlackjack(playerName, delay);
  const [playNewRound, setPlayNewRound] = useState(true);

  const isNewGameBlocked = useMemo(() => Boolean(!playRound), [playRound]);

  const showLoadingSpinner = useMemo(() => {
    if (playNewRound) {
      return true;
    }

    return !isReadyToPlay;
  }, [playNewRound, isReadyToPlay]);

  useEffect(() => {
    if (playNewRound && playRound) {
      playRound();
      setPlayNewRound(false);
    }
  }, [playNewRound, playRound]);

  useEffect(() => {
    if (gameResult.finished) {
      const gameResultObject: Partial<GameResultObject> = {};

      if (gameResult.winner) {
        gameResultObject.winner = gameResult.hand;
      } else {
        gameResultObject.draw = gameResult.hand;
      }

      console.log('*** GAME RESULT OBJECT ***', gameResultObject);
    }
  }, [gameResult]);

  return (
    <div className="blackjack">
      <LoadingSpinner isVisible={showLoadingSpinner} />

      <Table>
        <Cards cards={dealer.hand} className="blackjack__table__cards" />
        <Cards cards={player.hand} className="blackjack__table__cards" />
      </Table>

      <StatusPanel
        dealer={{ busted: dealer.busted, score: dealer.score }}
        gameResult={gameResult}
        onNewGameClick={isNewGameBlocked ? undefined : () => setPlayNewRound(true)}
        onPlayerHitClick={player.hit}
        onPlayerStayClick={player.stay}
        player={{ busted: player.busted, score: player.score, name: player.name }}
      />
    </div>
  );
}
