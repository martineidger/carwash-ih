import { MAIN_SERVICES, EXTRA_SERVICES } from '../../constants';
import './Price.css';

const CAR_ICONS = {
  sedan: (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
      <path d="M20 10C21.1 10 22 9.1 22 8V6C22 4.9 21.1 4 20 4H18L16 2H8L6 4H4C2.9 4 2 4.9 2 6V8C2 9.1 2.9 10 4 10H6V12C6 13.1 6.9 14 8 14H16C17.1 14 18 13.1 18 12V10H20ZM4 8V6H6V8H4ZM8 8H16V12H8V8ZM18 8H20V6H18V8Z" fill="currentColor"/>
    </svg>
  ),
  crossover: (
    <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
      <path d="M23 11C24.1 11 25 10.1 25 9V7C25 5.9 24.1 5 23 5H21L19 3H9L7 5H5C3.9 5 3 5.9 3 7V9C3 10.1 3.9 11 5 11H7V14C7 15.1 7.9 16 9 16H19C20.1 16 21 15.1 21 14V11H23ZM5 9V7H7V9H5ZM9 9H19V14H9V9ZM21 9H23V7H21V9Z" fill="currentColor"/>
    </svg>
  ),
  suv: (
    <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
      <path d="M25 12C26.1 12 27 11.1 27 10V8C27 6.9 26.1 6 25 6H23L20 3H10L7 6H5C3.9 6 3 6.9 3 8V10C3 11.1 3.9 12 5 12H7V15C7 16.1 7.9 17 9 17H21C22.1 17 23 16.1 23 15V12H25ZM5 10V8H7V10H5ZM9 10H21V15H9V10ZM25 10H27V8H25V10Z" fill="currentColor"/>
    </svg>
  ),
};

export function Price() {
  return (
    <section className="price">
      <div className="price-header">
        <h2>PRICE LIST</h2>
        <h3>САЛОН / ИНТЕРЬЕР</h3>
      </div>

      <div className="price-table">
        <div className="price-table-header">
          <div className="price-col service-col">Услуга</div>
          <div className="price-col">{CAR_ICONS.sedan}</div>
          <div className="price-col">{CAR_ICONS.crossover}</div>
          <div className="price-col">{CAR_ICONS.suv}</div>
          <div className="price-col time-col">Мин</div>
        </div>

        <div className="price-table-body">
          {MAIN_SERVICES.map((item, index) => (
            <div key={index} className="price-row">
              <div className="price-col service-col">{item.title}</div>
              <div className="price-col" data-label="sedan">{item.prices[0]}</div>
              <div className="price-col" data-label="crossover">{item.prices[1]}</div>
              <div className="price-col" data-label="suv">{item.prices[2]}</div>
              <div className="price-col time-col">{item.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="price-extra">
        <h4>Дополнительные услуги</h4>
        <div className="price-extra-list">
          {EXTRA_SERVICES.map((item, index) => (
            <div key={index} className="price-extra-row">
              <span className="extra-title">{item.title}</span>
              <span className="extra-details">
                {item.price} BYN / {item.time} мин
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="price-footer">
        * На любые виды услуг, в зависимости от степени загрязнений и сложности работ, может применяться повышающий коэффициент по стоимости и по времени.
      </div>
    </section>
  );
}
