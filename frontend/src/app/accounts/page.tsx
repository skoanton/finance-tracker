"use client";
import { useEffect, useState } from "react";

import { deleteAccount, getAllAccounts } from "@/services/api/accountService";
import { Account } from "@/models/generatedTypes";
import AccountCard from "@/components/account/AccountCard";
import Link from "next/link";
import AccountBalanceCard from "@/components/account/AccountBalanceChard";
import AccountBalanceChart from "@/components/account/AccountBalanceChart";
import AccountRecentTransactions from "@/components/account/AccontRecentTransactions";
type AccountPageProps = {};

export default function AccountPage({}: AccountPageProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
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
        setTotalBalance(total);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const onSetAccounts = (account: Account) => {
    setAccounts((prevAccounts) => [...prevAccounts, account]);
  };

  const onDeleteAccount = async (id: number) => {
    await deleteAccount(id).then(() => {
      setAccounts((prevAccounts) => {
        return prevAccounts.filter((account) => account.id !== id);
      });
    });
  };

  return (
    <div className="flex- flex-col gap-2">
      <div className="mb-5">
        <h3 className="text-sm">Total Balance</h3>
        <p className="text-xl font-bold">{totalBalance} SEK</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <AccountBalanceChart />
        <AccountRecentTransactions />
      </div>
    </div>
  );
}
