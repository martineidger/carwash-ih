import { useAppDispatch } from '../../hooks/useRedux';
import { openModal } from '../../store/bookingSlice';
import { HERO_IMAGES, HERO_CONTENT } from '../../constants';
import './Hero.css';

export function Hero() {
  const dispatch = useAppDispatch();

  const handleBookingClick = () => {
    dispatch(openModal());
  };

  return (
    <section className="home" id="hero">
      <div className="hero-slider">
        <div
          className="hero-slide"
          style={{ backgroundImage: `url(${HERO_IMAGES[0]})` }}
        >
          <div className="hero-left-content">
            {/* <div className="hero-text-main">
              {HERO_CONTENT.title.map((text, index) => (
                <>
                <span key={index} className="wrap transparent">
                  {text}
                </span>
                <span key={index} className="wrap">
                  {"\n"}
                </span>
                </>
              ))}
            </div> */}
            <div className="hero-text-main">
              {HERO_CONTENT.title.map((text, index) => (
                <h1 key={index} className={`wrap ${index == 0? 'outline' : 'main'}`}>
                  {text}
                </h1>
              ))}
            </div>
            {/* <div className="hero-text-about">
              {HERO_CONTENT.aboutText}
            </div> */}

            {/* <button
              className="button hero-book-btn hero-book-btn-white"
              onClick={handleBookingClick}
            >
              Записаться
            </button> */}
          </div>
        </div>
        <button
              className="button hero-book-btn hero-book-btn-white"
              onClick={handleBookingClick}
            >
              Записаться
            </button>
      </div>
    </section>
  );
}
