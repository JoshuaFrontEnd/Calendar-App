export const events = [{
  id: '1',
  start: new Date('2024-03-25 00:00:00'),
  end: new Date('2024-03-25 23:59:00'),
  title: 'Cumpleaños de Joshua',
  notes: 'Celebrar el cumpleaños'
},{
  id: '2',
  start: new Date('2024-10-04 00:00:00'),
  end: new Date('2024-10-04 23:59:00'),
  title: 'Cumpleaños de Lili',
  notes: 'Celebrar el cumpleaños'
}]

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null
}

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [ ...events ],
  activeEvent: null
}

export const calendarWithActiveEventsState = {
  isLoadingEvents: false,
  events: [ ...events ],
  activeEvent: { ...events[0] }
}