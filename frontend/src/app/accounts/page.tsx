"use client";
import { useEffect, useState } from "react";

import { deleteAccount, getAllAccounts } from "@/services/api/accountService";
import { Account } from "@/models/generatedTypes";
import AccountCard from "@/components/account/AccountCard";
import Link from "next/link";
type AccountPageProps = {};

export default function AccountPage({}: AccountPageProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllAccounts();
        console.log(response);
        setAccounts(response);
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
    <>
      {accounts.length > 0 ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-5">
            {accounts.map((account) => {
              return (
                <AccountCard
                  key={account.id}
                  account={account}
                  onDeleteAccount={onDeleteAccount}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-xl font-bold">
            No Accounts added, please upload some{" "}
            <Link href="/upload" className="underline cursor-pointer">
              transactions
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
