export interface Religion {
  id: string;
  name: string;
  description: string;
  charityName: string;
  charityDescription: string;
  icon: string;
  color: string;
}

export interface Property {
  id: string;
  parcelNumber: string;
  block: string;
  lot: string;
  subdivision: string;
  size: number;
  price: number;
  status: 'available' | 'sold' | 'reserved';
  coordinates: {
    x: number;
    y: number;
  };
  features: string[];
  view?: string;
  // Metaverse properties
  address?: string;
  lotType?: string;
  dimensions?: {
    width: number;
    height: number;
  };
  locationTypes?: string[];
  nearestLandmark?: string;
}

export interface Memorial {
  dedicationType: 'in_memory_of' | 'in_honor_of' | 'dedicated_to';
  dedicateeName: string;
  dates?: string;
  message: string;
  photoUrl?: string;
}

export interface Purchase {
  propertyId: string;
  religionId: string;
  donationAmount: number;
  buyerName: string;
  timestamp: Date;
  memorial?: Memorial;
}
