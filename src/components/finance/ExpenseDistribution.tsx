import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Label } from "recharts";
import { useState } from "react";
import { Activity, Utensils, Car, Film, ShoppingBag, FileText } from "lucide-react";

interface CategoryData {
  name: string;
  value: number;
  color: string;
  percentage: number;
  icon: any;
}

const EXPENSE_DATA: CategoryData[] = [
  { name: "Health", value: 850, color: "hsl(var(--chart-1))", percentage: 26.7, icon: Activity },
  { name: "Food", value: 720, color: "hsl(var(--chart-2))", percentage: 22.6, icon: Utensils },
  { name: "Transport", value: 580, color: "hsl(var(--chart-3))", percentage: 18.2, icon: Car },
  { name: "Entertainment", value: 450, color: "hsl(var(--chart-4))", percentage: 14.2, icon: Film },
  { name: "Shopping", value: 380, color: "hsl(var(--chart-5))", percentage: 11.9, icon: ShoppingBag },
  { name: "Bills", value: 200, color: "hsl(var(--accent))", percentage: 6.4, icon: FileText },
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
        style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}
      />
    </g>
  );
};

const renderCustomLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, fill, payload, percent } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 50;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  // Line coordinates
  const lineX1 = cx + (outerRadius + 5) * Math.cos(-midAngle * RADIAN);
  const lineY1 = cy + (outerRadius + 5) * Math.sin(-midAngle * RADIAN);
  const lineX2 = cx + (outerRadius + 25) * Math.cos(-midAngle * RADIAN);
  const lineY2 = cy + (outerRadius + 25) * Math.sin(-midAngle * RADIAN);
  
  const Icon = payload.icon;
  const textAnchor = x > cx ? 'start' : 'end';
  
  return (
    <g>
      {/* Connector line */}
      <path
        d={`M ${lineX1},${lineY1} L ${lineX2},${lineY2} L ${x > cx ? x - 5 : x + 5},${y}`}
        stroke={fill}
        strokeWidth={2}
        fill="none"
        opacity={0.8}
      />
      {/* Label background */}
      <rect
        x={x > cx ? x : x - 90}
        y={y - 18}
        width={90}
        height={36}
        fill="hsl(var(--background))"
        stroke={fill}
        strokeWidth={1.5}
        rx={8}
        opacity={0.95}
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
      />
      {/* Icon */}
      <foreignObject
        x={x > cx ? x + 6 : x - 84}
        y={y - 12}
        width={20}
        height={20}
      >
        <div className="flex items-center justify-center h-full">
          <Icon className="w-4 h-4" style={{ color: fill }} />
        </div>
      </foreignObject>
      {/* Category name */}
      <text
        x={x > cx ? x + 30 : x - 60}
        y={y - 3}
        textAnchor="middle"
        fill="hsl(var(--foreground))"
        fontSize={11}
        fontWeight={600}
      >
        {payload.name}
      </text>
      {/* Percentage */}
      <text
        x={x > cx ? x + 30 : x - 60}
        y={y + 10}
        textAnchor="middle"
        fill="hsl(var(--muted-foreground))"
        fontSize={10}
        fontWeight={500}
      >
        {(percent * 100).toFixed(1)}%
      </text>
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
        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={EXPENSE_DATA}
                cx="50%"
                cy="50%"
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                activeIndex={activeIndex ?? undefined}
                activeShape={renderActiveShape}
                onClick={(data) => handleCategoryClick(data.name)}
                className="cursor-pointer"
                label={renderCustomLabel}
                labelLine={false}
              >
                {EXPENSE_DATA.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="transition-all duration-300"
                    style={{ 
                      opacity: activeIndex === null || activeIndex === index ? 1 : 0.6,
                      transition: "all 0.3s ease"
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary Panel */}
        <div className="mt-6 space-y-2 pt-4 border-t border-border">
          {EXPENSE_DATA.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div
                key={idx}
                onClick={() => handleCategoryClick(category.name)}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
                className="flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent/5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <Icon className="w-4 h-4" style={{ color: category.color }} />
                  <span className="text-sm font-medium text-foreground">
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-foreground">
                    ₹{category.value.toLocaleString()}
                  </span>
                  <span 
                    className="text-xs font-semibold px-2 py-1 rounded-md"
                    style={{ 
                      backgroundColor: `${category.color}15`,
                      color: category.color 
                    }}
                  >
                    {category.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
