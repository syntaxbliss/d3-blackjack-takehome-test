import { memo, useMemo } from 'react';
import classnames from 'classnames';

type Props = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

function Button({ children, className, onClick }: Props): JSX.Element {
  const classes = useMemo(
    () => classnames('button', { 'is-disabled': !onClick }, className),
    [className, onClick]
  );

  return (
    <button className={classes} onClick={onClick} disabled={!onClick}>
      {children}
    </button>
  );
}

export default memo(Button);
