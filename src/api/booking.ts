const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DayAvailability {
  date: string;
  slots: TimeSlot[];
}

export interface BookingData {
  date: string;
  time: string;
  name: string;
  phone: string;
  service: string;
  car: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message?: string;
}

const ALL_TIMES = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00'
];

function generateMockMonthData(year: number, month: number): DayAvailability[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const data: DayAvailability[] = [];
  
  const today = new Date();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    
    if (dayOfWeek === 0) {
      data.push({
        date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        slots: []
      });
      continue;
    }
    
    if (date < today && date.toDateString() !== today.toDateString()) {
      data.push({
        date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        slots: []
      });
      continue;
    }
    
    const slots: TimeSlot[] = ALL_TIMES.map(time => ({
      time,
      available: Math.random() > 0.3
    }));
    
    data.push({
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      slots
    });
  }
  
  return data;
}

function generateMockDaySlots(): TimeSlot[] {
  return ALL_TIMES.map(time => ({
    time,
    available: Math.random() > 0.3
  }));
}

export async function getMonthAvailability(year: number, month: number): Promise<DayAvailability[]> {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return generateMockMonthData(year, month);
  }
  
  const response = await fetch(
    `${API_BASE_URL}/availability?year=${year}&month=${month + 1}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch availability');
  }
  
  return response.json();
}

export async function getDayAvailability(date: string): Promise<TimeSlot[]> {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return generateMockDaySlots();
  }
  
  const response = await fetch(
    `${API_BASE_URL}/availability/${date}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch day availability');
  }
  
  return response.json();
}

export async function createBooking(data: BookingData): Promise<BookingResponse> {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Mock booking created:', data);
    return {
      success: true,
      bookingId: `BK-${Date.now()}`,
      message: 'Бронирование успешно создано!'
    };
  }
  
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to create booking' }));
    throw new Error(error.message || 'Failed to create booking');
  }
  
  return response.json();
}
