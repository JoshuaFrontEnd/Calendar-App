import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from '../';

import { localizer, getMessagesEs } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

export const CalendarPage = () => {

  const { user } = useAuthStore();

  const { events, setActiveEvent, unsetActiveEvent, startLoadingEvents } = useCalendarStore();

  const { openDateModal, toggleDateModal } = useUiStore();

  const [ lastView, setLastView ] = useState( localStorage.getItem( 'lastView' ) || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: 0,
      opacity: .8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    openDateModal();
  }

  const onSelect = ( event ) => {
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem( 'lastView', event );
    setLastView( event );
  }

  const onSelectSlot = ({ action }) => {
    if ( action === 'click' ) {
      console.log('deseleccionar');
      unsetActiveEvent();
    }
  }

  useEffect(() => {

    startLoadingEvents();

  }, [])


  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
        selectable
        onSelectSlot={ onSelectSlot }
      />

      <CalendarModal />

      <FabAddNew />
      <FabDelete />

    </>
  )
}
