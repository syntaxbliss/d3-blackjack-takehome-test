import React, { memo, useMemo } from 'react';
import classnames from 'classnames';

type Props = {
  children: JSX.Element[];
  className?: string;
};

function Table({ children, className }: Props): JSX.Element {
  const classes = useMemo(() => classnames('table', className), [className]);

  return (
    <div className={classes}>
      {children.map((child, index) =>
        React.cloneElement(child, {
          key: `${index}-${JSON.stringify(child.props)}`,
          className: 'table__cards',
        })
      )}
    </div>
  );
}

export default memo(Table);
