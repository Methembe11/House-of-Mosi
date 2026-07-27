const express = require('express');
const { Transport, Guest, Organization } = require('../models');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { status, organizationId, guestId } = req.query;
    const where = {};

    if (status) where.status = status;
    if (organizationId) where.organizationId = organizationId;
    if (guestId) where.guestId = guestId;

    const transports = await Transport.findAll({
      where,
      include: [
        { model: Guest, attributes: ['id', 'firstName', 'lastName', 'phone'] },
        { model: Organization, attributes: ['id', 'name'] },
      ],
      order: [['pickupTime', 'ASC']],
    });

    res.json(transports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const transport = await Transport.findByPk(req.params.id, {
      include: [{ model: Guest }, { model: Organization }],
    });

    if (!transport) {
      return res.status(404).json({ error: 'Transport not found.' });
    }

    res.json(transport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const transport = await Transport.create(req.body);
    const result = await Transport.findByPk(transport.id, {
      include: [{ model: Guest }, { model: Organization }],
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const transport = await Transport.findByPk(req.params.id);
    if (!transport) {
      return res.status(404).json({ error: 'Transport not found.' });
    }
    await transport.update(req.body);
    const result = await Transport.findByPk(transport.id, {
      include: [{ model: Guest }, { model: Organization }],
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const transport = await Transport.findByPk(req.params.id);
    if (!transport) {
      return res.status(404).json({ error: 'Transport not found.' });
    }
    await transport.destroy();
    res.json({ message: 'Transport deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const transport = await Transport.findByPk(req.params.id);
    if (!transport) {
      return res.status(404).json({ error: 'Transport not found.' });
    }
    await transport.update({ status: req.body.status });
    res.json(transport);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
