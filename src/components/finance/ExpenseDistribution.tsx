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
  const { cx, cy, midAngle, outerRadius, fill, payload, percent, index } = props;
  const RADIAN = Math.PI / 180;
  
  // Calculate positions for better label distribution
  const labelRadius = outerRadius + 60;
  const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);
  
  // Line coordinates - from edge of slice to label
  const lineStartX = cx + (outerRadius + 2) * Math.cos(-midAngle * RADIAN);
  const lineStartY = cy + (outerRadius + 2) * Math.sin(-midAngle * RADIAN);
  const lineMidX = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN);
  const lineMidY = cy + (outerRadius + 30) * Math.sin(-midAngle * RADIAN);
  
  const Icon = payload.icon;
  const isRightSide = x > cx;
  
  return (
    <g className="label-group">
      {/* Connector line - two segments for clean look */}
      <line
        x1={lineStartX}
        y1={lineStartY}
        x2={lineMidX}
        y2={lineMidY}
        stroke={fill}
        strokeWidth={1.5}
        opacity={1}
      />
      <line
        x1={lineMidX}
        y1={lineMidY}
        x2={isRightSide ? x - 5 : x + 5}
        y2={y}
        stroke={fill}
        strokeWidth={1.5}
        opacity={1}
      />
      
      {/* Icon with background circle */}
      <circle
        cx={isRightSide ? x + 12 : x - 12}
        cy={y}
        r={12}
        fill={fill}
        opacity={0.15}
      />
      <foreignObject
        x={isRightSide ? x + 4 : x - 20}
        y={y - 8}
        width={16}
        height={16}
      >
        <div className="flex items-center justify-center h-full">
          <Icon className="w-3.5 h-3.5" style={{ color: fill }} />
        </div>
      </foreignObject>
      
      {/* Category name */}
      <text
        x={isRightSide ? x + 28 : x - 28}
        y={y - 2}
        textAnchor={isRightSide ? 'start' : 'end'}
        fill="hsl(var(--foreground))"
        fontSize={12}
        fontWeight={600}
      >
        {payload.name}
      </text>
      
      {/* Percentage */}
      <text
        x={isRightSide ? x + 28 : x - 28}
        y={y + 11}
        textAnchor={isRightSide ? 'start' : 'end'}
        fill={fill}
        fontSize={11}
        fontWeight={700}
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
        <div className="h-[480px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 100, bottom: 20, left: 100 }}>
              <Pie
                data={EXPENSE_DATA}
                cx="50%"
                cy="50%"
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                activeIndex={activeIndex ?? undefined}
                activeShape={renderActiveShape}
                onClick={(data) => handleCategoryClick(data.name)}
                className="cursor-pointer"
                label={renderCustomLabel}
                labelLine={false}
                isAnimationActive={true}
                animationDuration={800}
                animationBegin={0}
              >
                {EXPENSE_DATA.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="transition-all duration-200"
                    style={{ 
                      opacity: activeIndex === null || activeIndex === index ? 1 : 0.7
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
