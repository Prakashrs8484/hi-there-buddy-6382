const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const finance = require('../controllers/finance.controller');

router.post('/expense', auth, finance.addExpense);
router.get('/expense', auth, finance.listExpenses);
router.post('/income', auth, finance.addIncome);
router.get('/income', auth, finance.listIncome);
router.post('/goal', auth, finance.addGoal);
router.get('/goal', auth, finance.listGoals);
router.get('/stats', auth, finance.getStats);
router.post('/investment', auth, finance.addInvestment);
router.get('/investment', auth, finance.listInvestments);
router.put('/investment/:id', auth, finance.updateInvestment);
router.delete('/investment/:id', auth, finance.deleteInvestment);
router.get('/investment-analytics', auth, finance.getInvestmentAnalytics);

module.exports = router;
