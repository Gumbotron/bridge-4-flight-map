# Architecture Documentation

## Overview

Bridge 4 Flight Map is a client-side React application that provides an interactive mapping interface for drone flight planning in Southern Ontario. The architecture follows modern React patterns with functional components, custom hooks, and a clear separation of concerns.

## Technology Stack

### Core Technologies
- **React 18.3.1**: UI library with functional components and hooks
- **Vite 5.0**: Fast build tool and development server
- **Leaflet 1.9.4**: Open-source mapping library
- **React-Leaflet 4.2.1**: React components for Leaflet
- **Tailwind CSS 3.4.1**: Utility-first CSS framework

### Development Tools
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing
- **ESLint**: Code linting (optional)

## Application Structure

```
┌─────────────────────────────────────────┐
│           index.html (root)             │
│   - Leaflet CDN links                   │
│   - <div id="root">                     │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│           main.jsx (entry)              │
│   - ReactDOM.createRoot                 │
│   - Import global styles                │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│              App.jsx                    │
│   - Main layout                         │
│   - State management (layers, zone)     │
│   - Header component                    │
└────────┬────────────────────────────────┘
         │
         ├──────────────┬─────────────────┐
         ▼              ▼                 ▼
    ┌────────┐    ┌─────────┐      ┌──────┐
    │Sidebar │    │   Map   │      │Header│
    └───┬────┘    └────┬────┘      └──────┘
        │              │
        │              ├── TileLayer
        │              ├── GeoJSON Layers
        │              └── UserMarker
        │
        ├── Legend
        ├── Geolocation
        ├── POIUpload
        └── InfoPanel
```

## Component Hierarchy

### App.jsx (Root Component)
**Responsibilities:**
- Main layout structure
- Global state management
- Header rendering
- Component composition

**State:**
- `layers`: Object tracking visibility of map layers
- `selectedZone`: Currently selected zone details

**Props Flow:**
- Passes `layers` and `setLayers` to Sidebar
- Passes `layers` and `setSelectedZone` to Map
- Passes `selectedZone` to Sidebar (for InfoPanel)

### Map.jsx
**Responsibilities:**
- Leaflet map initialization
- Tile layer rendering
- GeoJSON layer rendering
- Feature interaction handling
- User location marker display

**Key Features:**
- MapContainer with configurable center and zoom
- Conditional layer rendering based on props
- Click handlers for zone selection
- Custom styling for different zone types

**Sub-components:**
- `MapController`: Handles map updates and events
- `UserMarker`: Displays user location

### Sidebar.jsx
**Responsibilities:**
- Tab navigation (Layers/POIs/Info)
- Layer toggle controls
- Mobile responsiveness (collapsible)
- Content switching based on active tab

**State:**
- `activeTab`: Currently selected tab
- `isCollapsed`: Sidebar collapse state (mobile)

**Child Components:**
- Legend (in Layers tab)
- Geolocation (in Layers tab)
- POIUpload (in POIs tab)
- InfoPanel (in Info tab)

### Legend.jsx
**Responsibilities:**
- Display color-coded zone legend
- Show zone type descriptions
- Display regulatory reminders

**No Props or State** - Pure presentational component

### Geolocation.jsx
**Responsibilities:**
- Trigger geolocation requests
- Display loading/error states
- Show location coordinates and accuracy

**Uses:**
- `useGeolocation` custom hook

**State (from hook):**
- `location`: Current position
- `loading`: Loading state
- `error`: Error messages

### POIUpload.jsx
**Responsibilities:**
- File input handling
- File type validation
- Upload status display
- CSV format instructions

**State:**
- `selectedFile`: Current file selection
- `uploadStatus`: Upload/validation messages

### InfoPanel.jsx
**Responsibilities:**
- Display selected zone details
- Show quick tips when no zone selected
- Display flight regulations
- Show warnings and disclaimers

**Props:**
- `selectedZone`: Zone data to display

## Custom Hooks

### useGeolocation.js
**Purpose:** Wrapper for browser Geolocation API

**Returns:**
```javascript
{
  location: { lat, lng, accuracy, timestamp },
  loading: boolean,
  error: string | null,
  getCurrentLocation: () => void,
  clearLocation: () => void
}
```

**Features:**
- High accuracy mode
- Error handling with user-friendly messages
- Timeout configuration
- Loading state management

### useMapLayers.js
**Purpose:** Manage visibility state for map layers

**Returns:**
```javascript
{
  layers: object,
  setLayers: (layers) => void,
  toggleLayer: (layerName) => void,
  setLayerVisibility: (layerName, isVisible) => void,
  showAllLayers: () => void,
  hideAllLayers: () => void,
  resetLayers: () => void
}
```

**Features:**
- Individual layer toggle
- Bulk operations (show/hide all)
- Reset to defaults

## Utility Modules

### dataLoader.js
**Purpose:** Load and parse external data files

