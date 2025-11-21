const mongoose = require('mongoose');
module.exports = mongoose.model('FinancialContext', new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  totals: { monthlyIncome: {type:Number,default:0}, totalExpenses:{type:Number,default:0}, netSavings:{type:Number,default:0} },
  categories: { type: Object, default: {} },
  goals: { type: Array, default: [] },
  insights: { type: Object, default: {} },
  lastUpdated: { type: Date, default: Date.now }
}));
