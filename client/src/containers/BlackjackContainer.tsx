import { useCallback, useEffect, useState } from 'react';
import { Cards, StatusPanel, Table } from '../components';
import { useBlackjack } from '../hooks';
import { GameResultObject, GameResultObjectCard } from '../types';

type Props = {
  delay: number;
  playerName: string;
};

export default function BlackjackContainer({ delay, playerName }: Props): JSX.Element {
  const { readyToPlay, dealer, player, startNewGame, gameResult, playAgain } = useBlackjack(
    playerName,
    delay
  );
  const [gameStarted, setGameStarted] = useState(false);

  const handleNewGameClick = useCallback(() => {
    setGameStarted(false);
    playAgain();
  }, [playAgain]);

  useEffect(() => {
    if (readyToPlay && !gameStarted) {
      startNewGame();
      setGameStarted(true);
    }
  }, [readyToPlay, startNewGame, gameStarted]);

  useEffect(() => {
    if (gameResult.finished) {
      const hand: GameResultObjectCard[] = gameResult.hand.map(card => ({
        number: card.number,
        suit: card.suit,
      }));

      const result: Partial<GameResultObject> = {};

      if (gameResult.winner) {
        result.winner = hand;
      } else {
        result.draw = hand;
      }

      const gameResultObject = result as GameResultObject;

      console.log('*** LAST GAME RESULT ***', gameResultObject);
    }
  }, [gameResult]);

  return (
    <div className="blackjack">
      <Table>
        <Cards cards={dealer.hand} className="blackjack__table__cards" />
        <Cards cards={player.hand} className="blackjack__table__cards" />
      </Table>

      <StatusPanel
        dealer={{ busted: dealer.busted, score: dealer.score }}
        gameResult={gameResult}
        onNewGameClick={readyToPlay ? handleNewGameClick : undefined}
        onPlayerHitClick={player.hit}
        onPlayerStayClick={player.stay}
        player={{ busted: player.busted, score: player.score, name: player.name }}
      />
    </div>
  );
}
