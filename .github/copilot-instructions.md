# GitHub Copilot Instructions for Bridge 4 Flight Map

## Project Overview
Bridge 4 Flight Map is a React-based web application for drone flight planning in Southern Ontario, inspired by Brandon Sanderson's Stormlight Archive series. It helps drone pilots identify legal flight zones, exclusion areas, and plan their flights.

## Technology Stack
- **Frontend Framework**: React 18 with Vite 5
- **UI Styling**: Tailwind CSS 3.4
- **Mapping**: Leaflet 1.9 with React-Leaflet 4.2
- **Build Tool**: Vite (ES modules)
- **Linting**: ESLint 8
- **Package Manager**: npm

## Project Structure
```
src/
├── components/       # React components (Map, Sidebar, Legend, etc.)
├── hooks/           # Custom React hooks (useGeolocation, useMapLayers)
├── utils/           # Utility functions (dataLoader, zoneFilters, geoHelpers)
├── styles/          # CSS files (index.css with Tailwind, map.css for Leaflet)
├── App.jsx          # Main app component
└── main.jsx         # Application entry point
```

## Code Style & Conventions

### General Guidelines
- Use functional React components with hooks (no class components)
- Use ES6+ features (arrow functions, destructuring, async/await)
- Keep components small and focused on a single responsibility
- Use PropTypes or JSDoc for component prop documentation

### File Naming
- React components: PascalCase (e.g., `Map.jsx`, `Sidebar.jsx`)
- Hooks: camelCase with `use` prefix (e.g., `useGeolocation.js`)
- Utils: camelCase (e.g., `dataLoader.js`, `zoneFilters.js`)
- CSS files: kebab-case (e.g., `map.css`)

### React Patterns
- Prefer hooks over HOCs or render props
- Use `useState` for local component state
- Use `useEffect` for side effects
- Custom hooks should encapsulate reusable logic
- Keep JSX clean and readable

### Styling
- Primary styling with Tailwind CSS utility classes
- Custom CSS only when necessary (e.g., Leaflet overrides)
- Use the Stormlight Archive color palette:
  - Storm Deep: `#1a2a4a` (primary background)
  - Storm Blue: `#2c4a7c` (secondary background)
  - Storm Radiant: `#00d4ff` (accent/highlights)
  - Storm Light: `#4a9eff` (light accents)
  - Legal Zone: `#2d7d2d` (green for legal areas)
  - Exclusion Zone: `#c4453d` (red for no-fly zones)
  - Warning Amber: `#f59e0b` (warnings)

### Mapping & GeoJSON
- Use GeoJSON format for geographic data
- Leaflet coordinates: `[latitude, longitude]`
- Always validate geographic data before rendering
- Handle map events properly (cleanup in useEffect)

## Development Workflow

### Setup
```bash
npm install          # Install dependencies
cp .env.example .env # Configure environment
npm run dev          # Start development server
```

### Commands
- `npm run dev` - Development server with hot reload (port 3000)
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Testing Changes
1. Run `npm run dev` to test in development
2. Run `npm run build` to ensure production build works
3. Run `npm run lint` to check code style
4. Test on mobile viewport (responsive design)
5. Verify map interactions and layer toggles

## Common Tasks

### Adding a New Component
1. Create component file in `src/components/`
2. Use functional component with hooks
3. Import and use in parent component
4. Style with Tailwind classes
5. Test responsive behavior

### Adding a New Hook
1. Create hook file in `src/hooks/`
2. Prefix name with `use`
3. Return state and helper functions
4. Document parameters and return values
5. Test with multiple components

### Adding Map Layers
1. Use GeoJSON format for data
2. Add layer toggle in Sidebar component
3. Use react-leaflet components (GeoJSON, Marker, etc.)
4. Apply appropriate styling based on zone type
5. Add layer to legend

### Working with Data
1. Load data in `src/utils/dataLoader.js`
2. Use fetch API or import for static files
3. Validate data structure before use
4. Handle loading and error states
5. Consider performance for large datasets

## Important Notes

### Do's ✅
- Follow existing component patterns
- Use Tailwind utility classes for styling
- Keep components modular and reusable
- Handle errors gracefully
- Test map interactions thoroughly
- Maintain mobile responsiveness
- Use semantic HTML elements
- Document complex logic with comments

### Don'ts ❌
- Don't use class components
- Don't add inline styles (use Tailwind)
- Don't mutate state directly
- Don't forget cleanup in useEffect
- Don't hard-code coordinates (use constants)
- Don't ignore accessibility
- Don't commit API keys or secrets
- Don't break existing functionality

## Data Sources & Integration
- CLUPA (Crown Land Use Policy Atlas)
- NAV CANADA (controlled airspace)
- Transport Canada (airports and regulations)
- Custom GeoJSON files

See `DATA_SOURCES.md` for integration details.

## Legal & Safety
This is a planning tool only. Always remind users to:
- Verify regulations with Transport Canada
- Obtain necessary permissions
- Respect privacy and property rights
- Maintain visual line of sight
- Fly safely and responsibly

## Architecture
For detailed architecture information, see `ARCHITECTURE.md`.

## Deployment
For deployment instructions, see `DEPLOYMENT.md`.

## Bridge 4 Spirit
Remember the ideals: **Life before death. Strength before weakness. Journey before destination.**
Build features that help drone pilots fly safely and legally. Write code with honor and integrity.
