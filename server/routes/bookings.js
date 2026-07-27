const express = require('express');
const { Booking, Guest, Organization } = require('../models');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { type, status, guestId, organizationId, page = 1, limit = 50 } = req.query;
    const where = {};

    if (type) where.type = type;
    if (status) where.status = status;
    if (guestId) where.guestId = guestId;
    if (organizationId) where.organizationId = organizationId;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { count, rows } = await Booking.findAndCountAll({
      where,
      include: [
        { model: Guest, attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'nationality'] },
        { model: Organization, attributes: ['id', 'name', 'type'] },
      ],
      order: [['checkIn', 'ASC']],
      limit: parseInt(limit),
      offset,
    });

    res.json({ bookings: rows, total: count, page: parseInt(page), pages: Math.ceil(count / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        { model: Guest },
        { model: Organization },
      ],
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    const result = await Booking.findByPk(booking.id, {
      include: [{ model: Guest }, { model: Organization }],
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    await booking.update(req.body);
    const result = await Booking.findByPk(booking.id, {
      include: [{ model: Guest }, { model: Organization }],
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    await booking.destroy();
    res.json({ message: 'Booking deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    await booking.update({ status: req.body.status });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
