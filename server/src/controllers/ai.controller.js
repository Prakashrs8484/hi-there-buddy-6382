const FinancialContext = require("../models/FinancialContext");
const groq = require("../services/groq.service");

exports.financeChat = async (req, res) => {
  try {
    const { message } = req.body;

    const context = await FinancialContext.findOne({ userId: req.user._id });

    const systemPrompt = `
You are NeuraDesk's Finance AI Agent.

You ALWAYS use the following financial context to answer the user:

FINANCIAL CONTEXT:
${JSON.stringify(context, null, 2)}

Your duties:
- Analyze expenses
- Analyze income
- Analyze savings
- Track financial goals
- Generate insights
- Predict trends
- Recommend budgets
- Help user make financial decisions
- Be actionable and clear
    `;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 1024,
      temperature: 0.5
    });

    return res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    console.error("Groq Error:", error);
    res.status(500).json({ message: error.message });
  }
};
