import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingCalendar } from './components/BookingCalendar';
import { CarwashPage } from './pages/Carwash';
import { DetailingPage } from './pages/Detailing';
import { PricePage } from './pages/Price';
import { ContactsPage } from './pages/Contacts';
import { HomePage } from './pages/Home';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carwash" element={<CarwashPage />} />
        <Route path="/detailing" element={<DetailingPage />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
      <Footer />
      <BookingCalendar />
    </HashRouter>
  );
}

export default App;
