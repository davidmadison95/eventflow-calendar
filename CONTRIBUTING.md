# Contributing to Calendar App

First off, thank you for considering contributing to Calendar App! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. Please be kind and constructive.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, Node version)

Example:

```markdown
**Bug:** Events not saving in Safari

**Steps to Reproduce:**
1. Open app in Safari 17
2. Create new event
3. Click Save

**Expected:** Event appears on calendar
**Actual:** Event disappears on page refresh

**Environment:** macOS 14, Safari 17.1, Node 18.17
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Include:

- **Clear use case**
- **Current behavior vs proposed behavior**
- **Mockups or examples** (if applicable)
- **Why this enhancement is useful**

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Simple issues for newcomers
- `help wanted` - Issues where we need help
- `bug` - Bug fixes needed

## 🛠 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup Steps

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/calendar-app.git
cd calendar-app

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Add your OpenWeatherMap API key

# 4. Start development server
npm run dev

# 5. Create a new branch for your feature
git checkout -b feature/amazing-feature
```

## 📝 Coding Standards

### JavaScript/React

- Use functional components with hooks
- Follow existing code style
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Keep components small and focused

### Example:

```jsx
/**
 * Formats a date for display in the calendar
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  return format(date, 'MMMM yyyy');
};

// Component example
const CalendarDay = ({ date, events }) => {
  // Hooks at the top
  const { openModal } = useCalendar();
  
  // Event handlers
  const handleClick = () => {
    openModal(date);
  };
  
  // Render
  return (
    <div onClick={handleClick}>
      {/* Component JSX */}
    </div>
  );
};
```

### CSS/Tailwind

- Use Tailwind utilities
- Follow mobile-first approach
- Use dark mode variants where appropriate
- Keep custom CSS minimal

```jsx
// Good
<div className="p-4 rounded-lg bg-white dark:bg-gray-800">

// Avoid
<div style={{ padding: '16px' }}>
```

### File Organization

```
src/
├── components/      # React components
│   ├── Calendar/   # Calendar-specific
│   ├── Events/     # Event-related
│   ├── Weather/    # Weather-related
│   └── UI/         # Reusable UI
├── contexts/       # React contexts
├── hooks/          # Custom hooks
├── services/       # API & storage
└── utils/          # Helper functions
```

## 📊 Testing

```bash
# Run linter
npm run lint

# Build to check for errors
npm run build

# Test locally
npm run preview
```

### Before Submitting

- [ ] Code runs without errors
- [ ] Follows coding standards
- [ ] Added/updated documentation
- [ ] Works in dark mode
- [ ] Responsive on mobile
- [ ] No console errors/warnings

## 💬 Commit Messages

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(calendar): add week view
fix(events): resolve drag-drop bug on mobile
docs(readme): update installation steps
style(components): format code with prettier
refactor(hooks): simplify useEvents logic
```

## 🔄 Pull Request Process

### 1. Create Your Feature

```bash
# Create branch
git checkout -b feature/amazing-feature

# Make changes
# ...

# Commit with conventional commits
git commit -m "feat(calendar): add amazing feature"

# Push to your fork
git push origin feature/amazing-feature
```

### 2. Open Pull Request

Go to GitHub and create a pull request with:

**Title:**
```
feat(calendar): Add amazing feature
```

**Description Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How to Test
1. Step one
2. Step two

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Works on mobile
- [ ] Dark mode tested
```

### 3. Review Process

- Maintainer will review within 1-2 days
- Address feedback if requested
- Once approved, it will be merged

### 4. After Merge

```bash
# Update your local main
git checkout main
git pull upstream main

# Delete feature branch
git branch -d feature/amazing-feature
```

## 🎨 Component Guidelines

### Creating New Components

```jsx
// CalendarDay.jsx
import { useCalendar } from '../../contexts/CalendarContext';
import { formatDate } from '../../utils/dateHelpers';

/**
 * Displays a single day in the calendar grid
 * @param {Date} date - The date to display
 * @param {Array} events - Events for this day
 */
const CalendarDay = ({ date, events }) => {
  const { openModal } = useCalendar();
  
  return (
    <div className="calendar-day">
      {/* Component content */}
    </div>
  );
};

export default CalendarDay;
```

### Component Checklist

- [ ] Single responsibility
- [ ] PropTypes or TypeScript types
- [ ] Meaningful prop names
- [ ] Accessible (ARIA labels)
- [ ] Mobile-friendly
- [ ] Dark mode support
- [ ] Performance optimized (memo if needed)

## 📚 Documentation

### Code Comments

```javascript
// Good: Explains WHY
// Cache weather data for 30 minutes to avoid rate limiting
const CACHE_DURATION = 30 * 60 * 1000;

// Bad: Explains WHAT (obvious)
// Set cache duration to 30 minutes
const CACHE_DURATION = 30 * 60 * 1000;
```

### README Updates

When adding features, update:
- [ ] README.md (Features section)
- [ ] CHANGELOG.md
- [ ] Relevant documentation files

## 🐛 Debugging Tips

### Common Issues

**Build fails:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**React errors:**
- Check console for specific errors
- Verify imports are correct
- Check for missing dependencies

**Styling issues:**
- Clear browser cache
- Check dark mode class
- Verify Tailwind classes

## 📞 Getting Help

- **Documentation:** Check README and guides first
- **Issues:** Search existing issues
- **Discussions:** Use GitHub Discussions for questions
- **Contact:** Open an issue with `question` label

## 🎯 Priority Areas

We're especially interested in contributions for:

1. **Testing** - Unit tests, E2E tests
2. **Accessibility** - ARIA improvements
3. **Performance** - Optimization opportunities
4. **Documentation** - Clarifications and examples
5. **Bug Fixes** - Always appreciated!

## 🌟 Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Given credit in commits

Thank you for contributing! 🚀
