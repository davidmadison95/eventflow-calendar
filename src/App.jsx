import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { CalendarProvider } from './contexts/CalendarContext';
import { useCalendar } from './contexts/CalendarContext';
import { useWeather } from './hooks/useWeather';
import { CalendarHeader } from './components/Calendar/CalendarHeader';
import { CalendarGrid } from './components/Calendar/CalendarGrid';
import { FilterBar } from './components/UI/FilterBar';
import { EventModal } from './components/Events/EventModal';
import { Download, Upload } from 'lucide-react';
import { exportEventsAsJSON, importEventsFromJSON } from './utils/eventHelpers';

const CalendarApp = () => {
  const { currentDate, events, setSelectedDate } = useCalendar();
  const { weatherData, isLoading: weatherLoading } = useWeather();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForModal, setSelectedDateForModal] = useState(null);

  const handleDayClick = (date) => {
    setSelectedDateForModal(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDateForModal(null);
    setSelectedDate(null);
  };

  const handleExport = () => {
    exportEventsAsJSON(events);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const importedEvents = await importEventsFromJSON(file);
      // You would need to add an import function to CalendarContext
      // For now, this is a placeholder
      console.log('Imported events:', importedEvents);
      alert('Events imported successfully!');
    } catch (error) {
      alert('Failed to import events: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <CalendarHeader />

        {/* Filter Bar */}
        <FilterBar />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleExport}
            className="btn btn-secondary flex items-center gap-2"
            title="Export events"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          
          <label className="btn btn-secondary flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        {/* Calendar Grid */}
        <CalendarGrid
          currentMonth={currentDate}
          weatherData={weatherData}
          onDayClick={handleDayClick}
        />

        {/* Weather Loading Indicator */}
        {weatherLoading && (
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Loading weather data...
          </div>
        )}

        {/* Event Modal */}
        {selectedDateForModal && (
          <EventModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            date={selectedDateForModal}
          />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <CalendarProvider>
        <CalendarApp />
      </CalendarProvider>
    </ThemeProvider>
  );
}

export default App;
