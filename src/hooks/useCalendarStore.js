import { useDispatch, useSelector } from 'react-redux';
import { onSetActiveElement } from '../store';

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector( state => state.calendar );

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveElement( calendarEvent ) );
  }

  return {
    // Propiedades
    events,
    activeEvent,

    // Metodos
    setActiveEvent
  }
}
