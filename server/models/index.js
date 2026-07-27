const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const Organization = sequelize.define('Organization', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('hotel', 'tour_operator', 'transport', 'restaurant'),
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
  },
  logo: {
    type: DataTypes.STRING,
  },
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('super_admin', 'hotel_manager', 'tour_operator', 'transport_manager', 'restaurant_manager'),
    allowNull: false,
    defaultValue: 'hotel_manager',
  },
  organizationId: {
    type: DataTypes.UUID,
    references: { model: Organization, key: 'id' },
  },
  avatar: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    },
  },
});

User.prototype.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

const Guest = sequelize.define('Guest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
  },
  phone: {
    type: DataTypes.STRING,
  },
  nationality: {
    type: DataTypes.STRING,
  },
  passportNumber: {
    type: DataTypes.STRING,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
  },
  nationalityFlag: {
    type: DataTypes.STRING,
  },
  specialRequests: {
    type: DataTypes.TEXT,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  guestId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Guest, key: 'id' },
  },
  type: {
    type: DataTypes.ENUM('hotel', 'activity', 'restaurant', 'transport'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'checked_in', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
  checkIn: {
    type: DataTypes.DATE,
  },
  checkOut: {
    type: DataTypes.DATE,
  },
  details: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD',
  },
  organizationId: {
    type: DataTypes.UUID,
    references: { model: Organization, key: 'id' },
  },
});

const Tour = sequelize.define('Tour', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  type: {
    type: DataTypes.ENUM('safari', 'helicopter', 'cruise', 'pool', 'walking'),
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
  },
  maxCapacity: {
    type: DataTypes.INTEGER,
    defaultValue: 20,
  },
  currentBookings: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD',
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'sold_out'),
    defaultValue: 'active',
  },
  availableDates: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  meetingPoint: {
    type: DataTypes.STRING,
  },
  includes: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  organizationId: {
    type: DataTypes.UUID,
    references: { model: Organization, key: 'id' },
  },
});

const Transport = sequelize.define('Transport', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  guestId: {
    type: DataTypes.UUID,
    references: { model: Guest, key: 'id' },
  },
  driverName: {
    type: DataTypes.STRING,
  },
  driverPhone: {
    type: DataTypes.STRING,
  },
  vehicleType: {
    type: DataTypes.STRING,
  },
  vehiclePlate: {
    type: DataTypes.STRING,
  },
  pickupLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dropoffLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pickupTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'assigned', 'en_route', 'completed'),
    defaultValue: 'pending',
  },
  flightNumber: {
    type: DataTypes.STRING,
  },
  flightTime: {
    type: DataTypes.DATE,
  },
  organizationId: {
    type: DataTypes.UUID,
    references: { model: Organization, key: 'id' },
  },
});

const Restaurant = sequelize.define('Restaurant', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  guestId: {
    type: DataTypes.UUID,
    references: { model: Guest, key: 'id' },
  },
  restaurantName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reservationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  reservationTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  partySize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tableNumber: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'seated', 'completed'),
    defaultValue: 'pending',
  },
  specialRequests: {
    type: DataTypes.TEXT,
  },
  organizationId: {
    type: DataTypes.UUID,
    references: { model: Organization, key: 'id' },
  },
});

const GuestJourney = sequelize.define('GuestJourney', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  guestId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Guest, key: 'id' },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'in_progress', 'completed', 'cancelled'),
    defaultValue: 'upcoming',
  },
  location: {
    type: DataTypes.STRING,
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
  organizationId: {
    type: DataTypes.UUID,
    references: { model: Organization, key: 'id' },
  },
});

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: 'id' },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('info', 'warning', 'success', 'error'),
    defaultValue: 'info',
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
});

Organization.hasMany(User, { foreignKey: 'organizationId' });
User.belongsTo(Organization, { foreignKey: 'organizationId' });

Organization.hasMany(Booking, { foreignKey: 'organizationId' });
Booking.belongsTo(Organization, { foreignKey: 'organizationId' });

Organization.hasMany(Tour, { foreignKey: 'organizationId' });
Tour.belongsTo(Organization, { foreignKey: 'organizationId' });

Organization.hasMany(Transport, { foreignKey: 'organizationId' });
Transport.belongsTo(Organization, { foreignKey: 'organizationId' });

Organization.hasMany(Restaurant, { foreignKey: 'organizationId' });
Restaurant.belongsTo(Organization, { foreignKey: 'organizationId' });

Organization.hasMany(GuestJourney, { foreignKey: 'organizationId' });
GuestJourney.belongsTo(Organization, { foreignKey: 'organizationId' });

Guest.hasMany(Booking, { foreignKey: 'guestId' });
Booking.belongsTo(Guest, { foreignKey: 'guestId' });

Guest.hasMany(Transport, { foreignKey: 'guestId' });
Transport.belongsTo(Guest, { foreignKey: 'guestId' });

Guest.hasMany(Restaurant, { foreignKey: 'guestId' });
Restaurant.belongsTo(Guest, { foreignKey: 'guestId' });

Guest.hasMany(GuestJourney, { foreignKey: 'guestId' });
GuestJourney.belongsTo(Guest, { foreignKey: 'guestId' });

User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  Organization,
  User,
  Guest,
  Booking,
  Tour,
  Transport,
  Restaurant,
  GuestJourney,
  Notification,
};
