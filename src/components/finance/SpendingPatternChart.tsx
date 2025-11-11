import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const spendingData = [
  { name: "Food & Dining", value: 850, color: "hsl(var(--primary))" },
  { name: "Transportation", value: 620, color: "hsl(var(--accent))" },
  { name: "Bills & Utilities", value: 780, color: "hsl(var(--success))" },
  { name: "Entertainment", value: 420, color: "hsl(var(--warning))" },
  { name: "Shopping", value: 510, color: "hsl(var(--destructive))" },
];

export const SpendingPatternChart = () => {
  return (
    <Card className="card-elegant">
      <CardHeader>
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>Distribution by category this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={spendingData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {spendingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `₹${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
