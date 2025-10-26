'use client';

import { religions } from '@/data/religions';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-8">
              <Link
                href="/competition"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <span>🏆</span>
                Competition
              </Link>
              <Link
                href="/impact"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <span>💫</span>
                Our Impact
              </Link>
              <a
                href="#religions"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Browse Properties
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-6xl font-semibold tracking-tight text-gray-900 sm:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your estate in eternity
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Own a piece of paradise. Select your faith, support a meaningful cause,
              and secure your heavenly property today.
            </p>
          </div>
        </div>
      </div>

      {/* Religion Selection Section */}
      <div id="religions" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
            Choose your faith
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Your donation supports real charities making a difference in the world
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {religions.map((religion) => (
            <Link
              key={religion.id}
              href={`/properties?religion=${religion.id}`}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-xl hover:ring-gray-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${religion.color} text-4xl shadow-lg`}>
                  {religion.icon}
                </div>

                <h3 className="text-2xl font-semibold text-gray-900">
                  {religion.name}
                </h3>

                <p className="mt-3 text-sm text-gray-600">
                  {religion.description}
                </p>

                <div className="mt-6 w-full border-t border-gray-100 pt-6">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Supporting
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {religion.charityName}
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    {religion.charityDescription}
                  </p>
                </div>

                <div className="mt-6 flex items-center text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  Browse properties
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              How it works
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg">
                  1
                </div>
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  Select your faith
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Choose the religion that resonates with your beliefs
                  </p>
                </dd>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg">
                  2
                </div>
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  Browse properties
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Explore our heavenly real estate map and find your perfect plot
                  </p>
                </dd>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg">
                  3
                </div>
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  Donate & claim
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Make a donation to a real charity and secure your eternal property
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
