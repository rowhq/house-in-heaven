'use client';

import Logo from '@/components/Logo';
import Link from 'next/link';
import { religions } from '@/data/religions';
import { getEnhancedCompetitionStats, formatCurrency, getTrendIcon, getRankMedal, getDaysUntilMonthEnd } from '@/data/competitionStats';
import TerritoryMap from '@/components/TerritoryMap';

export default function CompetitionPage() {
  const stats = getEnhancedCompetitionStats();
  const podium = stats.slice(0, 3);
  const daysLeft = getDaysUntilMonthEnd();

  // Reorder for podium display: [2nd, 1st, 3rd]
  const podiumOrder = [podium[1], podium[0], podium[2]];
  const podiumHeights = ['h-48', 'h-64', 'h-40'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-4">
            <span className="text-6xl">🏆</span>
            Heavenly Battle
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Friendly competition between faiths to support the most charity. May the most generous win!
          </p>

          <div className="mt-8 inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
            <div className="text-3xl">⏰</div>
            <div>
              <div className="text-sm text-blue-100">Monthly Competition Resets In</div>
              <div className="text-2xl font-bold">{daysLeft} Days</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 space-y-12">
        {/* Podium */}
        <div className="bg-white rounded-3xl shadow-xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Top 3 Champions
          </h2>

          <div className="flex items-end justify-center gap-8 mb-12">
            {podiumOrder.map((stat, index) => {
              if (!stat) return null;
              const religion = religions.find(r => r.id === stat.religionId);
              if (!religion) return null;

              const actualRank = stat.rank;
              const height = podiumHeights[index];
              const isFirst = actualRank === 1;

              return (
                <div key={stat.religionId} className="flex flex-col items-center">
                  {/* Religion Icon */}
                  <div className={`mb-4 ${isFirst ? 'animate-bounce' : ''}`}>
                    <div className={`${isFirst ? 'w-24 h-24 text-5xl' : 'w-20 h-20 text-4xl'} rounded-full bg-gradient-to-br ${religion.color} flex items-center justify-center shadow-2xl border-4 border-white`}>
                      {religion.icon}
                    </div>
                  </div>

                  {/* Medal */}
                  <div className="text-5xl mb-2">{getRankMedal(actualRank)}</div>

                  {/* Name */}
                  <div className="text-lg font-bold text-gray-900 mb-1">{religion.name}</div>

                  {/* Stats */}
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(stat.totalDonations)}</div>
                    <div className="text-sm text-gray-600">{stat.propertiesOwned} properties</div>
                  </div>

                  {/* Matching Bonus */}
                  {stat.matchingBonus > 0 && (
                    <div className="mb-4 bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                      🔥 +{stat.matchingBonus}% BONUS
                    </div>
                  )}

                  {/* Podium */}
                  <div className={`${height} w-32 bg-gradient-to-b ${religion.color} rounded-t-2xl shadow-xl flex items-center justify-center transition-all hover:scale-105`}>
                    <div className="text-white font-bold text-xl">#{actualRank}</div>
                  </div>

                  {/* Confetti for 1st place */}
                  {isFirst && (
                    <div className="absolute -top-8 text-4xl animate-ping">✨</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Podium Base */}
          <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-lg"></div>
        </div>

        {/* Full Rankings Table */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Full Rankings</h2>

          <div className="space-y-4">
            {stats.map((stat) => {
              const religion = religions.find(r => r.id === stat.religionId);
              if (!religion) return null;

              return (
                <div key={stat.religionId} className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  {/* Rank */}
                  <div className="text-3xl font-bold text-gray-400 w-12 text-center">
                    {getRankMedal(stat.rank)}
                  </div>

                  {/* Religion Icon */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${religion.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {religion.icon}
                  </div>

                  {/* Religion Info */}
                  <div className="flex-1">
                    <div className="font-bold text-xl text-gray-900 mb-1">{religion.name}</div>
                    <div className="text-sm text-gray-600">{religion.charityName}</div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Total Donated</div>
                      <div className="font-bold text-gray-900">{formatCurrency(stat.totalDonations)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">This Month</div>
                      <div className="font-bold text-gray-900">{formatCurrency(stat.monthlyDonations)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Properties</div>
                      <div className="font-bold text-gray-900">{stat.propertiesOwned}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Districts</div>
                      <div className="font-bold text-gray-900">{stat.districtsDominated.length}/8</div>
                    </div>
                  </div>

                  {/* Trend & Bonus */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-3xl">{getTrendIcon(stat.trend)}</div>
                    {stat.matchingBonus > 0 && (
                      <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                        +{stat.matchingBonus}% 🔥
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Territory Map */}
        <TerritoryMap />

        {/* How Matching Works */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">🔥</span>
            How Matching Bonuses Work
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>🥇 1st Place:</strong> All donations receive a <strong>10% matching bonus</strong>
            </p>
            <p>
              <strong>🥈 2nd Place:</strong> All donations receive a <strong>5% matching bonus</strong>
            </p>
            <p className="text-sm text-gray-600 mt-4">
              Example: If Christianity is in 1st place and you donate $100, an additional $10 will be matched and donated to World Vision, for a total of $110!
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Support Your Faith!</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Help your religion climb the leaderboard while supporting real charities making a difference in the world.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-lg"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
