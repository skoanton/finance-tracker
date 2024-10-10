import { CsvFile, Transaction } from "@/models/generatedTypes";

type TransactionOverviewProps = {
  selectedTransaction: CsvFile;
};

export default function TransactionOverview({
  selectedTransaction,
}: TransactionOverviewProps) {
  return (
    <>
      <>
        <div>
          <p className="text-sm">
            <strong>Account:</strong> {selectedTransaction.accountName}{" "}
          </p>
          <p className="text-sm">
            {" "}
            <strong>Date:</strong>{" "}
            {new Date(
              selectedTransaction.transactionDate!
            ).toLocaleDateString()}{" "}
          </p>
        </div>
        <div>
          <p className="text-sm">
            <strong>Description: </strong> {selectedTransaction.description}
          </p>{" "}
          <p className="text-sm">
            <strong>Amount:</strong> {selectedTransaction.amount} kr{" "}
          </p>
        </div>
      </>
    </>
  );
}
