import { useState } from 'react';
import './Contacts.css';

export function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!/^[\d\s\-+()]{7,}$/.test(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Введите сообщение';
    }
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
    setErrors({});
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="page contacts-page">
      {/* Header */}
      <section className="page-header">
        <h1>КОНТАКТЫ</h1>
        <p>Свяжитесь с нами любым удобным способом</p>
      </section>

      <section className="contacts-section">
        <div className="container">
          <div className="contacts-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <div className="info-card">
                <h3>Адрес</h3>
                <p>пр-т Победителей, 84</p>
                <a 
                  href="https://yandex.ru/map-widget/v1/?um=constructor%3Ab94e535abf3bce033caeba3dfcdb474eb9c66a1ccb68b8cf1abb946b1b68448b&source=constructor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button outline"
                >
                  Открыть на карте
                </a>
                <span>ТРЦ «Arena City»</span>
                
              </div>

              <div className="info-card">
                <h3>Телефон</h3>
                <a href="tel:+375290000000" className="phone-link">
                  +375 (29) 000-00-00
                </a>
                <span>Звоните, мы работаем 24/7</span>
              </div>

              <div className="info-card">
                <h3>Режим работы</h3>
                <div className="schedule">
                  <div className="schedule-item">
                    <span>Пн-Пт</span>
                    <span>00:00 — 24:00</span>
                  </div>
                  <div className="schedule-item">
                    <span>Сб-Вс</span>
                    <span>00:00 — 24:00</span>
                  </div>
                </div>
                
              </div>

              <div className="info-card social">
                <h3>Мессенджеры</h3>
                <div className="social-links">
                  <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                    Telegram
                  </a>
                  <a href="">
                    Viber
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h3>Напишите нам</h3>
              {submitted && (
                <div className="success-message">
                  ✓ Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
                </div>
              )}
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Ваше имя *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Как к вам обращаться?"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Телефон *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+375 (__) ___-__-__"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Сообщение *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Чем мы можем помочь?"
                    rows={5}
                    className={errors.message ? 'error' : ''}
                  />
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <button type="submit" className="button orange submit-btn">
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="map-section">
        <div className="container">
          <div className="map-wrapper">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab94e535abf3bce033caeba3dfcdb474eb9c66a1ccb68b8cf1abb946b1b68448b&source=constructor"
              width="100%"
              height="450"
              frameBorder="0"
              title="Black Star Car Wash на карте"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
