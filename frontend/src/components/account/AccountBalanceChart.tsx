import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { AccountsBalanceSummary } from "@/models/generatedTypes";
import { get } from "http";
import {
  getAccountBalanceSummaryByMonth,
  getAccountBalanceSummaryByWeek,
  getAccountBalanceSummaryByYear,
} from "@/services/api/accountService";
import { set } from "date-fns";
export const description = "A line chart";
const chartData = [
  { interval: "January", balance: 186 },
  { interval: "February", balance: 305 },
  { interval: "March", balance: 237 },
  { interval: "April", balance: 73 },
  { interval: "May", balance: 209 },
  { interval: "June", balance: 214 },
];
const chartConfig = {
  balance: {
    label: "Balance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type AccountBalanceChartProps = {};

export default function AccountBalanceChart({}: AccountBalanceChartProps) {
  const [weekIsActive, setWeekIsActive] = useState(true);
  const [monthIsActive, setMonthIsActive] = useState(false);
  const [yearIsActive, setYearIsActive] = useState(false);
  const [chartData, setChartData] = useState<AccountsBalanceSummary[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      const response = await getAccountBalanceSummaryByWeek();
      if (response) {
        setChartData(response);
      }
    };
    fetchChartData();
    setIsLoading(false);
  }, []);

  const handleWeekClick = async () => {
    if (weekIsActive) return;
    setWeekIsActive(true);
    setMonthIsActive(false);
    setYearIsActive(false);
    const response = await getAccountBalanceSummaryByWeek();
    if (response) {
      setChartData(response);
    }
  };

  const handleMonthClick = async () => {
    if (monthIsActive) return;
    setWeekIsActive(false);
    setMonthIsActive(true);
    setYearIsActive(false);
    const response = await getAccountBalanceSummaryByMonth();
    if (response) {
      setChartData(response);
    }
  };

  const handleYearClick = async () => {
    if (yearIsActive) return;
    setWeekIsActive(false);
    setMonthIsActive(false);
    setYearIsActive(true);
    const response = await getAccountBalanceSummaryByYear();
    if (response) {
      setChartData(response);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle className="text-md">Balance</CardTitle>
          <div className="flex items-center border rounded-lg">
            <Button
              onClick={() => handleWeekClick()}
              variant={"secondary"}
              className={` ${
                weekIsActive
                  ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  : "text-primary hover:bg-primary-foreground hover:text-primary"
              }`}
            >
              Week
            </Button>
            <Button
              onClick={() => handleMonthClick()}
              variant={"secondary"}
              className={` ${
                monthIsActive
                  ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  : "text-primary hover:bg-primary-foreground hover:text-primary"
              }`}
            >
              Month
            </Button>
            <Button
              onClick={() => handleYearClick()}
              variant={"secondary"}
              className={` ${
                yearIsActive
                  ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  : "text-primary hover:bg-primary-foreground hover:text-primary"
              }`}
            >
              Year
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="animate-pulse">Getting your balance...</div>
          )}
          {chartData && (
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData!}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="interval"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="balance"
                  type="natural"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </>
  );
}
