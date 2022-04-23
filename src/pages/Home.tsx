import { Greeting } from 'components/greeting';
import { Stopwatch } from 'components/stopwatch';

import './Home.scss';

export function Home() {
  return (
    <div className="home-page">
      <section className="heading-content">
        <Greeting />
      </section>
      <main className="main-content">
        <Stopwatch />
      </main>
    </div>
  );
}
