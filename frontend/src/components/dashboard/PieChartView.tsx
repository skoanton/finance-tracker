"use client";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getTransactionsThisMonth } from "@/services/api/transactionService";
import {
  Category,
  CategorySummary,
  CategoryType,
} from "@/models/generatedTypes";
import { DateRange } from "react-day-picker";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
type PieChartViewProps = {
  date: DateRange | undefined;
  type: CategoryType;
  title: string;
};

export default function PieChartView({ date, type, title }: PieChartViewProps) {
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<any>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const [totalAmount, setTotalAmount] = useState<string>("0");
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await getTransactionsThisMonth(
        date!.from!,
        date!.to!,
        type
      );
      console.log(response);
      setCategories(response);
      setIsLoading(false);
    };
    getData();
  }, [date]);

  useEffect(() => {
    const newChartData = categories.map((category) => ({
      key: category.id,
      category: category.name,
      amount: category.amount,
      fill: category.color,
    }));
    setChartData(newChartData);

    const newChartConfig: ChartConfig = {
      categories: { label: "Total" },
    };
    categories.forEach((category) => {
      newChartConfig[category.name!] = {
        label: category.name,
        color: category.color,
      };
    });
    setChartConfig(newChartConfig);

    const total = categories.reduce(
      (acc, category) => acc + category.amount,
      0
    );
    const formattedTotal = new Intl.NumberFormat("se-SV", {
      style: "currency",
      currency: "SEK",
    }).format(total);
    setTotalAmount(formattedTotal);
  }, [categories]);

  return (
    <>
      <Card className="flex flex-col shadow-none border-none">
        <CardHeader className="items-center pb-0">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardDescription className="text-center mt-5">
          Total: {totalAmount}
        </CardDescription>
        {categories.length === 0 ? (
          <div className="text-center font-bold my-5">No data available</div>
        ) : (
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <Pie data={chartData} dataKey="amount" />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelKey="categories"
                      nameKey="category"
                      indicator="line"
                    />
                  }
                />
                <ChartLegend
                  content={<ChartLegendContent nameKey="category" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        )}
      </Card>
    </>
  );
}
