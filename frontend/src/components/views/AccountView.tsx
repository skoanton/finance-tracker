import { useEffect, useState } from "react";

import { getAllAccounts } from "@/services/api/accountService";
import { Account } from "@/models/generatedTypes";
import AccountForm from "../account/AccountForm";
import AccountCard from "../account/AccountCard";
import { on } from "events";

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

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <AccountForm onSetAccounts={onSetAccounts} />
      <div className="grid grid-cols-3 gap-5">
        {accounts.map((account) => {
          return <AccountCard key={account.id} account={account} />;
        })}
      </div>
    </div>
  );
}
