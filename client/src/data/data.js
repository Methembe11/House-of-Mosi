export const accommodations = [
  {
    id: 'acc-1',
    name: 'The Victoria Falls Hotel',
    slug: 'the-victoria-falls-hotel',
    tagline: 'Where Edwardian grandeur meets the Zambezi wilderness',
    description: 'Built in 1904, The Victoria Falls Hotel is an iconic Edwardian-style hotel steeped in over a century of history. Set within lush subtropical gardens, this legendary property offers views of the Victoria Falls Bridge and the spray of Mosi-oa-Tunya rising above the gorge.',
    longDescription: 'Step into a world of refined colonial elegance at The Victoria Falls Hotel, one of Zimbabwe\'s most storied properties. Originally built to accommodate workers on the Cape-to-Cairo railway, this grand dame of Zimbabwean hospitality has evolved into a luxurious retreat that honors its heritage while embracing contemporary comforts.\n\nThe hotel\'s Edwardian architecture is complemented by manicured gardens that stretch toward the Batoka Gorge. Each morning, guests are greeted by the distant rumble of Victoria Falls, a reminder of the extraordinary natural wonder just moments away.\n\nThe Stanley\'s Terrace, named after Henry Morton Stanley, offers what many consider the finest sundowner spot on the Zambezi — cocktails served against the backdrop of the bridge and the mist of the falls.',
    category: 'Heritage Hotel',
    location: 'Victoria Falls, Zimbabwe',
    address: '1 Mallet Avenue, Victoria Falls, Zimbabwe',
    coordinates: { lat: -17.9327, lng: 25.8293 },
    rating: 9.1,
    reviewCount: 251,
    priceRange: '$$$$',
    priceFrom: 577,
    currency: 'USD',
    images: [
      'https://www.victoriafallshotel.com/data/files/1.jpg',
      'https://www.victoriafallshotel.com/data/files/2-1.jpg',
      'https://www.victoriafallshotel.com/Data/Media/356/The-Livingstone-Room__zoom.jpg'
    ],
    amenities: [
      { icon: 'pool', name: 'Swimming Pool' },
      { icon: 'dining', name: 'Fine Dining' },
      { icon: 'cocktail', name: 'Sundowner Bar' },
      { icon: 'garden', name: 'Gardens' },
      { icon: 'shuttle', name: 'Airport Shuttle' },
      { icon: 'wifi', name: 'Free WiFi' },
      { icon: 'spa', name: 'Spa Services' },
      { icon: 'tennis', name: 'Tennis Courts' },
      { icon: 'coffee', name: 'Afternoon Tea' }
    ],
    rooms: [
      { id: 'r1-1', name: 'Classic Room', description: 'Elegant rooms with period furnishings, garden views.', capacity: 2, size: '35m²', bedType: 'Queen', priceFrom: 598, amenities: ['Air Conditioning', 'Mini Bar', 'Safe', 'WiFi', 'Room Service'] },
      { id: 'r1-2', name: 'Superior Room', description: 'Spacious rooms with refined décor, bridge or garden views.', capacity: 2, size: '45m²', bedType: 'King', priceFrom: 750, amenities: ['Air Conditioning', 'Mini Bar', 'Safe', 'WiFi', 'Room Service', 'Bathrobe', 'Balcony'] },
      { id: 'r1-3', name: 'Deluxe Suite', description: 'Expansive suites with separate living area and gorge views.', capacity: 3, size: '70m²', bedType: 'King', priceFrom: 1100, amenities: ['Air Conditioning', 'Mini Bar', 'Safe', 'WiFi', 'Room Service', 'Bathrobe', 'Balcony', 'Butler Service'] }
    ],
    nearbyExperiences: ['exp-1', 'exp-2', 'exp-3', 'exp-6'],
    nearbyDining: ['rest-1', 'rest-3'],
    highlights: [
      'Historic 1904 Edwardian architecture',
      'Iconic Stanley\'s Terrace sundowner experience',
      'Walking distance to Victoria Falls Bridge',
      'Subtropical gardens with wildlife',
      'Heritage-listed property'
    ],
    featured: true
  },
  {
    id: 'acc-2',
    name: 'Victoria Falls Safari Lodge',
    slug: 'victoria-falls-safari-lodge',
    tagline: 'Where luxury meets the Zambezi bush',
    description: 'Perched on a ridge overlooking an expansive waterhole frequented by elephant, buffalo, and a host of other wildlife, Victoria Falls Safari Lodge offers an authentic safari experience just minutes from the town center.',
    longDescription: 'Victoria Falls Safari Lodge is a four-star property that masterfully combines safari lodge authenticity with international hospitality standards. The lodge sits on 500 acres of protected wilderness, part of a private wildlife corridor that brings the Zambezi bush to your doorstep.\n\nThe waterhole below the lodge is a natural gathering point for elephants, buffalo, eland, and waterbuck — visible from the main deck, restaurant, and most guest rooms. As the sun sets over the floodplain, the golden light transforms the waterhole into a theater of nature.',
    category: 'Safari Lodge',
    location: 'Victoria Falls, Zimbabwe',
    address: 'Victoria Falls Safari Lodge, Victoria Falls, Zimbabwe',
    coordinates: { lat: -17.8820, lng: 25.8010 },
    rating: 9.0,
    reviewCount: 432,
    priceRange: '$$$$',
    priceFrom: 418,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80',
      'https://images.unsplash.com/photo-1535941339090-85119bb5b1b2?w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'
    ],
    amenities: [
      { icon: 'wildlife', name: 'Wildlife Viewing' },
      { icon: 'pool', name: 'Swimming Pool' },
      { icon: 'dining', name: 'Buffet Restaurant' },
      { icon: 'cocktail', name: 'Pool Bar' },
      { icon: 'shuttle', name: 'Airport Shuttle' },
      { icon: 'wifi', name: 'Free WiFi' },
      { icon: 'fitness', name: 'Fitness Center' }
    ],
    rooms: [
      { id: 'r2-1', name: 'Standard Room', description: 'Comfortable rooms with bush or waterhole views.', capacity: 2, size: '32m²', bedType: 'King', priceFrom: 544, amenities: ['Air Conditioning', 'Mini Bar', 'Safe', 'WiFi', 'Balcony'] },
      { id: 'r2-2', name: 'Club Room', description: 'Premium rooms with lounge access and panoramic waterhole views.', capacity: 2, size: '40m²', bedType: 'King', priceFrom: 683, amenities: ['Air Conditioning', 'Mini Bar', 'Safe', 'WiFi', 'Balcony', 'Lounge Access'] },
      { id: 'r2-3', name: 'Presidential Suite', description: 'The ultimate safari luxury with private deck overlooking the waterhole.', capacity: 4, size: '95m²', bedType: 'King', priceFrom: 1200, amenities: ['Air Conditioning', 'Mini Bar', 'Safe', 'WiFi', 'Private Deck', 'Butler Service', 'Jacuzzi'] }
    ],
    nearbyExperiences: ['exp-3', 'exp-8', 'exp-10'],
    nearbyDining: ['rest-1'],
    highlights: [
      'Waterhole with daily wildlife visitors',
      '500-acre private wildlife corridor',
      'Award-winning safari dining',
      'Sunset deck with floodplain views',
      'Walking distance to Zambezi National Park'
    ],
    featured: true
  },
  {
    id: 'acc-3',
    name: 'Anantara Stanley & Livingstone',
    slug: 'anantara-stanley-livingstone',
    tagline: 'Where timeless elegance meets Zambezi wilderness',
    description: 'A luxurious retreat set on the banks of the Zambezi River, just 7km from Victoria Falls. The Anantara offers an intimate experience with just 16 rooms, each with private plunge pool and river views.',
    longDescription: 'The Anantara Stanley & Livingstone is the most exclusive hotel in the Victoria Falls region. With just 16 luxury suites set within a private game reserve, it offers an intimacy and exclusivity that larger properties cannot match.\n\nEach suite features a private plunge pool, outdoor shower, and views over the Zambezi River floodplain. The reserve is home to white rhino, elephant, and a variety of antelope — game drives are included in the rate.',
    category: 'Boutique Hotel',
    location: 'Victoria Falls, Zimbabwe',
    address: 'Victoria Falls Safari Lodge Road, Victoria Falls, Zimbabwe',
    coordinates: { lat: -17.8750, lng: 25.8050 },
    rating: 9.2,
    reviewCount: 24,
    priceRange: '$$$$',
    priceFrom: 400,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80'
    ],
    amenities: [
      { icon: 'pool', name: 'Private Plunge Pool' },
      { icon: 'wildlife', name: 'Game Reserve' },
      { icon: 'dining', name: 'Fine Dining' },
      { icon: 'spa', name: 'Spa' },
      { icon: 'helicopter', name: 'Helipad' },
      { icon: 'shuttle', name: 'Private Transfers' }
    ],
    rooms: [
      { id: 'r3-1', name: 'Honeymoon Suite', description: 'Romantic suite with private plunge pool and river views.', capacity: 2, size: '65m²', bedType: 'King', priceFrom: 823, amenities: ['Private Plunge Pool', 'Outdoor Shower', 'River View', 'Butler Service'] },
      { id: 'r3-2', name: 'Victoria Falls Suite', description: 'The signature suite with panoramic views of the Zambezi floodplain.', capacity: 2, size: '85m²', bedType: 'King', priceFrom: 1100, amenities: ['Private Plunge Pool', 'Outdoor Shower', 'Floodplain View', 'Private Deck', 'Butler Service'] }
    ],
    nearbyExperiences: ['exp-1', 'exp-3', 'exp-11'],
    nearbyDining: ['rest-2'],
    highlights: [
      'Only 16 suites for ultimate exclusivity',
      'Private game reserve with white rhino',
      'Plunge pool in every suite',
      'Complimentary game drives',
      'Zambezi River floodplain views'
    ],
    featured: true
  },
  {
    id: 'acc-4',
    name: 'Savanna68 Hotel',
    slug: 'savanna68-hotel',
    tagline: 'Modern luxury in the heart of Victoria Falls',
    description: 'A contemporary boutique hotel located just 1.9 miles from Victoria Falls, offering modern amenities, a rooftop restaurant, and stunning views of the surrounding bush.',
    longDescription: 'Savanna68 Hotel brings a fresh, contemporary perspective to Victoria Falls accommodation. This modern boutique property combines sleek design with warm Zimbabwean hospitality, creating a space that feels both sophisticated and welcoming.\n\nThe hotel\'s rooftop restaurant offers panoramic views of the Victoria Falls canopy, while the ground-floor pool area provides a tranquil retreat after a day of exploration.',
    category: 'Boutique Hotel',
    location: 'Victoria Falls, Zimbabwe',
    address: '68 Park Way, Victoria Falls, Zimbabwe',
    coordinates: { lat: -17.9210, lng: 25.8350 },
    rating: 9.3,
    reviewCount: 268,
    priceRange: '$$',
    priceFrom: 182,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
    ],
    amenities: [
      { icon: 'pool', name: 'Rooftop Pool' },
      { icon: 'dining', name: 'Rooftop Restaurant' },
      { icon: 'fitness', name: 'Fitness Center' },
      { icon: 'wifi', name: 'Free WiFi' },
      { icon: 'parking', name: 'Free Parking' },
      { icon: 'garden', name: 'Garden' }
    ],
    rooms: [
      { id: 'r4-1', name: 'Standard Room', description: 'Modern, comfortable rooms with garden views.', capacity: 2, size: '28m²', bedType: 'Queen', priceFrom: 171, amenities: ['Air Conditioning', 'WiFi', 'Safe', 'Mini Bar'] },
      { id: 'r4-2', name: 'Deluxe Room', description: 'Spacious rooms with bush views and balcony.', capacity: 2, size: '35m²', bedType: 'King', priceFrom: 226, amenities: ['Air Conditioning', 'WiFi', 'Safe', 'Mini Bar', 'Balcony'] }
    ],
    nearbyExperiences: ['exp-1', 'exp-2', 'exp-6'],
    nearbyDining: ['rest-3', 'rest-4'],
    highlights: [
      'Rooftop restaurant with panoramic views',
      'Modern boutique design',
      'Walking distance to town center',
      'Excellent value for quality',
      'Free airport transfers'
    ],
    featured: false
  },
  {
    id: 'acc-5',
    name: 'Elephant Hills Resort',
    slug: 'elephant-hills-resort',
    tagline: 'Golf, wildlife, and the Victoria Falls experience',
    description: 'A large resort complex featuring an 18-hole golf course, multiple pools, and views of the Zambezi River. Located just 4km from Victoria Falls, it offers a full-service resort experience.',
    longDescription: 'Elephant Hills Resort is one of Victoria Falls\' most established properties, offering a comprehensive resort experience that appeals to families, golfers, and those seeking a full-service base for their Victoria Falls adventure.\n\nThe resort features an 18-hole championship golf course where warthog and impala regularly cross the fairways, multiple swimming pools, tennis courts, and a spa. The main restaurant overlooks the Zambezi River, and the resort\'s location within a wildlife reserve means elephant sightings are common.',
    category: 'Resort',
    location: 'Victoria Falls, Zimbabwe',
    address: 'Custom Road, Victoria Falls, Zimbabwe',
    coordinates: { lat: -17.8950, lng: 25.8180 },
    rating: 8.4,
    reviewCount: 1600,
    priceRange: '$$$',
    priceFrom: 248,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
    ],
    amenities: [
      { icon: 'golf', name: 'Golf Course' },
      { icon: 'pool', name: 'Multiple Pools' },
      { icon: 'tennis', name: 'Tennis Courts' },
      { icon: 'spa', name: 'Spa' },
      { icon: 'dining', name: 'Multiple Restaurants' },
      { icon: 'giraffe', name: 'Wildlife Viewing' },
      { icon: 'wifi', name: 'Free WiFi' }
    ],
    rooms: [
      { id: 'r5-1', name: 'Standard Room', description: 'Comfortable rooms with garden or pool views.', capacity: 2, size: '30m²', bedType: 'Queen', priceFrom: 400, amenities: ['Air Conditioning', 'WiFi', 'Safe', 'Mini Bar'] },
      { id: 'r5-2', name: 'Golf View Room', description: 'Rooms overlooking the 18-hole championship golf course.', capacity: 2, size: '35m²', bedType: 'King', priceFrom: 500, amenities: ['Air Conditioning', 'WiFi', 'Safe', 'Mini Bar', 'Balcony'] },
      { id: 'r5-3', name: 'Presidential Suite', description: 'The resort\'s finest accommodation with panoramic river views.', capacity: 4, size: '120m²', bedType: 'King', priceFrom: 950, amenities: ['Air Conditioning', 'WiFi', 'Safe', 'Mini Bar', 'Private Terrace', 'Butler Service', 'Jacuzzi'] }
    ],
    nearbyExperiences: ['exp-1', 'exp-2', 'exp-4'],
    nearbyDining: ['rest-1', 'rest-4'],
    highlights: [
      '18-hole championship golf course',
      'Multiple swimming pools',
      'Elephant sightings on property',
      'Full-service spa',
      'Family-friendly resort'
    ],
    featured: false
  },
  {
    id: 'acc-6',
    name: 'Batonka Guest Lodge',
    slug: 'batonka-guest-lodge',
    tagline: 'Intimate lodge with personal service',
    description: 'A 4-star guest lodge offering an outdoor swimming pool, garden, terrace and bar. Free shuttle service and complimentary WiFi throughout the property.',
    longDescription: 'Batonka Guest Lodge combines the warmth of a family-run establishment with the standards of a 4-star property. The lodge\'s intimate size ensures personalized attention, while its gardens provide a peaceful retreat from the bustle of Victoria Falls town.\n\nThe property features a lovely swimming pool surrounded by indigenous gardens, a terrace bar perfect for evening sundowners, and comfortable rooms designed with both style and function in mind.',
    category: 'Guest Lodge',
    location: 'Victoria Falls, Zimbabwe',
    address: '171 Livingstone Way, Victoria Falls, Zimbabwe',
    coordinates: { lat: -17.9180, lng: 25.8320 },
    rating: 9.3,
    reviewCount: 37,
    priceRange: '$$$',
    priceFrom: 190,
    currency: 'USD',
    images: [
      'https://batonkaguestlodge.com/wp-content/uploads/2025/08/A749379Batonka-1030x687.jpeg',
      'https://batonkaguestlodge.com/wp-content/uploads/2019/01/Batonka-Guest-Lodge-Vic-Falls-5.jpg',
      'https://batonkaguestlodge.com/wp-content/uploads/2019/01/Batonka-Guest-Lodge-Vic-Falls-10.jpg'
    ],
    amenities: [
      { icon: 'pool', name: 'Swimming Pool' },
      { icon: 'cocktail', name: 'Terrace Bar' },
      { icon: 'garden', name: 'Garden' },
      { icon: 'shuttle', name: 'Free Shuttle' },
      { icon: 'wifi', name: 'Free WiFi' },
      { icon: 'parking', name: 'Free Parking' }
    ],
    rooms: [
      { id: 'r6-1', name: 'Garden Room', description: 'Comfortable rooms overlooking the indigenous garden.', capacity: 2, size: '28m²', bedType: 'Queen', priceFrom: 390, amenities: ['Air Conditioning', 'WiFi', 'Safe', 'Tea/Coffee'] },
      { id: 'r6-2', name: 'Superior Room', description: 'Spacious rooms with lounge area and garden views.', capacity: 2, size: '38m²', bedType: 'King', priceFrom: 480, amenities: ['Air Conditioning', 'WiFi', 'Safe', 'Tea/Coffee', 'Lounge Area'] }
    ],
    nearbyExperiences: ['exp-1', 'exp-2', 'exp-6'],
    nearbyDining: ['rest-3'],
    highlights: [
      'Personal, family-run service',
      'Free shuttle to town and falls',
      'Beautiful indigenous gardens',
      'Excellent breakfast included',
      'Quiet, peaceful location'
    ],
    featured: false
  },
  {
    id: 'acc-7',
    name: 'Ilala Lodge Hotel',
    slug: 'ilala-lodge-hotel',
    tagline: 'Family-run elegance on the edge of the falls',
    description: 'A family-run hotel set in expansive gardens, located within 1.2 miles of Victoria Falls. Known for its warm hospitality and prime location.',
    longDescription: 'Ilala Lodge Hotel is one of Victoria Falls\' most beloved properties, known for its genuine family hospitality and unbeatable location. The lodge sits on extensive grounds that border the Victoria Falls National Park, meaning the spray of the falls is visible from the gardens.\n\nThe property has been family-run for decades, and this personal touch is evident in every aspect of the guest experience. From the handpicked wines at dinner to the carefully curated excursions, every detail reflects a deep love for this extraordinary corner of Zimbabwe.',
    category: 'Lodge',
    location: 'Victoria Falls, Zimbabwe',
    address: '311 Livingstone Way, Victoria Falls, Zimbabwe',
    coordinates: { lat: -17.9370, lng: 25.8210 },
    rating: 8.8,
    reviewCount: 2200,
    priceRange: '$$$$',
    priceFrom: 150,
    currency: 'USD',
    images: [
      'https://www.ilalalodge.com/wp-content/uploads/2022/08/Ilala-Lodge-Hotel-and-pools-ILH.jpeg',
      'https://www.ilalalodge.com/wp-content/uploads/2022/08/Plunge-pool-ILH.jpeg',
      'https://www.ilalalodge.com/wp-content/uploads/2022/08/Strathearn-Suite-Bedroom-2-ILH.jpeg'
    ],
    amenities: [
      { icon: 'pool', name: 'Swimming Pool' },
      { icon: 'dining', name: 'Restaurant' },
      { icon: 'garden', name: 'Expansive Gardens' },
      { icon: 'shuttle', name: 'Airport Shuttle' },
      { icon: 'wifi', name: 'Free WiFi' },
      { icon: 'giraffe', name: 'Wildlife in Gardens' }
    ],
    rooms: [
      { id: 'r7-1', name: 'Standard Room', description: 'Charming rooms with garden views.', capacity: 2, size: '30m²', bedType: 'Queen', priceFrom: 616, amenities: ['Air Conditioning', 'WiFi', 'Safe', 'Mini Bar'] },
      { id: 'r7-2', name: 'Cascades Suite', description: 'Premium suite with separate living area and falls views.', capacity: 2, size: '55m²', bedType: 'King', priceFrom: 850, amenities: ['Air Conditioning', 'WiFi', 'Safe', 'Mini Bar', 'Living Area', 'Balcony'] }
    ],
    nearbyExperiences: ['exp-1', 'exp-2', 'exp-4'],
    nearbyDining: ['rest-1', 'rest-2'],
    highlights: [
      'Bordering Victoria Falls National Park',
      'Family-run for decades',
      'Spray of the falls visible from gardens',
      'Warthog and impala in the grounds',
      'Walking distance to the falls'
    ],
    featured: true
  },
  {
    id: 'acc-8',
    name: 'Palm River Hotel',
    slug: 'palm-river-hotel',
    tagline: 'Riverside luxury with world-class dining',
    description: 'A stunning riverside hotel with beautiful pools, gardens, and fine dining. Located 3.9 miles from Victoria Falls with tranquil Zambezi River views.',
    longDescription: 'Palm River Hotel is one of Victoria Falls\' newest and most impressive properties. Set on the banks of the Zambezi River, the hotel offers a level of luxury and sophistication that sets a new standard for the region.\n\nThe property features beautifully landscaped gardens, a stunning infinity pool overlooking the river, and a restaurant that has quickly earned a reputation as one of the finest dining experiences in Victoria Falls.',
    category: 'Hotel',
    location: 'Victoria Falls, Zimbabwe',
    address: 'Palm River Hotel, Victoria Falls, Zimbabwe',
    coordinates: { lat: -17.9100, lng: 25.7900 },
    rating: 9.2,
    reviewCount: 20,
    priceRange: '$$$$',
    priceFrom: 785,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'
    ],
    amenities: [
      { icon: 'pool', name: 'Infinity Pool' },
      { icon: 'dining', name: 'Fine Dining' },
      { icon: 'garden', name: 'Riverside Gardens' },
      { icon: 'spa', name: 'Spa' },
      { icon: 'fitness', name: 'Fitness Center' },
      { icon: 'wifi', name: 'Free WiFi' },
      { icon: 'parking', name: 'Free Parking' }
    ],
    rooms: [
      { id: 'r8-1', name: 'Deluxe Room', description: 'Elegant rooms with river or garden views.', capacity: 2, size: '40m²', bedType: 'King', priceFrom: 918, amenities: ['Air Conditioning', 'WiFi', 'Safe', 'Mini Bar', 'Balcony'] }
    ],
    nearbyExperiences: ['exp-2', 'exp-10', 'exp-8'],
    nearbyDining: ['rest-2'],
    highlights: [
      'Zambezi River frontage',
      'Award-winning restaurant',
      'Infinity pool with river views',
      'Modern luxury design',
      'Tranquil riverside setting'
    ],
    featured: false
  },
  {
    id: 'acc-9',
    name: 'Victoria Falls Safari Club',
    slug: 'victoria-falls-safari-club',
    tagline: 'Exclusive safari club with waterhole views',
    description: 'An exclusive extension of the Safari Lodge experience, offering upgraded rooms, private lounge, and premium waterhole views.',
    longDescription: 'Victoria Falls Safari Club is the premium tier of the Victoria Falls Safari Lodge experience. Guests of the Safari Club enjoy upgraded rooms, access to a private lounge, and enhanced services — all while sharing the lodge\'s extraordinary wildlife viewing opportunities.\n\nThe Club\'s position on the ridge offers some of the best waterhole views in the region, and the private lounge provides a tranquil space for reading, relaxing, or enjoying a complimentary drink while watching elephants at the waterhole below.',
    category: 'Safari Club',
    location: 'Victoria Falls, Zimbabwe',
    address: 'Victoria Falls Safari Club, Victoria Falls, Zimbabwe',
    coordinates: { lat: -17.8810, lng: 25.8000 },
    rating: 9.1,
    reviewCount: 68,
    priceRange: '$$$$',
    priceFrom: 700,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1535941339090-85119bb5b1b2?w=800&q=80',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'
    ],
    amenities: [
      { icon: 'wildlife', name: 'Waterhole Views' },
      { icon: 'cocktail', name: 'Private Lounge' },
      { icon: 'dining', name: 'Club Restaurant' },
      { icon: 'pool', name: 'Swimming Pool' },
      { icon: 'wifi', name: 'Free WiFi' },
      { icon: 'shuttle', name: 'Private Transfers' }
    ],
    rooms: [
      { id: 'r9-1', name: 'Club Room', description: 'Premium rooms with waterhole views and club benefits.', capacity: 2, size: '38m²', bedType: 'King', priceFrom: 700, amenities: ['Air Conditioning', 'WiFi', 'Safe', 'Mini Bar', 'Private Lounge Access', 'Balcony'] }
    ],
    nearbyExperiences: ['exp-3', 'exp-8', 'exp-10'],
    nearbyDining: ['rest-1'],
    highlights: [
      'Exclusive club-level experience',
      'Private lounge with complimentary drinks',
      'Best waterhole views in Victoria Falls',
      'Included game drives',
      'Premium safari dining'
    ],
    featured: false
  },
  {
    id: 'acc-10',
    name: 'Kasambabezi Lodge',
    slug: 'kasambabezi-lodge',
    tagline: 'Tranquil riverside retreat with exceptional hospitality',
    description: 'A highly-rated lodge offering a pool, garden, and terrace with stunning views. Located in Victoria Falls with exceptional guest ratings.',
    longDescription: 'Kasambabezi Lodge is one of Victoria Falls\' highest-rated properties, consistently earning top marks from guests for its exceptional hospitality, beautiful grounds, and tranquil atmosphere.\n\nThe lodge features a refreshing swimming pool surrounded by lush gardens, a terrace perfect for relaxation, and attentive service that makes every guest feel at home. Its location provides easy access to Victoria Falls while maintaining a peaceful retreat atmosphere.',
    category: 'Guest Lodge',
    location: 'Victoria Falls, Zimbabwe',
    address: 'Kasambabezi Lodge, Victoria Falls, Zimbabwe',
    coordinates: { lat: -17.9250, lng: 25.8270 },
    rating: 9.7,
    reviewCount: 35,
    priceRange: '$$$',
    priceFrom: 227,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80'
    ],
    amenities: [
      { icon: 'pool', name: 'Swimming Pool' },
      { icon: 'garden', name: 'Garden' },
      { icon: 'terrace', name: 'Terrace' },
      { icon: 'wifi', name: 'Free WiFi' },
      { icon: 'parking', name: 'Free Parking' },
      { icon: 'shuttle', name: 'Airport Shuttle' }
    ],
    rooms: [
      { id: 'r10-1', name: 'Standard Room', description: 'Comfortable rooms with garden views.', capacity: 2, size: '30m²', bedType: 'Queen', priceFrom: 227, amenities: ['Air Conditioning', 'WiFi', 'Safe', 'Tea/Coffee'] },
      { id: 'r10-2', name: 'Superior Room', description: 'Spacious rooms with terrace and pool views.', capacity: 2, size: '40m²', bedType: 'King', priceFrom: 310, amenities: ['Air Conditioning', 'WiFi', 'Safe', 'Tea/Coffee', 'Terrace', 'Mini Bar'] }
    ],
    nearbyExperiences: ['exp-1', 'exp-2', 'exp-6'],
    nearbyDining: ['rest-3', 'rest-4'],
    highlights: [
      'Highest-rated lodge in Victoria Falls',
      'Beautiful swimming pool and gardens',
      'Tranquil terrace setting',
      'Exceptional guest reviews',
      'Excellent value for quality'
    ],
    featured: false
  }
];

