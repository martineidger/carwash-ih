import './Detailing.css';

const DETAILING_SERVICES = [
  {
    category: 'exterior',
    title: 'Экстерьер',
    items: [
      {
        id: 'polishing',
        title: 'Полировка кузова',
        description: 'Восстановление блеска и устранение мелких царапин на лакокрасочном покрытии.',
        price: 'от 250 BYN',
      },
      {
        id: 'ceramic',
        title: 'Керамическое покрытие',
        description: 'Нанесение нанокерамики для долгосрочной защиты кузова.',
        price: 'от 800 BYN',
      },
      {
        id: 'film',
        title: 'Бронеплёнка',
        description: 'Защита кузова антигравийной плёнкой.',
        price: 'от 600 BYN',
      },
      {
        id: 'chrome',
        title: 'Блэк Кварц',
        description: 'Покрытие кузова чёрной керамикой.',
        price: 'от 1200 BYN',
      },
    ],
  },
  {
    category: 'interior',
    title: 'Интерьер',
    items: [
      {
        id: 'chimchistka',
        title: 'Химчистка салона',
        description: 'Глубокая очистка всех поверхностей салона.',
        price: 'от 180 BYN',
      },
      {
        id: 'leather',
        title: 'Чистка кожи',
        description: 'Профессиональная чистка кожаных сидений.',
        price: 'от 150 BYN',
      },
      {
        id: 'alcantara',
        title: 'Чистка Алькантары',
        description: 'Специальная чистка деликатного материала.',
        price: 'от 120 BYN',
      },
    ],
  },
  {
    category: 'protection',
    title: 'Защита',
    items: [
      {
        id: 'hydrophobic',
        title: 'Гидрофобное покрытие',
        description: 'Обработка всех стёкол составом отталкивающим воду.',
        price: 'от 100 BYN',
      },
      {
        id: 'textile',
        title: 'Защита текстиля',
        description: 'Нанесение защитного покрытия на ткань.',
        price: 'от 80 BYN',
      },
      {
        id: 'engine',
        title: 'Защита двигателя',
        description: 'Очистка и нанесение защитного состава.',
        price: 'от 70 BYN',
      },
    ],
  },
];

export function DetailingPage() {
  return (
    <div className="page detailing-page">
      {/* Header */}
      <section className="page-header">
        <h1>ДЕТЕЙЛИНГ</h1>
        <p>Профессиональный уход за вашим автомобилем</p>
      </section>

      {DETAILING_SERVICES.map((category) => (
        <section key={category.category} className="category-section">
          <div className="container">
            <h2 className="category-title">{category.title}</h2>
            <div className="services-grid">
              {category.items.map((service) => (
                <article key={service.id} className="service-card-detailing">
                  <div className="card-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <div className="card-price">{service.price}</div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Свяжитесь с нами</h2>
            <p>Проконсультируем и подберём оптимальный набор услуг</p>
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