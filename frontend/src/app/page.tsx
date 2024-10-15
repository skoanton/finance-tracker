"use client";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { addDays } from "date-fns";
import { CategoryType } from "@/models/generatedTypes";
import PieChartView from "@/components/dashboard/PieChartView";
import DateRangePicker from "@/components/DateRangePicker";
import BudgetCompareChart from "@/components/Charts/BudgetCompareChart";
import H1 from "@/components/H1";
import SelectMonth from "@/components/dashboard/SelectMonth";

type DashboardProps = {};

export default function Dashboard({}: DashboardProps) {
  const startOfTheMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  const lastDateOfTheMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfTheMonth,
    to: addDays(lastDateOfTheMonth, 0),
  });

  const onChangeDate = (monthIndex: number) => {
    const date = {
      from: new Date(new Date().getFullYear(), monthIndex, 1),
      to: addDays(new Date(new Date().getFullYear(), monthIndex + 1, 0), 0),
    };
    setDate(date);
  };

  return (
    <>
      <H1 className="mb-5">Dashboard</H1>
      <div className="flex flex-col gap-5">
        <SelectMonth onChangeDate={onChangeDate} date={date} />
        <div className="grid grid-cols-2">
          <PieChartView date={date} type={CategoryType.Income} title={"Income"} />
          <PieChartView date={date} type={CategoryType.Expense} title={"Expense"} />
        </div>
        <div className="grid grid-cols-2">
          <BudgetCompareChart />
          <BudgetCompareChart />
        </div>
      </div>
    </>
  );
}
