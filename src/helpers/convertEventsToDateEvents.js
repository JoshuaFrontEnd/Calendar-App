import { parseISO } from 'date-fns';

export const convertEventsToDateEvents = ( events = [] ) => {

  // Regreso los eventos cuyas fechas esten de tipo "Date"
  return events.map( event => {

    event.end = parseISO( event.end );
    event.start = parseISO( event.start );

    return event;

  })
}
