'use client';

import { Property } from '@/types';
import { cityDistricts, landmarks } from '@/lib/cityGenerator';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useState } from 'react';

interface MetaverseMapProps {
  properties: Property[];
  selectedProperty: Property | null;
  onPropertySelect: (property: Property) => void;
}

export default function MetaverseMap({ properties, selectedProperty, onPropertySelect }: MetaverseMapProps) {
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#10b981';
      case 'sold':
        return '#9ca3af';
      case 'reserved':
        return '#f59e0b';
      default:
        return '#9ca3af';
    }
  };

  const getLotTypeColor = (lotType: string = 'standard') => {
    switch (lotType) {
      case 'studio':
        return '#93c5fd';
      case 'standard':
        return '#86efac';
      case 'premium':
        return '#fbbf24';
      case 'estate':
        return '#f472b6';
      case 'mansion':
        return '#a78bfa';
      default:
        return '#86efac';
    }
  };

  const cityWidth = 2400;
  const cityHeight = 2400;

  return (
    <div className="space-y-4">
      {/* District Quick Jump */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">🏙️</span>
          Districts
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {cityDistricts.map((district) => (
            <button
              key={district.id}
              onClick={() => setSelectedDistrict(district.id === selectedDistrict ? null : district.id)}
              className={`p-3 rounded-xl border-2 transition-all text-left ${
                selectedDistrict === district.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: district.color }}
                ></div>
                {district.premium && <span className="text-yellow-600 text-xs">★</span>}
              </div>
              <div className="text-sm font-semibold text-gray-900">{district.name}</div>
              <div className="text-xs text-gray-600 mt-1">
                {properties.filter(p => p.subdivision === district.name && p.status === 'available').length} available
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-xs text-gray-600 font-medium">🖱️ Drag to pan • 🔍 Scroll to zoom</div>
        </div>

        {/* Minimap */}
        <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <div className="text-xs font-semibold text-gray-700 mb-2">Mini Map</div>
          <svg width="120" height="120" viewBox={`0 0 ${cityWidth} ${cityHeight}`} className="border border-gray-300 rounded">
            {/* Districts */}
            {cityDistricts.map((district) => (
              <rect
                key={district.id}
                x={district.x}
                y={district.y}
                width="700"
                height="700"
                fill={district.color}
                opacity="0.3"
                stroke={district.color}
                strokeWidth="20"
              />
            ))}
            {/* Landmarks */}
            {landmarks.map((landmark) => (
              <circle
                key={landmark.id}
                cx={landmark.x}
                cy={landmark.y}
                r="40"
                fill="#ef4444"
                opacity="0.7"
              />
            ))}
          </svg>
        </div>

        <TransformWrapper
          initialScale={0.5}
          minScale={0.3}
          maxScale={2}
          centerOnInit
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                <button
                  onClick={() => zoomIn()}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl font-bold text-gray-700">+</span>
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl font-bold text-gray-700">-</span>
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors text-xs"
                >
                  ↺
                </button>
              </div>

              <TransformComponent
                wrapperStyle={{ width: '100%', height: '800px' }}
                contentStyle={{ width: '100%', height: '100%' }}
              >
                <svg width={cityWidth} height={cityHeight} className="bg-gradient-to-br from-sky-100 via-blue-50 to-purple-100">
                  <defs>
                    {/* Pattern for roads */}
                    <pattern id="road" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                      <rect width="200" height="200" fill="#f3f4f6" />
                      <line x1="0" y1="0" x2="0" y2="200" stroke="#d1d5db" strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="0" y1="0" x2="200" y2="0" stroke="#d1d5db" strokeWidth="1" strokeDasharray="5,5" />
                    </pattern>
                  </defs>

                  {/* Background */}
                  <rect width={cityWidth} height={cityHeight} fill="url(#road)" />

                  {/* Water features (rivers) */}
                  <path
                    d={`M 0,600 Q 600,550 1200,600 T ${cityWidth},600 L ${cityWidth},700 Q ${cityWidth - 600},650 600,700 T 0,700 Z`}
                    fill="#60a5fa"
                    opacity="0.2"
                  />
                  <path
                    d={`M 0,1200 Q 600,1150 1200,1200 T ${cityWidth},1200 L ${cityWidth},1300 Q ${cityWidth - 600},1250 600,1300 T 0,1300 Z`}
                    fill="#60a5fa"
                    opacity="0.2"
                  />

                  {/* Districts */}
                  {cityDistricts.map((district) => (
                    <rect
                      key={district.id}
                      x={district.x}
                      y={district.y}
                      width="700"
                      height="700"
                      fill={district.color}
                      opacity="0.05"
                      stroke={district.color}
                      strokeWidth="3"
                      strokeDasharray="10,5"
                    />
                  ))}

                  {/* Street grid */}
                  {Array.from({ length: 12 }, (_, i) => i * 200).map((pos) => (
                    <g key={`street-${pos}`}>
                      <line
                        x1={pos}
                        y1="0"
                        x2={pos}
                        y2={cityHeight}
                        stroke="#9ca3af"
                        strokeWidth="8"
                        opacity="0.3"
                      />
                      <line
                        x1="0"
                        y1={pos}
                        x2={cityWidth}
                        y2={pos}
                        stroke="#9ca3af"
                        strokeWidth="8"
                        opacity="0.3"
                      />
                    </g>
                  ))}

                  {/* Landmarks */}
                  {landmarks.map((landmark) => (
                    <g key={landmark.id}>
                      <circle
                        cx={landmark.x}
                        cy={landmark.y}
                        r={landmark.size / 2}
                        fill="#34d399"
                        opacity="0.3"
                        stroke="#10b981"
                        strokeWidth="3"
                      />
                      <text
                        x={landmark.x}
                        y={landmark.y - landmark.size / 2 - 10}
                        fontSize="14"
                        fontWeight="bold"
                        fill="#065f46"
                        textAnchor="middle"
                      >
                        {landmark.icon} {landmark.name}
                      </text>
                    </g>
                  ))}

                  {/* Properties/Lots */}
                  {properties.map((property) => {
                    if (!property.dimensions) return null;
                    const { x, y } = property.coordinates;
                    const { width, height } = property.dimensions;
                    const isSelected = selectedProperty?.id === property.id;
                    const isHovered = hoveredProperty?.id === property.id;
                    const statusColor = getStatusColor(property.status);
                    const lotColor = getLotTypeColor(property.lotType);

                    return (
                      <g key={property.id}>
                        <rect
                          x={x}
                          y={y}
                          width={width}
                          height={height}
                          fill={property.status === 'sold' ? '#e5e7eb' : lotColor}
                          opacity={property.status === 'sold' ? 0.4 : 0.7}
                          stroke={isSelected || isHovered ? '#2563eb' : statusColor}
                          strokeWidth={isSelected ? 4 : isHovered ? 3 : 2}
                          className="cursor-pointer transition-all"
                          onMouseEnter={() => setHoveredProperty(property)}
                          onMouseLeave={() => setHoveredProperty(null)}
                          onClick={() => property.status !== 'sold' && onPropertySelect(property)}
                        />
                        {/* Lot number */}
                        {(isSelected || isHovered || width > 40) && (
                          <text
                            x={x + width / 2}
                            y={y + height / 2}
                            fontSize="10"
                            fontWeight="bold"
                            fill="#374151"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            pointerEvents="none"
                          >
                            {property.lot}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Hovered property tooltip */}
                  {hoveredProperty && hoveredProperty.dimensions && (
                    <g>
                      <rect
                        x={hoveredProperty.coordinates.x + hoveredProperty.dimensions.width + 10}
                        y={hoveredProperty.coordinates.y}
                        width="180"
                        height="100"
                        fill="white"
                        stroke="#d1d5db"
                        strokeWidth="2"
                        rx="8"
                        filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
                      />
                      <text
                        x={hoveredProperty.coordinates.x + hoveredProperty.dimensions.width + 20}
                        y={hoveredProperty.coordinates.y + 20}
                        fontSize="12"
                        fontWeight="bold"
                        fill="#111827"
                      >
                        {hoveredProperty.address}
                      </text>
                      <text
                        x={hoveredProperty.coordinates.x + hoveredProperty.dimensions.width + 20}
                        y={hoveredProperty.coordinates.y + 40}
                        fontSize="10"
                        fill="#6b7280"
                      >
                        {hoveredProperty.size.toLocaleString()} sq ft
                      </text>
                      <text
                        x={hoveredProperty.coordinates.x + hoveredProperty.dimensions.width + 20}
                        y={hoveredProperty.coordinates.y + 60}
                        fontSize="11"
                        fontWeight="bold"
                        fill="#059669"
                      >
                        ${hoveredProperty.price}
                      </text>
                      <text
                        x={hoveredProperty.coordinates.x + hoveredProperty.dimensions.width + 20}
                        y={hoveredProperty.coordinates.y + 80}
                        fontSize="9"
                        fill="#9ca3af"
                      >
                        {hoveredProperty.lotType || 'Standard'}
                      </text>
                    </g>
                  )}
                </svg>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Lot Types & Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-gray-600 mb-2 font-medium">Lot Sizes</div>
            <div className="space-y-1.5">
              {['studio', 'standard', 'premium', 'estate', 'mansion'].map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: getLotTypeColor(type) }}></div>
                  <span className="text-xs text-gray-700 capitalize">{type}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-2 font-medium">Status</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-500"></div>
                <span className="text-xs text-gray-700">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-500"></div>
                <span className="text-xs text-gray-700">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-400"></div>
                <span className="text-xs text-gray-700">Sold</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-2 font-medium">Special Features</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs">🏞️</span>
                <span className="text-xs text-gray-700">Park Adjacent</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">🌊</span>
                <span className="text-xs text-gray-700">Waterfront</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">📍</span>
                <span className="text-xs text-gray-700">Corner Lot</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-2 font-medium">Map Elements</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-400/30 border border-emerald-600"></div>
                <span className="text-xs text-gray-700">Landmarks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-400/20"></div>
                <span className="text-xs text-gray-700">Rivers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-300"></div>
                <span className="text-xs text-gray-700">Streets</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
