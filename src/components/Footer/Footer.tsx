import { CONTACTS, COMPANY_INFO, SOCIAL_LINKS, NAVIGATION } from '../../constants';
import './Footer.css';

export function Footer() {
  const servicesNav = NAVIGATION.find(item => item.hasSubmenu);
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Услуги</h4>
          {servicesNav?.submenu?.map((item, index) => (
            <a key={index} href={item.href}>{item.label}</a>
          ))}
          <a href="/price/">Прайс</a>
        </div>
        
        <div className="footer-section">
          <h4>Контакты</h4>
          <a href={`tel:${CONTACTS.phone}`} className="footer-phone">
            {CONTACTS.phoneFormatted}
          </a>
          <p>{CONTACTS.address}</p>
        </div>
        
        <div className="footer-section">
          <h4>Режим работы</h4>
          <p>Круглосуточно</p>
          <p>Без выходных</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="copyright">
          © 2024 {COMPANY_INFO.name}
        </div>
        <div className="social">
          {SOCIAL_LINKS.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}