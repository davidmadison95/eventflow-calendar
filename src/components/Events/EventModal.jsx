import { useState, useEffect } from 'react';
import { X, Plus, Tag } from 'lucide-react';
import { useCalendar } from '../../contexts/CalendarContext';
import { EventList } from './EventList';
import { EVENT_CATEGORIES } from '../../utils/eventHelpers';
import { formatDisplayDate } from '../../utils/dateHelpers';

export const EventModal = ({ isOpen, onClose, date }) => {
  const { addEvent, updateEvent, deleteEvent, getEventsForDate, tags, addTag } = useCalendar();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'work',
    tags: [],
  });
  
  const [editingEvent, setEditingEvent] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);

  const events = date ? getEventsForDate(date) : [];

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: '',
        description: '',
        category: 'work',
        tags: [],
      });
      setEditingEvent(null);
      setTagInput('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    if (editingEvent) {
      updateEvent(date, editingEvent.id, formData);
      setEditingEvent(null);
    } else {
      addEvent(date, formData);
    }

    setFormData({
      title: '',
      description: '',
      category: 'work',
      tags: [],
    });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      category: event.category,
      tags: event.tags || [],
    });
  };

  const handleDelete = (event) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(date, event.id);
      if (editingEvent && editingEvent.id === event.id) {
        setEditingEvent(null);
        setFormData({
          title: '',
          description: '',
          category: 'work',
          tags: [],
        });
      }
    }
  };

  const handleAddTag = (tag) => {
    const normalizedTag = tag.trim().toLowerCase();
    if (normalizedTag && !formData.tags.includes(normalizedTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, normalizedTag],
      }));
      addTag(normalizedTag);
      setTagInput('');
      setShowTagSuggestions(false);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const filteredTags = tags.filter(
    (tag) =>
      tag.toLowerCase().includes(tagInput.toLowerCase()) &&
      !formData.tags.includes(tag)
  );

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold">
              {formatDisplayDate(date, 'EEEE, MMMM d, yyyy')}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {events.length} {events.length === 1 ? 'event' : 'events'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          {/* Event Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Event Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter event title"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Enter event description (optional)"
                className="input min-h-[80px] resize-y"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="input"
                required
              >
                {Object.entries(EVENT_CATEGORIES).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tags
              </label>
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => {
                      setTagInput(e.target.value);
                      setShowTagSuggestions(e.target.value.length > 0);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(tagInput);
                      }
                    }}
                    placeholder="Add tags (press Enter)"
                    className="input"
                  />
                  {showTagSuggestions && filteredTags.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {filteredTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleAddTag(tag)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              {editingEvent ? 'Update Event' : 'Add Event'}
            </button>

            {editingEvent && (
              <button
                type="button"
                onClick={() => {
                  setEditingEvent(null);
                  setFormData({
                    title: '',
                    description: '',
                    category: 'work',
                    tags: [],
                  });
                }}
                className="btn btn-secondary w-full"
              >
                Cancel Edit
              </button>
            )}
          </form>

          {/* Event List */}
          {events.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Events</h3>
              <EventList
                events={events}
                onEventEdit={handleEdit}
                onEventDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
