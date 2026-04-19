import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  closeModal,
  setSelectedDate,
  setSelectedTime,
  setFormData,
  setCurrentMonth,
  fetchMonthAvailability,
  fetchDayAvailability,
  submitBooking,
  resetBookingStatus,
} from '../../store/bookingSlice';
import './BookingCalendar.css';

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const DAYS_OF_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const SERVICES = [
  { id: 'outside', title: 'Мойка кузова' },
  { id: 'inside', title: 'Уборка салона' },
  { id: 'full', title: 'Комплексная мойка' },
  { id: 'antirain', title: 'Антидождь' },
  { id: 'wax', title: 'Защитный воск' },
  { id: 'polishing', title: 'Полировка кузова' },
  { id: 'ceramic', title: 'Керамическое покрытие' },
  { id: 'chimchistka', title: 'Химчистка салона' },
];

export function BookingCalendar() {
  const dispatch = useAppDispatch();
  const {
    isModalOpen,
    selectedDate,
    selectedTime,
    availableSlots,
    monthAvailability,
    currentMonth,
    formData,
    status,
    error,
    bookingStatus,
    bookingError,
  } = useAppSelector((state) => state.booking);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      dispatch(fetchMonthAvailability(currentMonth));
    }
  }, [dispatch, isModalOpen, currentMonth]);

  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchDayAvailability(selectedDate));
    }
  }, [dispatch, selectedDate]);

  const availabilityMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    monthAvailability.forEach((day) => {
      const hasAvailable = day.slots.some((slot) => slot.available);
      map[day.date] = hasAvailable;
    });
    return map;
  }, [monthAvailability]);

  const calendarDays = useMemo(() => {
    const { year, month } = currentMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days: (number | null)[] = [];
    
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  }, [currentMonth]);

  const formatDate = (day: number) => {
    const { year, month } = currentMonth;
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const handlePrevMonth = () => {
    let { year, month } = currentMonth;
    if (month === 0) {
      year -= 1;
      month = 11;
    } else {
      month -= 1;
    }
    dispatch(setCurrentMonth({ year, month }));
  };

  const handleNextMonth = () => {
    let { year, month } = currentMonth;
    if (month === 11) {
      year += 1;
      month = 0;
    } else {
      month += 1;
    }
    dispatch(setCurrentMonth({ year, month }));
  };

  const handleDateClick = (day: number) => {
    const dateStr = formatDate(day);
    if (availabilityMap[dateStr]) {
      dispatch(setSelectedDate(dateStr));
    }
  };

  const handleTimeClick = (time: string) => {
    dispatch(setSelectedTime(time));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    
    dispatch(submitBooking({
      date: selectedDate,
      time: selectedTime,
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      car: formData.car,
    }));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleReset = () => {
    dispatch(resetBookingStatus());
  };

  const isDateAvailable = (day: number) => {
    return availabilityMap[formatDate(day)] === true;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.month === today.getMonth() &&
      currentMonth.year === today.getFullYear()
    );
  };

  if (!isModalOpen) return null;

  return (
    <div className="booking-modal-overlay" onClick={handleClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="booking-modal-close" onClick={handleClose}>
          ×
        </button>

        <h2 className="booking-modal-title">Онлайн-запись</h2>

        {bookingStatus === 'success' ? (
          <div className="booking-success">
            <div className="booking-success-icon">✓</div>
            <h3>Запись оформлена!</h3>
            <p>
              {formData.name}, спасибо за запись! <br />
              Мы свяжемся с вами по телефону {formData.phone} для подтверждения.
            </p>
            <button className="button orange" onClick={handleClose}>
              Закрыть
            </button>
          </div>
        ) : (
          <div className="booking-content">
            {!selectedDate ? (
              <div className="calendar-container">
                <div className="calendar-header">
                  <button className="calendar-nav" onClick={handlePrevMonth}>
                    ‹
                  </button>
                  <span className="calendar-month">
                    {MONTHS[currentMonth.month]} {currentMonth.year}
                  </span>
                  <button className="calendar-nav" onClick={handleNextMonth}>
                    ›
                  </button>
                </div>

                <div className="calendar-weekdays">
                  {DAYS_OF_WEEK.map((day) => (
                    <div key={day} className="calendar-weekday">{day}</div>
                  ))}
                </div>

                <div className="calendar-days">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`calendar-day ${day ? '' : 'empty'} ${
                        day && isDateAvailable(day) ? 'available' : ''
                      } ${day && isToday(day) ? 'today' : ''}`}
                      onClick={day && isDateAvailable(day) ? () => handleDateClick(day) : undefined}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="calendar-legend">
                  <span className="legend-item">
                    <span className="legend-dot available"></span>
                    Свободно
                  </span>
                  <span className="legend-item">
                    <span className="legend-dot unavailable"></span>
                    Занято
                  </span>
                </div>
              </div>
            ) : (
              <div className="booking-details">
                <button 
                  className="booking-back" 
                  onClick={() => dispatch(setSelectedDate(null))}
                >
                  ‹ Назад к календарю
                </button>

                <div className="selected-date-display">
                  {new Date(selectedDate + 'T00:00:00').toLocaleDateString('ru-RU', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </div>

                {!selectedTime ? (
                  <>
                    <h3>Выберите время</h3>
                    {status === 'loading' ? (
                      <div className="booking-loading">Загрузка...</div>
                    ) : availableSlots.length > 0 ? (
                      <div className="time-slots">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot.time}
                            className={`time-slot ${slot.available ? 'available' : 'unavailable'}`}
                            disabled={!slot.available}
                            onClick={() => slot.available && handleTimeClick(slot.time)}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="no-slots">Нет доступных слотов на эту дату</p>
                    )}
                  </>
                ) : (
                  <form className="booking-form" onSubmit={handleSubmit}>
                    <div className="booking-time-selected">
                      Выбрано: {selectedTime}
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Имя</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Ваше имя"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Телефон</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+375 (XX) XXX-XX-XX"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="service">Услуга</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Выберите услугу</option>
                        {SERVICES.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="car">Автомобиль</label>
                      <input
                        type="text"
                        id="car"
                        name="car"
                        value={formData.car}
                        onChange={handleInputChange}
                        required
                        placeholder="Марка и модель"
                      />
                    </div>

                    {bookingError && (
                      <div className="booking-error">
                        {bookingError}
                        <button type="button" onClick={handleReset}>×</button>
                      </div>
                    )}

                    <button 
                      type="submit" 
                      className="button orange"
                      disabled={bookingStatus === 'submitting'}
                    >
                      {bookingStatus === 'submitting' ? 'Отправка...' : 'Записаться'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {error && status === 'failed' && (
              <div className="booking-error">
                {error}
                <button onClick={() => dispatch(fetchMonthAvailability(currentMonth))}>
                  Повторить
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
