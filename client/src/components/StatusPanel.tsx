import classnames from 'classnames';
import ParticipantScore from './ParticipantScore';
import { Participant, Dealer, GameResult, Player } from '../types';
import Button from './Button';
import { useMemo } from 'react';

type Props = {
  className?: string;
  dealer: Pick<Dealer, 'busted' | 'score'>;
  gameResult: GameResult;
  onNewGameClick?: () => void;
  onPlayerHitClick: () => void;
  onPlayerStayClick: () => void;
  player: Pick<Player, 'busted' | 'score' | 'name'>;
};

export default function StatusPanel({
  className,
  dealer,
  gameResult,
  onNewGameClick,
  onPlayerHitClick,
  onPlayerStayClick,
  player,
}: Props): JSX.Element {
  const classes = useMemo(() => classnames('status-panel', className), [className]);

  return (
    <div className={classes}>
      <div>
        <p className="status-panel__panel-text">Dealer</p>

        <ParticipantScore
          className="status-panel__panel-score"
          isBusted={dealer.busted}
          score={dealer.score}
        />
      </div>

      {gameResult.finished && (
        <div>
          <p className="status-panel__panel-text">
            {gameResult.winner
              ? `${gameResult.winner === Participant.DEALER ? 'Dealer' : player.name} wins!`
              : 'Draw game'}
          </p>

          <div className="status-panel__panel-controls">
            <Button onClick={onNewGameClick}>
              {onNewGameClick ? 'Play again' : 'Wait for it...'}
            </Button>
          </div>
        </div>
      )}

      <div>
        <p className="status-panel__panel-text">{player.name}</p>

        <ParticipantScore
          className="status-panel__panel-score"
          isBusted={player.busted}
          score={player.score}
        />

        <div className="status-panel__panel-controls">
          <Button onClick={gameResult.finished ? undefined : onPlayerHitClick}>Hit</Button>
          <Button onClick={gameResult.finished ? undefined : onPlayerStayClick}>Stay</Button>
        </div>
      </div>
    </div>
  );
}
