import { Edit2, Trash2 } from 'lucide-react';
import { getEventCategoryColor } from '../../utils/eventHelpers';
import clsx from 'clsx';

export const EventCard = ({ event, onClick, onEdit, onDelete, draggable }) => {
  const categoryColor = getEventCategoryColor(event.category);

  return (
    <div
      onClick={onClick}
      draggable={draggable}
      className={clsx(
        'group relative p-2 rounded-md text-white text-sm cursor-pointer',
        'hover:shadow-md transition-all duration-200',
        'flex items-center justify-between gap-2',
        categoryColor
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{event.title}</div>
        {event.tags && event.tags.length > 0 && (
          <div className="flex gap-1 mt-1">
            {event.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 bg-white/20 rounded text-xs truncate"
              >
                {tag}
              </span>
            ))}
            {event.tags.length > 2 && (
              <span className="px-1.5 py-0.5 bg-white/20 rounded text-xs">
                +{event.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="hidden group-hover:flex items-center gap-1">
        {onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(event);
            }}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title="Edit event"
          >
            <Edit2 className="w-3 h-3" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(event);
            }}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title="Delete event"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
