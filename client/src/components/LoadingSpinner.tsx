import { memo, useMemo } from 'react';
import classnames from 'classnames';

type Props = {
  isVisible: boolean;
};

function LoadingSpinner({ isVisible }: Props): JSX.Element {
  const classes = useMemo(() => classnames('loading-spinner', { visible: isVisible }), [isVisible]);

  return (
    <div className={classes}>
      <div className="loading-spinner__overlay" />

      <div className="loading-spinner__content">
        <div className="loading-spinner__content__image">
          <img src="/img/back.png" alt="loading" />
        </div>

        <span className="loading-spinner__content__text">Preparing for new game...</span>
      </div>
    </div>
  );
}

export default memo(LoadingSpinner);
