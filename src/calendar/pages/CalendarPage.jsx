import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarEvent, CalendarModal, NavBar } from '../';

import { localizer, getMessagesEs } from '../../helpers';
import { useUiStore } from '../../hooks';

const events = [{
  title: 'Cumpleaños',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Joshua'
  }
}]

export const CalendarPage = () => {

  const { openDateModal, toggleDateModal } = useUiStore();

  const [ lastView, setLastView ] = useState( localStorage.getItem( 'lastView' ) || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#347CF7',
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
    console.log({ onSelect: event });
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem( 'lastView', event );
    setLastView( event );
  }

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
      />

      <CalendarModal />

    </>
  )
}
