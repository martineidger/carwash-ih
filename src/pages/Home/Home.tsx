import { Hero, About, Services, Features } from '../../components';
import './Home.css';

export function HomePage() {
  return (
    <div className="app">
      <main>
        <Hero />
        <About />
         <Features />
        <Services />
       
        {/* <Price /> */}
      </main>
    </div>
  );
}
