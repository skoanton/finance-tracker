import { DateRange } from "react-day-picker";
import PieChartView from "../dashboard/PieChartView";
import DateRangePicker from "../DateRangePicker";
import { useState } from "react";
import { addDays } from "date-fns";
import { CategoryType } from "@/models/generatedTypes";

type DashboardViewProps = {};

export default function DashboardView({}: DashboardViewProps) {
  const startOfTheMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const lastDateOfTheMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfTheMonth,
    to: addDays(lastDateOfTheMonth, 0),
  });

  return (
    <>
      <div className="flex flex-col gap-5">
        <DateRangePicker date={date} setDate={setDate} />
        <div className="grid grid-cols-3">
          <PieChartView date={date} type={CategoryType._0} title={"Expense"} />
          <PieChartView date={date} type={CategoryType._1} title={"Income"} />
          <PieChartView date={date} type={CategoryType._2} title={"Savings"} />
        </div>
      </div>
    </>
  );
}
