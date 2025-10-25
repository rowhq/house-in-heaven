export interface CharityImpact {
  charityName: string;
  totalDonations: number;
  propertiesSold: number;
  impactMetrics: {
    metric: string;
    value: number;
    unit: string;
    icon: string;
  }[];
  projects: {
    name: string;
    location: string;
    progress: number;
    goal: number;
    description: string;
    image?: string;
  }[];
  recentStories: {
    title: string;
    description: string;
    date: string;
    location: string;
  }[];
}

export const charityImpactData: Record<string, CharityImpact> = {
  christianity: {
    charityName: 'World Vision',
    totalDonations: 128450,
    propertiesSold: 342,
    impactMetrics: [
      { metric: 'Children Sponsored', value: 856, unit: 'children', icon: '👶' },
      { metric: 'Clean Water Wells', value: 23, unit: 'wells', icon: '💧' },
      { metric: 'Families Helped', value: 1240, unit: 'families', icon: '👨‍👩‍👧‍👦' },
      { metric: 'School Supplies Provided', value: 3450, unit: 'kits', icon: '📚' },
    ],
    projects: [
      {
        name: 'Uganda Clean Water Initiative',
        location: 'Uganda, East Africa',
        progress: 87500,
        goal: 120000,
        description: 'Building wells to provide clean water access to 50 villages',
      },
      {
        name: 'Education for All - Kenya',
        location: 'Kenya',
        progress: 23000,
        goal: 50000,
        description: 'Providing school supplies and teacher training',
      },
    ],
    recentStories: [
      {
        title: 'New Water Well Completed in Rural Uganda',
        description: '500 families now have access to clean drinking water thanks to community donations',
        date: '2025-10-15',
        location: 'Kampala Region, Uganda',
      },
      {
        title: '200 Children Receive School Supplies',
        description: 'Local school receives books, pencils, and learning materials',
        date: '2025-10-10',
        location: 'Nairobi, Kenya',
      },
    ],
  },
  islam: {
    charityName: 'Islamic Relief',
    totalDonations: 95230,
    propertiesSold: 287,
    impactMetrics: [
      { metric: 'Orphans Supported', value: 624, unit: 'children', icon: '👶' },
      { metric: 'Emergency Relief Packages', value: 1840, unit: 'packages', icon: '📦' },
      { metric: 'Medical Clinics Funded', value: 12, unit: 'clinics', icon: '🏥' },
      { metric: 'Food Aid Distributed', value: 45200, unit: 'meals', icon: '🍲' },
    ],
    projects: [
      {
        name: 'Syria Emergency Relief',
        location: 'Syria',
        progress: 62000,
        goal: 100000,
        description: 'Providing emergency food, shelter, and medical aid',
      },
      {
        name: 'Yemen Water Crisis Response',
        location: 'Yemen',
        progress: 18500,
        goal: 35000,
        description: 'Delivering clean water and sanitation facilities',
      },
    ],
    recentStories: [
      {
        title: '1,000 Families Receive Emergency Food Aid',
        description: 'Critical food packages delivered to families affected by conflict',
        date: '2025-10-18',
        location: 'Aleppo, Syria',
      },
      {
        title: 'Mobile Medical Clinic Reaches Remote Villages',
        description: 'Healthcare services provided to 500+ people in underserved areas',
        date: '2025-10-12',
        location: 'Rural Yemen',
      },
    ],
  },
  judaism: {
    charityName: 'JDC (Joint Distribution Committee)',
    totalDonations: 76890,
    propertiesSold: 219,
    impactMetrics: [
      { metric: 'Elderly Assisted', value: 892, unit: 'seniors', icon: '👴' },
      { metric: 'Refugee Families Supported', value: 456, unit: 'families', icon: '🏠' },
      { metric: 'Community Centers', value: 8, unit: 'centers', icon: '🏢' },
      { metric: 'Youth Programs', value: 34, unit: 'programs', icon: '🎓' },
    ],
    projects: [
      {
        name: 'Ukraine Relief Effort',
        location: 'Ukraine',
        progress: 45000,
        goal: 75000,
        description: 'Supporting Jewish communities affected by conflict',
      },
      {
        name: 'Elderly Care Program - Buenos Aires',
        location: 'Argentina',
        progress: 12400,
        goal: 20000,
        description: 'Home care and meals for elderly community members',
      },
    ],
    recentStories: [
      {
        title: 'Community Center Opens in Kyiv',
        description: 'New facility provides resources and support for local Jewish community',
        date: '2025-10-14',
        location: 'Kyiv, Ukraine',
      },
      {
        title: 'Passover Food Packages Distributed',
        description: '800 families received traditional holiday meals',
        date: '2025-09-28',
        location: 'Buenos Aires, Argentina',
      },
    ],
  },
  hinduism: {
    charityName: 'Akshaya Patra Foundation',
    totalDonations: 112340,
    propertiesSold: 298,
    impactMetrics: [
      { metric: 'Daily Meals Served', value: 45890, unit: 'meals', icon: '🍛' },
      { metric: 'School Children Fed', value: 12400, unit: 'children', icon: '🎒' },
      { metric: 'Kitchen Centers', value: 18, unit: 'kitchens', icon: '🏭' },
      { metric: 'States Covered', value: 14, unit: 'states', icon: '🗺️' },
    ],
    projects: [
      {
        name: 'Mid-Day Meal Program Expansion',
        location: 'Karnataka, India',
        progress: 78000,
        goal: 100000,
        description: 'Expanding kitchen capacity to feed 5,000 more children daily',
      },
      {
        name: 'Nutrition Enhancement Project',
        location: 'Uttar Pradesh, India',
        progress: 25600,
        goal: 45000,
        description: 'Improving meal nutritional value and variety',
      },
    ],
    recentStories: [
      {
        title: '10 Millionth Meal Served in Bangalore',
        description: 'Major milestone reached in fight against childhood hunger',
        date: '2025-10-16',
        location: 'Bangalore, India',
      },
      {
        title: 'New Kitchen Opens to Serve 3,000 Daily',
        description: 'State-of-the-art facility begins operations',
        date: '2025-10-08',
        location: 'Lucknow, India',
      },
    ],
  },
  buddhism: {
    charityName: 'Buddhist Global Relief',
    totalDonations: 68920,
    propertiesSold: 203,
    impactMetrics: [
      { metric: 'People Fed Annually', value: 34500, unit: 'people', icon: '🍚' },
      { metric: 'Sustainable Farms', value: 89, unit: 'farms', icon: '🌾' },
      { metric: 'Women Empowered', value: 1240, unit: 'women', icon: '👩' },
      { metric: 'Countries Served', value: 18, unit: 'countries', icon: '🌏' },
    ],
    projects: [
      {
        name: 'Sri Lanka Sustainable Agriculture',
        location: 'Sri Lanka',
        progress: 32000,
        goal: 50000,
        description: 'Training farmers in sustainable practices and providing resources',
      },
      {
        name: 'Hunger Relief - Cambodia',
        location: 'Cambodia',
        progress: 18900,
        goal: 30000,
        description: 'Food distribution and nutrition education programs',
      },
    ],
    recentStories: [
      {
        title: '50 Women Complete Agricultural Training',
        description: 'Graduates receive tools and seeds to start sustainable farms',
        date: '2025-10-11',
        location: 'Colombo, Sri Lanka',
      },
      {
        title: 'Community Garden Feeds 200 Families',
        description: 'Collective farming project produces abundant harvest',
        date: '2025-10-05',
        location: 'Phnom Penh, Cambodia',
      },
    ],
  },
  sikhism: {
    charityName: 'Khalsa Aid',
    totalDonations: 84560,
    propertiesSold: 234,
    impactMetrics: [
      { metric: 'Disaster Relief Operations', value: 47, unit: 'operations', icon: '🚨' },
      { metric: 'People Assisted', value: 156000, unit: 'people', icon: '🤝' },
      { metric: 'Emergency Shelters', value: 234, unit: 'shelters', icon: '⛺' },
      { metric: 'Countries Responded', value: 23, unit: 'countries', icon: '🌍' },
    ],
    projects: [
      {
        name: 'Turkey Earthquake Relief',
        location: 'Turkey',
        progress: 56000,
        goal: 80000,
        description: 'Emergency aid and reconstruction support',
      },
      {
        name: 'Pakistan Flood Recovery',
        location: 'Pakistan',
        progress: 23400,
        goal: 40000,
        description: 'Rebuilding homes and providing essential supplies',
      },
    ],
    recentStories: [
      {
        title: 'Emergency Response Team Deployed to Disaster Zone',
        description: 'Khalsa Aid volunteers provide immediate relief to affected families',
        date: '2025-10-17',
        location: 'Ankara, Turkey',
      },
      {
        title: '100 Homes Rebuilt for Flood Victims',
        description: 'Families return to new, safe housing',
        date: '2025-10-09',
        location: 'Punjab, Pakistan',
      },
    ],
  },
};

// Global statistics across all charities
export const globalImpact = {
  totalDonations: Object.values(charityImpactData).reduce((sum, charity) => sum + charity.totalDonations, 0),
  totalProperties: Object.values(charityImpactData).reduce((sum, charity) => sum + charity.propertiesSold, 0),
  charitiesSupported: Object.keys(charityImpactData).length,
  countriesReached: 45,
};
