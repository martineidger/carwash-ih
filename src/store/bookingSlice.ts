import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { 
  getMonthAvailability, 
  getDayAvailability, 
  createBooking,
} from '../api/booking';
import type { DayAvailability, TimeSlot, BookingData } from '../api/booking';

interface BookingFormData {
  name: string;
  phone: string;
  service: string;
  car: string;
}

interface BookingState {
  isModalOpen: boolean;
  selectedDate: string | null;
  selectedTime: string | null;
  availableSlots: TimeSlot[];
  monthAvailability: DayAvailability[];
  formData: BookingFormData;
  currentMonth: { year: number; month: number };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  bookingStatus: 'idle' | 'submitting' | 'success' | 'error';
  bookingError: string | null;
}

const initialState: BookingState = {
  isModalOpen: false,
  selectedDate: null,
  selectedTime: null,
  availableSlots: [],
  monthAvailability: [],
  formData: {
    name: '',
    phone: '',
    service: '',
    car: '',
  },
  currentMonth: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  },
  status: 'idle',
  error: null,
  bookingStatus: 'idle',
  bookingError: null,
};

export const fetchMonthAvailability = createAsyncThunk(
  'booking/fetchMonthAvailability',
  async ({ year, month }: { year: number; month: number }) => {
    const data = await getMonthAvailability(year, month);
    return data;
  }
);

export const fetchDayAvailability = createAsyncThunk(
  'booking/fetchDayAvailability',
  async (date: string) => {
    const slots = await getDayAvailability(date);
    return slots;
  }
);

export const submitBooking = createAsyncThunk(
  'booking/submitBooking',
  async (data: BookingData) => {
    const response = await createBooking(data);
    return response;
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
      state.bookingStatus = 'idle';
      state.bookingError = null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedDate = null;
      state.selectedTime = null;
      state.availableSlots = [];
      state.formData = { name: '', phone: '', service: '', car: '' };
      state.status = 'idle';
      state.error = null;
      state.bookingStatus = 'idle';
      state.bookingError = null;
    },
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
      state.selectedTime = null;
      if (!action.payload) {
        state.availableSlots = [];
      }
    },
    setSelectedTime: (state, action: PayloadAction<string | null>) => {
      state.selectedTime = action.payload;
    },
    setFormData: (state, action: PayloadAction<Partial<BookingFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setCurrentMonth: (state, action: PayloadAction<{ year: number; month: number }>) => {
      state.currentMonth = action.payload;
    },
    resetBookingStatus: (state) => {
      state.bookingStatus = 'idle';
      state.bookingError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthAvailability.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMonthAvailability.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.monthAvailability = action.payload;
      })
      .addCase(fetchMonthAvailability.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch availability';
      })
      .addCase(fetchDayAvailability.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDayAvailability.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.availableSlots = action.payload;
      })
      .addCase(fetchDayAvailability.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch day availability';
      })
      .addCase(submitBooking.pending, (state) => {
        state.bookingStatus = 'submitting';
        state.bookingError = null;
      })
      .addCase(submitBooking.fulfilled, (state) => {
        state.bookingStatus = 'success';
      })
      .addCase(submitBooking.rejected, (state, action) => {
        state.bookingStatus = 'error';
        state.bookingError = action.error.message || 'Failed to submit booking';
      });
  },
});

export const {
  openModal,
  closeModal,
  setSelectedDate,
  setSelectedTime,
  setFormData,
  setCurrentMonth,
  resetBookingStatus,
} = bookingSlice.actions;

export default bookingSlice.reducer;