**Functions:**
- `loadGeoJSON(url)`: Fetch and validate GeoJSON
- `loadMultipleGeoJSON(urls)`: Parallel loading
- `parseCSVtoGeoJSON(csvText)`: CSV to GeoJSON conversion
- `loadCachedGeoJSON(key, url, maxAge)`: Local storage caching

### zoneFilters.js
**Purpose:** Filter and categorize zone data

**Functions:**
- `filterByZoneType(geojson, type)`: Filter by type
- `filterParkZones(geojson)`: Get park zones
- `filterAirportZones(geojson, bufferNm)`: Get airports with buffer
- `filterControlledAirspace(geojson)`: Get controlled airspace
- `filterByBounds(geojson, bounds)`: Geographic filtering
- `getZoneStats(geojson)`: Calculate statistics

### geoHelpers.js
**Purpose:** Geographic calculations and operations

**Functions:**
- `calculateDistance(lat1, lng1, lat2, lng2)`: Haversine distance
- `nauticalMilesToMeters(nm)`: Unit conversion
- `createCircularBuffer(lat, lng, radius)`: Buffer geometry
- `pointInPolygon(point, polygon)`: Containment check
- `calculateBounds(coordinates)`: Bounding box
- `calculateBearing(lat1, lng1, lat2, lng2)`: Direction
- `isValidLatitude(lat)`: Validation
- `isValidLongitude(lng)`: Validation

## Data Flow

### Layer Visibility
```
User clicks checkbox in Sidebar
    ↓
handleLayerToggle(layerName) called
    ↓
setLayers updates state in App
    ↓
New layers prop passed to Map
    ↓
Map conditionally renders GeoJSON layers
```

### Zone Selection
```
User clicks zone on Map
    ↓
handleFeatureClick called
    ↓
setSelectedZone updates state in App
    ↓
selectedZone prop passed to Sidebar
    ↓
InfoPanel displays zone details
```

### Geolocation
```
User clicks "Find Me" button
    ↓
getCurrentLocation() from useGeolocation
    ↓
navigator.geolocation.getCurrentPosition()
    ↓
location state updated
    ↓
UserMarker component displays on Map
    ↓
Map centers on user location
```

## State Management

### Global State (in App.jsx)
- **layers**: Controls visibility of map layers
  - crownLand: boolean
  - exclusionZones: boolean
  - airports: boolean
  - controlledAirspace: boolean

- **selectedZone**: Currently selected zone
  - name: string
  - type: string
  - status: string
  - description: string
  - restrictions: string
  - contact: string

### Local State
Each component manages its own UI state:
- Sidebar: activeTab, isCollapsed
- Geolocation: showLocation (from hook)
- POIUpload: selectedFile, uploadStatus

## Styling Architecture

### Tailwind CSS Configuration
Custom color palette defined in `tailwind.config.js`:
- Storm colors (deep, blue, radiant, light)
- Zone colors (legal-zone, exclusion-zone)
- Warning colors (warning-amber)

### CSS Files
1. **index.css**: Global styles, Tailwind directives, storm background
2. **map.css**: Leaflet-specific customization, z-index fixes
3. **App.css**: App-level base styles

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on small screens
- Flexible grid layouts
- Touch-friendly controls

## Build Configuration

### Vite Configuration
- Base path: `/bridge-4-flight-map/` (for GitHub Pages)
- Dev server on port 3000
- Source maps enabled
- React plugin for JSX support

### Environment Variables
Prefix: `VITE_`
- Map center coordinates
- Zoom levels
- API timeout
- Feature flags

## Performance Considerations

### Optimization Strategies
1. **Lazy Loading**: GeoJSON data loaded on demand
2. **Caching**: Local storage for frequently accessed data
3. **Conditional Rendering**: Layers only rendered when visible
4. **Code Splitting**: Vite's automatic code splitting
5. **Memoization**: React.memo for pure components (future)

### Bundle Size
- React + ReactDOM: ~140KB
- Leaflet: ~140KB
- Application code: ~50KB
- Total (estimated): ~330KB gzipped

## Future Architecture Improvements

### Phase 2 Enhancements
1. **State Management**: Consider Redux or Zustand for complex state
2. **Data Layer**: Add API service layer
3. **Testing**: Add Jest + React Testing Library
4. **TypeScript**: Migrate to TypeScript for type safety
5. **Service Workers**: Add offline support
6. **WebGL**: Use Leaflet.Canvas for large datasets

### Scalability
- Component lazy loading with React.lazy
- Virtual scrolling for large POI lists
- Web Workers for heavy computations
- IndexedDB for large local datasets

## Security Considerations

1. **Input Validation**: All user inputs validated
2. **XSS Prevention**: React's built-in escaping
3. **HTTPS**: Enforce secure connections
4. **CSP**: Content Security Policy headers
5. **Dependencies**: Regular security audits

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features required
- Geolocation API support required
- Local storage support recommended

---

**Last Updated:** 2025-10-24
