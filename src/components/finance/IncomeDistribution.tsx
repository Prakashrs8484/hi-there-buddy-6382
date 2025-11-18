import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { PieChart as PieChartIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoryData {
  name: string;
  value: number;
  color: string;
  percentage: number;
  emoji: string;
}

type TimePeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

// Sample data for different time periods
const INCOME_DATA_BY_PERIOD: Record<TimePeriod, CategoryData[]> = {
  weekly: [
    { name: "Job Salary", value: 480, color: "#10B981", percentage: 48.0, emoji: "💼" },
    { name: "Freelance", value: 250, color: "#3B82F6", percentage: 25.0, emoji: "💻" },
    { name: "Classes", value: 120, color: "#8B5CF6", percentage: 12.0, emoji: "📚" },
    { name: "Investments", value: 80, color: "#F59E0B", percentage: 8.0, emoji: "📈" },
    { name: "Business", value: 70, color: "#EF4444", percentage: 7.0, emoji: "🏢" },
  ],
  monthly: [
    { name: "Job Salary", value: 45000, color: "#10B981", percentage: 50.0, emoji: "💼" },
    { name: "Freelance", value: 22500, color: "#3B82F6", percentage: 25.0, emoji: "💻" },
    { name: "Classes", value: 9000, color: "#8B5CF6", percentage: 10.0, emoji: "📚" },
    { name: "Investments", value: 6750, color: "#F59E0B", percentage: 7.5, emoji: "📈" },
    { name: "Business", value: 6750, color: "#EF4444", percentage: 7.5, emoji: "🏢" },
  ],
  quarterly: [
    { name: "Job Salary", value: 135000, color: "#10B981", percentage: 50.0, emoji: "💼" },
    { name: "Freelance", value: 67500, color: "#3B82F6", percentage: 25.0, emoji: "💻" },
    { name: "Classes", value: 27000, color: "#8B5CF6", percentage: 10.0, emoji: "📚" },
    { name: "Investments", value: 20250, color: "#F59E0B", percentage: 7.5, emoji: "📈" },
    { name: "Business", value: 20250, color: "#EF4444", percentage: 7.5, emoji: "🏢" },
  ],
  yearly: [
    { name: "Job Salary", value: 540000, color: "#10B981", percentage: 50.0, emoji: "💼" },
    { name: "Freelance", value: 270000, color: "#3B82F6", percentage: 25.0, emoji: "💻" },
    { name: "Classes", value: 108000, color: "#8B5CF6", percentage: 10.0, emoji: "📚" },
    { name: "Investments", value: 81000, color: "#F59E0B", percentage: 7.5, emoji: "📈" },
    { name: "Business", value: 81000, color: "#EF4444", percentage: 7.5, emoji: "🏢" },
  ],
};

const renderCustomLabel = (props: any, hoveredCategory: string | null, setHoveredCategory: (cat: string | null) => void, isMobile: boolean = false) => {
  const { cx, cy, midAngle, outerRadius, fill, payload, percent } = props;
  const isHovered = hoveredCategory === payload.name;
  const RADIAN = Math.PI / 180;
  
  // Tighter label positioning for compact layout
  const labelRadius = isMobile ? outerRadius + 25 : outerRadius + 45;
  const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);
  
  // Shorter connector line starting point
  const lineStartX = cx + (outerRadius + 2) * Math.cos(-midAngle * RADIAN);
  const lineStartY = cy + (outerRadius + 2) * Math.sin(-midAngle * RADIAN);
  
  // Simplified control points for smoother, tighter curves
  const cp1Offset = isMobile ? 8 : 15;
  const bendOffset = isMobile ? 20 : 35;
  
  const controlPointX = cx + (outerRadius + cp1Offset) * Math.cos(-midAngle * RADIAN);
  const controlPointY = cy + (outerRadius + cp1Offset) * Math.sin(-midAngle * RADIAN);
  
  // End point before short horizontal line
  const bendPointX = cx + (outerRadius + bendOffset) * Math.cos(-midAngle * RADIAN);
  const bendPointY = cy + (outerRadius + bendOffset) * Math.sin(-midAngle * RADIAN);
  
  const isRightSide = x > cx;
  const horizontalEndX = isRightSide ? bendPointX + (isMobile ? 6 : 12) : bendPointX - (isMobile ? 6 : 12);
  
  const pathData = `
    M ${lineStartX},${lineStartY}
    Q ${controlPointX},${controlPointY} ${bendPointX},${bendPointY}
    L ${horizontalEndX},${bendPointY}
  `;

  return (
    <g 
      onMouseEnter={() => setHoveredCategory(payload.name)}
      onMouseLeave={() => setHoveredCategory(null)}
      style={{ cursor: 'pointer' }}
    >
      <path
        d={pathData}
        stroke={fill}
        strokeWidth={isHovered ? 2.5 : 2}
        fill="none"
        opacity={isHovered ? 1 : 0.9}
        style={{
          transition: 'all 0.3s ease',
          filter: isHovered ? `drop-shadow(0 0 4px ${fill})` : 'none'
        }}
      />
      
      <g transform={`translate(${x}, ${y})`}>
        <rect
          x={isRightSide ? (isMobile ? 2 : 6) : -(isMobile ? 70 : 90)}
          y={isMobile ? -14 : -18}
          width={isMobile ? 68 : 84}
          height={isMobile ? 28 : 36}
          fill={isHovered ? fill : 'white'}
          stroke={fill}
          strokeWidth={isHovered ? 2 : 1.5}
          rx={isMobile ? 6 : 8}
          opacity={isHovered ? 0.95 : 0.92}
          style={{
            transition: 'all 0.3s ease',
            filter: isHovered ? `drop-shadow(0 2px 8px ${fill}40)` : 'drop-shadow(0 1px 3px rgba(0,0,0,0.1))'
          }}
        />
        
        <text
          x={isRightSide ? (isMobile ? 10 : 14) : -(isMobile ? 62 : 82)}
          y={isMobile ? -3 : -4}
          textAnchor={isRightSide ? 'start' : 'start'}
          fill={isHovered ? 'white' : fill}
          className="font-semibold"
          style={{
            fontSize: isMobile ? '11px' : '13px',
            transition: 'fill 0.3s ease'
          }}
        >
          {payload.emoji} {payload.name}
        </text>
        
        <text
          x={isRightSide ? (isMobile ? 10 : 14) : -(isMobile ? 62 : 82)}
          y={isMobile ? 9 : 11}
          textAnchor={isRightSide ? 'start' : 'start'}
          fill={isHovered ? 'white' : '#666'}
          className="font-bold"
          style={{
            fontSize: isMobile ? '10px' : '12px',
            transition: 'fill 0.3s ease'
          }}
        >
          {(percent * 100).toFixed(1)}%
        </text>
      </g>
    </g>
  );
};

