const { sequelize, Organization, User, Guest, Booking, Tour, Transport, Restaurant, GuestJourney, Notification } = require('./models');
require('dotenv').config();

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database.');

    await sequelize.sync({ force: true });
    console.log('Database tables recreated.');

    // --- ORGANIZATIONS ---
    const safariLodge = await Organization.create({
      name: 'Victoria Falls Safari Lodge',
      type: 'hotel',
      address: 'Lotri Road, Victoria Falls, Zimbabwe',
      phone: '+263 13 43 211',
      email: 'info@safarilodge.co.zw',
      logo: '/logos/safari-lodge.png',
    });

    const palmRiver = await Organization.create({
      name: 'Palm River Hotel',
      type: 'hotel',
      address: '101 Mallet Avenue, Victoria Falls, Zimbabwe',
      phone: '+263 13 44 555',
      email: 'reservations@palmriver.co.zw',
      logo: '/logos/palm-river.png',
    });

    const wildHorizons = await Organization.create({
      name: 'Wild Horizons Tour Co.',
      type: 'tour_operator',
      address: '392 Livingstone Way, Victoria Falls, Zimbabwe',
      phone: '+263 13 42 333',
      email: 'bookings@wildhorizons.co.zw',
      logo: '/logos/wild-horizons.png',
    });

    console.log('Organizations seeded.');

    // --- USERS ---
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@guestflow.com',
      password: 'admin123',
      role: 'super_admin',
      phone: '+263 77 123 4567',
    });

    const hotelMgr = await User.create({
      name: 'Tendai Moyo',
      email: 'tendai@safarilodge.co.zw',
      password: 'password123',
      role: 'hotel_manager',
      organizationId: safariLodge.id,
      phone: '+263 77 234 5678',
    });

    const tourMgr = await User.create({
      name: 'Sarah Nkomo',
      email: 'sarah@wildhorizons.co.zw',
      password: 'password123',
      role: 'tour_operator',
      organizationId: wildHorizons.id,
      phone: '+263 77 345 6789',
    });

    const transportMgr = await User.create({
      name: 'David Chikowore',
      email: 'david@wildhorizons.co.zw',
      password: 'password123',
      role: 'transport_manager',
      organizationId: wildHorizons.id,
      phone: '+263 77 456 7890',
    });

    const restaurantMgr = await User.create({
      name: 'Grace Banda',
      email: 'grace@palmriver.co.zw',
      password: 'password123',
      role: 'restaurant_manager',
      organizationId: palmRiver.id,
      phone: '+263 77 567 8901',
    });

    console.log('Users seeded.');

    // --- GUESTS ---
    const guestData = [
      { firstName: 'James', lastName: 'Anderson', email: 'james.anderson@email.com', phone: '+1 555 123 4567', nationality: 'American', passportNumber: 'US12345678', dateOfBirth: '1985-03-15', nationalityFlag: '🇺🇸', specialRequests: 'Window seat, vegetarian meals', notes: 'Honeymoon trip, first time in Africa' },
      { firstName: 'Emma', lastName: 'Thompson', email: 'emma.t@email.co.uk', phone: '+44 7700 900123', nationality: 'British', passportNumber: 'GB98765432', dateOfBirth: '1990-07-22', nationalityFlag: '🇬🇧', specialRequests: 'Late checkout', notes: 'Returning guest, loves wildlife photography' },
      { firstName: 'Hans', lastName: 'Mueller', email: 'h.mueller@web.de', phone: '+49 171 2345678', nationality: 'German', passportNumber: 'DE45678901', dateOfBirth: '1978-11-08', nationalityFlag: '🇩🇪', specialRequests: 'German-speaking guide if possible', notes: 'Traveling with teenage children' },
      { firstName: 'Priya', lastName: 'Patel', email: 'priya.patel@gmail.com', phone: '+91 98765 43210', nationality: 'Indian', passportNumber: 'IN34567890', dateOfBirth: '1992-01-30', nationalityFlag: '🇮🇳', specialRequests: 'Halal food options', notes: 'Adventure enthusiast, wants white water rafting' },
      { firstName: 'Pieter', lastName: 'van der Merwe', email: 'pieter.vdm@email.co.za', phone: '+27 82 345 6789', nationality: 'South African', passportNumber: 'ZA78901234', dateOfBirth: '1988-05-17', nationalityFlag: '🇿🇦', specialRequests: 'Braai facilities information', notes: 'Driving from Johannesburg, familiar with region' },
      { firstName: 'Sophie', lastName: 'Laurent', email: 'sophie.laurent@email.fr', phone: '+33 6 12 34 56 78', nationality: 'French', passportNumber: 'FR65432109', dateOfBirth: '1995-09-03', nationalityFlag: '🇫🇷', specialRequests: 'French wine selection at dinner', notes: 'Solo traveler, architecture enthusiast' },
      { firstName: 'Michael', lastName: 'O\'Brien', email: 'mobrien@email.ca', phone: '+1 416 555 0199', nationality: 'Canadian', passportNumber: 'CA87654321', dateOfBirth: '1982-12-25', nationalityFlag: '🇨🇦', specialRequests: 'Accessible transport needed', notes: 'Retired teacher, traveling with wife' },
      { firstName: 'Yuki', lastName: 'Tanaka', email: 'yuki.tanaka@email.jp', phone: '+81 90 1234 5678', nationality: 'Japanese', passportNumber: 'JP11223344', dateOfBirth: '1998-04-12', nationalityFlag: '🇯🇵', specialRequests: 'Camera equipment storage', notes: 'Professional photographer, wildlife documentary' },
      { firstName: 'Amara', lastName: 'Okonkwo', email: 'amara.ok@email.ng', phone: '+234 802 345 6789', nationality: 'Nigerian', passportNumber: 'NG55667788', dateOfBirth: '1987-08-19', nationalityFlag: '🇳🇬', specialRequests: 'VIP treatment, private transfers', notes: 'CEO on corporate retreat with team of 4' },
      { firstName: 'Carlos', lastName: 'Rodriguez', email: 'carlos.r@email.es', phone: '+34 612 345 678', nationality: 'Spanish', passportNumber: 'ES99887766', dateOfBirth: '1993-02-14', nationalityFlag: '🇪🇸', specialRequests: 'Flamenco music recommendations', notes: 'Celebrating 30th birthday with friends' },
      { firstName: 'Anna', lastName: 'Johansson', email: 'anna.j@email.se', phone: '+46 70 123 4567', nationality: 'Swedish', passportNumber: 'SE33445566', dateOfBirth: '1991-06-28', nationalityFlag: '🇸🇪', specialRequests: 'Eco-friendly activities preferred', notes: 'Conservation volunteer, interested in anti-poaching' },
      { firstName: 'Chen', lastName: 'Wei', email: 'chen.wei@email.cn', phone: '+86 138 1234 5678', nationality: 'Chinese', passportNumber: 'CN77889900', dateOfBirth: '1980-10-05', nationalityFlag: '🇨🇳', specialRequests: 'Mandarin-speaking guide', notes: 'Travel agent scouting for group tours' },
      { firstName: 'Isabella', lastName: 'Santos', email: 'isabella.s@email.br', phone: '+55 11 98765 4321', nationality: 'Brazilian', passportNumber: 'BR12131415', dateOfBirth: '1996-07-08', nationalityFlag: '🇧🇷', specialRequests: 'Surfing and water activities', notes: 'Gap year traveler, social media influencer' },
      { firstName: 'Oliver', lastName: 'Smith', email: 'oliver.smith@email.au', phone: '+61 412 345 678', nationality: 'Australian', passportNumber: 'AU16171819', dateOfBirth: '1984-04-20', nationalityFlag: '🇦🇺', specialRequests: 'BBQ facilities at hotel', notes: 'Zimbabwean-born, visiting family, second generation' },
      { firstName: 'Fatima', lastName: 'Al-Hassan', email: 'fatima.h@email.ae', phone: '+971 50 123 4567', nationality: 'Emirati', passportNumber: 'AE20212223', dateOfBirth: '1989-12-01', nationalityFlag: '🇦🇪', specialRequests: 'Private dining area, prayer times schedule', notes: 'Family of 6 including 3 children under 10' },
    ];

    const guests = [];
    for (const gd of guestData) {
      const guest = await Guest.create(gd);
      guests.push(guest);
    }

    console.log('15 guests seeded.');

    // --- TOURS ---
    const tourData = [
      { name: 'Sunset Zambezi Cruise', description: 'Experience a magical sunset cruise on the upper Zambezi River. Includes drinks, snacks, and wildlife viewing as elephants and hippos come to the riverbank.', type: 'cruise', duration: '3 hours', maxCapacity: 40, currentBookings: 18, price: 75, status: 'active', availableDates: ['2026-07-22', '2026-07-23', '2026-07-24', '2026-07-25', '2026-07-26', '2026-07-27', '2026-07-28'], meetingPoint: 'Jetty Boat Club, Victoria Falls', includes: ['Drinks and snacks', 'Sunset viewing', 'Wildlife guide', 'Life jackets'], organizationId: wildHorizons.id },
      { name: 'Helicopter Flight of Angels', description: 'A breathtaking 15-minute helicopter flight over Victoria Falls, one of the Seven Natural Wonders of the World. Get unparalleled aerial views of the falls and the Batoka Gorge.', type: 'helicopter', duration: '15 minutes', maxCapacity: 5, currentBookings: 3, price: 185, status: 'active', availableDates: ['2026-07-22', '2026-07-23', '2026-07-24', '2026-07-25', '2026-07-26'], meetingPoint: 'Helipad, Victoria Falls Airport Road', includes: ['Helicopter flight', 'Safety briefing', 'Commemorative flight certificate'], organizationId: wildHorizons.id },
      { name: 'Big Five Safari Game Drive', description: 'Early morning game drive through the Zambezi National Park. Spot elephants, buffalo, lions, leopards, and rhinos in their natural habitat with expert guides.', type: 'safari', duration: '4 hours', maxCapacity: 8, currentBookings: 6, price: 120, status: 'active', availableDates: ['2026-07-22', '2026-07-23', '2026-07-24', '2026-07-25', '2026-07-26', '2026-07-27'], meetingPoint: 'Safari Lodge Reception', includes: ['Game drive vehicle', 'Expert guide', 'Bush breakfast', 'Binoculars'], organizationId: wildHorizons.id },
      { name: "Devil's Pool Adventure", description: "Swim in the famous Devil's Pool, a natural rock pool at the very edge of Victoria Falls. Available only during low water season. An adrenaline-pumping once-in-a-lifetime experience.", type: 'pool', duration: '5 hours', maxCapacity: 12, currentBookings: 8, price: 150, status: 'active', availableDates: ['2026-07-22', '2026-07-24', '2026-07-26'], meetingPoint: 'Livingstone Island Jetty, Zambia side', includes: ['Boat transfer', 'Island guide', 'Safety equipment', 'Swimming at the pool'], organizationId: wildHorizons.id },
      { name: 'White Water Rafting - Grade 5', description: 'Tackle the mighty Zambezi rapids on this full-day white water rafting adventure. The Batoka Gorge offers some of the best rafting in the world.', type: 'walking', duration: 'Full day', maxCapacity: 20, currentBookings: 12, price: 140, status: 'active', availableDates: ['2026-07-22', '2026-07-23', '2026-07-25', '2026-07-27'], meetingPoint: 'Rafting Base, Lookout Cafe parking', includes: ['Professional rafting guides', 'All safety gear', 'Lunch and drinks', 'Photos and video'], organizationId: wildHorizons.id },
      { name: 'Walking Safari & Bush Craft', description: 'Guided walking safari through the Zambezi National Park. Learn about tracking, medicinal plants, and survival skills from expert rangers.', type: 'walking', duration: '3 hours', maxCapacity: 10, currentBookings: 4, price: 85, status: 'active', availableDates: ['2026-07-22', '2026-07-23', '2026-07-24', '2026-07-25', '2026-07-26', '2026-07-27', '2026-07-28'], meetingPoint: 'National Park Main Gate', includes: ['Armed ranger', 'Binoculars', 'Water and snacks', 'Bush knowledge booklet'], organizationId: wildHorizons.id },
      { name: 'Bungee Jumping at Victoria Falls Bridge', description: 'Take the ultimate leap of faith from the Victoria Falls Bridge, 111 meters above the Zambezi Gorge. The world\'s highest commercial bungee jump.', type: 'walking', duration: '1 hour', maxCapacity: 30, currentBookings: 15, price: 160, status: 'active', availableDates: ['2026-07-22', '2026-07-23', '2026-07-24', '2026-07-25', '2026-07-26', '2026-07-27', '2026-07-28'], meetingPoint: 'Victoria Falls Bridge Zipline Base', includes: ['Safety briefing', 'Jump equipment', 'Certificate', 'Video of jump'], organizationId: wildHorizons.id },
      { name: 'Lion Walk Experience', description: 'Walk alongside rescued lions in a natural bush setting. Learn about lion conservation while walking with these magnificent creatures under expert supervision.', type: 'walking', duration: '2 hours', maxCapacity: 8, currentBookings: 5, price: 110, status: 'active', availableDates: ['2026-07-22', '2026-07-24', '2026-07-26'], meetingPoint: 'Wild Horizons Animal Sanctuary', includes: ['Sanctuary entry', 'Expert guide', 'Conservation talk', 'Photo opportunity'], organizationId: wildHorizons.id },
      { name: 'Culinary Safari & Wine Tasting', description: 'Combine wildlife viewing with a gourmet bush breakfast and local wine tasting. A perfect blend of nature and cuisine for food lovers.', type: 'safari', duration: '5 hours', maxCapacity: 12, currentBookings: 7, price: 175, status: 'active', availableDates: ['2026-07-23', '2026-07-25', '2026-07-27'], meetingPoint: 'Palm River Hotel Lobby', includes: ['Game drive', 'Bush breakfast', 'Wine tasting', 'Gourmet picnic'], organizationId: wildHorizons.id },
      { name: 'Moonlit Zambezi Canoe Safari', description: 'Paddle down the Zambezi under the African moonlight. Experience nocturnal wildlife, hippos, and stellar southern hemisphere skies.', type: 'cruise', duration: '4 hours', maxCapacity: 10, currentBookings: 6, price: 95, status: 'active', availableDates: ['2026-07-23', '2026-07-25', '2026-07-27'], meetingPoint: 'Safari Kayak Launch Point', includes: ['Canoe and equipment', 'Moonlight guide', 'Drinks and snacks', 'Safety gear'], organizationId: wildHorizons.id },
      { name: 'Elephant Sanctuary Visit', description: 'Meet, feed, and learn about rescued elephants at a local sanctuary. An educational and heartwarming experience for all ages.', type: 'walking', duration: '2.5 hours', maxCapacity: 15, currentBookings: 10, price: 90, status: 'active', availableDates: ['2026-07-22', '2026-07-23', '2026-07-24', '2026-07-25', '2026-07-26', '2026-07-27', '2026-07-28'], meetingPoint: 'Elephant Sanctuary Main Gate', includes: ['Sanctuary entry', 'Elephant interaction', 'Expert keeper guide', 'Refreshments'], organizationId: wildHorizons.id },
    ];

    const tours = [];
    for (const td of tourData) {
      const tour = await Tour.create(td);
      tours.push(tour);
    }

    console.log('12 tours seeded.');

    // --- BOOKINGS ---
    const bookingData = [
      // Hotel bookings
      { guestId: guests[0].id, type: 'hotel', status: 'confirmed', checkIn: new Date('2026-07-22T14:00:00'), checkOut: new Date('2026-07-26T11:00:00'), details: { roomType: 'Deluxe Suite', roomNumber: '201', bedType: 'King', view: 'River View', breakfast: true }, totalAmount: 1200, currency: 'USD', organizationId: safariLodge.id },
      { guestId: guests[1].id, type: 'hotel', status: 'checked_in', checkIn: new Date('2026-07-20T14:00:00'), checkOut: new Date('2026-07-24T11:00:00'), details: { roomType: 'Standard Twin', roomNumber: '105', bedType: 'Twin', view: 'Garden View', breakfast: true }, totalAmount: 680, currency: 'USD', organizationId: safariLodge.id },
      { guestId: guests[2].id, type: 'hotel', status: 'confirmed', checkIn: new Date('2026-07-23T14:00:00'), checkOut: new Date('2026-07-28T11:00:00'), details: { roomType: 'Family Suite', roomNumber: '302', bedType: 'King + 2 Singles', view: 'Pool View', breakfast: true, extraBed: true }, totalAmount: 2100, currency: 'USD', organizationId: palmRiver.id },
      { guestId: guests[3].id, type: 'hotel', status: 'pending', checkIn: new Date('2026-07-25T14:00:00'), checkOut: new Date('2026-07-29T11:00:00'), details: { roomType: 'Standard Double', roomNumber: '108', bedType: 'Queen', view: 'Garden View', breakfast: false }, totalAmount: 480, currency: 'USD', organizationId: palmRiver.id },
      { guestId: guests[4].id, type: 'hotel', status: 'completed', checkIn: new Date('2026-07-15T14:00:00'), checkOut: new Date('2026-07-20T11:00:00'), details: { roomType: 'Executive Suite', roomNumber: '401', bedType: 'King', view: 'River View', breakfast: true }, totalAmount: 1500, currency: 'USD', organizationId: safariLodge.id },
      { guestId: guests[8].id, type: 'hotel', status: 'confirmed', checkIn: new Date('2026-07-24T14:00:00'), checkOut: new Date('2026-07-27T11:00:00'), details: { roomType: 'Presidential Suite', roomNumber: '501', bedType: 'King', view: 'Panoramic River', breakfast: true, minibar: true, butler: true }, totalAmount: 2500, currency: 'USD', organizationId: safariLodge.id },
      // Activity bookings
      { guestId: guests[0].id, type: 'activity', status: 'confirmed', checkIn: new Date('2026-07-23T06:00:00'), checkOut: new Date('2026-07-23T10:00:00'), details: { tourName: 'Big Five Safari Game Drive', participants: 2, pickupTime: '05:30' }, totalAmount: 240, currency: 'USD', organizationId: wildHorizons.id },
      { guestId: guests[1].id, type: 'activity', status: 'confirmed', checkIn: new Date('2026-07-22T15:00:00'), checkOut: new Date('2026-07-22T18:00:00'), details: { tourName: 'Sunset Zambezi Cruise', participants: 1 }, totalAmount: 75, currency: 'USD', organizationId: wildHorizons.id },
      { guestId: guests[2].id, type: 'activity', status: 'pending', checkIn: new Date('2026-07-25T08:00:00'), checkOut: new Date('2026-07-25T13:00:00'), details: { tourName: "Devil's Pool Adventure", participants: 4 }, totalAmount: 600, currency: 'USD', organizationId: wildHorizons.id },
      { guestId: guests[3].id, type: 'activity', status: 'confirmed', checkIn: new Date('2026-07-26T08:00:00'), checkOut: new Date('2026-07-26T17:00:00'), details: { tourName: 'White Water Rafting - Grade 5', participants: 1 }, totalAmount: 140, currency: 'USD', organizationId: wildHorizons.id },
      { guestId: guests[5].id, type: 'activity', status: 'confirmed', checkIn: new Date('2026-07-23T07:00:00'), checkOut: new Date('2026-07-23T08:30:00'), details: { tourName: 'Walking Safari & Bush Craft', participants: 1 }, totalAmount: 85, currency: 'USD', organizationId: wildHorizons.id },
      { guestId: guests[6].id, type: 'activity', status: 'confirmed', checkIn: new Date('2026-07-24T09:00:00'), checkOut: new Date('2026-07-24T09:15:00'), details: { tourName: 'Bungee Jumping at Victoria Falls Bridge', participants: 2 }, totalAmount: 320, currency: 'USD', organizationId: wildHorizons.id },
      { guestId: guests[7].id, type: 'activity', status: 'confirmed', checkIn: new Date('2026-07-23T09:00:00'), checkOut: new Date('2026-07-23T10:15:00'), details: { tourName: 'Helicopter Flight of Angels', participants: 1 }, totalAmount: 185, currency: 'USD', organizationId: wildHorizons.id },
      { guestId: guests[12].id, type: 'activity', status: 'confirmed', checkIn: new Date('2026-07-24T15:00:00'), checkOut: new Date('2026-07-24T18:00:00'), details: { tourName: 'Sunset Zambezi Cruise', participants: 2 }, totalAmount: 150, currency: 'USD', organizationId: wildHorizons.id },
      // Restaurant bookings
      { guestId: guests[0].id, type: 'restaurant', status: 'confirmed', checkIn: new Date('2026-07-22T19:00:00'), details: { restaurantName: 'The Baobab Restaurant', partySize: 2, cuisine: 'African Contemporary', occasion: 'Honeymoon dinner' }, totalAmount: 120, currency: 'USD', organizationId: palmRiver.id },
      { guestId: guests[5].id, type: 'restaurant', status: 'confirmed', checkIn: new Date('2026-07-23T20:00:00'), details: { restaurantName: 'Cafe Copa', partySize: 1, cuisine: 'French-African Fusion' }, totalAmount: 65, currency: 'USD', organizationId: palmRiver.id },
      // Transport bookings
      { guestId: guests[0].id, type: 'transport', status: 'confirmed', checkIn: new Date('2026-07-22T12:00:00'), details: { pickup: 'Victoria Falls Airport', dropoff: 'Victoria Falls Safari Lodge', flightNumber: 'BN512', vehicleType: 'Private Sedan' }, totalAmount: 50, currency: 'USD', organizationId: wildHorizons.id },
      { guestId: guests[2].id, type: 'transport', status: 'confirmed', checkIn: new Date('2026-07-23T11:00:00'), details: { pickup: 'Victoria Falls Airport', dropoff: 'Palm River Hotel', flightNumber: 'ET821', vehicleType: 'SUV' }, totalAmount: 65, currency: 'USD', organizationId: wildHorizons.id },
      { guestId: guests[9].id, type: 'transport', status: 'pending', checkIn: new Date('2026-07-25T08:00:00'), details: { pickup: 'Palm River Hotel', dropoff: 'Victoria Falls Airport', vehicleType: 'Private Sedan' }, totalAmount: 50, currency: 'USD', organizationId: wildHorizons.id },
      { guestId: guests[14].id, type: 'transport', status: 'confirmed', checkIn: new Date('2026-07-24T14:00:00'), details: { pickup: 'Victoria Falls Airport', dropoff: 'Safari Lodge', flightNumber: 'SA420', vehicleType: 'Minibus', passengers: 6 }, totalAmount: 90, currency: 'USD', organizationId: wildHorizons.id },
    ];

    for (const bd of bookingData) {
      await Booking.create(bd);
    }

    console.log('21 bookings seeded.');

    // --- TRANSPORT RECORDS ---
    const transportData = [
      { guestId: guests[0].id, driverName: 'Tapiwa Chidya', driverPhone: '+263 77 111 2222', vehicleType: 'Toyota Corolla', vehiclePlate: 'ABC 123D', pickupLocation: 'Victoria Falls Airport', dropoffLocation: 'Victoria Falls Safari Lodge', pickupTime: new Date('2026-07-22T12:30:00'), status: 'completed', flightNumber: 'BN512', flightTime: new Date('2026-07-22T11:30:00'), organizationId: wildHorizons.id },
      { guestId: guests[2].id, driverName: 'Blessing Moyo', driverPhone: '+263 77 222 3333', vehicleType: 'Toyota Land Cruiser', vehiclePlate: 'DEF 456E', pickupLocation: 'Victoria Falls Airport', dropoffLocation: 'Palm River Hotel', pickupTime: new Date('2026-07-23T11:30:00'), status: 'assigned', flightNumber: 'ET821', flightTime: new Date('2026-07-23T10:45:00'), organizationId: wildHorizons.id },
      { guestId: guests[3].id, driverName: 'Tapiwa Chidya', driverPhone: '+263 77 111 2222', vehicleType: 'Honda CR-V', vehiclePlate: 'GHI 789F', pickupLocation: 'Palm River Hotel', dropoffLocation: 'Victoria Falls Bridge', pickupTime: new Date('2026-07-23T07:00:00'), status: 'pending', organizationId: wildHorizons.id },
      { guestId: guests[5].id, driverName: 'Naison Dube', driverPhone: '+263 77 333 4444', vehicleType: 'Toyota Corolla', vehiclePlate: 'JKL 012G', pickupLocation: 'Palm River Hotel', dropoffLocation: 'Zambezi National Park Gate', pickupTime: new Date('2026-07-23T06:00:00'), status: 'assigned', organizationId: wildHorizons.id },
      { guestId: guests[6].id, driverName: 'Blessing Moyo', driverPhone: '+263 77 222 3333', vehicleType: 'Hyundai Tucson', vehiclePlate: 'MNO 345H', pickupLocation: 'Safari Lodge', dropoffLocation: 'Victoria Falls Bridge', pickupTime: new Date('2026-07-24T08:00:00'), status: 'pending', organizationId: wildHorizons.id },
      { guestId: guests[7].id, driverName: 'Tapiwa Chidya', driverPhone: '+263 77 111 2222', vehicleType: 'Toyota Land Cruiser', vehiclePlate: 'PQR 678J', pickupLocation: 'Safari Lodge', dropoffLocation: 'Helipad', pickupTime: new Date('2026-07-23T08:30:00'), status: 'completed', organizationId: wildHorizons.id },
      { guestId: guests[8].id, driverName: 'Naison Dube', driverPhone: '+263 77 333 4444', vehicleType: 'Mercedes S-Class', vehiclePlate: 'STU 901K', pickupLocation: 'Victoria Falls Airport', dropoffLocation: 'Victoria Falls Safari Lodge', pickupTime: new Date('2026-07-24T13:00:00'), status: 'pending', flightNumber: 'SA420', flightTime: new Date('2026-07-24T12:15:00'), organizationId: wildHorizons.id },
      { guestId: guests[9].id, driverName: 'Blessing Moyo', driverPhone: '+263 77 222 3333', vehicleType: 'Toyota Corolla', vehiclePlate: 'VWX 234L', pickupLocation: 'Palm River Hotel', dropoffLocation: 'Victoria Falls Airport', pickupTime: new Date('2026-07-25T08:00:00'), status: 'pending', organizationId: wildHorizons.id },
      { guestId: guests[10].id, driverName: 'Tapiwa Chidya', driverPhone: '+263 77 111 2222', vehicleType: 'Toyota Hilux', vehiclePlate: 'YZA 567M', pickupLocation: 'Safari Lodge', dropoffLocation: 'Zambezi National Park', pickupTime: new Date('2026-07-22T05:00:00'), status: 'en_route', organizationId: wildHorizons.id },
      { guestId: guests[11].id, driverName: 'Naison Dube', driverPhone: '+263 77 333 4444', vehicleType: 'Hyundai Tucson', vehiclePlate: 'BCD 890N', pickupLocation: 'Palm River Hotel', dropoffLocation: 'Livingstone Island Jetty', pickupTime: new Date('2026-07-24T06:30:00'), status: 'pending', organizationId: wildHorizons.id },
      { guestId: guests[12].id, driverName: 'Blessing Moyo', driverPhone: '+263 77 222 3333', vehicleType: 'Honda CR-V', vehiclePlate: 'EFG 123P', pickupLocation: 'Safari Lodge', dropoffLocation: 'Jetty Boat Club', pickupTime: new Date('2026-07-24T14:30:00'), status: 'pending', organizationId: wildHorizons.id },
      { guestId: guests[14].id, driverName: 'Tapiwa Chidya', driverPhone: '+263 77 111 2222', vehicleType: 'Toyota HiAce Minibus', vehiclePlate: 'HIJ 456Q', pickupLocation: 'Victoria Falls Airport', dropoffLocation: 'Victoria Falls Safari Lodge', pickupTime: new Date('2026-07-24T14:00:00'), status: 'assigned', flightNumber: 'SA420', flightTime: new Date('2026-07-24T13:00:00'), organizationId: wildHorizons.id },
    ];

    for (const td of transportData) {
      await Transport.create(td);
    }

    console.log('12 transport records seeded.');

    // --- RESTAURANT RESERVATIONS ---
    const restaurantData = [
      { guestId: guests[0].id, restaurantName: 'The Baobab Restaurant', reservationDate: '2026-07-22', reservationTime: '19:00', partySize: 2, tableNumber: 'B7', status: 'confirmed', specialRequests: 'Window table, candlelight setup for honeymoon', organizationId: palmRiver.id },
      { guestId: guests[1].id, restaurantName: 'Cafe Copa', reservationDate: '2026-07-23', reservationTime: '20:00', partySize: 1, tableNumber: 'C3', status: 'confirmed', specialRequests: 'Quiet corner for reading', organizationId: palmRiver.id },
      { guestId: guests[2].id, restaurantName: 'The Baobab Restaurant', reservationDate: '2026-07-24', reservationTime: '18:30', partySize: 4, tableNumber: 'A2', status: 'pending', specialRequests: 'High chair needed for 6-year-old', organizationId: palmRiver.id },
      { guestId: guests[4].id, restaurantName: 'Vulture Club', reservationDate: '2026-07-23', reservationTime: '12:30', partySize: 2, tableNumber: 'D5', status: 'completed', specialRequests: 'Braai platter for two', organizationId: safariLodge.id },
      { guestId: guests[5].id, restaurantName: 'Cafe Copa', reservationDate: '2026-07-24', reservationTime: '19:30', partySize: 1, tableNumber: 'C1', status: 'confirmed', specialRequests: 'French wine list', organizationId: palmRiver.id },
      { guestId: guests[7].id, restaurantName: 'The Baobab Restaurant', reservationDate: '2026-07-23', reservationTime: '19:00', partySize: 1, tableNumber: 'B3', status: 'confirmed', specialRequests: 'Photography-friendly lighting', organizationId: palmRiver.id },
      { guestId: guests[8].id, restaurantName: 'Chef\'s Table', reservationDate: '2026-07-25', reservationTime: '20:00', partySize: 6, tableNumber: 'VIP1', status: 'confirmed', specialRequests: 'Private dining room, full privacy screens', organizationId: safariLodge.id },
      { guestId: guests[9].id, restaurantName: 'Vulture Club', reservationDate: '2026-07-26', reservationTime: '19:00', partySize: 5, tableNumber: 'A1', status: 'pending', specialRequests: 'Birthday cake and decorations', organizationId: safariLodge.id },
      { guestId: guests[10].id, restaurantName: 'Cafe Copa', reservationDate: '2026-07-23', reservationTime: '18:00', partySize: 1, tableNumber: 'D2', status: 'confirmed', specialRequests: 'Vegan options', organizationId: palmRiver.id },
      { guestId: guests[11].id, restaurantName: 'The Baobab Restaurant', reservationDate: '2026-07-25', reservationTime: '19:30', partySize: 2, tableNumber: 'B5', status: 'pending', specialRequests: 'Mandarin-speaking waiter if available', organizationId: palmRiver.id },
      { guestId: guests[12].id, restaurantName: 'Vulture Club', reservationDate: '2026-07-25', reservationTime: '20:30', partySize: 3, tableNumber: 'C6', status: 'confirmed', specialRequests: 'Caipirinha cocktails', organizationId: safariLodge.id },
      { guestId: guests[13].id, restaurantName: 'The Baobab Restaurant', reservationDate: '2026-07-23', reservationTime: '19:00', partySize: 2, tableNumber: 'A5', status: 'confirmed', specialRequests: 'Australian wine selection', organizationId: palmRiver.id },
      { guestId: guests[14].id, restaurantName: 'Chef\'s Table', reservationDate: '2026-07-25', reservationTime: '20:00', partySize: 6, tableNumber: 'VIP2', status: 'confirmed', specialRequests: 'Halal menu, separate dining area, prayer space nearby', organizationId: safariLodge.id },
    ];

    for (const rd of restaurantData) {
      await Restaurant.create(rd);
    }

    console.log('13 restaurant reservations seeded.');

    // --- GUEST JOURNEYS ---
    const journeyTemplates = [
      // Guest 0 - James Anderson (American, honeymoon)
      { guestId: guests[0].id, type: 'arrival', title: 'Airport Pickup', description: 'Private sedan transfer from Victoria Falls Airport (VFA) to Victoria Falls Safari Lodge.', timestamp: new Date('2026-07-22T12:30:00'), status: 'completed', location: 'Victoria Falls Airport', metadata: { flightNumber: 'BN512', vehicle: 'Toyota Corolla ABC 123D' }, organizationId: wildHorizons.id },
      { guestId: guests[0].id, type: 'check_in', title: 'Hotel Check-In', description: 'Checked into Deluxe Suite 201 at Victoria Falls Safari Lodge. River view room with king bed.', timestamp: new Date('2026-07-22T14:30:00'), status: 'completed', location: 'Victoria Falls Safari Lodge', metadata: { roomNumber: '201', roomType: 'Deluxe Suite' }, organizationId: safariLodge.id },
      { guestId: guests[0].id, type: 'dining', title: 'Honeymoon Dinner', description: 'Candlelight dinner for two at The Baobab Restaurant. African Contemporary cuisine.', timestamp: new Date('2026-07-22T19:00:00'), status: 'completed', location: 'The Baobab Restaurant', metadata: { restaurant: 'The Baobab Restaurant', partySize: 2 }, organizationId: palmRiver.id },
      { guestId: guests[0].id, type: 'activity', title: 'Big Five Safari Game Drive', description: 'Early morning game drive in Zambezi National Park. Expect to see elephants, buffalo, and lions.', timestamp: new Date('2026-07-23T06:00:00'), status: 'upcoming', location: 'Zambezi National Park', metadata: { tourName: 'Big Five Safari Game Drive', pickupTime: '05:30' }, organizationId: wildHorizons.id },
      { guestId: guests[0].id, type: 'activity', title: 'Helicopter Flight of Angels', description: 'Scenic helicopter flight over Victoria Falls.', timestamp: new Date('2026-07-24T09:00:00'), status: 'upcoming', location: 'Helipad', metadata: { tourName: 'Helicopter Flight of Angels' }, organizationId: wildHorizons.id },
      { guestId: guests[0].id, type: 'check_out', title: 'Hotel Check-Out', description: 'Scheduled checkout from Victoria Falls Safari Lodge.', timestamp: new Date('2026-07-26T11:00:00'), status: 'upcoming', location: 'Victoria Falls Safari Lodge', metadata: { roomNumber: '201' }, organizationId: safariLodge.id },
      { guestId: guests[0].id, type: 'departure', title: 'Airport Drop-Off', description: 'Transfer to Victoria Falls Airport for departure flight.', timestamp: new Date('2026-07-26T12:00:00'), status: 'upcoming', location: 'Victoria Falls Airport', metadata: { flightNumber: 'BN513' }, organizationId: wildHorizons.id },

      // Guest 1 - Emma Thompson (British, returning)
      { guestId: guests[1].id, type: 'check_in', title: 'Hotel Check-In', description: 'Checked into Standard Twin 105 at Victoria Falls Safari Lodge.', timestamp: new Date('2026-07-20T14:00:00'), status: 'completed', location: 'Victoria Falls Safari Lodge', metadata: { roomNumber: '105', roomType: 'Standard Twin' }, organizationId: safariLodge.id },
      { guestId: guests[1].id, type: 'activity', title: 'Sunset Zambezi Cruise', description: 'Sunset cruise on the Zambezi. Drinks, snacks, and wildlife viewing.', timestamp: new Date('2026-07-22T15:00:00'), status: 'upcoming', location: 'Jetty Boat Club', metadata: { tourName: 'Sunset Zambezi Cruise' }, organizationId: wildHorizons.id },
      { guestId: guests[1].id, type: 'activity', title: 'Walking Safari & Bush Craft', description: 'Guided walking safari in the Zambezi National Park.', timestamp: new Date('2026-07-23T07:00:00'), status: 'upcoming', location: 'Zambezi National Park', metadata: { tourName: 'Walking Safari & Bush Craft' }, organizationId: wildHorizons.id },
      { guestId: guests[1].id, type: 'check_out', title: 'Hotel Check-Out', description: 'Scheduled checkout.', timestamp: new Date('2026-07-24T11:00:00'), status: 'upcoming', location: 'Victoria Falls Safari Lodge', metadata: { roomNumber: '105' }, organizationId: safariLodge.id },

      // Guest 2 - Hans Mueller (German, family)
      { guestId: guests[2].id, type: 'arrival', title: 'Airport Pickup', description: 'SUV transfer from Victoria Falls Airport to Palm River Hotel.', timestamp: new Date('2026-07-23T11:30:00'), status: 'upcoming', location: 'Victoria Falls Airport', metadata: { flightNumber: 'ET821', vehicle: 'Toyota Land Cruiser DEF 456E' }, organizationId: wildHorizons.id },
      { guestId: guests[2].id, type: 'check_in', title: 'Hotel Check-In', description: 'Family Suite 302 with king bed, 2 singles, and extra bed. Pool view.', timestamp: new Date('2026-07-23T14:00:00'), status: 'upcoming', location: 'Palm River Hotel', metadata: { roomNumber: '302', roomType: 'Family Suite' }, organizationId: palmRiver.id },
      { guestId: guests[2].id, type: 'activity', title: "Devil's Pool Adventure", description: "Full day trip to Devil's Pool at Livingstone Island.", timestamp: new Date('2026-07-25T08:00:00'), status: 'upcoming', location: "Livingstone Island", metadata: { tourName: "Devil's Pool Adventure", participants: 4 }, organizationId: wildHorizons.id },
      { guestId: guests[2].id, type: 'dining', title: 'Family Dinner', description: 'Family dinner at The Baobab Restaurant, high chair for youngest.', timestamp: new Date('2026-07-24T18:30:00'), status: 'upcoming', location: 'The Baobab Restaurant', metadata: { restaurant: 'The Baobab Restaurant', partySize: 4 }, organizationId: palmRiver.id },
      { guestId: guests[2].id, type: 'check_out', title: 'Hotel Check-Out', description: 'Scheduled checkout from Palm River Hotel.', timestamp: new Date('2026-07-28T11:00:00'), status: 'upcoming', location: 'Palm River Hotel', metadata: { roomNumber: '302' }, organizationId: palmRiver.id },

      // Guest 3 - Priya Patel (Indian, adventure)
      { guestId: guests[3].id, type: 'activity', title: 'White Water Rafting Briefing', description: 'Pre-rafting safety briefing and equipment fitting.', timestamp: new Date('2026-07-26T07:30:00'), status: 'upcoming', location: 'Rafting Base', metadata: { tourName: 'White Water Rafting - Grade 5' }, organizationId: wildHorizons.id },
      { guestId: guests[3].id, type: 'activity', title: 'White Water Rafting', description: 'Full day Grade 5 white water rafting on the Zambezi.', timestamp: new Date('2026-07-26T08:00:00'), status: 'upcoming', location: 'Batoka Gorge', metadata: { tourName: 'White Water Rafting - Grade 5', difficulty: 'Grade 5' }, organizationId: wildHorizons.id },

      // Guest 5 - Sophie Laurent (French, solo)
      { guestId: guests[5].id, type: 'arrival', title: 'Airport Transfer', description: 'Transfer from airport to Palm River Hotel.', timestamp: new Date('2026-07-22T14:00:00'), status: 'completed', location: 'Victoria Falls Airport', metadata: { vehicle: 'Toyota Corolla' }, organizationId: wildHorizons.id },
      { guestId: guests[5].id, type: 'check_in', title: 'Hotel Check-In', description: 'Checked into Standard Double at Palm River Hotel.', timestamp: new Date('2026-07-22T15:30:00'), status: 'completed', location: 'Palm River Hotel', metadata: { roomType: 'Standard Double' }, organizationId: palmRiver.id },
      { guestId: guests[5].id, type: 'activity', title: 'Walking Safari & Bush Craft', description: 'Guided walking safari and bush craft session.', timestamp: new Date('2026-07-23T07:00:00'), status: 'upcoming', location: 'Zambezi National Park', metadata: { tourName: 'Walking Safari & Bush Craft' }, organizationId: wildHorizons.id },
      { guestId: guests[5].id, type: 'dining', title: 'French Wine Dinner', description: 'Dinner at Cafe Copa with French wine selection.', timestamp: new Date('2026-07-23T20:00:00'), status: 'upcoming', location: 'Cafe Copa', metadata: { restaurant: 'Cafe Copa', specialRequest: 'French wine list' }, organizationId: palmRiver.id },

      // Guest 7 - Yuki Tanaka (Japanese, photographer)
      { guestId: guests[7].id, type: 'activity', title: 'Helicopter Photo Flight', description: 'Helicopter Flight of Angels - perfect for aerial photography.', timestamp: new Date('2026-07-23T09:00:00'), status: 'upcoming', location: 'Helipad', metadata: { tourName: 'Helicopter Flight of Angels', purpose: 'Photography' }, organizationId: wildHorizons.id },
      { guestId: guests[7].id, type: 'dining', title: 'Photographer Dinner', description: 'Dinner at The Baobab Restaurant with photography-friendly lighting.', timestamp: new Date('2026-07-23T19:00:00'), status: 'upcoming', location: 'The Baobab Restaurant', metadata: { restaurant: 'The Baobab Restaurant' }, organizationId: palmRiver.id },

      // Guest 8 - Amara Okonkwo (Nigerian, VIP/CEO)
      { guestId: guests[8].id, type: 'arrival', title: 'VIP Airport Pickup', description: 'Mercedes S-Class private transfer for VIP guest.', timestamp: new Date('2026-07-24T13:30:00'), status: 'upcoming', location: 'Victoria Falls Airport', metadata: { vehicle: 'Mercedes S-Class', vip: true, flightNumber: 'SA420' }, organizationId: wildHorizons.id },
      { guestId: guests[8].id, type: 'check_in', title: 'VIP Check-In', description: 'Presidential Suite 501 with butler service, panoramic river view.', timestamp: new Date('2026-07-24T15:00:00'), status: 'upcoming', location: 'Victoria Falls Safari Lodge', metadata: { roomNumber: '501', roomType: 'Presidential Suite', butler: true }, organizationId: safariLodge.id },
      { guestId: guests[8].id, type: 'dining', title: 'Private Dining Experience', description: 'Private dining room at Chef\'s Table for 6 guests. Full privacy.', timestamp: new Date('2026-07-25T20:00:00'), status: 'upcoming', location: "Chef's Table", metadata: { restaurant: "Chef's Table", partySize: 6, vip: true }, organizationId: safariLodge.id },
      { guestId: guests[8].id, type: 'check_out', title: 'VIP Check-Out', description: 'Scheduled checkout with express service.', timestamp: new Date('2026-07-27T11:00:00'), status: 'upcoming', location: 'Victoria Falls Safari Lodge', metadata: { roomNumber: '501', vip: true }, organizationId: safariLodge.id },
    ];

    for (const jd of journeyTemplates) {
      await GuestJourney.create(jd);
    }

    console.log(`${journeyTemplates.length} guest journey entries seeded.`);

    // --- NOTIFICATIONS ---
    const notificationData = [
      { userId: admin.id, title: 'Welcome to GuestFlow OS', message: 'Your account has been set up successfully. Start managing your hospitality operations.', type: 'success', read: true, metadata: {} },
      { userId: hotelMgr.id, title: 'New Booking Confirmed', message: 'James Anderson has confirmed a Deluxe Suite booking from Jul 22-26.', type: 'info', read: false, metadata: { bookingType: 'hotel', guestName: 'James Anderson' } },
      { userId: hotelMgr.id, title: 'VIP Guest Arriving', message: 'Amara Okonkwo (VIP) arriving Jul 24. Presidential Suite prepared.', type: 'warning', read: false, metadata: { vip: true, room: '501' } },
      { userId: tourMgr.id, title: 'Tour Fully Booked', message: "Devil's Pool Adventure is at 67% capacity. Consider adding more dates.", type: 'warning', read: false, metadata: { tourName: "Devil's Pool Adventure", capacity: '67%' } },
      { userId: tourMgr.id, title: 'New Activity Booking', message: 'Priya Patel booked White Water Rafting for Jul 26.', type: 'info', read: true, metadata: { tourName: 'White Water Rafting' } },
      { userId: transportMgr.id, title: 'Airport Transfer Due', message: 'Hans Mueller flight ET821 arriving Jul 23 at 10:45. SUV transfer ready.', type: 'info', read: false, metadata: { flightNumber: 'ET821', vehicle: 'SUV' } },
      { userId: transportMgr.id, title: 'VIP Transfer Scheduled', message: 'Amara Okonkwo Mercedes S-Class transfer Jul 24. 6 passengers total.', type: 'warning', read: false, metadata: { vip: true, vehicle: 'Mercedes S-Class', passengers: 6 } },
      { userId: restaurantMgr.id, title: 'Party Size Update', message: 'Amara Okonkwo dinner for 6 confirmed at Chef\'s Table VIP2. Halal menu required.', type: 'warning', read: false, metadata: { restaurant: "Chef's Table", partySize: 6, dietary: 'Halal' } },
      { userId: restaurantMgr.id, title: 'Birthday Celebration', message: 'Carlos Rodriguez party of 5 booked for Jul 26. Cake and decorations needed.', type: 'info', read: true, metadata: { occasion: 'Birthday', partySize: 5 } },
      { userId: hotelMgr.id, title: 'Check-Out Reminder', message: 'Emma Thompson checking out tomorrow. Prepare express checkout.', type: 'info', read: true, metadata: { roomNumber: '105', guestName: 'Emma Thompson' } },
      { userId: admin.id, title: 'Weekly Revenue Report', message: 'Total revenue this week: $8,450. Hotel bookings leading with 58%.', type: 'success', read: false, metadata: { revenue: 8450 } },
      { userId: tourMgr.id, title: 'Weather Advisory', message: 'Rain expected Jul 25-26. Consider offering indoor alternatives for walking tours.', type: 'warning', read: false, metadata: { weather: 'Rain', dates: 'Jul 25-26' } },
    ];

    for (const nd of notificationData) {
      await Notification.create(nd);
    }

    console.log('Notifications seeded.');

    console.log('\n=== Seed Complete ===');
    console.log('Login credentials:');
    console.log('  Admin: admin@guestflow.com / admin123');
    console.log('  Hotel Manager: tendai@safarilodge.co.zw / password123');
    console.log('  Tour Operator: sarah@wildhorizons.co.zw / password123');
    console.log('  Transport Manager: david@wildhorizons.co.zw / password123');
    console.log('  Restaurant Manager: grace@palmriver.co.zw / password123');

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
