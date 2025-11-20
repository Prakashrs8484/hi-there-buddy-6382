const Expense = require('../models/Expense');
const Income = require('../models/Income');
const Goal = require('../models/Goal');
const { updateFinancialContext } = require("../services/financialContext.service");


exports.addExpense = async (req, res) => {
  try {
    const { description, category, amount, paymentMethod, date } = req.body;

    const e = new Expense({
      userId: req.user._id,
      description,
      category,
      amount,
      paymentMethod,
      date
    });

    await e.save();
    await updateFinancialContext(req.user._id);

    return res.json(e);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


exports.listExpenses = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const q = { userId: req.user._id };
    if(startDate || endDate) q.date = {};
    if(startDate) q.date.$gte = new Date(startDate);
    if(endDate) q.date.$lte = new Date(endDate);
    const items = await Expense.find(q).sort({ date: -1 }).limit(200);
    return res.json(items);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addIncome = async (req, res) => {
  try {
    const { source, amount, date } = req.body;

    const i = new Income({
      userId: req.user._id,
      source,
      amount,
      date
    });

    await i.save();
    await updateFinancialContext(req.user._id);

    return res.json(i);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


exports.listIncome = async (req, res) => {
  try {
    const items = await Income.find({ userId: req.user._id }).sort({ date: -1 }).limit(200);
    return res.json(items);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addGoal = async (req, res) => {
  try {
    const { title, category, targetAmount, dueDate } = req.body;

    const g = new Goal({
      userId: req.user._id,
      title,
      category,
      targetAmount,
      dueDate
    });

    await g.save();
    await updateFinancialContext(req.user._id);

    return res.json(g);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


exports.listGoals = async (req, res) => {
  try {
    const items = await Goal.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.json(items);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const { month, year } = req.query;
    const start = month ? new Date(year || new Date().getFullYear(), month - 1, 1) : new Date(new Date().getFullYear(), 0, 1);
    const end = month ? new Date(year || new Date().getFullYear(), month, 0, 23, 59, 59) : new Date();

    const expenses = await Expense.find({ userId: req.user._id, date: { $gte: start, $lte: end } });
    const incomes = await Income.find({ userId: req.user._id, date: { $gte: start, $lte: end } });
    const investments = await Investment.find({ userId: req.user._id });

    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
    const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
    const totalInvested = investments.reduce((s, i) => s + i.purchaseAmount, 0);
    const currentInvestmentValue = investments.reduce((s, i) => s + i.currentValue, 0);
    const netSavings = totalIncome - totalExpenses;
    const activeGoals = await Goal.countDocuments({ userId: req.user._id });

    return res.json({ 
      monthlyIncome: totalIncome, 
      totalExpenses, 
      netSavings, 
      activeGoals,
      totalInvested,
      currentInvestmentValue
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addInvestment = async (req, res) => {
  try {
    const { assetType, name, investmentMode, purchaseAmount, units, purchaseDate, currentValue, riskCategory, goalMapping } = req.body;
    const investment = new Investment({ 
      userId: req.user._id, 
      assetType, 
      name, 
      investmentMode, 
      purchaseAmount, 
      units, 
      purchaseDate, 
      currentValue, 
      riskCategory, 
      goalMapping 
    });
    await investment.save();
    return res.json(investment);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.listInvestments = async (req, res) => {
  try {
    const { assetType } = req.query;
    const query = { userId: req.user._id };
    if (assetType) query.assetType = assetType;
    const items = await Investment.find(query).sort({ purchaseDate: -1 });
    return res.json(items);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateInvestment = async (req, res) => {
  try {
    const { id } = req.params;
    const investment = await Investment.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!investment) return res.status(404).json({ message: 'Investment not found' });
    return res.json(investment);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteInvestment = async (req, res) => {
  try {
    const { id } = req.params;
    const investment = await Investment.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!investment) return res.status(404).json({ message: 'Investment not found' });
    return res.json({ message: 'Investment deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getInvestmentAnalytics = async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.user._id });
    
    const totalInvested = investments.reduce((s, i) => s + i.purchaseAmount, 0);
    const currentValue = investments.reduce((s, i) => s + i.currentValue, 0);
    const unrealizedGains = currentValue - totalInvested;
    const unrealizedGainsPercent = totalInvested > 0 ? (unrealizedGains / totalInvested) * 100 : 0;

    // Category-wise breakdown
    const categoryBreakdown = {};
    investments.forEach(inv => {
      if (!categoryBreakdown[inv.assetType]) {
        categoryBreakdown[inv.assetType] = {
          invested: 0,
          current: 0,
          count: 0
        };
      }
      categoryBreakdown[inv.assetType].invested += inv.purchaseAmount;
      categoryBreakdown[inv.assetType].current += inv.currentValue;
      categoryBreakdown[inv.assetType].count += 1;
    });

    // Risk distribution
    const riskDistribution = { low: 0, medium: 0, high: 0 };
    investments.forEach(inv => {
      riskDistribution[inv.riskCategory] += inv.currentValue;
    });

    // Top performers
    const topPerformers = investments
      .map(inv => ({
        name: inv.name,
        assetType: inv.assetType,
        returns: inv.percentageReturns
      }))
      .sort((a, b) => b.returns - a.returns)
      .slice(0, 5);

    // SIP contributions
    const sipContributions = investments
      .filter(inv => inv.investmentMode === 'sip')
      .reduce((sum, inv) => sum + inv.purchaseAmount, 0);

    return res.json({
      totalInvested,
      currentValue,
      unrealizedGains,
      unrealizedGainsPercent,
      categoryBreakdown,
      riskDistribution,
      topPerformers,
      sipContributions,
      totalInvestments: investments.length
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
