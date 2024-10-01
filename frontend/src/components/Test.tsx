import { Account } from "@/models/generated";
import { getAllAccounts } from "@/services/api/accountService";
import { useEffect, useState } from "react";
import FileUploader from "./FileUploader";

type TestProps = {};

export default function Test({}: TestProps) {
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

  return (
    <>
      {accounts.map((account) => {
        return (
          <div key={account.id}>
            <h1>{account.name}</h1>
            <p>{account.balance}</p>
            <FileUploader />
          </div>
        );
      })}
    </>
  );
}
