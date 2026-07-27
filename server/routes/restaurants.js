const express = require('express');
const { Restaurant, Guest, Organization } = require('../models');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { status, organizationId, guestId, date } = req.query;
    const where = {};

    if (status) where.status = status;
    if (organizationId) where.organizationId = organizationId;
    if (guestId) where.guestId = guestId;
    if (date) where.reservationDate = date;

    const reservations = await Restaurant.findAll({
      where,
      include: [
        { model: Guest, attributes: ['id', 'firstName', 'lastName', 'phone'] },
        { model: Organization, attributes: ['id', 'name'] },
      ],
      order: [['reservationDate', 'ASC'], ['reservationTime', 'ASC']],
    });

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const reservation = await Restaurant.findByPk(req.params.id, {
      include: [{ model: Guest }, { model: Organization }],
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }

    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const reservation = await Restaurant.create(req.body);
    const result = await Restaurant.findByPk(reservation.id, {
      include: [{ model: Guest }, { model: Organization }],
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const reservation = await Restaurant.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }
    await reservation.update(req.body);
    const result = await Restaurant.findByPk(reservation.id, {
      include: [{ model: Guest }, { model: Organization }],
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const reservation = await Restaurant.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }
    await reservation.destroy();
    res.json({ message: 'Reservation deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const reservation = await Restaurant.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }
    await reservation.update({ status: req.body.status });
    res.json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
