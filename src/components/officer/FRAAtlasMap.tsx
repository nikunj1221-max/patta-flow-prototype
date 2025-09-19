import React, { useEffect, useRef, useState } from 'react';

const tasks = [
  'Soil testing',
  'Seed procurement',
  'Irrigation setup',
  'Fertilizer distribution',
  'Fencing',
  'Training on organic farming',
  'Market linkage',
  'Access to credit',
  'Insurance enrollment'
];

const layerConfigs = [
  {
    key: 'agri',
    name: 'Agricultural Land',
    color: '#4ade80',
  },
  {
    key: 'forest',
    name: 'Forest Cover',
    color: '#166534',
  },
  {
    key: 'water',
    name: 'Water Bodies',
    color: '#2563eb',
  },
  {
    key: 'home',
    name: 'Homesteads',
    color: '#fde047',
  },
  {
    key: 'patta',
    name: 'Patta Holders Allocation',
    color: '#f59e42',
  }
];

export default function FRAAtlasMap() {
  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {/* Side Panel */}
      <div className="w-full md:w-80 bg-gray-50 border-r border-gray-200 p-4 flex-shrink-0">
        <h2 className="font-bold text-lg mb-2">Layer Controls</h2>
        <div className="space-y-2 mb-6">
          {layerConfigs.map(cfg => (
            <label key={cfg.key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={true}
                readOnly
                className="accent-blue-600"
              />
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: cfg.color }}></span>
              <span>{cfg.name}</span>
            </label>
          ))}
        </div>
        <h2 className="font-bold text-lg mb-2">Farming & Development Tasks</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          {tasks.map(task => <li key={task}>{task}</li>)}
        </ul>
      </div>
      {/* Map Image */}
      <div className="flex-1 relative flex items-center justify-center">
        <img
          src="public/assets/image.png"
          alt="FRA Atlas Map"
          className="w-full h-[350px] md:h-[500px] object-contain rounded-lg shadow"
        />
      </div>
    </div>
  );
}
