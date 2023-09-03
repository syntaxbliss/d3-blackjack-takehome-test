import { useCallback, useMemo, useState } from 'react';
import classnames from 'classnames';
import BlackjackContainer from './BlackjackContainer';

const GAME_DELAY_IN_SECONDS = 3;
export default function AppContainer(): JSX.Element {
  // FIXME
  const [playerName, setPlayerName] = useState('Pajarito');
  // const [playerName, setPlayerName] = useState('');
  const [isFormPristine, setIsFormPristine] = useState(true);
  const [isValidPlayerName, setIsValidPlayerName] = useState(false);
  // FIXME
  const [readyToPlay, setReadyToPlay] = useState(true);
  // const [readyToPlay, setReadyToPlay] = useState(false);

  const classes = useMemo(
    () => classnames('app', { 'is-invalid': !isValidPlayerName && !isFormPristine }),
    [isValidPlayerName, isFormPristine]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValidPlayerName(true);
    setPlayerName(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsFormPristine(false);

      const isValidName = Boolean(playerName.trim().length);

      if (isValidName) {
        setReadyToPlay(true);
      } else {
        setIsValidPlayerName(false);
      }
    },
    [playerName]
  );

  if (readyToPlay) {
    return <BlackjackContainer playerName={playerName} delay={GAME_DELAY_IN_SECONDS} />;
  }

  return (
    <div className={classes}>
      <div className="app__content">
        <form className="app__form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <label className="app__form__label">
            <p>Howdy! Please tell us your name</p>

            <input
              autoFocus
              className="app__form__control"
              value={playerName}
              onChange={handleInputChange}
            />
          </label>
        </form>

        <p className="app__error-message">Hey speedy, you are missing this field!</p>
      </div>
    </div>
  );
}
