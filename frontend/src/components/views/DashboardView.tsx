import { DateRange } from "react-day-picker";
import PieChartView from "../dashboard/PieChartView";
import DateRangePicker from "../DateRangePicker";
import { useState } from "react";
import { addDays } from "date-fns";

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
      <div>
        <h1>Dashboard</h1>
        <DateRangePicker date={date} setDate={setDate} />
        <PieChartView date={date} />
      </div>
    </>
  );
}