export const experiences = [
  {
    id: 'exp-1',
    name: 'Flight of Angels',
    slug: 'flight-of-angels',
    tagline: 'Victoria Falls from the sky',
    description: 'A breathtaking helicopter flight over Victoria Falls, offering aerial perspectives of the world\'s largest curtain of falling water. Choose from 15, 22, or 25-minute flights.',
    longDescription: 'The "Flight of Angels" is the most iconic experience in Victoria Falls. Named after David Livingstone\'s description of the falls as scenes "so beautiful they must have been gazed upon by angels in flight," this helicopter journey reveals the full scale and majesty of Mosi-oa-Tunya.\n\nFrom the air, you\'ll see the full 1.7km width of the falls, the Batoka Gorge\'s dramatic zigzag, and the Zambezi River stretching to the horizon. On longer flights, the route extends over the Zambezi National Park, where elephant, buffalo, and lion are frequently spotted from above.',
    type: 'Helicopter',
    category: 'Aerial',
    difficulty: 'Easy',
    duration: '15-25 minutes',
    priceFrom: 205,
    priceUnit: 'per person',
    rating: 4.9,
    reviewCount: 312,
    maxCapacity: 4,
    images: [
      'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80',
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80'
    ],
    includes: ['Scenic helicopter flight', 'Experienced pilot commentary', 'Guaranteed window seat', 'Digital photo package'],
    meetingPoint: 'Helipad, Victoria Falls Airport Road',
    bestSeason: 'Year-round (best visibility May-August)',
    featured: true
  },
  {
    id: 'exp-2',
    name: 'Sunset Zambezi Cruise',
    slug: 'sunset-zambezi-cruise',
    tagline: 'Victoria Falls\' most iconic sunset experience',
    description: 'A 2-hour luxury cruise on the upper Zambezi River, with drinks, canapés, and front-row seats to one of Victoria Falls\' most spectacular sunsets.',
    longDescription: 'As the Zimbabwean sun begins its descent, board a luxury boat for what many consider the perfect Victoria Falls experience. The Sunset Zambezi Cruise takes you along the upper Zambezi River, where hippo, crocodile, and elephant are regularly spotted along the banks.\n\nSip champagne as the sky transforms from gold to crimson, and watch as the silhouettes of African fish eagles drift across the horizon. The cruise includes premium drinks and canapés, and the crew\'s knowledge of the river\'s wildlife and history adds depth to the experience.',
    type: 'Boat Cruise',
    category: 'Nature',
    difficulty: 'Easy',
    duration: '2 hours',
    priceFrom: 75,
    priceUnit: 'per person',
    rating: 4.8,
    reviewCount: 278,
    maxCapacity: 40,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80'
    ],
    includes: ['2-hour river cruise', 'Premium drinks package', 'Canapés and snacks', 'Wildlife viewing', 'Sunset photo opportunities'],
    meetingPoint: 'Zambezi River jetty, near The Victoria Falls Hotel',
    bestSeason: 'Year-round (dry season May-Oct has best wildlife)',
    featured: true
  },
  {
    id: 'exp-3',
    name: 'Big Five Safari',
    slug: 'big-five-safari',
    tagline: 'Encounter legendary wildlife',
    description: 'A full-day game drive in Chobe National Park, Botswana — home to the largest elephant population in the region and all Big Five species.',
    longDescription: 'Cross the border into Botswana for a full-day safari in Chobe National Park, one of the region\'s premier wildlife destinations. Chobe is home to approximately 120,000 elephants — the largest concentration on the continent — along with buffalo, lion, leopard, and rhino.\n\nThe park\'s Chobe River frontage is particularly spectacular, with huge herds of elephant crossing the river, pods of hippo basking in the shallows, and crocodiles basking on the sandy banks. Your expert guide will navigate the park\'s diverse ecosystems, from floodplain to woodland, ensuring the best possible wildlife encounters.',
    type: 'Safari',
    category: 'Wildlife',
    difficulty: 'Easy',
    duration: 'Full day (9 hours)',
    priceFrom: 185,
    priceUnit: 'per person',
    rating: 4.9,
    reviewCount: 198,
    maxCapacity: 8,
    images: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
      'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80'
    ],
    includes: ['Park entry fees', 'Game drive in 4x4 vehicle', 'Expert safari guide', 'Packed lunch and drinks', 'Border crossing assistance', 'Hotel transfers'],
    meetingPoint: 'Hotel lobby, 7:00 AM pickup',
    bestSeason: 'May-October (dry season, best game viewing)',
    featured: true
  },
  {
    id: 'exp-4',
    name: 'White Water Rafting',
    slug: 'white-water-rafting',
    tagline: 'Grade 5 rapids in the Batoka Gorge',
    description: 'The world\'s most thrilling one-day white water rafting experience. Navigate 23 rapids through the dramatic Batoka Gorge below Victoria Falls.',
    longDescription: 'Descend into the Batoka Gorge — 120 meters below the Victoria Falls Bridge — for the world\'s most spectacular one-day white water rafting experience. Over 4-5 hours, you\'ll navigate 23 rapids ranging from Class III to Class V, with names like "Stairway to Heaven," "Oblivion," and "The Washing Machine."\n\nBetween rapids, float through calm pools where the gorge walls tower above you, and the only sounds are the rush of water and the call of fish eagles. The experience concludes with a champagne lunch on the river beach, accessible only by raft.',
    type: 'Adventure',
    category: 'Water',
    difficulty: 'Challenging',
    duration: '4-5 hours',
    priceFrom: 90,
    priceUnit: 'per person',
    rating: 4.8,
    reviewCount: 245,
    maxCapacity: 16,
    images: [
      'https://images.unsplash.com/photo-1440778303588-435521a205bc?w=800&q=80',
      'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80'
    ],
    includes: ['All rafting equipment', 'Safety briefing and guide', 'Champagne lunch', 'Video of your rafting experience', 'Certificate of achievement'],
    meetingPoint: 'Rafting base, Victoria Falls Bridge',
    bestSeason: 'August-December (low water, most rapids)',
    featured: true
  },
  {
    id: 'exp-5',
    name: "Devil's Pool Swim",
    slug: 'devils-pool-swim',
    tagline: 'Swim on the edge of the abyss',
    description: 'Swim in the natural rock pool at the very edge of Victoria Falls — one of the world\'s most exhilarating swimming experiences.',
    longDescription: "Devil's Pool is a natural rock pool located at the very edge of Victoria Falls, where the Zambezi River plunges 108 meters into the Batoka Gorge. During low water season (August-December), the pool becomes accessible, and brave swimmers can wade to the edge and peer over the abyss.\n\nThe experience begins with a boat ride to Livingstone Island, followed by a guided walk to the pool. Your experienced guide will lead you through the currents to the edge, where you can hold onto the rock ledge and look directly down into the gorge below. It's not for the faint-hearted, but it's an experience you'll never forget.",
    type: 'Adventure',
    category: 'Water',
    difficulty: 'Moderate',
    duration: '2-3 hours',
    priceFrom: 120,
    priceUnit: 'per person',
    rating: 4.7,
    reviewCount: 156,
    maxCapacity: 8,
    images: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80'
    ],
    includes: ['Boat transfer to Livingstone Island', 'Guided swim to Devil\'s Pool', 'Safety equipment', 'Livingstone Island tour'],
    meetingPoint: 'Livingstone Island jetty, Zambian side',
    bestSeason: 'August-December (low water only)',
    featured: true
  },
  {
    id: 'exp-6',
    name: 'Cultural Village Walk',
    slug: 'cultural-village-walk',
    tagline: 'Experience authentic Zimbabwean village life',
    description: 'Visit a local Mukuni village and experience the daily life, traditions, and crafts of the Leya people who have lived in the Victoria Falls region for centuries.',
    longDescription: 'Step beyond the tourist trail and into the real Zimbabwe. The Cultural Village Walk takes you to Mukuni Village, home to the Leya people who have lived in the Victoria Falls region for over 300 years.\n\nYour guide — a village resident — will introduce you to the chief, show you traditional mud-and-thatch homes, and explain the customs and beliefs that have sustained this community for generations. You\'ll watch women weaving baskets, see children at the village school, and have the opportunity to purchase authentic handmade crafts directly from the artisans.',
    type: 'Cultural',
    category: 'Heritage',
    difficulty: 'Easy',
    duration: '2.5 hours',
    priceFrom: 65,
    priceUnit: 'per person',
    rating: 4.9,
    reviewCount: 134,
    maxCapacity: 12,
    images: [
      'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'
    ],
    includes: ['Village entrance fee', 'Local guide', 'Cultural demonstration', 'School visit', 'Craft shopping opportunity'],
    meetingPoint: 'Mukuni Village gate, 15 min drive from town',
    bestSeason: 'Year-round',
    featured: false
  },
  {
    id: 'exp-7',
    name: 'Bungee Jumping',
    slug: 'bungee-jumping',
    tagline: '111 meters of pure adrenaline',
    description: 'A 111-meter bungee jump from the Victoria Falls Bridge, with the spray of the falls as your backdrop and the Batoka Gorge below.',
    longDescription: 'The Victoria Falls Bridge bungee jump is one of the world\'s most spectacular. Standing on the bridge deck, 111 meters above the Zambezi River, you\'ll have a front-row view of Victoria Falls before taking the leap.\n\nAs you fall, the spray of the falls envelops you, and the gorge rushes up to meet you. The jump ends with a gentle bounce above the river, with the bridge silhouetted against the sky above. It\'s 111 meters of pure, unbridled adrenaline.',
    type: 'Adventure',
    category: 'Extreme',
    difficulty: 'Extreme',
    duration: '30 minutes',
    priceFrom: 120,
    priceUnit: 'per person',
    rating: 4.8,
    reviewCount: 189,
    maxCapacity: 1,
    images: [
      'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80',
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80',
      'https://images.unsplash.com/photo-1440778303588-435521a205bc?w=800&q=80'
    ],
    includes: ['All safety equipment', 'Professional jump master', 'Certificate', 'Video of your jump', 'Commemorative T-shirt'],
    meetingPoint: 'Victoria Falls Bridge, Zimbabwe side',
    bestSeason: 'Year-round',
    featured: false
  },
  {
    id: 'exp-8',
    name: 'Walking Safari',
    slug: 'walking-safari',
    tagline: 'Track wildlife on foot in the Zambezi bush',
    description: 'A guided walking safari through the Zambezi National Park, tracking elephant, buffalo, and other wildlife on foot with an expert armed guide.',
    longDescription: 'There\'s nothing quite like experiencing the Zambezi bush on foot. The Walking Safari takes you into the Zambezi National Park with an expert armed guide who will teach you to read the bush — animal tracks, bird calls, medicinal plants, and the subtle signs that reveal the presence of wildlife.\n\nWalking safaris are about the details: the dung beetle rolling its prize, the termite mound that\'s taken 50 years to build, the alarm call of a plover that tells you a predator is near. It\'s an intimate, educational, and deeply moving way to experience the wilderness.',
    type: 'Safari',
    category: 'Wildlife',
    difficulty: 'Moderate',
    duration: '3 hours',
    priceFrom: 95,
    priceUnit: 'per person',
    rating: 4.9,
    reviewCount: 87,
    maxCapacity: 8,
    images: [
      'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'
    ],
    includes: ['Armed professional guide', 'Park entry fees', 'Water and snacks', 'Bush knowledge briefing'],
    meetingPoint: 'Zambezi National Park entrance',
    bestSeason: 'May-October (dry season, best visibility)',
    featured: false
  },
  {
    id: 'exp-9',
    name: 'Private Dinner Under the Stars',
    slug: 'private-dinner-stars',
    tagline: 'Romance in the Zambezi wilderness',
    description: 'An intimate private dinner set in a torch-lit clearing in the bush, with a personal chef, waiter, and the sounds of the Zambezi night as your soundtrack.',
    longDescription: 'As the sun sets and the first stars appear, you\'ll be led to a secluded clearing in the bush where a private dining experience awaits. Torches flicker in the evening breeze, tables are set with fine linen, and a personal chef prepares a multi-course meal just for you.\n\nThe menu features the finest local ingredients — game meats, fresh river fish, seasonal vegetables — paired with South African wines. As you dine, the sounds of the Zambezi night surround you: the distant call of a fish eagle, the rustle of animals in the bush, the soft whisper of the river.',
    type: 'Dining',
    category: 'Fine Dining',
    difficulty: 'Easy',
    duration: '3 hours',
    priceFrom: 250,
    priceUnit: 'per person',
    rating: 4.9,
    reviewCount: 67,
    maxCapacity: 10,
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80'
    ],
    includes: ['Private bush clearing', 'Multi-course dinner', 'Personal chef and waiter', 'Premium wine pairing', 'Torch-lit ambiance', 'Star-gazing guidance'],
    meetingPoint: 'Hotel reception, guided transfer included',
    bestSeason: 'Year-round (best during dry season May-Oct)',
    featured: true
  },
  {
    id: 'exp-10',
    name: 'Moonlit Canoe Safari',
    slug: 'moonlit-canoe-safari',
    tagline: 'Paddle the Zambezi by moonlight',
    description: 'A twilight canoe safari on the Zambezi River, paddling under the Zimbabwean moon as hippo and crocodile silhouette against the moonlit water.',
    longDescription: 'As twilight fades and the full moon rises over the Zambezi, embark on a canoe safari unlike any other. Paddle gently along the river\'s channels, where hippos surface with soft grunts and crocodiles\' eyes glow red in your torchlight.\n\nThe moonlight transforms the river into a silver highway, and the stars above are so bright they seem within reach. Your guide leads the group in silence, pointing out wildlife that only emerges after dark. It\'s an experience that engages all your senses and creates memories that last a lifetime.',
    type: 'Canoe',
    category: 'Nature',
    difficulty: 'Moderate',
    duration: '3.5 hours',
    priceFrom: 105,
    priceUnit: 'per person',
    rating: 4.7,
    reviewCount: 78,
    maxCapacity: 8,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80'
    ],
    includes: ['Canoe and equipment', 'Experienced river guide', 'Safety briefing', 'Snacks and drinks', 'Headlamp'],
    meetingPoint: 'Zambezi River launch point',
    bestSeason: 'Year-round (full moon nights)',
    featured: false
  },
  {
    id: 'exp-11',
    name: 'Elephant Sanctuary Visit',
    slug: 'elephant-sanctuary',
    tagline: 'Walk with gentle giants',
    description: 'Visit a reputable elephant sanctuary and walk alongside rescued elephants, learning about conservation and the bond between humans and these magnificent creatures.',
    longDescription: 'The Elephant Sanctuary offers a rare opportunity to walk alongside rescued elephants in a natural bush environment. Unlike captive elephant experiences, this sanctuary prioritizes the welfare of its elephants, many of whom were rescued from poaching or habitat loss.\n\nDuring your visit, you\'ll learn about elephant behavior, conservation challenges, and the sanctuary\'s work protecting these magnificent animals. The highlight is walking with the elephants through the bush — an experience that creates a profound connection between humans and wildlife.',
    type: 'Wildlife',
    category: 'Conservation',
    difficulty: 'Easy',
    duration: '3 hours',
    priceFrom: 140,
    priceUnit: 'per person',
    rating: 4.8,
    reviewCount: 112,
    maxCapacity: 12,
    images: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
      'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'
    ],
    includes: ['Sanctuary entrance fee', 'Expert elephant guide', 'Walk with elephants', 'Conservation talk', 'Photo opportunities'],
    meetingPoint: 'Sanctuary reception, 20 min drive from town',
    bestSeason: 'Year-round',
    featured: false
  }
];

