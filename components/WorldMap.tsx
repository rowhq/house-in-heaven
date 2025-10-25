'use client';

import { Property } from '@/types';
import { cityDistricts as worldZones } from '@/lib/cityGenerator';

interface WorldMapProps {
  properties: Property[];
  selectedProperty: Property | null;
  onPropertySelect: (property: Property) => void;
}

export default function WorldMap({ properties, selectedProperty, onPropertySelect }: WorldMapProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-400 hover:bg-emerald-500 border-emerald-600';
      case 'sold':
        return 'bg-gray-300 border-gray-400 cursor-not-allowed';
      case 'reserved':
        return 'bg-amber-400 hover:bg-amber-500 border-amber-600';
      default:
        return 'bg-gray-300 border-gray-400';
    }
  };

  const getZoneColor = (subdivision: string) => {
    const zone = worldZones.find(z => z.name === subdivision);
    return zone?.color || '#e5e7eb';
  };

  // Group properties by zone
  const propertiesByZone = properties.reduce((acc, prop) => {
    if (!acc[prop.subdivision]) {
      acc[prop.subdivision] = [];
    }
    acc[prop.subdivision].push(prop);
    return acc;
  }, {} as Record<string, Property[]>);

  return (
    <div className="space-y-4">
      {/* Zone Info Banner */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          Heavenly Zones
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {worldZones.map((zone) => (
            <div key={zone.name} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded border-2"
                style={{
                  backgroundColor: `${zone.color}40`,
                  borderColor: zone.color,
                }}
              ></div>
              <div className="flex items-center gap-1">
                {zone.premium && <span className="text-yellow-600 text-xs">★</span>}
                <span className="text-gray-700 text-xs font-medium">{zone.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* World Map */}
      <div className="relative bg-gradient-to-br from-sky-200 via-blue-100 to-purple-200 rounded-3xl shadow-2xl p-12 overflow-hidden">
      {/* Decorative clouds */}
      <div className="absolute top-4 left-8 w-24 h-12 bg-white/40 rounded-full blur-sm animate-float"></div>
      <div className="absolute top-12 right-16 w-32 h-14 bg-white/30 rounded-full blur-sm animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-16 left-24 w-28 h-12 bg-white/35 rounded-full blur-sm animate-float" style={{ animationDelay: '2s' }}></div>

      {/* River/Stream decoration */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 0,300 Q 200,250 400,300 T 800,300 L 800,320 Q 600,350 400,320 T 0,320 Z"
          fill="#60a5fa"
          opacity="0.3"
        />
        <path
          d="M 300,0 Q 350,200 300,400 T 300,800 L 280,800 Q 250,600 280,400 T 280,0 Z"
          fill="#60a5fa"
          opacity="0.3"
        />
      </svg>

      <div className="relative grid gap-6">
        {worldZones.map((zone, zoneIdx) => {
          const zoneProperties = propertiesByZone[zone.name] || [];
          const zoneX = (zoneIdx % 3);
          const zoneY = Math.floor(zoneIdx / 3);

          return (
            <div
              key={zone.name}
              className="relative"
              style={{
                gridColumn: zoneX + 1,
                gridRow: zoneY + 1,
              }}
            >
              {/* Zone Container */}
              <div
                className="rounded-2xl p-4 shadow-lg border-2 border-white/50 backdrop-blur-sm transition-transform hover:scale-[1.02]"
                style={{
                  backgroundColor: `${zone.color}20`,
                  borderColor: `${zone.color}80`,
                }}
              >
                {/* Zone Header */}
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    {zone.premium && (
                      <span className="text-yellow-600">★</span>
                    )}
                    {zone.name}
                  </h3>
                  <span className="text-xs text-gray-600 bg-white/60 px-2 py-1 rounded-full">
                    {zoneProperties.filter(p => p.status === 'available').length} available
                  </span>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-5 gap-1.5">
                  {zoneProperties.map((property) => (
                    <button
                      key={property.id}
                      onClick={() => property.status !== 'sold' && onPropertySelect(property)}
                      disabled={property.status === 'sold'}
                      className={`
                        aspect-square rounded-lg border-2 transition-all relative group
                        ${getStatusColor(property.status)}
                        ${selectedProperty?.id === property.id
                          ? 'ring-4 ring-blue-600 ring-offset-2 scale-110 z-10'
                          : 'hover:scale-125 hover:z-10'
                        }
                      `}
                      title={`${property.parcelNumber} - ${property.subdivision}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-gray-800">
                          {property.lot}
                        </span>
                      </div>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                        <div className="bg-gray-900 text-white text-[10px] rounded-lg py-1.5 px-2 whitespace-nowrap shadow-xl">
                          <div className="font-semibold">{property.parcelNumber}</div>
                          <div className="text-gray-300">{property.size.toLocaleString()} sq ft</div>
                          <div className="text-gray-300">${property.price}</div>
                          <div className="text-gray-400 text-[8px] mt-0.5">{property.view}</div>
                        </div>
                      </div>

                      {/* Premium indicator */}
                      {zone.premium && property.status === 'available' && (
                        <div className="absolute -top-1 -right-1 w-2 h-2">
                          <span className="text-[8px]">✨</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zone decorations */}
              {zone.name === 'Crystal River Valley' && (
                <div className="absolute -right-2 top-1/2 w-4 h-full bg-blue-400/30 rounded blur-sm -z-10"></div>
              )}
              {zone.name === 'Celestial Gardens' && (
                <>
                  <div className="absolute top-1 right-2 text-lg">🌸</div>
                  <div className="absolute bottom-2 left-1 text-lg">🌺</div>
                </>
              )}
              {zone.name === 'Golden Gates District' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">🌟</div>
              )}
              {zone.name === 'Cloud Nine Heights' && (
                <>
                  <div className="absolute -top-2 right-4 text-xl">☁️</div>
                  <div className="absolute top-1/2 -left-3 text-lg">☁️</div>
                </>
              )}
              {zone.name === 'Seraphim Shores' && (
                <div className="absolute bottom-1 right-1 text-lg">🌊</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-8 right-8 text-4xl animate-pulse">✨</div>
      <div className="absolute bottom-12 left-12 text-3xl animate-pulse" style={{ animationDelay: '1s' }}>⭐</div>
      <div className="absolute top-1/2 right-12 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>💫</div>
      </div>
    </div>
  );
}
