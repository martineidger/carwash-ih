import { SERVICES } from '../../constants';
import './Services.css';

export function Services() {
  return (
    <section className="services-section">
      <h2 className="services-title">Наши услуги</h2>
      <div className="services-grid">
        {SERVICES.map((service) => (
          <a key={service.id} href={service.href} className="service-card">
            <div className="service-image">
              <img src={service.imageUrl} alt={service.title} />
            </div>
            <div className="service-overlay">
              <h2 className="service-title">{service.title}</h2>
              {/* <p className="service-description">{service.description}</p> */}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
