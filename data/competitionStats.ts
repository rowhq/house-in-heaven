import { charityImpactData } from './charityImpact';

export interface ReligionCompetitionStats {
  religionId: string;
  totalDonations: number;
  propertiesOwned: number;
  monthlyDonations: number;
  last7DaysDonations: number;
  velocity: number; // $/day
  trend: 'surging' | 'rising' | 'steady' | 'slowing';
  rank: number;
  matchingBonus: number; // percentage
  districtsDominated: string[];
}

export interface DistrictDominance {
  districtName: string;
  dominantReligion: string | null;
  propertiesByReligion: Record<string, number>;
  isContested: boolean;
}

// Calculate velocity and trend
function calculateVelocityAndTrend(last7Days: number, previous7Days: number): { velocity: number; trend: 'surging' | 'rising' | 'steady' | 'slowing' } {
  const velocity = last7Days / 7;
  const previousVelocity = previous7Days / 7;
  const growth = ((velocity - previousVelocity) / previousVelocity) * 100;

  let trend: 'surging' | 'rising' | 'steady' | 'slowing';
  if (growth > 20) trend = 'surging';
  else if (growth > 5) trend = 'rising';
  else if (growth > -5) trend = 'steady';
  else trend = 'slowing';

  return { velocity, trend };
}

// Mock data for the last 14 days to calculate trends
const previous7DaysData: Record<string, number> = {
  christianity: 12000,
  islam: 9500,
  judaism: 7200,
  hinduism: 10800,
  buddhism: 6500,
  sikhism: 8000,
};

// Generate competition stats from charity impact data
export function getCompetitionStats(): ReligionCompetitionStats[] {
  const stats = Object.entries(charityImpactData).map(([religionId, data]) => {
    // Calculate monthly donations (roughly 1/3 of total for demo)
    const monthlyDonations = Math.floor(data.totalDonations * 0.28);

    // Calculate last 7 days (roughly 1/12 of monthly)
    const last7DaysDonations = Math.floor(monthlyDonations * 0.25);

    const { velocity, trend } = calculateVelocityAndTrend(
      last7DaysDonations,
      previous7DaysData[religionId] || 0
    );

    return {
      religionId,
      totalDonations: data.totalDonations,
      propertiesOwned: data.propertiesSold,
      monthlyDonations,
      last7DaysDonations,
      velocity,
      trend,
      rank: 0, // Will be calculated after sorting
      matchingBonus: 0, // Will be assigned based on rank
      districtsDominated: [],
    };
  });

  // Sort by total donations and assign ranks
  stats.sort((a, b) => b.totalDonations - a.totalDonations);
  stats.forEach((stat, index) => {
    stat.rank = index + 1;
    // Assign matching bonuses
    if (stat.rank === 1) stat.matchingBonus = 10;
    else if (stat.rank === 2) stat.matchingBonus = 5;
  });

  return stats;
}

// Calculate district dominance
export function getDistrictDominance(): DistrictDominance[] {
  const districts = [
    'Golden Gates District',
    'Crystal River Valley',
    'Celestial Gardens',
    'Cloud Nine Heights',
    'Pearly Plaza',
    'Seraphim Shores',
    'Divine Heights',
    'Eternal Meadows',
  ];

  // Mock property ownership by district and religion
  const districtOwnership: Record<string, Record<string, number>> = {
    'Golden Gates District': { christianity: 45, islam: 32, judaism: 28, hinduism: 35, buddhism: 25, sikhism: 30 },
    'Crystal River Valley': { christianity: 38, islam: 42, judaism: 25, hinduism: 40, buddhism: 30, sikhism: 35 },
    'Celestial Gardens': { christianity: 35, islam: 30, judaism: 22, hinduism: 48, buddhism: 35, sikhism: 28 },
    'Cloud Nine Heights': { christianity: 50, islam: 35, judaism: 30, hinduism: 38, buddhism: 28, sikhism: 32 },
    'Pearly Plaza': { christianity: 42, islam: 38, judaism: 35, hinduism: 36, buddhism: 30, sikhism: 40 },
    'Seraphim Shores': { christianity: 40, islam: 45, judaism: 28, hinduism: 35, buddhism: 32, sikhism: 38 },
    'Divine Heights': { christianity: 48, islam: 35, judaism: 32, hinduism: 38, buddhism: 28, sikhism: 35 },
    'Eternal Meadows': { christianity: 36, islam: 32, judaism: 25, hinduism: 42, buddhism: 38, sikhism: 30 },
  };

  return districts.map(districtName => {
    const propertiesByReligion = districtOwnership[districtName] || {};

    // Find dominant religion
    let dominantReligion: string | null = null;
    let maxProperties = 0;
    let secondMaxProperties = 0;

    Object.entries(propertiesByReligion).forEach(([religion, count]) => {
      if (count > maxProperties) {
        secondMaxProperties = maxProperties;
        maxProperties = count;
        dominantReligion = religion;
      } else if (count > secondMaxProperties) {
        secondMaxProperties = count;
      }
    });

    // Contested if difference between 1st and 2nd is less than 10%
    const isContested = dominantReligion
      ? (maxProperties - secondMaxProperties) / maxProperties < 0.15
      : false;

    return {
      districtName,
      dominantReligion,
      propertiesByReligion,
      isContested,
    };
  });
}

// Update competition stats with district dominance
export function getEnhancedCompetitionStats(): ReligionCompetitionStats[] {
  const stats = getCompetitionStats();
  const districts = getDistrictDominance();

  stats.forEach(stat => {
    stat.districtsDominated = districts
      .filter(d => d.dominantReligion === stat.religionId)
      .map(d => d.districtName);
  });

  return stats;
}

// Get trend icon
export function getTrendIcon(trend: string): string {
  switch (trend) {
    case 'surging': return '🚀';
    case 'rising': return '📈';
    case 'steady': return '➡️';
    case 'slowing': return '📉';
    default: return '➡️';
  }
}

// Get rank medal
export function getRankMedal(rank: number): string {
  switch (rank) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return `#${rank}`;
  }
}

// Calculate days until month end
export function getDaysUntilMonthEnd(): number {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const diff = lastDay.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Format large numbers
export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount}`;
}
