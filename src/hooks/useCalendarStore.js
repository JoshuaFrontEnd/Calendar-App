import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveElement, onUpdateEvent } from '../store';

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector( state => state.calendar );

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveElement( calendarEvent ) );
  }

  // Cuando comienta con "start" por convencion significa que va a grabar
  const startSavingEvent = async ( calendarEvent ) => {

    // TODO: llegar al backend

    // TODO: bien
    if ( calendarEvent._id  ) {
      // Actualizando
      dispatch( onUpdateEvent({ ...calendarEvent }) );
    } else {
      // Creando
      dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
    }

  }

  return {
    // Propiedades
    events,
    activeEvent,

    // Metodos
    setActiveEvent,
    startSavingEvent
  }
}
