const Expense = require("../models/Expense");
const Income = require("../models/Income");
const Goal = require("../models/Goal");
const FinancialContext = require("../models/FinancialContext");

exports.updateFinancialContext = async (userId) => {
  try {
    const expenses = await Expense.find({ userId });
    const incomes = await Income.find({ userId });
    const goals = await Goal.find({ userId });

    // Compute totals
    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
    const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);

    const categories = {};
    expenses.forEach((e) => {
      categories[e.category] = (categories[e.category] || 0) + e.amount;
    });

    await FinancialContext.updateOne(
      { userId },
      {
        $set: {
          totals: {
            monthlyIncome: totalIncome,
            totalExpenses,
            netSavings: totalIncome - totalExpenses,
          },
          categories: categories,
          goals: goals,
          lastUpdated: new Date()
        }
      },
      { upsert: true }
    );

  } catch (err) {
    console.error("Error updating financial context:", err.message);
  }
};
