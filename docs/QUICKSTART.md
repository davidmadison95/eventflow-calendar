# ⚡ Quick Start Guide

Get your calendar app running in 5 minutes!

## 🚀 Super Quick Start (For Experienced Developers)

```bash
git clone <your-repo-url>
cd calendar-app
npm install
cp .env.example .env
# Add your OpenWeatherMap API key to .env
npm run dev
```

Visit `http://localhost:3000` - Done! 🎉

---

## 📖 Detailed Guide (For Everyone Else)

### Step 1: Prerequisites ✅

Before starting, you need:

#### Node.js and npm
Check if you have them:
```bash
node --version  # Should show v18.0.0 or higher
npm --version   # Should show 9.0.0 or higher
```

Don't have them? Download from [nodejs.org](https://nodejs.org/)

#### Git (Optional but recommended)
```bash
git --version  # Should show version number
```

Don't have it? Download from [git-scm.com](https://git-scm.com/)

#### Text Editor
Use any of these:
- VS Code (recommended) - [Download](https://code.visualstudio.com/)
- Sublime Text
- Atom
- WebStorm

### Step 2: Get the Code 📥

#### Option A: Using Git (Recommended)
```bash
# Navigate to where you want the project
cd ~/Projects  # or wherever you keep projects

# Clone the repository
git clone https://github.com/yourusername/calendar-app.git

# Enter the project folder
cd calendar-app
```

#### Option B: Download ZIP
1. Go to GitHub repository
2. Click green "Code" button
3. Click "Download ZIP"
4. Extract ZIP file
5. Open terminal in extracted folder

### Step 3: Install Dependencies 📦

```bash
# Make sure you're in the calendar-app folder
pwd  # Should show .../calendar-app

# Install all required packages (this takes 1-2 minutes)
npm install
```

You'll see a progress bar. Wait for it to complete.

**Troubleshooting:**
- If you get permission errors on Mac/Linux: `sudo npm install`
- If npm is slow: Try `npm install --legacy-peer-deps`

### Step 4: Set Up Weather API (Optional) 🌤️

The app works without this, but weather won't show.

#### Get Free API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" (top right)
3. Create free account
4. Go to "API Keys" section
5. Copy your API key (looks like: `abcd1234efgh5678ijkl9012mnop3456`)

#### Add API Key to App

```bash
# Create environment file
cp .env.example .env

# Open .env file in your text editor
# On Mac:
open .env

# On Windows:
notepad .env

# On Linux:
nano .env
```

Edit the file to look like this:
```env
VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
VITE_DEFAULT_CITY=Your_City_Name
VITE_APP_NAME=Calendar App
VITE_APP_VERSION=1.0.0
```

Replace `your_actual_api_key_here` with your real API key!

Save and close the file.

### Step 5: Start the App 🎉

```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 437 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
➜  press h to show help
```

**Success!** Open your browser and go to `http://localhost:3000`

### Step 6: Explore the App 🎮

Try these features:

1. **Click any day** → Opens event modal
2. **Add an event:**
   - Enter title (e.g., "Team Meeting")
   - Add description (optional)
   - Choose category
   - Add tags (optional)
   - Click "Add Event"

3. **Drag an event** → Move it to another day
4. **Click event** → Edit or delete
5. **Toggle dark mode** → Click moon icon (top right)
6. **Filter by tags** → Use the filter bar above calendar
7. **Search events** → Type in search box
8. **Export/Import** → Use icons next to dark mode toggle

### Step 7: Stop the App 🛑

When you're done:
- Press `Ctrl + C` in the terminal
- Type `y` and press Enter if asked

To start again later:
```bash
cd calendar-app
npm run dev
```

---

## 🎨 Customization Tips

### Change Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#3b82f6',  // Change this hex color!
  },
}
```

### Change Default City

Edit `.env`:
```env
VITE_DEFAULT_CITY=Tokyo  # or London, Paris, etc.
```

### Add New Event Categories

Edit `src/utils/eventHelpers.js`:
```javascript
export const EVENT_CATEGORIES = {
  // ... existing categories
  hobby: {
    label: 'Hobby',
    color: 'bg-pink-500',
    textColor: 'text-white',
  },
};
```

---

## 🐛 Troubleshooting

### "Command not found: npm"
**Solution:** Install Node.js from [nodejs.org](https://nodejs.org/)

### "Port 3000 already in use"
**Solution:** 
```bash
# Find what's using port 3000
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill that process or use different port:
npm run dev -- --port 3001
```

### "Cannot find module"
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Weather not showing
**Solution:**
1. Check `.env` file has correct API key
2. Restart dev server (`Ctrl+C` then `npm run dev`)
3. Check browser console for errors (F12)
4. Verify API key is active on OpenWeatherMap

### Dark mode not working
**Solution:**
- Clear browser cache
- Try incognito/private window
- Check browser console for errors

### Events not saving
**Solution:**
- Check localStorage is enabled in browser
- Try different browser
- Check browser console for errors

---

## 📚 Next Steps

### Learn More

- **React:** [react.dev](https://react.dev)
- **Vite:** [vitejs.dev](https://vitejs.dev)
- **Tailwind CSS:** [tailwindcss.com](https://tailwindcss.com)

### Improve Your App

Easy improvements to try:
1. Add more event categories
2. Change color scheme
3. Add your own city
4. Customize fonts
5. Add more features!

### Share Your Work

1. **Deploy it:** See `DEPLOYMENT_GUIDE.md`
2. **Add to portfolio:** See `PORTFOLIO_TIPS.md`
3. **Share on LinkedIn:** Tell people about your project!

---

## 💡 Common Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint

# Update dependencies
npm update

# Install new package
npm install package-name
```

---

## 🆘 Need Help?

### Documentation
- `README.md` - Project overview
- `DEPLOYMENT_GUIDE.md` - How to deploy
- `PORTFOLIO_TIPS.md` - Portfolio integration
- `CONTRIBUTING.md` - How to contribute

### Get Support
1. Check documentation first
2. Search GitHub issues
3. Open new issue with:
   - What you tried
   - What happened
   - What you expected
   - Error messages
   - Screenshots

### Community
- GitHub Issues: For bugs and features
- GitHub Discussions: For questions
- Stack Overflow: For general React/Vite questions

---

## ✅ Success Checklist

You know you're ready when:
- [ ] App runs on `http://localhost:3000`
- [ ] You can create events
- [ ] You can drag events to different days
- [ ] Dark mode works
- [ ] Events persist after refresh
- [ ] Search and filter work
- [ ] Weather shows (if API configured)

**Congratulations!** 🎉 You're all set up!

---

## 🎯 What to Build Next

Ideas for your next steps:

### Beginner
- [ ] Change color scheme
- [ ] Add custom event category
- [ ] Set your city for weather
- [ ] Customize event colors

### Intermediate
- [ ] Add event time (not just all-day)
- [ ] Add event reminders
- [ ] Create week view
- [ ] Add recurring events

### Advanced
- [ ] Add backend with database
- [ ] Implement user authentication
- [ ] Add Google Calendar sync
- [ ] Create mobile app version

---

## 🚀 Ready to Deploy?

Once your app works locally, deploy it:

**Easiest Options:**
1. **Vercel** (Recommended) - Free, automatic HTTPS
2. **Netlify** - Free, great for static sites
3. **GitHub Pages** - Free, good for portfolio

See `DEPLOYMENT_GUIDE.md` for detailed instructions!

---

**Questions?** Open an issue on GitHub! 👋

Happy coding! 💻✨
