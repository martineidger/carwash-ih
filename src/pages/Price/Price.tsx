import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useRedux';
import { openModal } from '../../store/bookingSlice';
import './Price.css';

const TABS = [
  {
    id: 'carwash',
    label: 'МОЙКА',
    items: [
      { name: 'Экспресс-мойка кузова', description: 'Быстрая мойка без сушки', price: '25' },
      { name: 'Мойка кузова', description: 'С ручной сушкой', price: '35' },
      { name: 'Уборка салона', description: 'Пылесос + панели', price: '30' },
      { name: 'Комплексная мойка', description: 'Кузов + салон', price: '55' },
      { name: 'Мойка кузова с воском', description: 'Защита и блеск', price: '50' },
      { name: 'Антидождь', description: 'Гидрофобное покрытие', price: '40' },
      { name: 'Чернение резины', description: 'Придание чёрного цвета', price: '10' },
      { name: 'Обработка кондиционера', description: 'Антибактериальная', price: '35' },
    ]
  },
  {
    id: 'detailing',
    label: 'ДЕТЕЙЛИНГ',
    items: [
      { name: 'Полировка кузова', description: 'Абразивная полировка', price: '250–400' },
      { name: 'Полировка фар', description: 'Восстановление прозрачности', price: '100' },
      { name: 'Керамическое покрытие', description: 'Нанокерамика', price: 'от 800' },
      { name: 'Бронеплёнка', description: 'Капот + бампер', price: '600–900' },
      { name: 'Химчистка салона', description: 'Полная очистка', price: '180–280' },
      { name: 'Чистка кожаных сидений', description: 'С кондиционером', price: '150' },
      { name: 'Защита текстиля', description: 'Нанопокрытие', price: '80' },
      { name: 'PDR', description: 'Беспокрасочное удаление вмятин', price: 'от 80' },
    ]
  }
];

export function PricePage() {
  const [activeTab, setActiveTab] = useState('carwash');
  const dispatch = useAppDispatch();
  
    const handleBookingClick = () => {
      dispatch(openModal());
    };

  const currentItems = TABS.find(t => t.id === activeTab)?.items || [];

  return (
    <div className="price-page">
      {/* Hero */}
      <section className="price-hero">
        <h1>ЦЕНЫ</h1>
        <p>Премиальный уход за вашим автомобилем</p>
      </section>

      {/* Tabs */}
      <section className="price-tabs">
        <div className="tabs-container">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Price Table */}
      <section className="price-content">
        <div className="price-table">
          {currentItems.map((item, index) => (
            <div key={index} className="price-row">
              <div className="price-info">
                <span className="price-name">{item.name}</span>
                <span className="price-desc">{item.description}</span>
              </div>
              <div className="price-value">
                <span className="price-amount">{item.price}</span>
                <span className="price-currency">BYN</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="price-cta">
        <p>Запишитесь прямо сейчас</p>
        <div className="cta-buttons">
         <button
              className="button hero-book-btn hero-book-btn-white"
              onClick={handleBookingClick}
            >
              Записаться
            </button>
        </div>
      </section>

      {/* Note */}
      <section className="price-note">
        <p>* Точная стоимость определяется после осмотра автомобиля</p>
      </section>
    </div>
  );
}