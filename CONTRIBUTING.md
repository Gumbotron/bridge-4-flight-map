# Contributing to Bridge 4 Flight Map

Thank you for your interest in contributing to Bridge 4 Flight Map! This project helps drone pilots in Southern Ontario fly safely and legally, and we welcome contributions that improve the app.

## 🌩️ Bridge 4 Spirit

This project follows the ideals of Bridge Four from Brandon Sanderson's Stormlight Archive:

> **Life before death. Strength before weakness. Journey before destination.**

We value:
- **Safety First**: Code that helps pilots fly safely
- **Honor**: Honest, quality contributions
- **Unity**: Collaborative development
- **Growth**: Learning and improving together

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)
- [Issue Guidelines](#issue-guidelines)

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:

- Be respectful and constructive
- Welcome newcomers warmly
- Focus on what's best for the community
- Show empathy towards others
- Accept constructive criticism gracefully

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- Git
- A GitHub account

### Setting Up Your Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/bridge-4-flight-map.git
   cd bridge-4-flight-map
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Gumbotron/bridge-4-flight-map.git
   ```

4. **Run the setup script**:
   ```bash
   .github/copilot-setup.sh
   ```

   Or manually:
   ```bash
   npm install
   cp .env.example .env
   npm run dev
   ```

5. **Verify everything works**:
   - Visit http://localhost:3000
   - Check that the map loads
   - Test layer toggles
   - Try the geolocation feature

## 🔄 Development Workflow

### 1. Create a Branch

Always work on a feature branch:

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `style/` - UI/styling changes
- `perf/` - Performance improvements

### 2. Make Changes

- Keep changes focused and minimal
- Follow the coding standards (see below)
- Test your changes thoroughly
- Update documentation as needed

### 3. Test Your Changes

```bash
npm run dev      # Test in development
npm run build    # Ensure production build works
npm run lint     # Check code style
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "type: brief description"
```

See [Commit Guidelines](#commit-guidelines) below.

### 5. Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main
```

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 💻 Coding Standards

### General Principles

- **Keep it simple**: Write clear, readable code
- **DRY**: Don't Repeat Yourself
- **YAGNI**: You Aren't Gonna Need It
- **Single Responsibility**: One component, one job
- **Composition over Inheritance**: Use hooks and composition

### React & JavaScript

#### Components

```jsx
// Functional components with hooks
import React, { useState, useEffect } from 'react';

function MyComponent({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effect
    return () => {
      // Cleanup
    };
  }, [dependencies]);
  
  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  );
}

export default MyComponent;
```

#### Hooks

```javascript
// Custom hooks start with 'use'
import { useState, useEffect } from 'react';

export function useMyHook(param) {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Logic
  }, [param]);
  
  return { state, helperFunction };
}
```

#### File Organization

- One component per file
- Named exports for utilities
- Default export for components
- Group imports: React, third-party, local

```javascript
// React imports
import React, { useState } from 'react';

// Third-party imports
import { Map, TileLayer } from 'react-leaflet';

// Local imports
import { useGeolocation } from '../hooks/useGeolocation';
import { formatCoordinates } from '../utils/geoHelpers';
```

### Styling

#### Tailwind CSS

```jsx
// Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-storm-blue">
  <h1 className="text-xl font-bold text-storm-radiant">Title</h1>
</div>

// Responsive classes
<div className="w-full md:w-1/2 lg:w-1/3">Content</div>

// State variants
<button className="bg-storm-blue hover:bg-storm-light transition-colors">
  Click me
</button>
```

#### Color Palette

Always use the Stormlight Archive color scheme:

```javascript
// tailwind.config.js defines these colors
colors: {
  'storm-deep': '#1a2a4a',
  'storm-blue': '#2c4a7c',
  'storm-radiant': '#00d4ff',
  'storm-light': '#4a9eff',
  'legal-zone': '#2d7d2d',
  'exclusion-zone': '#c4453d',
  'warning-amber': '#f59e0b',
}
```

### Map & GeoJSON

```javascript
// Validate coordinates
function isValidCoordinate(lat, lng) {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    lat >= -90 && lat <= 90 &&
    lng >= -180 && lng <= 180
  );
}

// Handle GeoJSON
const geoJsonData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat] // GeoJSON: [longitude, latitude]
      },
      properties: {
        name: 'Location Name'
      }
    }
  ]
};
```

### Error Handling

```javascript
// Try-catch for async operations
async function loadData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading data:', error);
    // Handle error appropriately
  }
}

// Error boundaries for React components
// Implement error boundary component for critical sections
```

## 📝 Commit Guidelines

### Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes (dependencies, etc.)

### Examples

```bash
feat(map): add crown land layer toggle

fix(sidebar): correct mobile menu collapse behavior

docs(readme): update installation instructions

style(components): apply consistent Tailwind formatting

refactor(hooks): simplify useMapLayers logic

perf(map): optimize GeoJSON rendering for large datasets
```

### Best Practices

- Use present tense ("add" not "added")
- Use imperative mood ("move" not "moves")
- Keep subject line under 50 characters
- Capitalize subject line
- No period at the end of subject
- Separate subject from body with blank line
- Wrap body at 72 characters
- Explain *what* and *why*, not *how*

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Tests pass (`npm run lint`, `npm run build`)
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Commit messages follow guidelines

### PR Template

Fill out the PR template completely:
- Clear description of changes
- Link to related issue
- Type of change marked
- Testing checklist completed
- Screenshots for UI changes

### Review Process

1. **Automated Checks**: CI must pass
2. **Code Review**: At least one approval required
3. **Testing**: Reviewers test changes locally
4. **Feedback**: Address review comments
5. **Merge**: Maintainer merges when approved

### Addressing Feedback

- Be receptive to feedback
- Discuss respectfully if you disagree
- Make requested changes promptly
- Push new commits (don't force-push during review)
- Mark conversations as resolved

## 🧪 Testing

### Manual Testing Checklist

- [ ] Feature works in development mode
- [ ] Production build succeeds
- [ ] Linter passes with no warnings
- [ ] Feature works in Chrome, Firefox, Safari
- [ ] Mobile viewport tested (responsive)
- [ ] Map interactions work correctly
- [ ] Error states handled gracefully
- [ ] Performance is acceptable

### Map-Specific Testing

- [ ] Zoom levels 5-18 work properly
- [ ] Layer toggles function correctly
- [ ] Markers/polygons render accurately
- [ ] Popups display information
- [ ] Geolocation works (with permission)
- [ ] POI upload handles various formats

### Performance Testing

- [ ] Large GeoJSON datasets load efficiently
- [ ] No memory leaks in long sessions
- [ ] Smooth panning and zooming
- [ ] Fast initial page load

## 📚 Documentation

### Code Documentation

```javascript
/**
 * Calculate the distance between two coordinates
 * @param {number} lat1 - Latitude of first point
 * @param {number} lng1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lng2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  // Implementation
}
```

### README Updates

Update README.md when:
- Adding new features
- Changing setup process
- Modifying available scripts
- Adding dependencies

### Architecture Documentation

Update ARCHITECTURE.md for:
- New components or patterns
- State management changes
- Data flow modifications
- Integration changes

## 🐛 Issue Guidelines

### Before Creating an Issue

1. Search existing issues
2. Check if it's already documented
3. Verify it's reproducible
4. Gather relevant information

### Issue Templates

Use the appropriate template:
- **Bug Report**: For bugs and errors
- **Feature Request**: For new features
- **Documentation**: For doc updates

### Good Issue Qualities

- Clear, descriptive title
- Detailed description
- Steps to reproduce (bugs)
- Expected vs actual behavior
- Environment information
- Screenshots/videos if applicable

## 🎯 Contribution Ideas

### Good First Issues

- Documentation improvements
- UI polish and styling
- Adding unit tests
- Fixing typos
- Improving error messages

### Feature Ideas

- Additional data layers
- Export functionality
- Print map feature
- Custom styling options
- Offline mode
- Multi-language support

### Data Integration

- New GeoJSON sources
- API integrations
- Data validation improvements
- Caching strategies

## 🙏 Recognition

Contributors are recognized in several ways:
- Listed in GitHub contributors
- Mentioned in release notes
- Community appreciation
- Potential CODEOWNERS addition

## 📞 Getting Help

- **Questions**: Open a discussion on GitHub
- **Issues**: Use issue templates
- **Suggestions**: Feature request template
- **Documentation**: Check existing docs first

## 🎓 Learning Resources

### React & Hooks
- [React Documentation](https://react.dev)
- [React Hooks](https://react.dev/reference/react)

### Leaflet & Mapping
- [Leaflet Documentation](https://leafletjs.com/)
- [React-Leaflet](https://react-leaflet.js.org/)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)

### Vite
- [Vite Guide](https://vitejs.dev/guide/)

### Drone Regulations
- [Transport Canada Drone Rules](https://tc.canada.ca/en/aviation/drone-safety)

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for contributing to Bridge 4 Flight Map!**

*Life before death. Strength before weakness. Journey before destination.*

⚡ **Built with honor by the Bridge 4 crew** ⚡
