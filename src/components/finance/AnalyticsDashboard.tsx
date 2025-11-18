import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart3 } from "lucide-react";
import { ExpenseDistribution } from "./ExpenseDistribution";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { CategoryAnalysisPanel } from "./CategoryAnalysisPanel";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AnalyticsDashboardProps {
  selectedCategory?: string | null;
  onCategorySelect?: (category: string | null) => void;
}

export const AnalyticsDashboard = ({ selectedCategory, onCategorySelect }: AnalyticsDashboardProps) => {
  const [activeTab, setActiveTab] = useState("distribution");
  const isMobile = useIsMobile();

  const handleCategoryClick = (category: string) => {
    onCategorySelect?.(category);
  };

  const handleCloseInsights = () => {
    onCategorySelect?.(null);
  };

  // If category is selected, show analysis panel
  if (selectedCategory) {
    return (
      <CategoryAnalysisPanel 
        category={selectedCategory} 
        onBack={handleCloseInsights}
      />
    );
  }

  // Mobile view - Stack vertically
  if (isMobile) {
    return (
      <Card className="card-glass border-0 shadow-lg w-full overflow-hidden">
        <div className="bg-card/95 backdrop-blur-sm border-b border-border/50 px-3 py-3">
          <h2 className="text-base font-semibold truncate">Analytics Dashboard</h2>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {selectedCategory ? `Viewing ${selectedCategory} insights` : 'Select a category to view insights'}
          </p>
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

        <div className="p-3 w-full overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="distribution" className="mt-0 w-full">
              <ExpenseDistribution 
                onCategoryClick={handleCategoryClick}
                activeCategory={selectedCategory || undefined}
              />
            </TabsContent>
            <TabsContent value="breakdown" className="mt-0 w-full">
              <CategoryBreakdown 
                onCategoryClick={handleCategoryClick}
                activeCategory={selectedCategory || undefined}
              />
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
        <h2 className="text-lg sm:text-xl font-semibold">Analytics Dashboard</h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Click a category to view detailed insights
        </p>
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

      <div className="p-4 sm:p-6 w-full overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="distribution" className="mt-0 w-full">
            <ExpenseDistribution 
              onCategoryClick={handleCategoryClick}
              activeCategory={selectedCategory || undefined}
            />
          </TabsContent>
          <TabsContent value="breakdown" className="mt-0 w-full">
            <CategoryBreakdown 
              onCategoryClick={handleCategoryClick}
              activeCategory={selectedCategory || undefined}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};