export const restaurants = [
  {
    id: 'rest-1',
    name: 'The Boma — Dinner & Drum Show',
    slug: 'the-boma-dinner-drum-show',
    tagline: 'An immersive Zimbabwean dining experience',
    description: 'An iconic Victoria Falls dining experience combining traditional Zimbabwean cuisine, cultural performances, and the famous Boma drum show. Guests are welcomed with a traditional ceremony and encouraged to taste local delicacies.',
    longDescription: 'The Boma is more than a restaurant — it\'s a cultural immersion. Located within the Victoria Falls Safari Lodge, this open-air dining venue recreates the atmosphere of a traditional boma (enclosure).\n\nThe evening begins with a traditional welcome ceremony, followed by a feast of Zimbabwean dishes including game meat, sadza, and mopane worms (for the brave). The highlight is the Boma Drum Show, where performers in traditional dress bring the rhythms of Zimbabwe to life.',
    category: 'Local Cuisine',
    cuisine: 'Traditional Zimbabwean',
    pricePerPerson: 85,
    priceRange: '$$$',
    rating: 4.7,
    reviewCount: 567,
    address: 'Victoria Falls Safari Lodge, Custom Road',
    hours: 'Mon-Sun, 6:30 PM - 10:00 PM',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80'
    ],
    signature: ['Game Meat Platter', 'Mopane Worms', 'Sadza', 'Malva Pudding'],
    ambiance: 'Cultural',
    featured: true
  },
  {
    id: 'rest-2',
    name: 'Maamba Sun Deck',
    slug: 'maamba-sun-deck',
    tagline: 'Riverside fine dining with Zambezi views',
    description: 'An elegant dining venue on the banks of the Zambezi River, offering Zimbabwean-International fusion cuisine in a sophisticated setting.',
    longDescription: 'Maamba Sun Deck brings a refined dining experience to the Victoria Falls restaurant scene. Located on the banks of the Zambezi River, this elegant venue combines stunning river views with a menu that celebrates both Zimbabwean and international culinary traditions.\n\nThe kitchen sources the finest local ingredients — game meats from sustainable farms, fresh fish from the Zambezi, seasonal produce from local growers — and transforms them into dishes that are both visually stunning and deeply satisfying.',
    category: 'International',
    cuisine: 'Zimbabwean-International Fusion',
    pricePerPerson: 120,
    priceRange: '$$$$',
    rating: 4.8,
    reviewCount: 89,
    address: 'Palm River Hotel, Zambezi River frontage',
    hours: 'Mon-Sun, 12:00 PM - 10:00 PM',
    images: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80'
    ],
    signature: ['Grilled Zambezi Bream', 'Kudu Fillet', 'Warthog Sausage', 'Chocolate Fondant'],
    ambiance: 'Romantic',
    featured: true
  },
  {
    id: 'rest-3',
    name: 'The Grain Store',
    slug: 'the-grain-store',
    tagline: 'Modern Zimbabwean cuisine in a heritage setting',
    description: 'A contemporary restaurant celebrating Zimbabwean culinary heritage with modern techniques. Set in a beautifully restored grain store with exposed brick and warm lighting.',
    longDescription: 'The Grain Store occupies a beautifully restored heritage building in the heart of Victoria Falls town. The restaurant\'s concept is simple: celebrate Zimbabwean ingredients and culinary traditions through modern cooking techniques.\n\nThe menu changes seasonally, but always features local specialties reimagined for contemporary palates. The wine list focuses on South African estates, with particular emphasis on smaller producers making exceptional wines.',
    category: 'Fine Dining',
    cuisine: 'Modern Zimbabwean',
    pricePerPerson: 95,
    priceRange: '$$$',
    rating: 4.6,
    reviewCount: 134,
    address: '113 Livingstone Way, Victoria Falls',
    hours: 'Tue-Sun, 6:00 PM - 10:00 PM',
    images: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'
    ],
    signature: ['Ostrich Carpaccio', 'Warthog Sausage', 'Kudu Steak', 'Baobab Ice Cream'],
    ambiance: 'Intimate',
    featured: true
  },
  {
    id: 'rest-4',
    name: 'The Lookout Cafe',
    slug: 'the-lookout-cafe',
    tagline: 'Cafe dining with a view',
    description: 'A relaxed cafe and bistro offering light meals, coffee, and cocktails with views of the Victoria Falls Bridge and gorge.',
    longDescription: 'The Lookout Cafe occupies a prime position overlooking the Victoria Falls Bridge and the Batoka Gorge. It\'s the perfect spot for a casual meal after visiting the falls, or for watching bungee jumpers take the leap from the bridge.\n\nThe menu focuses on fresh, simple food — sandwiches, salads, burgers, and light meals — prepared with quality ingredients. The coffee is excellent, and the cocktail list makes the most of the spectacular setting.',
    category: 'Cafe & Bistro',
    cuisine: 'Cafe & Light Meals',
    pricePerPerson: 35,
    priceRange: '$',
    rating: 4.5,
    reviewCount: 213,
    address: 'Victoria Falls Bridge, Zimbabwe side',
    hours: 'Mon-Sun, 8:00 AM - 5:00 PM',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80'
    ],
    signature: ['Vic Falls Burger', 'African Fish Wrap', 'Fresh Smoothies', 'Craft Cocktails'],
    ambiance: 'Casual',
    featured: false
  }
];

