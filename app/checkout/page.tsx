'use client';

import { properties } from '@/data/properties';
import { religions } from '@/data/religions';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useMemo } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { getEnhancedCompetitionStats } from '@/data/competitionStats';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('property');
  const religionId = searchParams.get('religion');

  const property = properties.find((p) => p.id === propertyId);
  const religion = religions.find((r) => r.id === religionId);

  // Get matching bonus for this religion
  const competitionStats = useMemo(() => getEnhancedCompetitionStats(), []);
  const religionStats = competitionStats.find(s => s.religionId === religionId);
  const matchingBonus = religionStats?.matchingBonus || 0;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    customAmount: property?.price || 0,
  });

  // Calculate matched amount
  const matchedAmount = (formData.customAmount * matchingBonus) / 100;
  const totalWithMatch = formData.customAmount + matchedAmount;

  const [memorial, setMemorial] = useState({
    enabled: false,
    dedicationType: 'in_memory_of' as 'in_memory_of' | 'in_honor_of' | 'dedicated_to',
    dedicateeName: '',
    dates: '',
    message: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!property || !religion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Property not found</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>

          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Welcome Home!
          </h2>

          <p className="text-gray-600 mb-6">
            Your donation of <span className="font-semibold">${formData.customAmount}</span> has been received
            and will support {religion.charityName}.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="text-sm text-gray-600 mb-2">Your Property</div>
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {property.parcelNumber}
            </div>
            <div className="text-sm text-gray-600">
              {property.subdivision} • {property.size.toLocaleString()} sq ft
            </div>
            <div className="text-sm text-gray-600 mt-2">
              View: {property.view}
            </div>
          </div>

          {memorial.enabled && memorial.dedicateeName && (
            <div className="bg-purple-50 rounded-2xl p-6 mb-6 border border-purple-200">
              <div className="flex items-center gap-2 mb-3 justify-center">
                <span className="text-2xl">👼</span>
                <div className="text-sm font-semibold text-purple-900">Memorial Dedication</div>
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {memorial.dedicationType.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">
                {memorial.dedicateeName}
              </div>
              {memorial.dates && (
                <div className="text-sm text-gray-600 mb-2">{memorial.dates}</div>
              )}
              <div className="text-sm text-gray-700 italic mt-3 pt-3 border-t border-purple-200">
                "{memorial.message}"
              </div>
            </div>
          )}

          <p className="text-sm text-gray-600 mb-6">
            A confirmation email has been sent to <span className="font-semibold">{formData.email}</span>
          </p>

          <Link
            href="/"
            className="block w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 mb-8">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <Logo />
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href={`/properties?religion=${religionId}`}
          className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Checkout Form */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">
              Complete Your Donation
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">$</span>
                  <input
                    type="number"
                    id="amount"
                    required
                    min={property.price}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    value={formData.customAmount}
                    onChange={(e) => setFormData({ ...formData, customAmount: Number(e.target.value) })}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Minimum donation: ${property.price}. Feel free to donate more!
                </p>
              </div>

              {/* Memorial Dedication Section */}
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={memorial.enabled}
                    onChange={(e) => setMemorial({ ...memorial, enabled: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 flex items-center gap-2">
                      <span>👼</span>
                      Dedicate this property
                    </div>
                    <div className="text-sm text-gray-600">
                      Add a memorial or tribute dedication (optional)
                    </div>
                  </div>
                </label>

                {memorial.enabled && (
                  <div className="mt-4 space-y-4 pt-4 border-t border-purple-200">
                    <div>
                      <label htmlFor="dedicationType" className="block text-sm font-medium text-gray-700 mb-2">
                        Dedication Type
                      </label>
                      <select
                        id="dedicationType"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={memorial.dedicationType}
                        onChange={(e) => setMemorial({ ...memorial, dedicationType: e.target.value as any })}
                      >
                        <option value="in_memory_of">In Memory Of</option>
                        <option value="in_honor_of">In Honor Of</option>
                        <option value="dedicated_to">Dedicated To</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="dedicateeName" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="dedicateeName"
                        required={memorial.enabled}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={memorial.dedicateeName}
                        onChange={(e) => setMemorial({ ...memorial, dedicateeName: e.target.value })}
                        placeholder="Enter name"
                      />
                    </div>

                    <div>
                      <label htmlFor="dates" className="block text-sm font-medium text-gray-700 mb-2">
                        Dates (Optional)
                      </label>
                      <input
                        type="text"
                        id="dates"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={memorial.dates}
                        onChange={(e) => setMemorial({ ...memorial, dates: e.target.value })}
                        placeholder="e.g., 1950-2024"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required={memorial.enabled}
                        rows={4}
                        maxLength={500}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                        value={memorial.message}
                        onChange={(e) => setMemorial({ ...memorial, message: e.target.value })}
                        placeholder="Share your eternal message (max 500 characters)"
                      />
                      <p className="mt-1 text-xs text-gray-500 text-right">
                        {memorial.message.length}/500
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Matching Bonus Display */}
              {matchingBonus > 0 && (
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-400 animate-pulse">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 text-3xl">🔥</div>
                    <div className="text-sm">
                      <p className="font-bold text-orange-900 mb-1">
                        +{matchingBonus}% MATCHING BONUS ACTIVE!
                      </p>
                      <p className="text-orange-800 mb-2">
                        {religion.name} is currently ranked #{religionStats?.rank} in the competition!
                      </p>
                      <div className="bg-white/50 rounded-lg p-2 mt-2">
                        <div className="flex justify-between text-xs text-orange-900 mb-1">
                          <span>Your Donation:</span>
                          <span className="font-semibold">${formData.customAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs text-orange-900 mb-1">
                          <span>Matching Bonus (+{matchingBonus}%):</span>
                          <span className="font-semibold">+${matchedAmount.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-orange-300 pt-1 mt-1"></div>
                        <div className="flex justify-between text-sm font-bold text-orange-900">
                          <span>Total Impact:</span>
                          <span>${totalWithMatch.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">Your donation supports real charity</p>
                    <p>100% of your contribution goes to {religion.charityName}, {religion.charityDescription.toLowerCase()}.</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Donate $${formData.customAmount}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Property Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${religion.color} text-2xl`}>
                    {religion.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{religion.name}</div>
                    <div className="text-sm text-gray-600">{religion.charityName}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600">Parcel Number</div>
                  <div className="font-semibold text-gray-900">{property.parcelNumber}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Block</div>
                    <div className="font-semibold text-gray-900">{property.block}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Lot</div>
                    <div className="font-semibold text-gray-900">{property.lot}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600">Subdivision</div>
                  <div className="font-semibold text-gray-900">{property.subdivision}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600">Size</div>
                  <div className="font-semibold text-gray-900">
                    {property.size.toLocaleString()} sq ft
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600">View</div>
                  <div className="font-semibold text-gray-900">{property.view}</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="text-sm text-gray-600 mb-2">Features Included</div>
                <div className="space-y-2">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
