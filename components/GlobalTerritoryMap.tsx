'use client';

import { religions } from '@/data/religions';
import { cityDistricts } from '@/lib/cityGenerator';
import { getDistrictDominance } from '@/data/competitionStats';
import { useState } from 'react';

export default function GlobalTerritoryMap() {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const districtStats = getDistrictDominance();

  // Realistic connected country map - territories share borders
  const territoryPaths: Record<string, string> = {
    // Northwest coastal region
    'golden-gates': 'M 100,50 L 250,45 L 280,80 L 290,120 L 280,160 L 250,190 L 200,210 L 150,200 L 100,180 L 70,150 L 65,100 Z',

    // North-central region
    'crystal-river-valley': 'M 250,45 L 420,40 L 460,70 L 480,110 L 475,155 L 450,185 L 410,205 L 360,215 L 290,220 L 280,160 L 290,120 L 280,80 Z',

    // Northeast region
    'celestial-gardens': 'M 420,40 L 600,35 L 650,60 L 680,100 L 685,150 L 670,195 L 630,225 L 580,235 L 530,230 L 475,155 L 480,110 L 460,70 Z',

    // East coastal region
    'cloud-nine-heights': 'M 600,35 L 750,30 L 800,55 L 830,95 L 840,145 L 835,200 L 810,250 L 770,280 L 720,290 L 670,285 L 630,225 L 670,195 L 685,150 L 680,100 Z',

    // West-central region
    'pearly-plaza': 'M 100,180 L 150,200 L 200,210 L 250,190 L 280,160 L 290,220 L 285,280 L 260,325 L 220,360 L 170,375 L 120,370 L 80,340 L 60,290 L 70,230 Z',

    // Central region
    'seraphim-shores': 'M 290,220 L 360,215 L 410,205 L 450,185 L 475,155 L 530,230 L 545,285 L 540,340 L 510,385 L 460,415 L 400,430 L 340,425 L 285,400 L 260,360 L 260,325 L 285,280 Z',

    // Southeast region
    'divine-heights': 'M 530,230 L 580,235 L 630,225 L 670,285 L 720,290 L 745,330 L 760,380 L 750,435 L 720,480 L 670,510 L 610,525 L 550,520 L 510,485 L 510,385 L 540,340 L 545,285 Z',

    // South coastal region
    'eternal-meadows': 'M 340,425 L 400,430 L 460,415 L 510,485 L 550,520 L 610,525 L 640,560 L 650,610 L 620,660 L 560,685 L 490,690 L 420,680 L 360,660 L 310,630 L 280,585 L 270,535 L 285,480 L 310,445 Z',
  };

  const getTerritoryBounds = (districtId: string) => {
    const bounds: Record<string, { cx: number; cy: number }> = {
      'golden-gates': { cx: 177, cy: 125 },
      'crystal-river-valley': { cx: 375, cy: 130 },
      'celestial-gardens': { cx: 580, cy: 135 },
      'cloud-nine-heights': { cx: 735, cy: 160 },
      'pearly-plaza': { cx: 175, cy: 285 },
      'seraphim-shores': { cx: 390, cy: 315 },
      'divine-heights': { cx: 630, cy: 380 },
      'eternal-meadows': { cx: 465, cy: 580 },
    };
    return bounds[districtId] || { cx: 0, cy: 0 };
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 rounded-2xl overflow-hidden shadow-2xl border border-gray-300">
      <svg
        viewBox="0 0 850 720"
        className="w-full h-auto"
        style={{ minHeight: '720px' }}
      >
        <defs>
          {/* Pattern for water */}
          <pattern id="waterPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 0 10 Q 5 5 10 10 T 20 10" stroke="#b3d9ff" fill="none" strokeWidth="0.5"/>
          </pattern>

          <filter id="territoryGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Ocean/Water background */}
        <rect x="0" y="0" width="850" height="720" fill="#c6e7ff" />
        <rect x="0" y="0" width="850" height="720" fill="url(#waterPattern)" opacity="0.3" />

        {/* Main landmass shadow */}
        <path
          d="M 100,50 L 750,30 L 830,95 L 840,145 L 835,200 L 810,250 L 770,280 L 720,290 L 760,380 L 750,435 L 720,480 L 670,510 L 610,525 L 650,610 L 640,660 L 620,680 L 560,690 L 490,695 L 420,685 L 360,665 L 310,635 L 280,590 L 270,540 L 220,365 L 170,380 L 120,375 L 80,345 L 60,295 L 65,230 L 70,155 L 100,55 Z"
          fill="#000"
          opacity="0.1"
          transform="translate(3, 3)"
        />

        {/* Territories */}
        {cityDistricts.map((district) => {
          const path = territoryPaths[district.id];
          const bounds = getTerritoryBounds(district.id);
          const stats = districtStats.find(d => d.districtName === district.name);
          const dominantReligion = stats?.dominantReligion
            ? religions.find(r => r.id === stats.dominantReligion)
            : null;

          const isHovered = hoveredDistrict === district.id;
          const isContested = stats?.isContested || false;
          const totalProperties = stats ? Object.values(stats.propertiesByReligion).reduce((sum, count) => sum + count, 0) : 0;

          // Territory colors
          const getTerritoryColor = () => {
            if (!dominantReligion) return '#e8e4d9';

            const colorMap: Record<string, string> = {
              'christianity': '#5b8fc9',
              'islam': '#5db85f',
              'judaism': '#7d5ba6',
              'hinduism': '#e89f4e',
              'buddhism': '#e67c73',
              'sikhism': '#f5c542',
            };
            return colorMap[dominantReligion.id] || '#e8e4d9';
          };

          const territoryColor = getTerritoryColor();

          return (
            <g
              key={district.id}
              onMouseEnter={() => setHoveredDistrict(district.id)}
              onMouseLeave={() => setHoveredDistrict(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Territory fill */}
              <path
                d={path}
                fill={territoryColor}
                opacity={dominantReligion ? 0.7 : 0.3}
                stroke="#4a4a4a"
                strokeWidth={isHovered ? 3 : 2}
                filter={dominantReligion ? "url(#territoryGlow)" : "none"}
              />

              {/* Contested border flash */}
              {isContested && (
                <path
                  d={path}
                  fill="none"
                  stroke="#ff6b35"
                  strokeWidth="4"
                  opacity="0.6"
                  strokeDasharray="10,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="15"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              )}

              {/* Territory label */}
              <text
                x={bounds.cx}
                y={bounds.cy - 10}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="#2d2d2d"
                fontFamily="Arial, sans-serif"
              >
                {district.name.replace(' District', '').toUpperCase()}
              </text>

              {/* Religion icon if controlled */}
              {dominantReligion && (
                <text
                  x={bounds.cx}
                  y={bounds.cy + 20}
                  textAnchor="middle"
                  fontSize="32"
                  filter="url(#territoryGlow)"
                >
                  {dominantReligion.icon}
                </text>
              )}

              {/* Property count */}
              {stats && (
                <text
                  x={bounds.cx}
                  y={bounds.cy + 40}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#2d2d2d"
                  fontWeight="500"
                >
                  {totalProperties} properties
                </text>
              )}

              {/* Battle indicator */}
              {isContested && (
                <text
                  x={bounds.cx + 50}
                  y={bounds.cy - 20}
                  fontSize="16"
                >
                  ⚔️
                </text>
              )}
            </g>
          );
        })}

        {/* Map title */}
        <rect x="250" y="5" width="350" height="30" fill="rgba(255,255,255,0.9)" stroke="#2d2d2d" strokeWidth="1" rx="3"/>
        <text x="425" y="25" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#2d2d2d" fontFamily="Arial, sans-serif">
          HEAVENLY TERRITORIES MAP
        </text>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 rounded-lg p-3 shadow-lg border border-gray-400 text-xs">
        <div className="font-bold mb-2 text-gray-800 border-b border-gray-300 pb-1">TERRITORY CONTROL</div>
        <div className="space-y-1">
          {religions.map((religion) => {
            const controlledDistricts = districtStats.filter(
              d => d.dominantReligion === religion.id
            ).length;

            if (controlledDistricts === 0) return null;

            const colorMap: Record<string, string> = {
              'christianity': '#5b8fc9',
              'islam': '#5db85f',
              'judaism': '#7d5ba6',
              'hinduism': '#e89f4e',
              'buddhism': '#e67c73',
              'sikhism': '#f5c542',
            };

            return (
              <div key={religion.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colorMap[religion.id] }}></div>
                  <span className="text-gray-700 font-medium">{religion.name}</span>
                </div>
                <span className="text-gray-600 font-semibold">{controlledDistricts}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-2 pt-2 border-t border-gray-300 flex items-center gap-1.5 text-gray-600">
          <span>⚔️</span>
          <span>Contested</span>
        </div>
      </div>

      {/* Hover info */}
      {hoveredDistrict && (
        <div className="absolute top-4 right-4 bg-white/98 rounded-lg p-3 shadow-xl border border-gray-400 min-w-[200px]">
          {(() => {
            const district = cityDistricts.find(d => d.id === hoveredDistrict);
            const stats = districtStats.find(d => d.districtName === district?.name);
            const totalProperties = stats ? Object.values(stats.propertiesByReligion).reduce((sum, count) => sum + count, 0) : 0;

            return (
              <>
                <div className="font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
                  {district?.name}
                </div>
                {stats && (
                  <div className="space-y-2 text-xs">
                    <div className="text-gray-700">
                      <span className="font-semibold">Properties:</span> {totalProperties}
                    </div>
                    {Object.entries(stats.propertiesByReligion)
                      .sort((a, b) => b[1] - a[1])
                      .map(([religionId, count]) => {
                        const religion = religions.find(r => r.id === religionId);
                        if (!religion) return null;

                        const percentage = ((count / totalProperties) * 100).toFixed(0);

                        return (
                          <div key={religionId} className="flex items-center justify-between">
                            <span className="text-gray-700">{religion.icon} {religion.name}</span>
                            <span className="font-semibold text-gray-900">{count} ({percentage}%)</span>
                          </div>
                        );
                      })}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
