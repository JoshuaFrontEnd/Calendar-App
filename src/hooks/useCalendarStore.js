import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveElement, onUnsetActiveEvent, onUpdateEvent } from '../store';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector( state => state.calendar );
  const { user } = useSelector( state => state.auth );

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

    if ( calendarEvent._id  ) {
      // Actualizando
      dispatch( onUpdateEvent({ ...calendarEvent }) );
    } else {
      // Creando
      const { data } = await calendarApi.post('/events', calendarEvent );

      dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
    }

  }

  const startDeletingEvent = () => {
    dispatch( onDeleteEvent() );
  }

  const startLoadingEvents = async () => {

    try {

      const { data } = await calendarApi.get('/events');

      const events = convertEventsToDateEvents( data.eventos );
      console.log( events );

    } catch ( error ) {

      console.log('Error cargando eventos');
      console.log( error );

    }

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
    unsetActiveEvent,
    startLoadingEvents
  }
}
