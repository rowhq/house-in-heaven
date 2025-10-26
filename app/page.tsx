'use client';

import { religions } from '@/data/religions';
import Link from 'next/link';
import Logo from '@/components/Logo';
import GlobalTerritoryMap from '@/components/GlobalTerritoryMap';
import { getEnhancedCompetitionStats, formatCurrency, getRankMedal, getDaysUntilMonthEnd } from '@/data/competitionStats';
import { useMemo } from 'react';

export default function Home() {
  const stats = useMemo(() => getEnhancedCompetitionStats(), []);
  const podium = stats.slice(0, 3);
  const daysLeft = getDaysUntilMonthEnd();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-8">
              <a
                href="#competition"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <span>🏆</span>
                Competition
              </a>
              <a
                href="#map"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <span>🗺️</span>
                Territory Map
              </a>
              <Link
                href="/impact"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <span>💫</span>
                Our Impact
              </Link>
              <Link
                href="/properties?religion=christianity"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Claim Property
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-6xl font-semibold tracking-tight text-gray-900 sm:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              The Heavenly Battle
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Join your faith in the ultimate friendly competition. Claim properties in paradise,
              support real charities, and watch your religion rise to divine dominance.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href="#competition"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all text-lg"
              >
                Join the Battle
              </a>
              <a
                href="#map"
                className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all text-lg border-2 border-gray-200"
              >
                View Territory Map
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Competition Overview */}
      <div id="competition" className="relative py-24 sm:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4">
              <span className="text-6xl">🏆</span>
              Live Competition Rankings
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Watch faiths compete in real-time to support the most charity. Top religions earn matching bonuses!
            </p>
            <div className="mt-6 inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div className="text-3xl">⏰</div>
              <div>
                <div className="text-sm text-blue-100">Competition Resets In</div>
                <div className="text-2xl font-bold text-white">{daysLeft} Days</div>
              </div>
            </div>
          </div>

          {/* Mini Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {podium.map((stat) => {
              const religion = religions.find(r => r.id === stat.religionId);
              if (!religion) return null;

              return (
                <div
                  key={stat.religionId}
                  className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">{getRankMedal(stat.rank)}</div>
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${religion.color} flex items-center justify-center text-4xl shadow-2xl border-4 border-white`}>
                      {religion.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{religion.name}</h3>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-white">{formatCurrency(stat.totalDonations)}</div>
                      <div className="text-sm text-blue-100">raised for {religion.charityName}</div>
                      <div className="text-lg text-white font-semibold">{stat.propertiesOwned} properties</div>
                      {stat.matchingBonus > 0 && (
                        <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse inline-block">
                          🔥 +{stat.matchingBonus}% BONUS
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* All Rankings */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">All Faiths</h3>
            <div className="space-y-4">
              {stats.map((stat) => {
                const religion = religions.find(r => r.id === stat.religionId);
                if (!religion) return null;

                return (
                  <div
                    key={stat.religionId}
                    className="flex items-center justify-between bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{getRankMedal(stat.rank)}</div>
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${religion.color} flex items-center justify-center text-2xl`}>
                        {religion.icon}
                      </div>
                      <div>
                        <div className="font-bold text-white">{religion.name}</div>
                        <div className="text-sm text-blue-100">{religion.charityName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-bold text-white">{formatCurrency(stat.totalDonations)}</div>
                        <div className="text-xs text-blue-100">{stat.propertiesOwned} properties</div>
                      </div>
                      {stat.matchingBonus > 0 && (
                        <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          +{stat.matchingBonus}% 🔥
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Matching Bonus Explanation */}
          <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-3xl">🔥</span>
              How Matching Bonuses Work
            </h3>
            <div className="space-y-3 text-white">
              <p className="text-lg">
                <strong className="text-yellow-300">🥇 1st Place:</strong> All donations receive a <strong>10% matching bonus</strong>
              </p>
              <p className="text-lg">
                <strong className="text-gray-300">🥈 2nd Place:</strong> All donations receive a <strong>5% matching bonus</strong>
              </p>
              <p className="text-sm text-blue-100 mt-4 bg-white/10 p-4 rounded-xl">
                💡 Example: If Christianity is in 1st place and you donate $100, an additional $10 will be matched and donated to World Vision, for a total of $110 supporting real charity!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Territory Map Section */}
      <div id="map" className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Heaven Territory Map
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Watch as faiths claim their divine territories. Each district represents sacred land in paradise,
              controlled by the religion with the most properties.
            </p>
          </div>

          <GlobalTerritoryMap />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">🏰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">8 Sacred Districts</h3>
              <p className="text-gray-600">From Golden Gates to Serenity Springs, claim your territory</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">⚔️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Contested Zones</h3>
              <p className="text-gray-600">Watch territories change hands as faiths battle for dominance</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Updates</h3>
              <p className="text-gray-600">Territory control updates with every property claimed</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join the heavenly battle in three simple steps
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-3xl text-white shadow-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Choose Your Faith
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Select the religion that resonates with your beliefs and support their charity partner
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-3xl text-white shadow-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Claim Territory
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse the heavenly map and select your perfect plot in paradise
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-700 text-3xl text-white shadow-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Support Charity
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your donation goes to real charities making a difference in the world
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Charities */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Supporting Real Charities
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Every donation goes directly to verified charitable organizations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {religions.map((religion) => (
              <div
                key={religion.id}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${religion.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {religion.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  {religion.name}
                </h3>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {religion.charityName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {religion.charityDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Claim Your Heavenly Estate?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands in the ultimate friendly competition. Support charity, claim your territory,
            and help your faith rise to the top!
          </p>
          <Link
            href="/properties?religion=christianity"
            className="inline-block bg-white text-blue-600 font-bold px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all text-xl shadow-2xl"
          >
            Start Claiming Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
