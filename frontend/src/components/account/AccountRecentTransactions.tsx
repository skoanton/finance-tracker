import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import RecentTransactionCard from "./RecentTransactionCard";
import { Transaction } from "@/models/generatedTypes";
import { useEffect, useState } from "react";
import { getLastTenTransactions } from "@/services/api/transactionService";
import { set } from "date-fns";

type AccountRecentTransactionsProps = {};

export default function AccountRecentTransactions({}: AccountRecentTransactionsProps) {
  const [lastTransactions, setLastTransactions] = useState<
    Transaction[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchLastTransactions = async () => {
      setIsLoading(true);
      const response = await getLastTenTransactions();

      if (response) {
        setLastTransactions(response);
      }
    };
    fetchLastTransactions();
    setIsLoading(false);
  }, []);

  return (
    <>
      <Card>
        <CardHeader className="m-0 pb-0">
          <CardTitle className="text-md">Recent Transaction</CardTitle>
        </CardHeader>
        <CardContent className="m-0 p-0">
          <ScrollArea className="h-[500px] w-full rounded-md border p-4 border-none">
            <div className="flex flex-col gap-2">
              {isLoading && <p className="animate-pulse">Loading...</p>}
              {lastTransactions &&
                lastTransactions.map((transaction) => (
                  <RecentTransactionCard
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
