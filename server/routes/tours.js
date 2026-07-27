const express = require('express');
const { Tour, Organization } = require('../models');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { type, status, organizationId } = req.query;
    const where = {};

    if (type) where.type = type;
    if (status) where.status = status;
    if (organizationId) where.organizationId = organizationId;

    const tours = await Tour.findAll({
      where,
      include: [{ model: Organization, attributes: ['id', 'name'] }],
      order: [['name', 'ASC']],
    });

    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id, {
      include: [{ model: Organization }],
    });

    if (!tour) {
      return res.status(404).json({ error: 'Tour not found.' });
    }

    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json(tour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found.' });
    }
    await tour.update(req.body);
    res.json(tour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found.' });
    }
    await tour.destroy();
    res.json({ message: 'Tour deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/availability', async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found.' });
    }

    const spotsLeft = tour.maxCapacity - tour.currentBookings;
    res.json({
      tourId: tour.id,
      name: tour.name,
      maxCapacity: tour.maxCapacity,
      currentBookings: tour.currentBookings,
      spotsLeft,
      available: spotsLeft > 0 && tour.status === 'active',
      availableDates: tour.availableDates,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
