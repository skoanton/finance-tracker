import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BudgetChartData } from "@/models/generatedTypes";
import { use, useEffect, useState } from "react";
import { getBudgetChartMonthData } from "@/services/api/budget";

type BudgetCompareChartProps = {};

export default function BudgetCompareChart({}: BudgetCompareChartProps) {
  const [budgetChartData, setBudgetChartData] = useState<BudgetChartData[]>([]);
  const [chartData, setChartData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customChartConfig, setCustomChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      const response = await getBudgetChartMonthData();
      console.log(response);
      if (response) {
        setBudgetChartData(response);
      }
      setIsLoading(false);
    };
    fetchChartData();
  }, []);

  useEffect(() => {
    if (budgetChartData.length > 0) {
      const newChartData = budgetChartData.map((category) => ({
        category: category.category,
        categorySum: Math.round(category.categorySum!),
        budget: category.budgetSum,
      }));
      setChartData(newChartData);

      const newChartConfig: ChartConfig = {
        category: {
          label: "Category",
          color: "hsl(var(--chart-1))",
        },
        budget: {
          label: "Budget",
          color: "#007bff",
        },
      };

      budgetChartData.forEach((category) => {
        newChartConfig[category.category!] = {
          label: category.category,
          color: category.color,
        };
      });

      setCustomChartConfig(newChartConfig);
    }
  }, [budgetChartData]);

  const getCategoryColor = (category: string) => {
    return customChartConfig?.[category]?.color || "#8884d8"; // Default color if category not found
  };

  return (
    <>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Budget</CardTitle>
          <CardDescription>This month</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="animate-pulse">Loading...</p>}
          {chartData && (
            <ChartContainer config={customChartConfig}>
              <BarChart accessibilityLayer data={chartData!}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <YAxis
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="categorySum" name="Spent" radius={1}>
                  {chartData.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getCategoryColor(entry.category)}
                    />
                  ))}
                </Bar>
                <Bar
                  dataKey="budget"
                  name={"Budget"}
                  fill={customChartConfig.budget?.color || "#007bff"}
                  radius={1}
                />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </>
  );
}
