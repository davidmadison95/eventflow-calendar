import { EventCard } from './EventCard';

export const EventList = ({ events, onEventClick, onEventEdit, onEventDelete }) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>No events for this date</p>
        <p className="text-sm mt-1">Click "Add Event" to create one</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onEventClick && onEventClick(event)}
          onEdit={() => onEventEdit && onEventEdit(event)}
          onDelete={() => onEventDelete && onEventDelete(event)}
        />
      ))}
    </div>
  );
};
