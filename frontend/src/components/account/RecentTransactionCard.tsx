import { Transaction } from "@/models/generatedTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RecentTransactionCardProps = {
  transaction: Transaction;
};

export default function RecentTransactionCard({
  transaction,
}: RecentTransactionCardProps) {
  return (
    <>
      <div className="flex flex-col border shadow-md p-4 rounded-md bg-secondary">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold">{transaction.description}</h4>
          <h4 className="text-sm font-bold">{transaction.amount} SEK</h4>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs italic">{transaction.category.name}</p>
          <p className="text-xs italic">{transaction.account.name}</p>
        </div>
      </div>
    </>
  );
}
