import { Property } from '@/types';

// Street names for the heavenly city
const streetNames = {
  northSouth: ['Golden Avenue', 'Angel Boulevard', 'Seraphim Street', 'Divine Drive', 'Celestial Way', 'Eternal Path'],
  eastWest: ['Paradise Lane', 'Heaven Road', 'Cloud Street', 'Pearly Boulevard', 'Grace Avenue', 'Blessed Way'],
};

// Districts with themes
export const cityDistricts = [
  { id: 'golden-gates', name: 'Golden Gates District', color: '#fbbf24', x: 0, y: 0, premium: true },
  { id: 'crystal-river', name: 'Crystal River Valley', color: '#60a5fa', x: 800, y: 0, premium: false },
  { id: 'celestial-gardens', name: 'Celestial Gardens', color: '#34d399', x: 1600, y: 0, premium: false },
  { id: 'cloud-nine', name: 'Cloud Nine Heights', color: '#f0abfc', x: 0, y: 800, premium: true },
  { id: 'pearly-plaza', name: 'Pearly Plaza', color: '#f87171', x: 800, y: 800, premium: true },
  { id: 'seraphim-shores', name: 'Seraphim Shores', color: '#818cf8', x: 1600, y: 800, premium: false },
  { id: 'divine-heights', name: 'Divine Heights', color: '#fcd34d', x: 0, y: 1600, premium: true },
  { id: 'eternal-meadows', name: 'Eternal Meadows', color: '#86efac', x: 800, y: 1600, premium: false },
];

// Landmarks
export const landmarks = [
  { id: 'golden-gates', name: 'Golden Gates Plaza', x: 350, y: 350, icon: '🌟', size: 150 },
  { id: 'crystal-fountain', name: 'Crystal Fountain Park', x: 1150, y: 300, icon: '⛲', size: 120 },
  { id: 'celestial-park', name: 'Celestial Gardens Park', x: 1900, y: 400, icon: '🌺', size: 140 },
  { id: 'cloud-pavilion', name: 'Cloud Pavilion', x: 300, y: 1150, icon: '☁️', size: 100 },
  { id: 'pearly-square', name: 'Pearly Square', x: 1000, y: 1100, icon: '💎', size: 130 },
  { id: 'seraphim-beach', name: 'Seraphim Beach', x: 1850, y: 1200, icon: '🌊', size: 180 },
  { id: 'divine-temple', name: 'Divine Temple', x: 400, y: 1900, icon: '⛪', size: 110 },
  { id: 'eternal-lake', name: 'Eternal Lake', x: 1200, y: 1850, icon: '🏞️', size: 200 },
];

// Lot size configurations
const lotSizes = [
  { type: 'studio', width: 30, height: 30, basePrice: 200, label: 'Studio' },
  { type: 'standard', width: 40, height: 40, basePrice: 400, label: 'Standard' },
  { type: 'premium', width: 50, height: 50, basePrice: 700, label: 'Premium' },
  { type: 'estate', width: 60, height: 60, basePrice: 1000, label: 'Estate' },
  { type: 'mansion', width: 80, height: 60, basePrice: 1500, label: 'Mansion' },
];

// Location type modifiers
const locationModifiers = {
  corner: 1.3,
  mainStreet: 1.25,
  parkAdjacent: 1.4,
  waterfront: 1.5,
  standard: 1.0,
};

function getDistanceToLandmark(x: number, y: number, landmark: typeof landmarks[0]) {
  return Math.sqrt(Math.pow(x - landmark.x, 2) + Math.pow(y - landmark.y, 2));
}

function getNearestLandmark(x: number, y: number) {
  let nearest = landmarks[0];
  let minDist = getDistanceToLandmark(x, y, nearest);

  for (const landmark of landmarks) {
    const dist = getDistanceToLandmark(x, y, landmark);
    if (dist < minDist) {
      minDist = dist;
      nearest = landmark;
    }
  }

  return { landmark: nearest, distance: minDist };
}

function getLocationTypes(x: number, y: number, width: number, height: number, blockX: number, blockY: number): string[] {
  const types: string[] = [];

  // Check if corner lot (first or last in block)
  if (blockX === 0 || blockY === 0) {
    types.push('corner');
  }

  // Check if main street (on major avenue)
  if (x % 400 < 100 || y % 400 < 100) {
    types.push('mainStreet');
  }

  // Check proximity to landmarks
  const { landmark, distance } = getNearestLandmark(x + width / 2, y + height / 2);
  if (distance < 200) {
    types.push('parkAdjacent');
  }

  // Check if near "water" (certain y coordinates)
  if (Math.abs(y - 1200) < 150 || Math.abs(y - 600) < 100) {
    types.push('waterfront');
  }

  return types.length > 0 ? types : ['standard'];
}

