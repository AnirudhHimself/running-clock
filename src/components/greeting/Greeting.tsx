import { useCurrentDay } from 'hooks';
import './Greeting.scss';

export function Greeting() {
  const today = useCurrentDay();

  return (
    <header>
      <h1 className="headline">
        Today is <span className="headline-accent is-block">{today}</span>
      </h1>
      <sub className="subheadline">
        There’s a <span className="headline-accent">running clock</span>{' '}
        somewhere.
      </sub>
    </header>
  );
}
