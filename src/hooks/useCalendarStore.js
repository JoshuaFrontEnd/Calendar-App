import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveElement, onUnsetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector( state => state.calendar );

  // Set evento activo
  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveElement( calendarEvent ) );
  }

  // Unset evento activo
  const unsetActiveEvent = () => {
    dispatch( onUnsetActiveEvent() );
  }

  // Cuando comienta con "start" por convencion significa que va a empezar a hacer algo
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

  const startDeletingEvent = () => {
    dispatch( onDeleteEvent() );
  }

  return {
    // Propiedades
    events,
    activeEvent,
    // Si tengo una nota activa tengo un objeto, si no, tengo null, al colocarle doble negacion puedo genear una propiedad que devuelva true si es objeto, o false si es null, tambien verifico si ya ha sido creado consultando si tiene id, de esta manera, evito que se muestre el boton a menos que solo se seleccione una nota
    hasEventSelected: !!activeEvent?._id,

    // Metodos
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
    unsetActiveEvent
  }
}
