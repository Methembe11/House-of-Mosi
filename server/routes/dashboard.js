const express = require('express');
const { Op } = require('sequelize');
const { Guest, Booking, Tour, Transport, Restaurant, GuestJourney, Organization } = require('../models');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const organizationId = req.query.organizationId || req.user.organizationId;
    const where = organizationId ? { organizationId } : {};

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const totalGuests = await Guest.count();

    const activeBookings = await Booking.count({
      where: {
        ...where,
        status: { [Op.in]: ['confirmed', 'checked_in'] },
      },
    });

    const todayCheckIns = await Booking.count({
      where: {
        ...where,
        type: 'hotel',
        status: 'confirmed',
        checkIn: { [Op.gte]: today, [Op.lt]: tomorrow },
      },
    });

    const todayCheckOuts = await Booking.count({
      where: {
        ...where,
        type: 'hotel',
        status: 'checked_in',
        checkOut: { [Op.gte]: today, [Op.lt]: tomorrow },
      },
    });

    const todayTours = await Tour.count({
      where: {
        ...where,
        status: 'active',
      },
    });

    const todayTransport = await Transport.count({
      where: {
        ...where,
        status: { [Op.in]: ['pending', 'assigned', 'en_route'] },
        pickupTime: { [Op.gte]: today, [Op.lt]: tomorrow },
      },
    });

    const todayReservations = await Restaurant.count({
      where: {
        ...where,
        status: { [Op.in]: ['pending', 'confirmed'] },
        reservationDate: today.toISOString().split('T')[0],
      },
    });

    const pendingBookings = await Booking.count({
      where: { ...where, status: 'pending' },
    });

    const recentBookings = await Booking.findAll({
      where: where,
      include: [{ model: Guest, attributes: ['id', 'firstName', 'lastName'] }],
      order: [['createdAt', 'DESC']],
      limit: 5,
    });

    const upcomingTransport = await Transport.findAll({
      where: {
        ...where,
        pickupTime: { [Op.gte]: today },
        status: { [Op.in]: ['pending', 'assigned'] },
      },
      include: [{ model: Guest, attributes: ['id', 'firstName', 'lastName'] }],
      order: [['pickupTime', 'ASC']],
      limit: 5,
    });

    const recentReservations = await Restaurant.findAll({
      where: {
        ...where,
        reservationDate: { [Op.gte]: today.toISOString().split('T')[0] },
      },
      include: [{ model: Guest, attributes: ['id', 'firstName', 'lastName'] }],
      order: [['reservationDate', 'ASC'], ['reservationTime', 'ASC']],
      limit: 5,
    });

    const totalRevenue = await Booking.sum('totalAmount', {
      where: {
        ...where,
        status: { [Op.notIn]: ['cancelled'] },
      },
    }) || 0;

    const monthlyRevenue = await Booking.sum('totalAmount', {
      where: {
        ...where,
        status: { [Op.notIn]: ['cancelled'] },
        createdAt: { [Op.gte]: new Date(today.getFullYear(), today.getMonth(), 1) },
      },
    }) || 0;

    const activeToursCount = await Tour.count({
      where: { ...where, status: 'active' },
    });

    res.json({
      totalGuests,
      activeBookings,
      todayCheckIns,
      todayCheckOuts,
      todayTours,
      todayTransport,
      todayReservations,
      pendingBookings,
      totalRevenue: parseFloat(totalRevenue),
      monthlyRevenue: parseFloat(monthlyRevenue),
      activeToursCount,
      recentBookings,
      upcomingTransport,
      recentReservations,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