export const signatureJourneys = [
  {
    id: 'journey-1',
    name: 'The Victoria Falls Escape',
    slug: 'victoria-falls-escape',
    tagline: 'Three days of wonder, luxury, and adventure',
    description: 'A curated three-day experience that captures the essence of Victoria Falls. Stay at a premium lodge, enjoy a sunset cruise, explore the falls at your own pace, and dine under the Zimbabwean sky.',
    duration: '3 Days / 2 Nights',
    priceFrom: 2800,
    priceUnit: 'per person',
    accommodation: 'The Victoria Falls Hotel (Superior Room)',
    includes: [
      '2 nights luxury accommodation',
      'Full English breakfast daily',
      'Sunset Zambezi cruise',
      'Guided Victoria Falls tour',
      'Helicopter flight over the falls',
      'Private dinner under the stars',
      'Airport transfers'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Sunset', description: 'Arrive at Victoria Falls Airport, transfer to The Victoria Falls Hotel. After settling in, enjoy afternoon tea on the Stanley\'s Terrace before a sunset cruise on the Zambezi.' },
      { day: 2, title: 'The Falls & The Air', description: 'Morning guided walk through Victoria Falls National Park. Afternoon helicopter "Flight of Angels" for aerial perspectives. Evening private bush dinner under the stars.' },
      { day: 3, title: 'Departure', description: 'Leisurely breakfast, morning at the hotel pool or gardens. Transfer to Victoria Falls Airport for departure.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'journey-2',
    name: 'The Victoria Falls Adventure',
    slug: 'victoria-falls-adventure',
    tagline: 'Five days of wild encounters and adventure',
    description: 'An immersive five-day journey combining safari wildlife encounters, adventure activities, and cultural immersion. Stay at a safari lodge and experience the full spectrum of what Victoria Falls offers.',
    duration: '5 Days / 4 Nights',
    priceFrom: 4500,
    priceUnit: 'per person',
    accommodation: 'Victoria Falls Safari Lodge (Club Room)',
    includes: [
      '4 nights safari lodge accommodation',
      'Full board',
      'Two safari game drives',
      'White water rafting',
      'Cultural village visit',
      'Sunset cruise',
      'Bungee jumping',
      'Airport transfers'
    ],
    itinerary: [
      { day: 1, title: 'Welcome to Victoria Falls', description: 'Arrive and check into the Safari Lodge. Afternoon game drive in the Zambezi National Park. Sundowner drinks at the waterhole as elephants come to drink.' },
      { day: 2, title: 'The Falls Up Close', description: 'Morning visit to Victoria Falls. Afternoon white water rafting adventure in the Batoka Gorge. Evening dinner at the lodge.' },
      { day: 3, title: 'Adrenaline Day', description: 'Morning bungee jump from Victoria Falls Bridge. Afternoon cultural village walk and traditional lunch. Evening safari drive.' },
      { day: 4, title: 'Wild Encounters', description: 'Full day safari to Chobe National Park with packed lunch. Evening sundowner cruise on the Zambezi.' },
      { day: 5, title: 'Farewell Victoria Falls', description: 'Morning walking safari. Brunch at the lodge before airport transfer.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'journey-3',
    name: 'The Romantic Retreat',
    slug: 'romantic-retreat',
    tagline: 'Intimate luxury for two',
    description: 'A curated escape for couples seeking romance in the Zambezi wilderness. Private experiences, intimate dining, and luxurious accommodations create memories that last a lifetime.',
    duration: '4 Days / 3 Nights',
    priceFrom: 5200,
    priceUnit: 'per couple',
    accommodation: 'Anantara Stanley & Livingstone (Honeymoon Suite)',
    includes: [
      '3 nights Honeymoon Suite',
      'Full board',
      'Private game drive for two',
      'Couple\'s spa treatment',
      'Private sunset cruise',
      'Bush dinner for two',
      'Photography session at the falls',
      'Airport transfers'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Paradise', description: 'Arrive and settle into your private Honeymoon Suite with plunge pool. Afternoon couple\'s spa treatment. Evening private sundowner cruise with champagne.' },
      { day: 2, title: 'Falls & Wildlife', description: 'Private guided tour of Victoria Falls. Afternoon private game drive through the wildlife sanctuary. Evening bush dinner for two under the stars.' },
      { day: 3, title: 'Adventure & Romance', description: 'Morning helicopter flight for two over the falls. Afternoon photography session capturing your memories. Evening fine dining experience.' },
      { day: 4, title: 'Farewell', description: 'Leisurely breakfast with views of the bush. Late checkout and airport transfer.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'journey-4',
    name: 'The Family Discovery',
    slug: 'family-discovery',
    tagline: 'An unforgettable adventure for the whole family',
    description: 'A thoughtfully designed family itinerary combining wildlife, adventure, and cultural experiences. Kid-friendly activities, comfortable lodges, and memories the whole family will treasure.',
    duration: '5 Days / 4 Nights',
    priceFrom: 3800,
    priceUnit: 'per person',
    accommodation: 'Ilala Lodge Hotel (Family Room)',
    includes: [
      '4 nights family accommodation',
      'Full board',
      'Guided family safari',
      'Junior ranger programme',
      'Sunset cruise',
      'Cultural village visit',
      'Rainforest walk',
      'Airport transfers'
    ],
    itinerary: [
      { day: 1, title: 'Welcome to the Falls', description: 'Arrive and settle into Ilala Lodge. Afternoon orientation walk through Victoria Falls Town. Evening family dinner at the lodge.' },
      { day: 2, title: 'The Mighty Falls', description: 'Morning family guided tour of Victoria Falls. Afternoon splash pool time. Evening sunset cruise with snacks and drinks.' },
      { day: 3, title: 'Wildlife Safari', description: 'Full day family safari in Zambezi National Park with picnic lunch. Kids participate in the junior ranger programme.' },
      { day: 4, title: 'Culture & Adventure', description: 'Morning cultural village visit and traditional cooking class. Afternoon family rainforest walk. Farewell dinner.' },
      { day: 5, title: 'Farewell', description: 'Leisurely breakfast. Morning at the pool. Airport transfer for departure.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80'
    ],
    featured: true
  }
];

export const journalArticles = [
  {
    id: 'journal-1',
    title: 'Inside Victoria Falls\' Hidden Luxury Lodges',
    slug: 'hidden-luxury-lodges',
    category: 'Accommodation',
    excerpt: 'Beyond the well-known hotels lie intimate lodges where Zimbabwean hospitality reaches its highest expression.',
    content: 'Victoria Falls is home to some of the region\'s most iconic hotels, but the true connoisseur of luxury travel knows that the most extraordinary experiences often lie beyond the famous names.\n\nIn the bush surrounding the falls, a new generation of lodges has emerged — properties where the luxury isn\'t just in the thread count or the wine list, but in the quality of the experience itself.\n\nWe spent three weeks exploring these hidden gems, and what we found surprised us. The best luxury in Victoria Falls isn\'t about marble bathrooms and crystal chandeliers — it\'s about authenticity, intimacy, and the kind of service that makes you feel genuinely cared for.',
    author: 'House of Mosi Editorial',
    date: '2026-06-15',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80'
  },
  {
    id: 'journal-2',
    title: 'The Art of Zimbabwean Hospitality',
    slug: 'art-of-zimbabwean-hospitality',
    category: 'Culture',
    excerpt: 'What makes Zimbabwean hospitality unique? We explore the philosophy and traditions that create the region\'s most memorable guest experiences.',
    content: 'In many Western hotels, hospitality is a profession. In Zimbabwe, hospitality is something deeper. It\'s a cultural value, a way of being, a philosophy that has evolved over millennia.\n\nThe concept of Ubuntu — "I am because we are" — underpins the Zimbabwean approach to welcoming guests. In traditional culture, a visitor is a gift, someone who has chosen to share their time and trust with you.',
    author: 'House of Mosi Editorial',
    date: '2026-05-20',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80'
  },
  {
    id: 'journal-3',
    title: 'A Seasonal Guide to Victoria Falls',
    slug: 'seasonal-guide-victoria-falls',
    category: 'Travel Guide',
    excerpt: 'When should you visit Victoria Falls? Our comprehensive seasonal guide helps you plan the perfect trip.',
    content: 'Victoria Falls is a year-round destination, but the experience changes dramatically with the seasons. Understanding these cycles is key to planning your perfect visit.\n\nThe flood season brings the falls to their most powerful — a wall of water so vast it creates its own weather system. The dry season reveals a different face, with reduced water flow and excellent game viewing.',
    author: 'House of Mosi Editorial',
    date: '2026-04-10',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80'
  },
  {
    id: 'journal-4',
    title: 'The Wildlife Corridors of Victoria Falls',
    slug: 'wildlife-corridors',
    category: 'Wildlife',
    excerpt: 'How conservation corridors are connecting habitats and ensuring the future of wildlife in one of the region\'s most important ecosystems.',
    content: 'The area surrounding Victoria Falls is more than a tourist destination — it\'s a critical wildlife corridor that connects some of the region\'s most important protected areas.\n\nThe Zambezi River serves as a natural highway for elephants, who migrate between Zimbabwe\'s Zambezi National Park and Zambia\'s Mosi-oa-Tunya National Park.',
    author: 'House of Mosi Editorial',
    date: '2026-03-05',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80'
  }
];

export const destinations = [
  { id: 'dest-1', name: 'Victoria Falls Town', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', propertyCount: 12, description: 'The heart of the destination — hotels, restaurants, and the main entrance to the falls.' },
  { id: 'dest-2', name: 'Zambezi Riverfront', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', propertyCount: 8, description: 'Luxury lodges and sunset cruises along the mighty Zambezi River.' },
  { id: 'dest-3', name: 'Rainforest Vicinity', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80', propertyCount: 6, description: 'Stay within walking distance of the rainforest and the spray of the falls.' },
  { id: 'dest-4', name: 'Batoka Gorge', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80', propertyCount: 4, description: 'Dramatic canyon views, bungee jumping, and white-water rafting adventures.' },
  { id: 'dest-5', name: 'Wildlife Corridor', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', propertyCount: 7, description: 'Safari lodges in private game reserves with daily elephant and buffalo sightings.' },
  { id: 'dest-6', name: 'Zambezi National Park', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', propertyCount: 3, description: 'Wild bush camps and walking safaris in a pristine national park.' }
];

export const mapLocations = [
  { id: 'map-1', name: 'The Victoria Falls Hotel', type: 'accommodation', lat: -17.9327, lng: 25.8293, price: '$598' },
  { id: 'map-2', name: 'Victoria Falls Safari Lodge', type: 'accommodation', lat: -17.8820, lng: 25.8010, price: '$544' },
  { id: 'map-3', name: 'Elephant Hills Resort', type: 'accommodation', lat: -17.8950, lng: 25.8180, price: '$400' },
  { id: 'map-4', name: 'Savanna68 Hotel', type: 'accommodation', lat: -17.9210, lng: 25.8350, price: '$171' },
  { id: 'map-5', name: 'Ilala Lodge Hotel', type: 'accommodation', lat: -17.9370, lng: 25.8210, price: '$616' },
  { id: 'map-6', name: 'The Boma — Dinner & Drum Show', type: 'restaurant', lat: -17.9290, lng: 25.8260, price: '$85' },
  { id: 'map-7', name: 'Victoria Falls', type: 'attraction', lat: -17.9315, lng: 25.8301, price: 'Free' },
  { id: 'map-8', name: 'Victoria Falls Bridge', type: 'attraction', lat: -17.9319, lng: 25.8288, price: 'Free' },
  { id: 'map-9', name: 'Helipad', type: 'airport', lat: -17.8621, lng: 25.8310, price: '' }
];

export const transportServices = [
  {
    id: 'trans-1',
    name: 'Airport Transfer',
    slug: 'airport-transfer',
    description: 'Direct transfer from Victoria Falls Airport to your hotel or lodge. Air-conditioned vehicles with professional drivers.',
    route: 'Airport → Hotel',
    duration: '20 minutes',
    priceFrom: 35,
    priceUnit: 'per vehicle',
    vehicleType: 'Sedan',
    capacity: '3 passengers',
    features: ['Air conditioning', 'Meet & greet', 'Flight tracking', 'Child seats available'],
    available: true,
    rating: 4.8,
    reviewCount: 234
  },
  {
    id: 'trans-2',
    name: 'Hotel Transfer',
    slug: 'hotel-transfer',
    description: 'Door-to-door transfer between your hotel and any activity, restaurant, or attraction in Victoria Falls.',
    route: 'Hotel → Activity',
    duration: '15 minutes',
    priceFrom: 25,
    priceUnit: 'per vehicle',
    vehicleType: 'Sedan',
    capacity: '3 passengers',
    features: ['Air conditioning', 'Flexible scheduling', 'Local knowledge', 'Waiting time included'],
    available: true,
    rating: 4.7,
    reviewCount: 189
  },
  {
    id: 'trans-3',
    name: 'Private Driver',
    slug: 'private-driver',
    description: 'Hire a professional driver for the day. Perfect for exploring Victoria Falls at your own pace with a knowledgeable local guide.',
    route: 'Hourly booking',
    duration: '4-8 hours',
    priceFrom: 50,
    priceUnit: 'per hour',
    vehicleType: 'SUV',
    capacity: '4 passengers',
    features: ['Full day hire', 'Local guide knowledge', 'Flexible itinerary', 'Fuel included'],
    available: true,
    rating: 4.9,
    reviewCount: 156
  },
  {
    id: 'trans-4',
    name: 'Shuttle Service',
    slug: 'shuttle-service',
    description: 'Affordable shared shuttle service connecting major hotels, the town center, and Victoria Falls attractions.',
    route: 'Shared routes',
    duration: '10-30 minutes',
    priceFrom: 15,
    priceUnit: 'per person',
    vehicleType: 'Minibus',
    capacity: '14 passengers',
    features: ['Fixed routes', 'Regular departures', 'Air conditioning', 'Luggage space'],
    available: true,
    rating: 4.5,
    reviewCount: 312
  }
];

export const events = [
  {
    id: 'event-1',
    name: 'Victoria Falls Carnival',
    slug: 'victoria-falls-carnival',
    category: 'Festivals',
    description: 'Three days of music, culture, and celebration ringing in the new year at Victoria Falls.',
    longDescription: 'The Victoria Falls Carnival is Southern Africa\'s premier New Year\'s celebration. Over three days, the town comes alive with live music, cultural performances, bush parties, and the iconic Devil\'s Pool swim on New Year\'s Day.',
    date: 'Dec 28-31, 2026',
    price: 120,
    priceUnit: 'per person',
    location: 'Victoria Falls Town',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    featured: true
  },
  {
    id: 'event-2',
    name: 'Africa Travel Week',
    slug: 'africa-travel-week',
    category: 'Conferences',
    description: 'The continent\'s premier travel industry event bringing together tourism professionals.',
    longDescription: 'Africa Travel Week is the continent\'s leading travel and tourism trade event, featuring keynote speakers, workshops, and networking opportunities for tourism professionals.',
    date: 'Mar 10-12, 2027',
    price: 0,
    priceUnit: 'Free registration',
    location: 'Victoria Falls Conference Centre',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    featured: false
  },
  {
    id: 'event-3',
    name: 'Boma Drum Show',
    slug: 'boma-drum-show',
    category: 'Live Entertainment',
    description: 'Traditional drumming and cultural performances — a nightly Victoria Falls tradition.',
    longDescription: 'Experience the rhythms of Zimbabwe at the famous Boma Drum Show. Performers in traditional dress bring the beats of Africa to life in an unforgettable evening of entertainment.',
    date: 'Nightly',
    price: 85,
    priceUnit: 'per person',
    location: 'Victoria Falls Safari Lodge',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&q=80',
    featured: true
  },
  {
    id: 'event-4',
    name: 'Zambezi Music Festival',
    slug: 'zambezi-music-festival',
    category: 'Festivals',
    description: 'Two days of African music by the river — local and international artists.',
    longDescription: 'The Zambezi Music Festival brings together the best of African music in a stunning riverside setting. Enjoy two days of performances spanning jazz, Afrobeat, traditional, and contemporary genres.',
    date: 'Jun 15-16, 2027',
    price: 75,
    priceUnit: 'per person',
    location: 'Zambezi Riverfront',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    featured: false
  },
  {
    id: 'event-5',
    name: 'Wildlife Photography Workshop',
    slug: 'wildlife-photography-workshop',
    category: 'Conferences',
    description: 'Learn from award-winning wildlife photographers in the field.',
    longDescription: 'A three-day intensive workshop combining classroom learning with field sessions in the Zambezi National Park. Learn techniques from professionals who have shot for National Geographic.',
    date: 'Sep 5-7, 2027',
    price: 250,
    priceUnit: 'per person',
    location: 'Various locations',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    featured: false
  },
  {
    id: 'event-6',
    name: 'Independence Day Celebrations',
    slug: 'independence-day',
    category: 'Cultural',
    description: 'National celebrations with traditional performances, food, and cultural showcases.',
    longDescription: 'Celebrate Zimbabwe\'s independence with a day of cultural festivities, traditional dance performances, local cuisine, and community celebrations throughout Victoria Falls.',
    date: 'Apr 18, 2027',
    price: 0,
    priceUnit: 'Free',
    location: 'Victoria Falls Town Centre',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80',
    featured: false
  }
];

export const guides = [
  {
    id: 'guide-1',
    title: 'First Time in Victoria Falls',
    slug: 'first-time',
    category: 'Travel Guide',
    excerpt: 'Everything you need to know for your first visit to the Smoke That Thunders.',
    content: 'Planning your first trip to Victoria Falls? Here\'s everything you need to know, from the best time to visit to what to pack and what not to miss.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80',
    readTime: '10 min read',
    date: '2026-06-01'
  },
  {
    id: 'guide-2',
    title: '48 Hours in Victoria Falls',
    slug: '48-hours',
    category: 'Travel Guide',
    excerpt: 'A perfectly packed two-day itinerary for the time-conscious traveler.',
    content: 'Only got two days? This guide shows you how to experience the best of Victoria Falls in just 48 hours — from sunrise helicopter flights to sunset cruises.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80',
    readTime: '8 min read',
    date: '2026-05-15'
  },
  {
    id: 'guide-3',
    title: 'Best Sunset Spots',
    slug: 'best-sunset-spots',
    category: 'Travel Guide',
    excerpt: 'Where to watch the most spectacular sunsets in Victoria Falls.',
    content: 'From the Stanley\'s Terrace to sunset cruises on the Zambezi, these are the best spots to witness Victoria Falls\' legendary sunsets.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
    readTime: '5 min read',
    date: '2026-04-20'
  },
  {
    id: 'guide-4',
    title: 'Family Adventure Guide',
    slug: 'family-adventure',
    category: 'Travel Guide',
    excerpt: 'The best family-friendly activities and stays for your Victoria Falls trip.',
    content: 'Victoria Falls is an incredible destination for families. From gentle wildlife encounters to educational cultural experiences, here\'s our guide to traveling with kids.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    readTime: '7 min read',
    date: '2026-03-10'
  },
  {
    id: 'guide-5',
    title: 'Luxury Weekend Guide',
    slug: 'luxury-weekend',
    category: 'Travel Guide',
    excerpt: 'The ultimate indulgence — a curated luxury weekend in Victoria Falls.',
    content: 'Private helicopter flights, bush dinners under the stars, and the finest accommodations — this guide is for travelers who want nothing but the best.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
    readTime: '6 min read',
    date: '2026-02-25'
  }
];