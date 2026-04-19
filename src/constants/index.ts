import type { NavigationItem, Service, Feature, PriceTab, PriceItem, ExtraPriceItem, ContactInfo, SocialLink, CompanyInfo } from '../types';

export const CONTACTS: ContactInfo = {
  phone: '+375291831313',
  phoneFormatted: '+375 (29) 183-13-13',
  address: 'пр-т Победителей, 84, ТРЦ «ArenaCity»',
  mapUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3Ab94e535abf3bce033caeba3dfcdb474eb9c66a1ccb68b8cf1abb946b1b68448b&source=constructor',
};

export const BOOKING_URL = '';

export const COMPANY_INFO: CompanyInfo = {
  name: 'ООО «БЛЭК СТАР КАР УОШ»',
  unp: 'УНП 193267496',
  address: 'Республика Беларусь, г. Минск, пр. Победителей, д. 84, пом. 2',
};

export const NAVIGATION: NavigationItem[] = [
  { label: 'главная', href: '/' },
  { 
    label: 'услуги', 
    href: '#',
    hasSubmenu: true,
    submenu: [
      { label: 'Автомойка', href: '/carwash/' },
      { label: 'Детейлинг', href: '/detailing/' },
    ],
  },
  { label: 'прайс', href: '/price/' },
  { label: 'контакты', href: '/contacts/' },
];

export const SERVICES: Service[] = [
  {
    id: 'carwash',
    title: 'Мойка',
    description: 'Зачастую, в бешеном городском ритме совершенно нет времени ни на что, даже на мойку автомобиля, не говоря о ежедневных встречах. Но в Black Star Car Wash Вы можете совместить приятное с полезным! Пока моется Ваш автомобиль, Вы можете продуктивно провести время в нашем уютном кафе.',
    imageUrl: '/assets/images/services/submenu_1.jpg',
    href: '/carwash/',
  },
  {
    id: 'detailing',
    title: 'Детейлинг',
    description: 'Облик автомобиля — лицо владельца, зеркало имиджа и статуса. У нас так принято: встречают по одежке. Парковочные аварии, камни из-под встречки, эффект пескоструя — это лишь малый список негативных факторов, влияющих на внешний вид авто.',
    imageUrl: '/assets/images/services/submenu_2.jpg',
    href: '/detailing/',
  },
];

export const FEATURES: Feature[] = [
  { id: '1', title: 'ДОСТУПНАЯ МОЙКА В МИНСКЕ', imageUrl: '/assets/images/features/more_1.jpg' },
  { id: '3', title: 'СОВРЕМЕННЫЙ ДЕТЕЙЛИНГ ЦЕНТР', imageUrl: '/assets/images/features/more_3.jpg' },
  { id: '4', title: 'УСТАНОВКА ДОПОЛНИТЕЛЬНОГО ОБОРУДОВАНИЯ', imageUrl: '/assets/images/features/more_4.jpg' },
  { id: '5', title: 'LOUNGE ЗОНА С PS4, КОФЕ, ДЕСЕРТАМИ И ВКУСНЫМИ СЕНДВИЧАМИ', imageUrl: '/assets/images/features/more_5.jpg' },
];

export const PRICE_TABS: PriceTab[] = [
  {
    id: 'base',
    label: 'Основной прайс\nуслуги автомойки',
    images: [
      '/assets/images/price/price_03.jpg',
      '/assets/images/price/price_04.jpg',
      '/assets/images/price/price_02.jpg',
    ],
  },
  {
    id: 'discount',
    label: 'Прайс с 20% скидкой\nуслуги автомойки',
    discount: 'действует с 0.00 до 7.00\nили во время осадков',
    images: [
      '/assets/images/price/price_08.jpg',
      '/assets/images/price/price_07.jpg',
    ],
  },
];

export const MAIN_SERVICES: PriceItem[] = [
  { title: 'Комплексная уборка салона', prices: [60, 70, 80], time: '45' },
  { title: 'Детейлинг-уборка салона', prices: [240, 270, 300], time: '150' },
  { title: 'Уборка салона и багажника пылесосом', prices: [20, 25, 30], time: '15' },
  { title: 'Уборка багажника пылесосом', prices: [10, 10, 10], time: '5' },
  { title: 'Продувка и протирка пластиковых, кожаных и виниловых элементов', prices: [20, 25, 30], time: '15' },
  { title: 'Чистка стекол и зеркал салона', prices: [20, 25, 30], time: '15' },
  { title: 'Мойка комплекта ковров/ковра багажника', prices: ['-', '-', 15], time: '5' },
];

export const EXTRA_SERVICES: ExtraPriceItem[] = [
  { title: 'Чистка кожи одного сидения', price: 60, time: 30 },
  { title: 'Обработка кожаных сидений кондиционером', price: 50, time: 20 },
  { title: 'Чистка рулевого колеса', price: 40, time: 15 },
  { title: 'Химчистка текстильного сидения', price: 70, time: 50 },
  { title: 'Чистка детского кресла', price: 50, time: 100 },
  { title: 'Чистка одного элемента', price: 50, time: 30 },
];

export const DETAILING_PRICE_URL = '/detailing';

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Telegram', url: 'https://t.me/blackstarcarwashby' },
  { name: 'Viber', url: 'viber://chat?number=%2B375291831313' },
  { name: 'Instagram', url: 'https://instagram.com/blackstarcarwashby' },
];

export const HERO_IMAGES = [
  '/assets/images/hero/mainred2.png',
];

export const ABOUT_IMAGES = [
  '/assets/images/about/about1.jpg',
  '/assets/images/about/about2.jpg',
  '/assets/images/about/about3.jpg',
];

export const ABOUT_CONTENT = {
  title: 'Совершенство в каждой детали. Профессиональная автомойка.',
  mainText: 'Наша цель — быть полезными для своих клиентов. Мы получаем настоящее удовольствие от работы, поэтому у нас всё получается на высшем уровне! В Black Star Car Wash царит полная прозрачность всех действий. Мы готовы ответить на многие вопросы, дать свои комментарии и рекомендации. Нам претит укоренившееся в нынешних реалиях слово «развод на деньги». Оно полностью идёт вразрез с нашим мировоззрением. Доверие, которое оказываете Вы — крайне дорого нам и мы им дорожим.',
  secondaryText: 'Наш проект — это не только своё дело, но и сильное желание поменять «кое-что» в этом мире… Мы каждый день поднимаем сервис и культуру ухода за автомобилем на другой уровень. Уровень, которого еще не было в стране. Это амбициозно, но мы искренне верим в себя и делаем это.',
};

export const HERO_CONTENT = {
  title: ['INTERHOFMANN', 'CAR WASH'],
  //aboutText: 'Идеальная чистота и безупречный внешний вид вашего автомобиля. Профессиональный уход, точность в работе и внимание к каждой детали.'
};

export const VIDEO_URL = '/assets/video/000.mp4';
export const VIDEO_POSTER = '/assets/images/video/bg.jpg';
