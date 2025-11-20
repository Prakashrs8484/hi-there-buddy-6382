const mongoose = require("mongoose");

const FinancialContextSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },

  totals: {
    monthlyIncome: { type: Number, default: 0 },
    totalExpenses: { type: Number, default: 0 },
    netSavings: { type: Number, default: 0 }
  },

  categories: {
    type: Object,
    default: {}
  },

  goals: {
    type: Array,
    default: []
  },

  insights: {
    patterns: String,
    suggestedBudget: String,
    anomalies: String,
    summary: String
  },

  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FinancialContext", FinancialContextSchema);
