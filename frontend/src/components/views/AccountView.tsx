import { useEffect, useState } from "react";

import { deleteAccount, getAllAccounts } from "@/services/api/accountService";
import { Account } from "@/models/generatedTypes";
import AccountForm from "../account/AccountForm";
import AccountCard from "../account/AccountCard";

type AccountViewProps = {};

export default function AccountView({}: AccountViewProps) {
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
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-5">
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
  );
}
