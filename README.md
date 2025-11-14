# 📅 Modern Calendar App

A professional, feature-rich calendar application built with React 18, Vite, and Tailwind CSS.

## ✨ Features

- 🎨 **Modern UI** - Clean, responsive design with smooth animations
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🎯 **Drag & Drop** - Move events between dates effortlessly
- 🏷️ **Event Tagging** - Organize events with custom tags
- 🌤️ **Weather Integration** - See weather forecasts for upcoming dates
- 🔄 **Event Recurrence** - Create recurring events
- 📥 **Export/Import** - Save and load your calendar data
- 🔍 **Search & Filter** - Find events quickly
- 🎨 **Color Categories** - Visual organization with color-coded events

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd calendar-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenWeatherMap API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
   
   Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **date-fns** - Modern date utility library
- **react-beautiful-dnd** - Drag and drop functionality
- **Lucide React** - Beautiful icon library

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎯 Usage

### Creating Events

1. Click on any date in the calendar
2. Fill in the event details
3. Choose a category and add tags (optional)
4. Click "Save Event"

### Managing Events

- **Edit**: Click the edit icon on any event
- **Delete**: Click the delete icon on any event
- **Move**: Drag and drop events to different dates

### Filtering

- Use tags to filter events
- Search by event title or description
- Filter by category

### Weather Integration

Weather forecasts appear automatically on upcoming dates (next 5 days).

## 🔐 Security

- API keys stored in environment variables
- No sensitive data in client-side code
- LocalStorage used for data persistence
- Input sanitization for all user inputs

## 📱 Responsive Design

The app is fully responsive and works great on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

## 🎨 Customization

### Changing Theme Colors

Edit `tailwind.config.js` to customize colors:

```javascript
colors: {
  primary: {
    DEFAULT: '#3b82f6',  // Your custom color
    hover: '#2563eb',
  },
}
```

### Adding New Event Categories

Edit `src/utils/eventHelpers.js` to add categories:

```javascript
export const EVENT_CATEGORIES = {
  // ... existing categories
  custom: 'Custom Category',
};
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Developer

Built by David Madison
- Portfolio: [davidmadison95.github.io](https://davidmadison95.github.io)
- LinkedIn: [linkedin.com/in/davidmadison95](https://linkedin.com/in/davidmadison95)

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)
