'use client';

import { religions } from '@/data/religions';
import { getDistrictDominance } from '@/data/competitionStats';
import { useState } from 'react';

export default function TerritoryMap() {
  const districts = getDistrictDominance();
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const selected = districts.find(d => d.districtName === selectedDistrict);

  return (
    <div className="space-y-6">
      {/* Map Grid */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span>🗺️</span>
          Heaven Territory Control
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {districts.map((district) => {
            const dominantReligion = religions.find(r => r.id === district.dominantReligion);
            const isSelected = district.districtName === selectedDistrict;

            return (
              <button
                key={district.districtName}
                onClick={() => setSelectedDistrict(isSelected ? null : district.districtName)}
                className={`relative p-6 rounded-2xl border-4 transition-all hover:scale-105 ${
                  isSelected
                    ? 'border-blue-600 shadow-xl'
                    : 'border-transparent shadow-md'
                } ${
                  district.isContested ? 'ring-4 ring-yellow-400 ring-offset-2' : ''
                }`}
                style={{
                  background: dominantReligion
                    ? `linear-gradient(135deg, ${dominantReligion.color.replace('from-', '').replace(' to-', ', ')})`
                    : 'linear-gradient(135deg, #e5e7eb, #d1d5db)'
                }}
              >
                {/* District Icon */}
                <div className="text-4xl mb-2 filter drop-shadow-lg">
                  {dominantReligion?.icon || '🏛️'}
                </div>

                {/* District Name */}
                <div className="text-sm font-bold text-white drop-shadow-lg text-center">
                  {district.districtName.split(' ')[0]}
                </div>

                {/* Contested Badge */}
                {district.isContested && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                    ⚔️ CONTESTED
                  </div>
                )}

                {/* Property Count */}
                <div className="mt-2 text-xs text-white/90 font-semibold text-center bg-black/20 rounded-lg py-1">
                  {Object.values(district.propertiesByReligion).reduce((a, b) => a + b, 0)} properties
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-4 border-yellow-400"></div>
            <span className="text-gray-600">Contested (close competition)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-400"></div>
            <span className="text-gray-600">No dominant religion</span>
          </div>
        </div>
      </div>

      {/* District Details */}
      {selected && (
        <div className="bg-white rounded-3xl shadow-lg p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-2xl font-bold text-gray-900">{selected.districtName}</h4>
            {selected.isContested && (
              <span className="bg-yellow-400 text-yellow-900 text-sm font-bold px-4 py-2 rounded-full">
                ⚔️ BATTLE ZONE
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-6">
            {selected.isContested
              ? 'This district is hotly contested! Multiple religions are competing for dominance.'
              : `This district is currently controlled by ${religions.find(r => r.id === selected.dominantReligion)?.name}.`}
          </p>

          <div className="space-y-4">
            <h5 className="font-semibold text-gray-900">Property Ownership</h5>

            {Object.entries(selected.propertiesByReligion)
              .sort(([, a], [, b]) => b - a)
              .map(([religionId, count]) => {
                const religion = religions.find(r => r.id === religionId);
                if (!religion) return null;

                const total = Object.values(selected.propertiesByReligion).reduce((a, b) => a + b, 0);
                const percentage = (count / total) * 100;
                const isLeader = religionId === selected.dominantReligion;

                return (
                  <div key={religionId} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${religion.color} flex items-center justify-center text-sm`}>
                          {religion.icon}
                        </div>
                        <span className="font-semibold text-gray-900">{religion.name}</span>
                        {isLeader && (
                          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                            👑 LEADER
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{count}</div>
                        <div className="text-xs text-gray-600">{percentage.toFixed(1)}%</div>
                      </div>
                    </div>

                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${religion.color} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
