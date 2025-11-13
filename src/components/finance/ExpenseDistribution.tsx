import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { useState } from "react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

interface CategoryData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

const EXPENSE_DATA: CategoryData[] = [
  { name: "Health", value: 850, color: "hsl(var(--chart-1))", percentage: 26.7 },
  { name: "Food", value: 720, color: "hsl(var(--chart-2))", percentage: 22.6 },
  { name: "Transport", value: 580, color: "hsl(var(--chart-3))", percentage: 18.2 },
  { name: "Entertainment", value: 450, color: "hsl(var(--chart-4))", percentage: 14.2 },
  { name: "Shopping", value: 380, color: "hsl(var(--chart-5))", percentage: 11.9 },
  { name: "Bills", value: 200, color: "hsl(var(--accent))", percentage: 6.4 },
];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="transition-all duration-300"
      />
    </g>
  );
};

interface ExpenseDistributionProps {
  onCategoryClick?: (category: string) => void;
  activeCategory?: string;
}

export const ExpenseDistribution = ({ onCategoryClick, activeCategory }: ExpenseDistributionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const handleCategoryClick = (category: string) => {
    onCategoryClick?.(category);
  };

  return (
    <Card className="card-hover card-glass">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          Expense Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={EXPENSE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                activeIndex={activeIndex ?? undefined}
                activeShape={renderActiveShape}
                onClick={(data) => handleCategoryClick(data.name)}
                className="cursor-pointer"
              >
                {EXPENSE_DATA.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-lg">
                        <div className="font-semibold text-foreground">{data.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ₹{data.value.toLocaleString()} ({data.percentage}%)
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
