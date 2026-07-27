const express = require('express');
const { Op, fn, col, literal } = require('sequelize');
const { Booking, Guest, Tour, Transport, Restaurant, GuestJourney } = require('../models');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/bookings', async (req, res) => {
  try {
    const organizationId = req.query.organizationId || req.user.organizationId;
    const where = organizationId ? { organizationId } : {};

    const bookingsByType = await Booking.findAll({
      where,
      attributes: ['type', [fn('COUNT', col('id')), 'count'], [fn('SUM', col('totalAmount')), 'revenue']],
      group: ['type'],
      raw: true,
    });

    const bookingsByStatus = await Booking.findAll({
      where,
      attributes: ['status', [fn('COUNT', col('id')), 'count']],
      group: ['status'],
      raw: true,
    });

    const monthlyBookings = await Booking.findAll({
      where: {
        ...where,
        createdAt: { [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 6)) },
      },
      attributes: [
        [fn('TO_CHAR', col('createdAt'), 'YYYY-MM'), 'month'],
        [fn('COUNT', col('id')), 'count'],
        [fn('SUM', col('totalAmount')), 'revenue'],
      ],
      group: [fn('TO_CHAR', col('createdAt'), 'YYYY-MM')],
      order: [literal('month ASC')],
      raw: true,
    });

    res.json({ bookingsByType, bookingsByStatus, monthlyBookings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/guests', async (req, res) => {
  try {
    const nationalityDist = await Guest.findAll({
      attributes: ['nationality', [fn('COUNT', col('id')), 'count']],
      group: ['nationality'],
      order: [literal('count DESC')],
      raw: true,
    });

    const monthlyGuests = await Guest.findAll({
      where: {
        createdAt: { [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 6)) },
      },
      attributes: [
        [fn('TO_CHAR', col('createdAt'), 'YYYY-MM'), 'month'],
        [fn('COUNT', col('id')), 'count'],
      ],
      group: [fn('TO_CHAR', col('createdAt'), 'YYYY-MM')],
      order: [literal('month ASC')],
      raw: true,
    });

    const totalGuests = await Guest.count();

    res.json({ nationalityDist, monthlyGuests, totalGuests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/tours', async (req, res) => {
  try {
    const organizationId = req.query.organizationId || req.user.organizationId;
    const where = organizationId ? { organizationId } : {};

    const toursByType = await Tour.findAll({
      where,
      attributes: ['type', [fn('COUNT', col('id')), 'count'], [fn('SUM', col('currentBookings')), 'totalBookings']],
      group: ['type'],
      raw: true,
    });

    const topTours = await Tour.findAll({
      where,
      attributes: ['id', 'name', 'type', 'currentBookings', 'price', 'maxCapacity'],
      order: [['currentBookings', 'DESC']],
      limit: 5,
      raw: true,
    });

    const occupancyRate = await Tour.findAll({
      where: { ...where, status: 'active' },
      attributes: ['id', 'name', 'maxCapacity', 'currentBookings'],
      raw: true,
    }).then(tours => {
      return tours.map(t => ({
        ...t,
        occupancyPercent: t.maxCapacity > 0 ? Math.round((t.currentBookings / t.maxCapacity) * 100) : 0,
      }));
    });

    res.json({ toursByType, topTours, occupancyRate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/revenue', async (req, res) => {
  try {
    const organizationId = req.query.organizationId || req.user.organizationId;
    const where = organizationId ? { organizationId } : {};

    const revenueByType = await Booking.findAll({
      where: { ...where, status: { [Op.notIn]: ['cancelled'] } },
      attributes: ['type', [fn('SUM', col('totalAmount')), 'revenue'], [fn('COUNT', col('id')), 'count']],
      group: ['type'],
      raw: true,
    });

    const dailyRevenue = await Booking.findAll({
      where: {
        ...where,
        status: { [Op.notIn]: ['cancelled'] },
        createdAt: { [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 30)) },
      },
      attributes: [
        [fn('TO_CHAR', col('createdAt'), 'YYYY-MM-DD'), 'date'],
        [fn('SUM', col('totalAmount')), 'revenue'],
      ],
      group: [fn('TO_CHAR', col('createdAt'), 'YYYY-MM-DD')],
      order: [literal('date ASC')],
      raw: true,
    });

    const totalRevenue = await Booking.sum('totalAmount', {
      where: { ...where, status: { [Op.notIn]: ['cancelled'] } },
    }) || 0;

    const averageBookingValue = await Booking.avg('totalAmount', {
      where: { ...where, status: { [Op.notIn]: ['cancelled'] } },
    }) || 0;

    res.json({
      revenueByType,
      dailyRevenue,
      totalRevenue: parseFloat(totalRevenue),
      averageBookingValue: parseFloat(averageBookingValue).toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
