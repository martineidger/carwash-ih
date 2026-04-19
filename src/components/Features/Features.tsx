import { FEATURES, VIDEO_URL, VIDEO_POSTER } from '../../constants';
import './Features.css';

export function Features() {
  return (
    <section className="features-hero">
      <div className="video-bg">
        <video autoPlay loop muted playsInline poster={VIDEO_POSTER}>
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>
      <div className="features-content">
        <h2>ЧТО ТАКОЕ BLACK STAR CAR WASH?</h2>
        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="feature-item">
              <img src={feature.imageUrl} alt={feature.title} />
              <span>{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
