'use client';

import CompetitionWidget from './CompetitionWidget';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CompetitionWidget />
    </>
  );
}
