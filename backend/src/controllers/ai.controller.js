const FinancialContext = require('../models/FinancialContext');
const CareerContext = require('../models/CareerContext');
const HealthContext = require('../models/HealthContext');
const NutritionContext = require('../models/NutritionContext');
const LifestyleContext = require('../models/LifestyleContext');
const NotesContext = require('../models/NotesContext');
const groq = require('../services/groq.service');

async function callGroqSystem(systemPrompt, userMessage) {
  const result = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ],
    temperature: 0.4
  });
  return result.choices?.[0]?.message?.content || '';
}

exports.financeChat = async (req, res) => {
  try {
    const { message } = req.body;
    const context = await FinancialContext.findOne({ userId: req.user._id });
    const systemPrompt = `You are NeuraDesk Finance Agent. Use context:\n${JSON.stringify(context||{},null,2)}`;
    const reply = await callGroqSystem(systemPrompt, message);
    return res.json({ reply });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.careerChat = async (req, res) => {
  try {
    const { message } = req.body;
    const context = await CareerContext.findOne({ userId: req.user._id });
    const systemPrompt = `You are NeuraDesk Career Agent. Use context:\n${JSON.stringify(context||{},null,2)}`;
    const reply = await callGroqSystem(systemPrompt, message);
    return res.json({ reply });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.healthChat = async (req, res) => {
  try {
    const { message } = req.body;
    const context = await HealthContext.findOne({ userId: req.user._id });
    const systemPrompt = `You are NeuraDesk Health Agent. Use context:\n${JSON.stringify(context||{},null,2)}`;
    const reply = await callGroqSystem(systemPrompt, message);
    return res.json({ reply });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.nutritionChat = async (req, res) => {
  try {
    const { message } = req.body;
    const context = await NutritionContext.findOne({ userId: req.user._id });
    const systemPrompt = `You are NeuraDesk Nutrition Agent. Use context:\n${JSON.stringify(context||{},null,2)}`;
    const reply = await callGroqSystem(systemPrompt, message);
    return res.json({ reply });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.lifestyleChat = async (req, res) => {
  try {
    const { message } = req.body;
    const context = await LifestyleContext.findOne({ userId: req.user._id });
    const systemPrompt = `You are NeuraDesk Lifestyle Agent. Use context:\n${JSON.stringify(context||{},null,2)}`;
    const reply = await callGroqSystem(systemPrompt, message);
    return res.json({ reply });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.notesChat = async (req, res) => {
  try {
    const { message } = req.body;
    const context = await NotesContext.findOne({ userId: req.user._id });
    const systemPrompt = `You are NeuraDesk Notes Agent. Use context:\n${JSON.stringify(context||{},null,2)}`;
    const reply = await callGroqSystem(systemPrompt, message);
    return res.json({ reply });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
