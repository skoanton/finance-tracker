import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { months } from "@/lib/utils/consts";
import { Value } from "@radix-ui/react-select";
import { DateRange } from "react-day-picker";
type SelectMonthProps = {
  onChangeDate: (monthIndex: number) => void;
  date: DateRange | undefined;
};

export default function SelectMonth({ onChangeDate, date }: SelectMonthProps) {
  return (
    <>
      <Select value={date?.from?.getMonth().toString()} onValueChange={(value) => onChangeDate(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
