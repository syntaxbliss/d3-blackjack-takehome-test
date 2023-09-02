import { memo, useMemo } from 'react';
import classnames from 'classnames';

type Props = {
  className?: string;
  isBusted?: boolean;
  score: number;
};

function ParticipantScore({ className, isBusted, score }: Props): JSX.Element {
  const classes = useMemo(() => classnames('participant-score', className), [className]);

  return (
    <div className={classes}>
      <span className="participant-score__text">
        <b>Score:</b> {score}
      </span>

      {isBusted && (
        <span className="participant-score__text participant-score__busted-text">BUSTED 💥</span>
      )}
    </div>
  );
}

export default memo(ParticipantScore);
