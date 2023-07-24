import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notes/notesSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
