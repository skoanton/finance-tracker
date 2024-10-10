import { CsvFile, Transaction } from "@/models/generatedTypes";
import Papa from "papaparse";
import { toast } from "./use-toast";
import { useState } from "react";
import { useUploadStore } from "@/stores/useUploadStore";
import { getAccountByName } from "@/services/api/accountService";
import { checkAccountExists } from "@/lib/utils/checkAccountExists";
import { parseFile } from "@/lib/utils/parseFile";
import { useAccountStore } from "@/stores/useAccountStore";

export const useFileUpload = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [accountExists, setAccountExists] = useState(true);
  const setTransactionsToUpload = useUploadStore((state) => state.setTransactionsToUpload);
  const [isLoading, setIsLoading] = useState(false);
  const setNewAccountInfo = useAccountStore((state) => state.setNewAccountInfo);
  const parseCsvFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.type === "text/csv") {
        setIsLoading(true);

        const transactionsToUploadFromFile = await parseFile(file);

        setTransactionsToUpload(transactionsToUploadFromFile);

        const accountIsExisting = await checkAccountExists(transactionsToUploadFromFile[0].accountName);
        if (!accountIsExisting) {
          const newAccount = {
            name: transactionsToUploadFromFile[0].accountName,
            balance: transactionsToUploadFromFile[0].startBalance,
          };
          setNewAccountInfo(newAccount);
        }
        setAccountExists(accountIsExisting);

        setIsFileUploaded(true);
        setIsLoading(false);
      } else {
        toast({
          description: "Please upload a CSV file",
          variant: "destructive",
        });
      }
    }
  };

  return {
    isFileUploaded,
    parseCsvFile,
    isLoading,
    accountExists,
  };
};
