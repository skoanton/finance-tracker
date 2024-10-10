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
import H1 from "@/components/H1";
type AccountPageProps = {};

export default function AccountPage({}: AccountPageProps) {
  const setAccounts = useAccountStore((state) => state.setAccounts);
  const accounts = useAccountStore((state) => state.accounts);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllAccounts();
        console.log(response);
        const accounts = response;
        setAccounts(accounts);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <H1 className="mb-5">Accounts</H1>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-2">
          <AccountBalanceChart />
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
