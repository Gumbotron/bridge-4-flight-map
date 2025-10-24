# ⚡ Bridge 4 Flight Map

A Stormlight Archive-inspired drone flight planning map for Southern Ontario. Find where you can legally fly with style.

## 🎯 Overview

Bridge 4 Flight Map is a React-based web application that helps drone pilots in Southern Ontario identify legal flight zones, exclusion areas, and plan their flights. The application features a beautiful Stormlight Archive-inspired design with storm blue colors and radiant accents.

## ✨ Features

- **Interactive Map**: Leaflet-powered map centered on Southern Ontario
- **Geolocation**: Find your current location with the "Find Me" button
- **Layer Toggles**: Show/hide different zone types (crown land, exclusion zones, airports, controlled airspace)
- **Zone Information**: Click on zones to see detailed information
- **POI Upload**: Upload custom Points of Interest via CSV or GeoJSON
- **Mobile Responsive**: Collapsible sidebar for mobile devices
- **Stormlight Aesthetic**: Storm blue color palette with radiant electric accents

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Gumbotron/bridge-4-flight-map.git
cd bridge-4-flight-map
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment configuration:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint (if configured)

## 🎨 Color Palette

The application uses a Stormlight Archive-inspired color scheme:

- **Storm Deep**: `#1a2a4a` - Primary background
- **Storm Blue**: `#2c4a7c` - Secondary background
- **Storm Radiant**: `#00d4ff` - Accent/highlights
- **Storm Light**: `#4a9eff` - Light accents
- **Legal Zone**: `#2d7d2d` - Green for legal flight areas
- **Exclusion Zone**: `#c4453d` - Red for no-fly zones
- **Warning Amber**: `#f59e0b` - Warnings and alerts

## 📁 Project Structure

```
bridge-4-flight-map/
├── src/
│   ├── components/          # React components
│   │   ├── Map.jsx         # Main map component
│   │   ├── Sidebar.jsx     # Sidebar with tabs
│   │   ├── Legend.jsx      # Color-coded legend
│   │   ├── Geolocation.jsx # Location finder
│   │   ├── POIUpload.jsx   # POI file upload
│   │   └── InfoPanel.jsx   # Zone information display
│   ├── hooks/              # Custom React hooks
│   │   ├── useGeolocation.js
│   │   └── useMapLayers.js
│   ├── utils/              # Utility functions
│   │   ├── dataLoader.js   # GeoJSON loading
│   │   ├── zoneFilters.js  # Zone filtering
│   │   └── geoHelpers.js   # Geographic calculations
│   ├── styles/             # CSS files
│   │   ├── index.css       # Global styles with Tailwind
│   │   └── map.css         # Leaflet customization
│   ├── App.jsx             # Main app component
│   ├── App.css             # App-specific styles
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Dependencies and scripts
└── .env.example            # Environment variables template
```

## 📊 Data Sources

The application is designed to integrate with:

- **CLUPA (Crown Land Use Policy Atlas)**: Crown land boundaries
- **NAV CANADA**: Controlled airspace and navigation data
- **Transport Canada**: Airport locations and regulations
- **Custom GeoJSON**: User-provided zone data

See [DATA_SOURCES.md](./DATA_SOURCES.md) for detailed integration information.

## 🏗️ Architecture

The application follows a component-based architecture with:

- **React 18** for UI components
- **Vite 5** for build tooling
- **Leaflet & React-Leaflet** for mapping
- **Tailwind CSS** for styling
- **Custom hooks** for state management

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## 🚢 Deployment

The application can be deployed to GitHub Pages automatically using GitHub Actions.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

## ⚠️ Legal Disclaimer

**This is a planning tool only.** Always verify current regulations with Transport Canada and obtain necessary permissions before flying. The map data may not be complete or up-to-date. Drone pilots are responsible for:

- Understanding and following all Transport Canada regulations
- Obtaining permissions for flights in controlled airspace
- Respecting privacy and property rights
- Maintaining visual line of sight
- Flying safely and responsibly

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🎭 Stormlight Archive

This project is inspired by Brandon Sanderson's Stormlight Archive series. Bridge 4 represents unity, strength, and doing the impossible. Life before death, strength before weakness, journey before destination.

---

**Built with ⚡ by the Bridge 4 crew**
