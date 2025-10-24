import React from 'react'

function Legend() {
  const legendItems = [
    {
      color: 'bg-legal-zone',
      borderColor: 'border-legal-zone',
      label: 'Legal Flight Zone',
      description: 'Crown land, generally permitted'
    },
    {
      color: 'bg-exclusion-zone',
      borderColor: 'border-exclusion-zone',
      label: 'Exclusion Zone',
      description: 'No-fly areas (parks, restricted)'
    },
    {
      color: 'bg-warning-amber',
      borderColor: 'border-warning-amber',
      label: 'Warning Zone',
      description: 'Airports, controlled airspace'
    },
    {
      color: 'bg-storm-radiant',
      borderColor: 'border-storm-radiant',
      label: 'Your Location',
      description: 'Current position marker'
    },
  ]

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-storm-radiant mb-3">Legend</h3>
      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-start space-x-3 p-2 bg-storm-deep rounded">
            <div className={`w-6 h-6 ${item.color} ${item.borderColor} border-2 rounded flex-shrink-0 mt-0.5`} />
            <div className="flex-1">
              <div className="font-medium text-sm">{item.label}</div>
              <div className="text-xs text-storm-light">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-storm-deep rounded text-xs text-storm-light">
        <p className="italic">
          ⚠️ Always verify current regulations with Transport Canada before flying.
        </p>
      </div>
    </div>
  )
}

export default Legend
