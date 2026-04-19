import { Hero, About, Services } from '../../components';
import './Home.css';

export function HomePage() {
  return (
    <div className="app">
      <main>
        <Hero />
        <About />
        <Services />
        {/* <Features /> */}
        {/* <Price /> */}
      </main>
    </div>
  );
}
