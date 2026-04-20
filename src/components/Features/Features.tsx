import {
  MERCEDES_ADVANTAGES_STATS,
  MERCEDES_ADVANTAGES_TITLE,
} from '../../constants';
import './Features.css';

export function Features() {
  return (
    <div className="features-hero">
      <section className="features-inner">
        <h2 className="features-title">{MERCEDES_ADVANTAGES_TITLE}</h2>

        <div className="advantages-grid">
          {MERCEDES_ADVANTAGES_STATS.map((item) => (
            <div key={item.value} className="advantages-card group">
              <div className="advantages-value">{item.value}</div>

              <div className="advantages-content">
                <p className="advantages-label">{item.label}</p>
                {/* <div className="advantages-line" /> */}
                <p className="advantages-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