interface IncomeDistributionProps {
  onCategoryClick?: (category: string) => void;
  activeCategory?: string;
}

export const IncomeDistribution = ({ onCategoryClick, activeCategory }: IncomeDistributionProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('monthly');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const data = INCOME_DATA_BY_PERIOD[selectedPeriod];
  const totalIncome = data.reduce((sum, item) => sum + item.value, 0);

  const handlePieClick = (entry: any) => {
    onCategoryClick?.(entry.name);
  };

  return (
    <Card className="card-glass border-0 shadow-lg w-full">
      <CardHeader className="pb-3 sm:pb-4 space-y-2 sm:space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="space-y-0.5 sm:space-y-1 min-w-0">
            <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
              <span className="truncate">Income Distribution</span>
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              Total: ₹{totalIncome.toLocaleString()}
            </p>
          </div>
          
          <Tabs 
            value={selectedPeriod} 
            onValueChange={(value) => setSelectedPeriod(value as TimePeriod)}
            className="shrink-0"
          >
            <TabsList className="grid grid-cols-4 h-8 sm:h-9 bg-muted/40">
              <TabsTrigger value="weekly" className="text-xs px-2 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Calendar className="w-3 h-3 sm:hidden" />
                <span className="hidden sm:inline">Week</span>
              </TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs px-2 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <span className="sm:hidden">Mon</span>
                <span className="hidden sm:inline">Month</span>
              </TabsTrigger>
              <TabsTrigger value="quarterly" className="text-xs px-2 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <span className="sm:hidden">Qtr</span>
                <span className="hidden sm:inline">Quarter</span>
              </TabsTrigger>
              <TabsTrigger value="yearly" className="text-xs px-2 sm:px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <span className="sm:hidden">Yr</span>
                <span className="hidden sm:inline">Year</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:px-6 pb-4 sm:pb-6">
        <div className="w-full" style={{ height: isMobile ? '280px' : '340px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 40, right: 100, bottom: 40, left: 100 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props) => renderCustomLabel(props, hoveredCategory, setHoveredCategory, isMobile)}
                outerRadius={isMobile ? 70 : 90}
                innerRadius={isMobile ? 42 : 54}
                fill="#8884d8"
                dataKey="value"
                onClick={handlePieClick}
                style={{ cursor: 'pointer' }}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    opacity={hoveredCategory === null || hoveredCategory === entry.name ? 1 : 0.4}
                    style={{ 
                      transition: 'opacity 0.3s ease',
                      filter: hoveredCategory === entry.name ? `drop-shadow(0 0 8px ${entry.color})` : 'none'
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {data.map((category, idx) => (
            <Button
              key={idx}
              variant="outline"
              className={`h-auto py-2 sm:py-3 px-2 sm:px-3 flex flex-col items-start gap-1 sm:gap-1.5 hover:shadow-md transition-all ${
                activeCategory === category.name ? 'border-primary bg-primary/5 shadow-sm' : ''
              }`}
              onClick={() => onCategoryClick?.(category.name)}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 w-full">
                <span className="text-base sm:text-lg shrink-0">{category.emoji}</span>
                <span className="text-xs sm:text-sm font-semibold text-foreground truncate flex-1 text-left">
                  {category.name}
                </span>
              </div>
              <div className="flex items-baseline justify-between w-full gap-1">
                <span className="text-xs sm:text-sm font-bold" style={{ color: category.color }}>
                  ₹{category.value.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {category.percentage}%
                </span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
