import { createSlice } from '@reduxjs/toolkit';

import { addHours } from 'date-fns';

// Esto va a tirar un error de consola: "A non-serializable value...", basicamente explica que solo se recomienda poner en el store de Redux, elementos serializables, arrays y datos primitivos, y acá estamos agregando al store un objeto con metodos, aun asi, el codigo es funcional, pero no recomendable de hacer, mas adelante se va a cambiar esto
// const tempEvent = {
//   _id: new Date().getTime(),
//   title: 'Cumpleaños',
//   notes: 'Hay que comprar el pastel',
//   start: new Date(),
//   end: addHours( new Date(), 2 ),
//   bgColor: '#fafafa',
//   user: {
//     _id: '123',
//     name: 'Joshua'
//   }
// }

const initialState = {
  isLoadingEvents: true,
  events: [
    // tempEvent
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
        if ( event.id === payload.id ) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: ( state ) => {
      if ( state.activeEvent ) {
        state.events = state.events.filter( event => event.id !== state.activeEvent.id );
        state.activeEvent = null;
      }
    },
    onUnsetActiveEvent: ( state ) => {
      state.activeEvent = null;
    },
    onLoadEvents: ( state, { payload = [] } ) => {
      state.isLoadingEvents = false;
      // state.events = payload;

      payload.forEach( event => {

        // Si existe en la base de datos
        const exists = state.events.some( dbEvent => dbEvent.id === event.id );

        // Si NO existe en la base de datos
        if ( !exists ) {
          state.events.push( event );
        }

      });
    }
  }
});

export const {
  onSetActiveElement,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onUnsetActiveEvent,
  onLoadEvents
} = calendarSlice.actions;