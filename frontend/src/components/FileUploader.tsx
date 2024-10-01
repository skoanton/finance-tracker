import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Papa from "papaparse";
import { CsvFileType } from "@/types/csvFileType";

type FileUploaderProps = {};

export default function FileUploader({}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedTransaction, setUploadedTransaction] = useState<
    CsvFileType[] | null
  >([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
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
  };

  return (
    <>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleFileUpload}>Upload file</Button>
      {uploadedTransaction?.map((transaction, index) => {
        return (
          <div key={index}>
            <h1>{transaction.account}</h1>
            <p>{transaction.transaction_date.toDateString()}</p>
            <p>{transaction.reference}</p>
            <p>{transaction.description}</p>
            <p>{transaction.amount}</p>
          </div>
        );
      })}
    </>
  );
}
