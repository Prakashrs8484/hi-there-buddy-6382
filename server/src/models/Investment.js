const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  assetType: { 
    type: String, 
    required: true,
    enum: ['mutual-funds', 'stocks', 'debt-funds', 'gold-silver', 'crypto', 'other']
  },
  name: { type: String, required: true },
  investmentMode: { 
    type: String, 
    enum: ['sip', 'lumpsum'],
    default: 'lumpsum'
  },
  purchaseAmount: { type: Number, required: true },
  units: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  currentValue: { type: Number, required: true },
  riskCategory: { 
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  goalMapping: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Virtual fields for returns
InvestmentSchema.virtual('absoluteReturns').get(function() {
  return this.currentValue - this.purchaseAmount;
});

InvestmentSchema.virtual('percentageReturns').get(function() {
  if (this.purchaseAmount === 0) return 0;
  return ((this.currentValue - this.purchaseAmount) / this.purchaseAmount) * 100;
});

InvestmentSchema.set('toJSON', { virtuals: true });
InvestmentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Investment', InvestmentSchema);
