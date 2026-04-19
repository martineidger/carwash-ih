import { useAppDispatch } from '../../hooks/useRedux';
import { openModal } from '../../store/bookingSlice';
import './Carwash.css';

const CARWASH_SERVICES = [
  {
    id: 'outside',
    title: 'Мойка кузова',
    subtitle: 'Комплексная мойка автомобиля',
    description: 'Профессиональная мойка кузова автомобиля с использованием специализированных шампуней и оборудования. Мы удаляем все загрязнения, включая дорожный налет, следы насекомых и птичий помёт.',
    features: ['Ручная мойка кузова', 'Очистка колёсных арок', 'Мойка стёкол снаружи', 'Сушка кузова', 'Чернение резины'],
  },
  {
    id: 'inside',
    title: 'Уборка салона',
    subtitle: 'Комплексная уборка интерьера',
    description: 'Полная уборка салона автомобиля: пылесос, влажная уборка панелей, очистка сидений и ковровых покрытий. Создаём свежую и комфортную атмосферу в вашем автомобиле.',
    features: ['Пылесос сидений', 'Чистка ковров', 'Влажная уборка панелей', 'Очистка стёкол изнутри', 'Обработка кондиционера'],
  },
  {
    id: 'full',
    title: 'Комплексная мойка',
    subtitle: 'Полный сервис мойки',
    description: 'Комбинированная услуга, включающая полную мойку кузова и полную уборку салона. Оптимальный выбор для тех, кто ценит своё время и хочет получить идеальный результат.',
    features: ['Всё из "Мойка кузова"', 'Всё из "Уборка салона"', 'Обработка кожаных сидений', 'Нанесение кондиционера на пластик', 'Освежитель воздуха'],
  },
  {
    id: 'antirain',
    title: 'Антидождь',
    subtitle: 'Защита стёкол',
    description: 'Нанесение гидрофобного покрытия на лобовое и боковые стёкла. Вода скатывается каплями уже на скорости от 60 км/ч, значительно улучшая видимость в дождливую погоду.',
    features: ['Гидрофобное покрытие', 'Улучшение видимости', 'Защита от грязи', 'Эффект до 6 месяцев', 'Безопасное вождение'],
  },
  {
    id: 'wax',
    title: 'Защитный воск',
    subtitle: 'Блеск и защита кузова',
    description: 'Нанесение твёрдого воска на кузов автомобиля для придания глубокого блеска и защиты лакокрасочного покрытия от агрессивных факторов окружающей среды.',
    features: ['Глубокий блеск', 'Защита от УФ', 'Отталкивание грязи', 'Восстановление цвета', 'Эффект до 3 месяцев'],
  },
  {
    id: 'pre-sale',
    title: 'Предпродажная подготовка',
    subtitle: 'Подготовка к продаже',
    description: 'Полный комплекс услуг по приведению автомобиля в идеальное состояние для продажи. Включает химчистку, полировку кузова и все косметические работы.',
    features: ['Химчистка салона', 'Полировка кузова', 'Восстановление ЛКП', 'Чистка двигателя', 'Дезинфекция салона'],
  },
];

export function CarwashPage() {
  const dispatch = useAppDispatch();

  const handleBookingClick = () => {
    dispatch(openModal());
  };

  return (
    <div className="page carwash-page">
      {/* Hero */}
      <section className="page-header">
        <h1>АВТОМОЙКА</h1>
        <p>Профессиональный уход за вашим автомобилем</p>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            {CARWASH_SERVICES.map((service) => (
              <article key={service.id} className="service-card">
                <div className="service-content">
                  <span className="service-subtitle">{service.subtitle}</span>
                  <h3 className="service-title">{service.title}</h3>
                  {/* <p className="service-description">{service.description}</p> */}
                  <ul className="service-features">
                    {service.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <button 
                     className="button orange"
                     onClick={handleBookingClick}>
                    Записаться
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Готовы записаться?</h2>
            <p>Свяжитесь с нами для записи на услугу</p>
            <div className="cta-buttons">
              <a href="tel:+375291831313" className="cta-phone">
                +375 (29) 183-13-13
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
