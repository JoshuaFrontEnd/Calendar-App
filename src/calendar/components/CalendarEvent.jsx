export const CalendarEvent = ({ event }) => {

  const { title, user } = event;

  return (
    <>
      { title }<strong> - { user.name }</strong>
    </>
  )
}
