import React, { useState } from 'react'
import Map from './components/Map'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  const [layers, setLayers] = useState({
    crownLand: true,
    exclusionZones: true,
    airports: true,
    controlledAirspace: true,
  })

  const [selectedZone, setSelectedZone] = useState(null)

  return (
    <div className="app-container h-screen flex flex-col bg-storm-deep">
      {/* Header */}
      <header className="bg-storm-blue text-white shadow-lg border-b-2 border-storm-radiant">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-storm font-bold tracking-wide">
            ⚡ Bridge 4 Flight Map
          </h1>
          <p className="text-sm text-storm-light mt-1">
            Southern Ontario Drone Flight Planning
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          layers={layers} 
          setLayers={setLayers}
          selectedZone={selectedZone}
        />
        <Map 
          layers={layers}
          setSelectedZone={setSelectedZone}
        />
      </div>
    </div>
  )
}

export default App
