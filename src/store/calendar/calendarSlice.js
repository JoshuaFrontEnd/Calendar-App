import { createSlice } from '@reduxjs/toolkit';

import { addHours } from 'date-fns';

// Esto va a tirar un error de consola: "A non-serializable value...", basicamente explica que solo se recomienda poner en el store de Redux, elementos serializables, arrays y datos primitivos, y acá estamos agregando al store un objeto con metodos, aun asi, el codigo es funcional, pero no recomendable de hacer, mas adelante se va a cambiar esto
const tempEvent = {
  _id: new Date().getTime(),
  title: 'Cumpleaños',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Joshua'
  }
}

const initialState = {
  events: [
    tempEvent
  ],
  activeEvent: null,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveElement: ( state, { payload } ) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: ( state, { payload } ) => {
      state.events.push( payload );
      state.activeEvent = null;
    },
    onUpdateEvent: ( state, { payload } ) => {
      state.events = state.events.map( event => {
        if ( event._id === payload._id ) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: ( state ) => {
      if ( state.activeEvent ) {
        state.events = state.events.filter( event => event._id !== state.activeEvent._id );
        state.activeEvent = null;
      }
    },
    onUnsetActiveEvent: ( state ) => {
      state.activeEvent = null;
    }
  }
});

export const {
  onSetActiveElement,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onUnsetActiveEvent
} = calendarSlice.actions;