import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveElement, onUpdateEvent } from '../../../src/store/calendar/calendarSlice';
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from '../../fixtures/calendarStates';

describe('Pruebas en el calendarSlice', () => {

  test('debe de regresar el estado por defecto', () => {

    const state = calendarSlice.getInitialState();
    expect( state ).toEqual( initialState );

  })

  test('onSetActiveElement debe de activar el evento', () => {

    const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveElement( events[0] ) );
    expect( state.activeEvent ).toEqual( events[0] );

  })

  test('onAddNewEvent debe de agregar el evento', () => {

    const newEvent = {
      id: '3',
      start: new Date('2025-10-04 00:00:00'),
      end: new Date('2025-10-04 23:59:00'),
      title: 'Cumpleaños de Lili 2025',
      notes: 'Celebrar el cumpleaños 2025'
    }

    const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
    expect( state.events ).toEqual( [ ...events, newEvent ] );

  })

  test('onUpdateEvent debe de actualizar el evento', () => {

    const updateEvent = {
      id: '1',
      start: new Date('2025-03-25 00:00:00'),
      end: new Date('2025-03-25 23:59:00'),
      title: 'Cumpleaños de Joshua 2025',
      notes: 'Celebrar el cumpleaños 2025'
    }

    const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updateEvent ) );
    expect( state.events ).toContain( updateEvent );

  })

  test('onDeleteEvent debe de borrar el evento activo', () => {

    const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
    expect( state.activeEvent ).toBe( null );
    expect( state.events ).not.toContain( events[0] );

  })

  test('onLoadEvents debe de establecer los eventos', () => {

    const state = calendarSlice.reducer( initialState, onLoadEvents( events ) );
    expect( state.isLoadingEvents ).toBeFalsy();
    expect( state.events ).toEqual( events );

  })

  test('onLogoutCalendar debe de limpiar el estado', () => {

    const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );
    expect( state ).toEqual( initialState );

  })

})