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
import { CategorySummary } from "@/models/generatedTypes";
import { DateRange } from "react-day-picker";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
type PieChartViewProps = {
  date: DateRange | undefined;
};

export default function PieChartView({ date }: PieChartViewProps) {
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<any>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await getTransactionsThisMonth(date!.from!, date!.to!);
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
      categories: { label: "Total spent" },
    };
    categories.forEach((category) => {
      newChartConfig[category.name!] = {
        label: category.name,
        color: category.color,
      };
    });
    setChartConfig(newChartConfig);
  }, [categories]);

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            {date?.from?.toLocaleDateString()} -{" "}
            {date?.to?.toLocaleDateString()}
          </CardDescription>
        </CardHeader>
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
      </Card>
    </>
  );
}
