import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice } from './';

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer
  },
  // Configurando middelware para que permita insertar funciones de tipo date en el store sin mayores inconvenientes
  middleware: ( getDefaultMiddlewate ) => getDefaultMiddlewate({
    serializableCheck: false
  })
});