import { useCallback, useEffect, useState } from 'react';
import { Cards, StatusPanel, Table } from '../components';
import { useBlackjack } from '../hooks';
import { GameResultObject, GameResultObjectCard } from '../types';

type Props = {
  delay: number;
  playerName: string;
};

export default function BlackjackContainer({ delay, playerName }: Props): JSX.Element {
  const { isReadyToPlay, dealer, player, startRound, gameResult } = useBlackjack(playerName, delay);
  const [shouldStartPlaying, setShouldStartPlaying] = useState(true);

  useEffect(() => {
    if (isReadyToPlay && shouldStartPlaying) {
      setShouldStartPlaying(false);
      startRound();
    }
  }, [isReadyToPlay, shouldStartPlaying, startRound]);

  return (
    <div className="blackjack">
      <Table>
        <Cards cards={dealer.hand} className="blackjack__table__cards" />
        <Cards cards={player.hand} className="blackjack__table__cards" />
      </Table>

      <StatusPanel
        dealer={{ busted: dealer.busted, score: dealer.score }}
        gameResult={gameResult}
        onNewGameClick={undefined}
        onPlayerHitClick={player.hit}
        onPlayerStayClick={player.stay}
        player={{ busted: player.busted, score: player.score, name: player.name }}
      />
    </div>

    // <div className="blackjack">
    //   <Table>
    //     <Cards cards={dealer.hand} className="blackjack__table__cards" />
    //     <Cards cards={player.hand} className="blackjack__table__cards" />
    //   </Table>

    //   <StatusPanel
    //     dealer={{ busted: dealer.busted, score: dealer.score }}
    //     gameResult={gameResult}
    //     onNewGameClick={readyToPlay ? handleNewGameClick : undefined}
    //     onPlayerHitClick={player.hit}
    //     onPlayerStayClick={player.stay}
    //     player={{ busted: player.busted, score: player.score, name: player.name }}
    //   />
    // </div>
  );
}
