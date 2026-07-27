const express = require('express');
const { Guest, GuestJourney, Booking, Transport, Restaurant } = require('../models');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { search, nationality, page = 1, limit = 50 } = req.query;
    const where = {};

    if (search) {
      const { Op } = require('sequelize');
      where[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (nationality) {
      where.nationality = nationality;
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { count, rows } = await Guest.findAndCountAll({
      where,
      include: [
        { model: Booking, attributes: ['id', 'type', 'status', 'checkIn', 'checkOut'] },
        { model: GuestJourney, attributes: ['id', 'type', 'title', 'status', 'timestamp'], order: [['timestamp', 'DESC']] },
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset,
    });

    res.json({ guests: rows, total: count, page: parseInt(page), pages: Math.ceil(count / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.id, {
      include: [
        { model: Booking, order: [['checkIn', 'DESC']] },
        { model: Transport, order: [['pickupTime', 'DESC']] },
        { model: Restaurant, order: [['reservationDate', 'DESC']] },
        { model: GuestJourney, order: [['timestamp', 'DESC']] },
      ],
    });

    if (!guest) {
      return res.status(404).json({ error: 'Guest not found.' });
    }

    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const guest = await Guest.create(req.body);
    res.status(201).json(guest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.id);
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found.' });
    }
    await guest.update(req.body);
    res.json(guest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.id);
    if (!guest) {
      return res.status(404).json({ error: 'Guest not found.' });
    }
    await guest.destroy();
    res.json({ message: 'Guest deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/journey', async (req, res) => {
  try {
    const journey = await GuestJourney.findAll({
      where: { guestId: req.params.id },
      order: [['timestamp', 'DESC']],
    });
    res.json(journey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/journey', async (req, res) => {
  try {
    const journey = await GuestJourney.create({
      guestId: req.params.id,
      ...req.body,
    });
    res.status(201).json(journey);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
