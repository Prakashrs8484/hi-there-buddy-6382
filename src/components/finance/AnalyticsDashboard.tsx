import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PieChart, BarChart3, TrendingUp, TrendingDown, Download } from "lucide-react";
import { ExpenseDistribution } from "./ExpenseDistribution";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { IncomeDistribution } from "./IncomeDistribution";
import { IncomeBreakdown } from "./IncomeBreakdown";
import { CategoryAnalysisPanel } from "./CategoryAnalysisPanel";
import { useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { exportToPDF } from "@/utils/pdfExport";
import { toast } from "sonner";

type ViewMode = "expense" | "income";

interface AnalyticsDashboardProps {
  selectedCategory?: string | null;
  onCategorySelect?: (category: string | null) => void;
}

export const AnalyticsDashboard = ({ selectedCategory, onCategorySelect }: AnalyticsDashboardProps) => {
  const [activeTab, setActiveTab] = useState("distribution");
  const [viewMode, setViewMode] = useState<ViewMode>("expense");
  const [isExporting, setIsExporting] = useState(false);
  const isMobile = useIsMobile();
  const chartRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    onCategorySelect?.(category);
  };

  const handleCloseInsights = () => {
    onCategorySelect?.(null);
  };

  // Sample data for PDF export - In production, this would come from actual data
  const getExportData = () => {
    if (viewMode === "expense") {
      return {
        type: 'expense' as const,
        period: 'Monthly',
        total: 3180,
        categories: [
          { name: "Health", value: 850, percentage: 26.7, emoji: "🏥" },
          { name: "Food", value: 720, percentage: 22.6, emoji: "🍔" },
          { name: "Transport", value: 580, percentage: 18.2, emoji: "🚗" },
          { name: "Entertainment", value: 450, percentage: 14.2, emoji: "🎬" },
          { name: "Shopping", value: 380, percentage: 11.9, emoji: "🛍️" },
          { name: "Social Life", value: 200, percentage: 6.4, emoji: "🎪" },
        ]
      };
    } else {
      return {
        type: 'income' as const,
        period: 'Monthly',
        total: 90000,
        categories: [
          { name: "Job Salary", value: 45000, percentage: 50.0, emoji: "💼" },
          { name: "Freelance", value: 22500, percentage: 25.0, emoji: "💻" },
          { name: "Classes", value: 9000, percentage: 10.0, emoji: "📚" },
          { name: "Investments", value: 6750, percentage: 7.5, emoji: "📈" },
          { name: "Business", value: 6750, percentage: 7.5, emoji: "🏢" },
        ]
      };
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    toast.loading("Generating PDF report...");
    
    try {
      const data = getExportData();
      const chartElement = chartRef.current?.querySelector('.recharts-wrapper') as HTMLElement;
      
      await exportToPDF({
        ...data,
        chartElement: chartElement || undefined,
      });
      
      toast.dismiss();
      toast.success("PDF report downloaded successfully!");
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.dismiss();
      toast.error("Failed to generate PDF report");
    } finally {
      setIsExporting(false);
    }
  };

  // If category is selected, show analysis panel
  if (selectedCategory) {
    return (
      <CategoryAnalysisPanel 
        category={selectedCategory} 
        onBack={handleCloseInsights}
        mode={viewMode}
      />
    );
  }

  // Mobile view - Stack vertically
  if (isMobile) {
    return (
      <Card className="card-glass border-0 shadow-lg w-full overflow-hidden">
        <div className="bg-card/95 backdrop-blur-sm border-b border-border/50 px-3 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold truncate">Analytics Dashboard</h2>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {selectedCategory ? `Viewing ${selectedCategory} insights` : 'Select a category to view insights'}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleExportPDF}
              disabled={isExporting}
              className="shrink-0 h-8 px-2"
            >
              <Download className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Primary Toggle: Expense/Income */}
        <div className="border-b border-border/50 px-3 py-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)} className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-muted/40 h-9">
              <TabsTrigger 
                value="expense"
                className="data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive data-[state=active]:border-destructive/20 flex items-center justify-center gap-1.5 text-xs font-semibold"
              >
                <TrendingDown className="w-3.5 h-3.5" />
                <span>Expense</span>
              </TabsTrigger>
              <TabsTrigger 
                value="income"
                className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-600 data-[state=active]:border-green-500/20 flex items-center justify-center gap-1.5 text-xs font-semibold"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Income</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="border-b border-border/50 overflow-x-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-muted/30 rounded-none h-auto">
              <TabsTrigger 
                value="distribution"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center justify-center gap-1.5 py-2.5 text-xs"
              >
                <PieChart className="w-3.5 h-3.5" />
                <span>Distribution</span>
              </TabsTrigger>
              <TabsTrigger 
                value="breakdown"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center justify-center gap-1.5 py-2.5 text-xs"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Breakdown</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="p-3 w-full overflow-hidden" ref={chartRef}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="distribution" className="mt-0 w-full">
              {viewMode === "expense" ? (
                <ExpenseDistribution 
                  onCategoryClick={handleCategoryClick}
                  activeCategory={selectedCategory || undefined}
                />
              ) : (
                <IncomeDistribution 
                  onCategoryClick={handleCategoryClick}
                  activeCategory={selectedCategory || undefined}
                />
              )}
            </TabsContent>
            <TabsContent value="breakdown" className="mt-0 w-full">
              {viewMode === "expense" ? (
                <CategoryBreakdown 
                  onCategoryClick={handleCategoryClick}
                  activeCategory={selectedCategory || undefined}
                />
              ) : (
                <IncomeBreakdown 
                  onCategoryClick={handleCategoryClick}
                  activeCategory={selectedCategory || undefined}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    );
  }

  // Desktop view - Main view
  return (
    <Card className="card-glass border-0 shadow-lg w-full overflow-hidden">
      <div className="bg-card/95 backdrop-blur-sm border-b border-border/50 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-semibold">Analytics Dashboard</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Click a category to view detailed insights
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleExportPDF}
            disabled={isExporting}
            className="gap-2 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export PDF</span>
          </Button>
        </div>
      </div>

      {/* Primary Toggle: Expense/Income */}
      <div className="border-b border-border/50 px-4 sm:px-6 py-3">
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)} className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 bg-muted/40 h-10">
            <TabsTrigger 
              value="expense"
              className="data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive data-[state=active]:border-destructive/20 flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <TrendingDown className="w-4 h-4" />
              <span>Expense</span>
            </TabsTrigger>
            <TabsTrigger 
              value="income"
              className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-600 data-[state=active]:border-green-500/20 flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Income</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="border-b border-border/50 overflow-x-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-muted/30 rounded-none h-auto">
            <TabsTrigger 
              value="distribution"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center justify-center gap-2 py-3 text-sm"
            >
              <PieChart className="w-4 h-4" />
              <span className="hidden sm:inline">Distribution</span>
            </TabsTrigger>
            <TabsTrigger 
              value="breakdown"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center justify-center gap-2 py-3 text-sm"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Breakdown</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4 sm:p-6 w-full overflow-hidden" ref={chartRef}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="distribution" className="mt-0 w-full">
            {viewMode === "expense" ? (
              <ExpenseDistribution 
                onCategoryClick={handleCategoryClick}
                activeCategory={selectedCategory || undefined}
              />
            ) : (
              <IncomeDistribution 
                onCategoryClick={handleCategoryClick}
                activeCategory={selectedCategory || undefined}
              />
            )}
          </TabsContent>
          <TabsContent value="breakdown" className="mt-0 w-full">
            {viewMode === "expense" ? (
              <CategoryBreakdown 
                onCategoryClick={handleCategoryClick}
                activeCategory={selectedCategory || undefined}
              />
            ) : (
              <IncomeBreakdown 
                onCategoryClick={handleCategoryClick}
                activeCategory={selectedCategory || undefined}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};
