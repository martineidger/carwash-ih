import { useEffect, useRef, useState } from 'react';
import { NAVIGATION } from '../../constants';
import { useAppDispatch } from '../../hooks/useRedux';
import { openModal } from '../../store/bookingSlice';
import './Header.css';

export function Header() {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollStyle, setScrollStyle] = useState({ alpha: 1, blurPx: 0 });
  const rafRef = useRef<number | null>(null);
  const scrollCtaRafRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const [showHeaderCta, setShowHeaderCta] = useState(false);

  const handleBookingClick = () => {
    dispatch(openModal());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'unset' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (heroEl) return;

    setShowHeaderCta(true);

    const onScrollCta = () => {
      if (scrollCtaRafRef.current != null) return;
      scrollCtaRafRef.current = window.requestAnimationFrame(() => {
        scrollCtaRafRef.current = null;
        
      });
    };
  
    window.addEventListener('scroll', onScrollCta, { passive: true });
    window.addEventListener('resize', onScrollCta);

    return () => {
      window.removeEventListener('scroll', onScrollCta);
      window.removeEventListener('resize', onScrollCta);
      if (scrollCtaRafRef.current != null) window.cancelAnimationFrame(scrollCtaRafRef.current);
    };
  }, []);

  useEffect(() => {
    const maxScroll = 140;

    const update = () => {
      const y = window.scrollY || 0;
      const t = Math.min(y / maxScroll, 1);

      // Keep it readable: never fully transparent.
      const alpha = 1 - t * (1 - 0.55);
      const blurPx = t * 10;

      setScrollStyle({ alpha, blurPx });
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const headerStyle = {
    ['--header-alpha' as any]: scrollStyle.alpha,
    ['--header-blur' as any]: `${scrollStyle.blurPx}px`,
  };

  const leftLinks = NAVIGATION.filter(item => item.href !== '/').slice(0, 2);

  return (
    <>
      <header className="header" style={headerStyle} ref={headerRef}>
        <nav className="nav-left">
          {leftLinks.map((item, index) => (
            item.hasSubmenu ? (
              <div key={index} className="nav-item has-submenu">
                <span className="nav-link">{item.label}</span>
                <div className="submenu">
                  {item.submenu?.map((subItem, subIndex) => (
                    <a key={subIndex} href={subItem.href}>{subItem.label}</a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={index} href={item.href} className="nav-link">
                {item.label}
              </a>
            )
          ))}
        </nav>

        <a href="/" className="logo">INTERHOFMANN</a>

        <nav className="nav-right">
          <a href="/about/" className="nav-link">О НАС</a>
          <a href="/contacts/" className="nav-link">КОНТАКТЫ</a>
      
        </nav>

        <div 
          className={`burger ${isMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Меню"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {showHeaderCta && (
            <button
              type="button"
              className="button header-book-btn header-book-btn-white"
              onClick={handleBookingClick}
            >
              Записаться
            </button>
          )}
      </header>

      <div 
        className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`} 
        onClick={closeMenu}
      />

      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        {NAVIGATION.filter(item => item.href !== '/').map((item, index) => (
          item.hasSubmenu ? (
            <div key={index}>
              <span className="nav-link" style={{ fontWeight: 700 }}>{item.label}</span>
              <div style={{ paddingLeft: 15 }}>
                {item.submenu?.map((subItem, subIndex) => (
                  <a 
                    key={subIndex} 
                    href={subItem.href}
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    {subItem.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a 
              key={index} 
              href={item.href}
              className="nav-link"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          )
        ))}
      </nav>
    </>
  );
}
