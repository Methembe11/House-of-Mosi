export const seasons = [
  {
    id: 'dry-winter',
    name: 'Dry Winter',
    months: ['May', 'June', 'July', 'August'],
    description: 'Cool, dry days with clear skies. Peak wildlife viewing season.',
    icon: 'snowflake',
    color: '#E8F5E9',
    temperature: '10-25°C',
    highlights: [
      'Excellent game viewing',
      'Clear views of the Falls',
      'Lower malaria risk',
      'Ideal for photography'
    ]
  },
  {
    id: 'hot-dry',
    name: 'Hot Dry',
    months: ['September', 'October'],
    description: 'Very hot and dry. Best time for white water rafting.',
    icon: 'sun',
    color: '#FFF3E0',
    temperature: '20-40°C',
    highlights: [
      'White water rafting peak season',
      "Devil's Pool accessible",
      'Great fishing',
      'Spectacular sunsets'
    ]
  },
  {
    id: 'wet-summer',
    name: 'Wet Summer',
    months: ['November', 'December', 'January', 'February', 'March', 'April'],
    description: 'Lush green landscape with dramatic thunderstorms.',
    icon: 'rain',
    color: '#E3F2FD',
    temperature: '15-30°C',
    highlights: [
      'Falls at maximum flow',
      'Bird watching paradise',
      'Lush vegetation',
      'Lower rates'
    ]
  }
];

export const tracks = [
  {
    id: 'adventure',
    name: 'Adventure Seeker',
    description: 'Heart-pounding activities and adrenaline rushes',
    icon: 'lightning',
    color: '#FF6B6B',
    activities: [
      'White Water Rafting (Grade 5 rapids)',
      'Bungee Jumping (111m drop)',
      'Zip Line over the Falls',
      'Microlight Flight',
      'Jet Boating',
      'Gorge Swing'
    ]
  },
  {
    id: 'wildlife',
    name: 'Wildlife Enthusiast',
    description: 'Safaris, game drives, and nature encounters',
    icon: 'elephant',
    color: '#8BC34A',
    activities: [
      'Chobe National Park Day Trip',
      'Zambezi River Safari',
      'Elephant Sanctuary Visit',
      'Bird Watching Tours',
      'Night Game Drives',
      'Walking Safaris'
    ]
  },
  {
    id: 'culture',
    name: 'Culture Lover',
    description: 'Local traditions, history, and authentic experiences',
    icon: 'masks',
    color: '#FFD700',
    activities: [
      'Village Tour & Homestay',
      'Traditional Dance Performances',
      'Local Market Visits',
      'Cooking Classes with Local Chefs',
      'Historical Town Tours',
      'Art & Craft Workshops'
    ]
  },
  {
    id: 'relaxation',
    name: 'Relaxation & Wellness',
    description: 'Peaceful retreats and rejuvenating experiences',
    icon: 'yoga',
    color: '#4ECDC4',
    activities: [
      'Spa Treatments with Falls View',
      'Yoga at Sunrise',
      'Sunset Cruises',
      'Poolside Lounging',
      'Meditation Sessions',
      'Fine Dining Experiences'
    ]
  },
  {
    id: 'photography',
    name: 'Photography Expedition',
    description: "Capture the perfect shot of Victoria Falls' natural wonders",
    icon: 'camera',
    color: '#9B59B6',
    activities: [
      'Sunrise Photography Tours',
      'Moonbow Night Photography',
      'Wildlife Photo Safaris',
      'Aerial Photography Flights',
      'Underwater Zambezi Shots',
      'Long Exposure Waterfall Techniques'
    ]
  }
];

export const seasonalBonuses = {
  'dry-winter': {
    wildlife: 1.2, // 20% bonus for wildlife in dry winter
    photography: 1.15,
    relaxation: 1.1
  },
  'hot-dry': {
    adventure: 1.25,
    photography: 1.2
  },
  'wet-summer': {
    wildlife: 1.3, // Lush vegetation, baby animals
    photography: 1.25, // Dramatic skies, full falls
    culture: 1.2 // Indoor cultural activities
  }
};