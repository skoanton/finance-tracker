import { useState } from "react";
import Papa from "papaparse";
import { uploadDataToDatabase } from "@/services/api/transactionService";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CsvFile } from "@/models/generatedTypes";

type FileUploaderProps = {};

export default function FileUploader({}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedTransaction, setUploadedTransaction] = useState<
    CsvFile[] | null
  >([]);

  const uploadTransactionToDatabase = async () => {
    if (uploadedTransaction) {
      console.log(uploadedTransaction);
      await uploadDataToDatabase(uploadedTransaction);
    } else {
      console.log("No transactions to upload");
    }
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
              const transaction: CsvFile = {
                accountName: (data[i] as any[])[3].toString(),
                transactionDate: new Date((data[i] as any[])[6]),
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
