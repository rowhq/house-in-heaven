'use client';

import { useState } from 'react';
import { religions } from '@/data/religions';
import { getEnhancedCompetitionStats, formatCurrency, getTrendIcon, getRankMedal, getDaysUntilMonthEnd } from '@/data/competitionStats';
import Link from 'next/link';

export default function CompetitionWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const stats = getEnhancedCompetitionStats();
  const topThree = stats.slice(0, 3);
  const daysLeft = getDaysUntilMonthEnd();

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        <span className="text-2xl">🏆</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl border-2 border-purple-200 transition-all duration-300 ${
        isExpanded ? 'w-96' : 'w-80'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <div>
                <div className="text-white font-bold">Heavenly Battle</div>
                <div className="text-xs text-blue-100">Monthly Competition</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Countdown */}
          <div className="mt-3 text-center bg-white/20 backdrop-blur-sm rounded-lg py-2">
            <div className="text-xs text-white/80">Resets in</div>
            <div className="text-lg font-bold text-white">{daysLeft} days</div>
          </div>
        </div>

        {/* Compact View - Top 3 */}
        {!isExpanded && (
          <div className="p-4 space-y-3">
            {topThree.map((stat, index) => {
              const religion = religions.find(r => r.id === stat.religionId);
              if (!religion) return null;

              return (
                <div key={stat.religionId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="text-2xl">{getRankMedal(index + 1)}</div>
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${religion.color} flex items-center justify-center text-xl flex-shrink-0`}>
                    {religion.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">{religion.name}</div>
                    <div className="text-xs text-gray-600">{formatCurrency(stat.totalDonations)}</div>
                  </div>
                  {stat.matchingBonus > 0 && (
                    <div className="text-orange-500 text-lg animate-pulse">🔥</div>
                  )}
                  <div className="text-lg">{getTrendIcon(stat.trend)}</div>
                </div>
              );
            })}

            <Link
              href="/competition"
              className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 rounded-xl hover:shadow-lg transition-all text-sm"
            >
              View Full Leaderboard
            </Link>
          </div>
        )}

        {/* Expanded View - All Rankings */}
        {isExpanded && (
          <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
            {stats.map((stat) => {
              const religion = religions.find(r => r.id === stat.religionId);
              if (!religion) return null;

              return (
                <div key={stat.religionId} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-lg">{getRankMedal(stat.rank)}</div>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${religion.color} flex items-center justify-center text-lg flex-shrink-0`}>
                      {religion.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">{religion.name}</div>
                    </div>
                    {stat.matchingBonus > 0 && (
                      <div className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                        +{stat.matchingBonus}% 🔥
                      </div>
                    )}
                    <div className="text-lg">{getTrendIcon(stat.trend)}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-gray-500">Total</div>
                      <div className="font-semibold text-gray-900">{formatCurrency(stat.totalDonations)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Monthly</div>
                      <div className="font-semibold text-gray-900">{formatCurrency(stat.monthlyDonations)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Properties</div>
                      <div className="font-semibold text-gray-900">{stat.propertiesOwned}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Districts</div>
                      <div className="font-semibold text-gray-900">{stat.districtsDominated.length}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            <Link
              href="/competition"
              className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all mt-4"
            >
              View Full Competition Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
