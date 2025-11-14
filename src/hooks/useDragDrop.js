import { useDrag, useDrop } from 'react-dnd';
import { useCalendar } from '../contexts/CalendarContext';
import { formatDateKey } from '../utils/dateHelpers';

const ItemTypes = {
  EVENT: 'event',
};

/**
 * Custom hook for draggable events
 */
export const useDraggableEvent = (event, date) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EVENT,
    item: {
      eventId: event.id,
      fromDate: formatDateKey(date),
      event,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [event, date]);

  return { isDragging, drag };
};

/**
 * Custom hook for droppable calendar days
 */
export const useDroppableDay = (date) => {
  const { moveEvent } = useCalendar();
  const dateKey = formatDateKey(date);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.EVENT,
    drop: (item) => {
      if (item.fromDate !== dateKey) {
        moveEvent(item.eventId, item.fromDate, dateKey);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [date, moveEvent, dateKey]);

  return { isOver, canDrop, drop };
};

/**
 * Combined hook for drag and drop
 */
export const useDragDrop = () => {
  return {
    ItemTypes,
    useDraggableEvent,
    useDroppableDay,
  };
};

export default useDragDrop;
