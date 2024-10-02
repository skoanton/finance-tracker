import { useState } from "react";
import Papa from "papaparse";
import { CsvFileType } from "@/types/csvFileType";
import { uploadDataToDatabase } from "@/services/api/transactionService";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FileUploaderProps = {};

export default function FileUploader({}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedTransaction, setUploadedTransaction] = useState<
    CsvFileType[] | null
  >([]);

  const uploadTransactionToDatabase = async () => {
    /*    if (uploadedTransaction) {
      const newTransactions = await createTransactions(uploadedTransaction);
      await uploadDataToDatabase(newTransactions);
    } else {
      console.log("No transactions to upload");
    } */
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      Papa.parse(file, {
        encoding: "iso-8859-1",
        complete: function (results) {
          const data = results.data;
          if (Array.isArray(data)) {
            for (let i = 2; i < data.length - 1; i++) {
              const transaction: CsvFileType = {
                account: (data[i] as any[])[3].toString(),
                transaction_date: new Date((data[i] as any[])[6]),
                reference: (data[i] as unknown as any[])[8].toString(),
                description: (data[i] as unknown as any[])[9].toString(),
                amount: parseFloat((data[i] as any[])[10].toString()),
              };
              setUploadedTransaction((prev) => [...(prev ?? []), transaction]);
            }
          }
        },
      });
    }
    await uploadTransactionToDatabase();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Input type="file" onChange={handleFileChange} className="w-48" />
      <Button onClick={handleFileUpload}>Upload file</Button>
    </div>
  );
}