function calculatePrice(basePrice: number, locationTypes: string[], districtPremium: boolean): number {
  let price = basePrice;

  // Apply location modifiers (use highest if multiple)
  let maxModifier = 1.0;
  for (const type of locationTypes) {
    const modifier = locationModifiers[type as keyof typeof locationModifiers] || 1.0;
    if (modifier > maxModifier) maxModifier = modifier;
  }
  price *= maxModifier;

  // District premium
  if (districtPremium) {
    price *= 1.2;
  }

  return Math.round(price);
}

export function generateCity(): Property[] {
  const properties: Property[] = [];
  let propertyId = 1;

  // Generate lots for each district
  for (const district of cityDistricts) {
    const districtStartX = district.x;
    const districtStartY = district.y;
    const districtSize = 700; // 700px district size

    // Create blocks within district
    const blockSize = 200;
    const blocksPerRow = Math.floor(districtSize / blockSize);

    for (let blockRow = 0; blockRow < blocksPerRow; blockRow++) {
      for (let blockCol = 0; blockCol < blocksPerRow; blockCol++) {
        const blockX = districtStartX + blockCol * blockSize;
        const blockY = districtStartY + blockRow * blockSize;

        // Skip if block contains a landmark
        const hasLandmark = landmarks.some(l =>
          l.x >= blockX && l.x < blockX + blockSize &&
          l.y >= blockY && l.y < blockY + blockSize
        );
        if (hasLandmark) continue;

        // Determine street for this block
        const nsStreet = streetNames.northSouth[blockCol % streetNames.northSouth.length];
        const ewStreet = streetNames.eastWest[blockRow % streetNames.eastWest.length];

        // Fill block with lots of varying sizes
        let currentX = blockX + 10; // street margin
        let currentY = blockY + 10;
        let lotsInBlock = 0;

        while (currentY < blockY + blockSize - 20 && lotsInBlock < 12) {
          currentX = blockX + 10;

          while (currentX < blockX + blockSize - 20 && lotsInBlock < 12) {
            // Random lot size (favor smaller lots)
            const sizeRoll = Math.random();
            let lotSize;
            if (sizeRoll < 0.4) lotSize = lotSizes[0]; // 40% studio
            else if (sizeRoll < 0.7) lotSize = lotSizes[1]; // 30% standard
            else if (sizeRoll < 0.85) lotSize = lotSizes[2]; // 15% premium
            else if (sizeRoll < 0.95) lotSize = lotSizes[3]; // 10% estate
            else lotSize = lotSizes[4]; // 5% mansion

            // Check if lot fits
            if (currentX + lotSize.width > blockX + blockSize - 20) break;

            // Determine location types
            const locationTypes = getLocationTypes(
              currentX,
              currentY,
              lotSize.width,
              lotSize.height,
              lotsInBlock % 4,
              Math.floor(lotsInBlock / 4)
            );

            // Calculate price
            const price = calculatePrice(lotSize.basePrice, locationTypes, district.premium);

            // Random status
            const statusRoll = Math.random();
            const status = statusRoll < 0.7 ? 'available' : statusRoll < 0.85 ? 'reserved' : 'sold';

            // Street address
            const streetNumber = 100 + lotsInBlock * 10 + blockRow * 100;
            const address = `${streetNumber} ${Math.random() > 0.5 ? nsStreet : ewStreet}`;

            // Nearest landmark
            const { landmark } = getNearestLandmark(currentX + lotSize.width / 2, currentY + lotSize.height / 2);

            // Create property
            properties.push({
              id: `PROP-${String(propertyId).padStart(4, '0')}`,
              parcelNumber: `${district.id.substring(0, 2).toUpperCase()}${blockRow}${blockCol}-${String(lotsInBlock + 1).padStart(2, '0')}`,
              block: `${district.name.split(' ')[0]} Block ${blockRow + 1}${String.fromCharCode(65 + blockCol)}`,
              lot: String(lotsInBlock + 1),
              subdivision: district.name,
              size: lotSize.width * lotSize.height,
              price,
              status,
              coordinates: {
                x: currentX,
                y: currentY,
              },
              features: [
                lotSize.label,
                ...locationTypes.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
                `Near ${landmark.name}`,
              ],
              view: `View of ${landmark.name}`,
              // Extended properties for metaverse
              address,
              lotType: lotSize.type,
              dimensions: { width: lotSize.width, height: lotSize.height },
              locationTypes,
              nearestLandmark: landmark.name,
            } as any);

            currentX += lotSize.width + 5; // 5px gap
            lotsInBlock++;
          }

          currentY += 45; // Move to next row
        }

        propertyId++;
      }
    }
  }

  return properties;
}
