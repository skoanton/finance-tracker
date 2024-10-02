import FileUploader from "../transcations/FileUploader";

type TransactionViewProps = {};

export default function TransactionView({}: TransactionViewProps) {
  return (
    <>
      <div className="flex justify-center">
        <FileUploader />
      </div>
    </>
  );
}
