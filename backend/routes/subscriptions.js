const express = require('express');
const Subscription = require('../models/Subscription');

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const subscription = await Subscription.findByUserId(req.params.userId);
    res.json(subscription || { tipo_plano: 'FREE', status: 'ativo' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:userId/upgrade', async (req, res) => {
  try {
    const subscription = await Subscription.updatePlan(req.params.userId, 'PRO');
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
