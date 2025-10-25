'use client';

import { charityImpactData, globalImpact } from '@/data/charityImpact';
import { religions } from '@/data/religions';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { useState } from 'react';

export default function ImpactPage() {
  const [selectedReligion, setSelectedReligion] = useState<string | null>(null);
  const selectedImpact = selectedReligion ? charityImpactData[selectedReligion] : null;

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
          <h1 className="text-5xl font-bold mb-6">Real Impact, Real Change</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Every property purchased supports real charities making a tangible difference in the world.
            See the impact your donations are creating.
          </p>
        </div>
      </div>

      {/* Global Stats */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Global Impact Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                ${(globalImpact.totalDonations / 1000).toFixed(0)}K
              </div>
              <div className="text-gray-600">Total Donations</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                {globalImpact.totalProperties}
              </div>
              <div className="text-gray-600">Properties Sold</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-pink-600 mb-2">
                {globalImpact.charitiesSupported}
              </div>
              <div className="text-gray-600">Charities Supported</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600 mb-2">
                {globalImpact.countriesReached}
              </div>
              <div className="text-gray-600">Countries Reached</div>
            </div>
          </div>
        </div>

        {/* Charity Selector */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Select a Faith to See Detailed Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {religions.map((religion) => (
              <button
                key={religion.id}
                onClick={() => setSelectedReligion(religion.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedReligion === religion.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className={`text-4xl mb-2 mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${religion.color} flex items-center justify-center`}>
                  {religion.icon}
                </div>
                <div className="text-sm font-semibold text-gray-900">{religion.name}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {charityImpactData[religion.id]?.propertiesSold || 0} sold
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Impact */}
        {selectedImpact && selectedReligion && (
          <div className="space-y-8">
            {/* Charity Header */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`text-5xl w-20 h-20 rounded-full bg-gradient-to-br ${religions.find(r => r.id === selectedReligion)?.color} flex items-center justify-center`}>
                  {religions.find(r => r.id === selectedReligion)?.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {selectedImpact.charityName}
                  </h3>
                  <p className="text-gray-600">
                    {religions.find(r => r.id === selectedReligion)?.charityDescription}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-600">Total Donated</div>
                  <div className="text-3xl font-bold text-green-600">
                    ${selectedImpact.totalDonations.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Properties Supporting</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {selectedImpact.propertiesSold}
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Impact Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {selectedImpact.impactMetrics.map((metric, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                    <div className="text-4xl mb-3">{metric.icon}</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {metric.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">{metric.metric}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Projects */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Active Projects</h4>
              <div className="space-y-6">
                {selectedImpact.projects.map((project, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h5 className="text-xl font-semibold text-gray-900">{project.name}</h5>
                        <p className="text-sm text-gray-600">📍 {project.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.round((project.progress / project.goal) * 100)}%
                        </div>
                        <div className="text-xs text-gray-600">Complete</div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${Math.min((project.progress / project.goal) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>${project.progress.toLocaleString()} raised</span>
                      <span>Goal: ${project.goal.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Stories */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Recent Impact Stories</h4>
              <div className="space-y-4">
                {selectedImpact.recentStories.map((story, idx) => (
                  <div key={idx} className="border-l-4 border-blue-500 pl-6 py-3">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="text-lg font-semibold text-gray-900">{story.title}</h5>
                      <span className="text-sm text-gray-500">
                        {new Date(story.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{story.description}</p>
                    <p className="text-sm text-gray-600">📍 {story.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        {!selectedImpact && (
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-xl p-12 text-center text-white mt-12">
            <h3 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Select a faith above to see detailed impact, or browse properties to start making a difference today.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
