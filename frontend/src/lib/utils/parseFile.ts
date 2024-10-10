import { CsvFile } from "@/models/generatedTypes";
import Papa from "papaparse";

export const parseFile = async (file: File): Promise<CsvFile[]> => {
  return new Promise<CsvFile[]>((resolve) => {
    let transactions: CsvFile[] = [];
    Papa.parse(file, {
      encoding: "iso-8859-1",
      complete: function (results) {
        const data = results.data;
        if (Array.isArray(data)) {
          for (let i = 2; i < data.length - 1; i++) {
            const transaction: CsvFile = {
              id: i,
              accountName: (data[i] as any[])[3].toString(),
              transactionDate: new Date((data[i] as any[])[6]),
              description: (data[i] as unknown as any[])[9].toString(),
              amount: parseFloat((data[i] as any[])[10].toString()),
              startBalance: parseFloat((data[i] as any[])[11].toString()),
            };
            transactions.push(transaction);
          }
        }
        resolve(transactions);
      },
    });
  });
};
