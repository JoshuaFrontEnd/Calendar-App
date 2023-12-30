import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveElement, onUnsetActiveEvent, onUpdateEvent } from '../store';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

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

    try {

      if ( calendarEvent.id  ) {
        // Actualizando
        await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent )
        dispatch( onUpdateEvent({ ...calendarEvent, user }) );
        return;

      }

      // Creando
      const { data } = await calendarApi.post('/events', calendarEvent );
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );

    } catch ( error ) {

      console.log( error );
      Swal.fire('Error al guardar', error.response.data.msg, 'error');

    }



  }

  // Borrar evento
  const startDeletingEvent = async () => {

    try {

      await calendarApi.delete(`/events/${ activeEvent.id }`);
      dispatch( onDeleteEvent() );

    } catch ( error ) {

      console.log( error );
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');

    }

  }

  // Cargar los eventos
  const startLoadingEvents = async () => {

    try {

      const { data } = await calendarApi.get('/events');

      const events = convertEventsToDateEvents( data.eventos );

      dispatch( onLoadEvents( events ) );

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
    hasEventSelected: !!activeEvent?.id,

    // Metodos
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
    unsetActiveEvent,
    startLoadingEvents
  }
}
