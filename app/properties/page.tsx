'use client';

import { properties } from '@/data/properties';
import { religions } from '@/data/religions';
import { Property } from '@/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import Logo from '@/components/Logo';
import MetaverseMap from '@/components/MetaverseMap';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const religionId = searchParams.get('religion') || 'christianity';
  const religion = religions.find((r) => r.id === religionId) || religions[0];

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'sold':
        return 'bg-gray-400';
      case 'reserved':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4 border-b border-gray-100">
          <Logo />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to home
              </Link>
              <h1 className="text-3xl font-semibold text-gray-900 flex items-center gap-3">
                <span className="text-4xl">{religion.icon}</span>
                {religion.name} Properties
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Supporting {religion.charityName}
              </p>
            </div>

            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>🗺️</span>
                City Map
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>📋</span>
                List View
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 space-y-3">
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-400 border border-emerald-600"></div>
                <span className="text-gray-600">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-400 border border-amber-600"></div>
                <span className="text-gray-600">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-300 border border-gray-400"></div>
                <span className="text-gray-600">Sold</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">★</span>
                <span className="text-gray-600">Premium Zone</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Hover over any property to see details. Click to view full information.
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {viewMode === 'grid' ? (
          /* Metaverse City Map View */
          <MetaverseMap
            properties={properties}
            selectedProperty={selectedProperty}
            onPropertySelect={setSelectedProperty}
          />
        ) : (
          /* List View */
          <div className="space-y-3">
            {properties.map((property) => (
              <button
                key={property.id}
                onClick={() => setSelectedProperty(property)}
                className={`w-full text-left bg-white rounded-xl shadow-sm border transition-all hover:shadow-md ${
                  selectedProperty?.id === property.id
                    ? 'border-blue-600 ring-2 ring-blue-600'
                    : 'border-gray-200'
                } ${property.status === 'sold' ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={property.status === 'sold'}
              >
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(property.status)}`}></div>

                    <div>
                      <div className="font-semibold text-gray-900">{property.address || property.parcelNumber}</div>
                      <div className="text-sm text-gray-600">
                        {property.subdivision} • {property.lotType || 'Standard'}
                      </div>
                      {property.nearestLandmark && (
                        <div className="text-xs text-gray-500">Near {property.nearestLandmark}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Size</div>
                      <div className="font-semibold text-gray-900">
                        {property.size.toLocaleString()} sq ft
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-600">Donation</div>
                      <div className="font-semibold text-gray-900">${property.price}</div>
                    </div>

                    <div className="text-sm font-medium capitalize text-gray-600">
                      {property.status}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Property Details Panel */}
        {selectedProperty && (
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto z-50">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-semibold text-gray-900">Property Details</h2>
              <button
                onClick={() => setSelectedProperty(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="text-sm text-gray-600">Address</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {selectedProperty.address || selectedProperty.parcelNumber}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Parcel: {selectedProperty.parcelNumber}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Lot Type</div>
                  <div className="text-lg font-semibold text-gray-900 capitalize">{selectedProperty.lotType || 'Standard'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">District</div>
                  <div className="text-lg font-semibold text-gray-900">{selectedProperty.subdivision.split(' ')[0]}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600">Dimensions</div>
                <div className="text-lg font-semibold text-gray-900">
                  {selectedProperty.dimensions ?
                    `${selectedProperty.dimensions.width}' × ${selectedProperty.dimensions.height}' (${selectedProperty.size.toLocaleString()} sq ft)` :
                    `${selectedProperty.size.toLocaleString()} sq ft`
                  }
                </div>
              </div>

              {selectedProperty.nearestLandmark && (
                <div>
                  <div className="text-sm text-gray-600">Nearest Landmark</div>
                  <div className="text-lg font-semibold text-gray-900">{selectedProperty.nearestLandmark}</div>
                </div>
              )}

              {selectedProperty.locationTypes && selectedProperty.locationTypes.length > 0 && (
                <div>
                  <div className="text-sm text-gray-600 mb-2">Location Premium</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.locationTypes.map((type, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full capitalize">
                        {type === 'parkAdjacent' ? 'Park Adjacent' :
                         type === 'mainStreet' ? 'Main Street' :
                         type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm text-gray-600 mb-2">Features</div>
                <div className="space-y-2">
                  {selectedProperty.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-sm text-gray-600">Donation Amount</span>
                  <span className="text-3xl font-semibold text-gray-900">
                    ${selectedProperty.price}
                  </span>
                </div>

                {selectedProperty.status === 'available' ? (
                  <Link
                    href={`/checkout?property=${selectedProperty.id}&religion=${religionId}`}
                    className="block w-full bg-blue-600 text-white text-center font-semibold py-4 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Proceed to Donation
                  </Link>
                ) : (
                  <div className="text-center py-4 text-gray-600">
                    This property is {selectedProperty.status}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
