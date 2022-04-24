import { Greeting } from 'components/greeting';
import { Stopwatch } from 'components/stopwatch';

import './Home.scss';

export function Home() {
  return (
    <main className="home-page">
      <div className="heading-content">
        <Greeting />
      </div>
      <div className="clock-content">
        <Stopwatch />
      </div>
      <div className="background"></div>
    </main>
  );
}
