const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const finance = require('../controllers/finance.controller');
const FinancialContext = require("../models/FinancialContext");

router.get("/context", auth, async (req, res) => {
  try {
    const ctx = await FinancialContext.findOne({ userId: req.user._id });
    return res.json(ctx || {});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


router.post('/expense', auth, finance.addExpense);
router.get('/expense', auth, finance.listExpenses);
router.post('/income', auth, finance.addIncome);
router.get('/income', auth, finance.listIncome);
router.post('/goal', auth, finance.addGoal);
router.get('/goal', auth, finance.listGoals);
router.get('/stats', auth, finance.getStats);

module.exports = router;
