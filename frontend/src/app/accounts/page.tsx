"use client";
import { useEffect, useState } from "react";

import { deleteAccount, getAllAccounts } from "@/services/api/accountService";
import { Account } from "@/models/generatedTypes";
import AccountCard from "@/components/account/AccountCard";
import AccountBalanceChart from "@/components/account/AccountBalanceChart";
import AccountRecentTransactions from "@/components/account/AccountRecentTransactions";
import WarningDialog from "@/components/WarningDialog";
import { useAccountStore } from "@/stores/useAccountStore";
import { formatToSek } from "@/lib/utils/formatToSek";
type AccountPageProps = {};

export default function AccountPage({}: AccountPageProps) {
  const setAccounts = useAccountStore((state) => state.setAccounts);
  const accounts = useAccountStore((state) => state.accounts);
  const [totalBalance, setTotalBalance] = useState<string>("");
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllAccounts();
        console.log(response);
        const accounts = response;
        setAccounts(accounts);

        const total = accounts.reduce((acc, account) => {
          return acc + account.balance;
        }, 0);
        const formattedTotal = formatToSek(total);
        setTotalBalance(formattedTotal);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-2">
          <AccountBalanceChart totalBalance={totalBalance} />
          <AccountRecentTransactions />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </div>
    </>
  );
}
