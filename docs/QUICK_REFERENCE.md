# 📋 Calendar App - Quick Reference

## 🚀 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📂 Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main application component |
| `src/contexts/CalendarContext.jsx` | Global calendar state |
| `src/contexts/ThemeContext.jsx` | Dark mode state |
| `src/utils/eventHelpers.js` | Event categories & utilities |
| `src/utils/dateHelpers.js` | Date formatting & calculations |
| `src/services/eventStorage.js` | LocalStorage management |
| `src/services/weatherAPI.js` | Weather API integration |
| `.env` | API keys (DON'T COMMIT!) |

## 🎨 Adding New Features

### Add a New Event Category

1. **Edit `src/utils/eventHelpers.js`**:
```javascript
export const EVENT_CATEGORIES = {
  // ... existing
  birthday: { label: 'Birthday', color: 'event-birthday' },
};
```

2. **Edit `tailwind.config.js`**:
```javascript
colors: {
  event: {
    // ... existing
    birthday: '#ec4899',
  },
}
```

3. **Edit `src/index.css`**:
```css
.event-birthday {
  @apply bg-event-birthday;
}
```

### Add a New Component

```bash
# Create component file
touch src/components/YourComponent/YourComponent.jsx

# Import in parent component
import { YourComponent } from './components/YourComponent/YourComponent';
```

### Add a Custom Hook

```bash
# Create hook file
touch src/hooks/useYourHook.js

# Use in components
import { useYourHook } from '../hooks/useYourHook';
```

## 🐛 Quick Fixes

### Weather Not Working?
```bash
# Check .env file exists and has API key
cat .env

# Restart dev server
npm run dev
```

### Dark Mode Issues?
```javascript
// Clear localStorage in browser console
localStorage.clear()
```

### Build Errors?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Component Props Quick Reference

### EventCard
```jsx
<EventCard
  event={eventObject}
  onClick={() => {}}
  onEdit={() => {}}
  onDelete={() => {}}
  draggable={true}
/>
```

### EventModal
```jsx
<EventModal
  isOpen={boolean}
  onClose={() => {}}
  date={dateObject}
/>
```

### CalendarDay
```jsx
<CalendarDay
  date={dateObject}
  currentMonth={dateObject}
  weatherData={object}
  onDayClick={(date) => {}}
/>
```

## 📱 Mobile Breakpoints

| Breakpoint | Size | Tailwind Class |
|------------|------|----------------|
| Mobile | < 640px | Default |
| Tablet | ≥ 640px | `sm:` |
| Desktop | ≥ 1024px | `lg:` |
| Large | ≥ 1280px | `xl:` |

## 🎨 Color Palette

### Event Categories
```
Work:      #3b82f6 (Blue)
Personal:  #10b981 (Green)
Important: #ef4444 (Red)
Meeting:   #8b5cf6 (Purple)
Deadline:  #f59e0b (Orange)
Other:     #6b7280 (Gray)
```

### Theme Colors
```
Primary:   #3b82f6
Surface:   #f3f4f6 (light) / #1f2937 (dark)
```

## 🔑 Environment Variables

```bash
# Required
VITE_WEATHER_API_KEY=your_key_here

# Optional
VITE_DEFAULT_CITY=London
```

## 📦 Useful Packages

| Package | Purpose | Docs |
|---------|---------|------|
| react | UI framework | [Docs](https://react.dev/) |
| date-fns | Date utilities | [Docs](https://date-fns.org/) |
| lucide-react | Icons | [Docs](https://lucide.dev/) |
| clsx | Class names | [Docs](https://github.com/lukeed/clsx) |

## 🚀 Deploy Commands

### Netlify
```bash
npm run build
netlify deploy --prod
```

### Vercel
```bash
vercel --prod
```

### Build Only
```bash
npm run build
# Files in dist/ folder
```

## 🎓 Learning Resources

- [React Tutorial](https://react.dev/learn)
- [Tailwind Playground](https://play.tailwindcss.com/)
- [JavaScript Date Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [React Hooks](https://react.dev/reference/react)

## 💡 Pro Tips

1. **Use React DevTools** - Install browser extension for debugging
2. **Check Console** - Always check browser console for errors
3. **Hot Reload** - Vite auto-reloads on save
4. **Component First** - Build one component at a time
5. **Test Mobile** - Use browser dev tools device mode

## 🔒 Security Reminders

- ✅ `.env` in `.gitignore`
- ✅ Never commit API keys
- ✅ Use environment variables for secrets
- ✅ Regenerate API keys if exposed

## 📊 Performance Tips

1. **Lazy Loading** - Use React.lazy() for code splitting
2. **Memoization** - Use useMemo for expensive calculations
3. **Debouncing** - Debounce search input
4. **Caching** - Weather API already implements caching

## 🎯 Testing Checklist

Quick test before deployment:
```
✓ Create event
✓ Edit event
✓ Delete event
✓ Filter events
✓ Search events
✓ Dark mode toggle
✓ Month navigation
✓ Mobile responsive
```

---

**Keep this file handy for quick reference!** 📌
