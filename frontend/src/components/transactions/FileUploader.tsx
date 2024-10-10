"use client";
import { use, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Category, CsvFile, Transaction } from "@/models/generatedTypes";
import UnhandledTransactions from "./UnhandledTransactions";
import { uploadTransactions } from "@/services/api/transactionService";
import AccountModal from "../AccountModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useFileUpload } from "@/hooks/useFileUpload";

import { useUploadToDatabase } from "@/hooks/useUploadToDatabase";
import { start } from "repl";
import { useTransactionStore } from "@/stores/useTransactionsStore";
import { useUploadStore } from "@/stores/useUploadStore";
import { useAccountStore } from "@/stores/useAccountStore";
import { after } from "node:test";
import { useResetStates } from "@/hooks/useResetStates";
import { useRouter } from "next/navigation";

type FileUploaderProps = {};

export default function FileUploader({}: FileUploaderProps) {
  const { isFileUploaded, parseCsvFile, isLoading: isFileLoading, accountExists } = useFileUpload();
  const noCategoryTransactions = useTransactionStore((state) => state.noCategoryTransactions);
  const transactionsToUpload = useUploadStore((state) => state.transactionsToUpload);
  const transactionsUploaded = useUploadStore((state) => state.uploadedTransactions);
  const { uploadTransactionToDatabase, isLoading: uploadingIsLoading } = useUploadToDatabase();
  const { toast } = useToast();
  const { resetStates } = useResetStates();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompletion = async () => {
    setIsLoading(true);
    await uploadTransactionToDatabase();
    setIsLoading(false);
    setIsOpen(false);
    toast({
      description: "Transactions has been added.",
    });
    router.push("/transactions/confirm");
  };

  const handleModalClose = () => {
    setIsOpen(false);
    resetStates();
    router.back();
  };

  useEffect(() => {
    if (accountExists && transactionsToUpload.length > 0 && isFileUploaded) {
      uploadTransactionToDatabase();
    }
  }, [accountExists, transactionsToUpload, isFileUploaded]);

  const isTransactionsReadyToUpload = transactionsToUpload.length > 0 && noCategoryTransactions.length === 0 && !uploadingIsLoading;
  const isTransactionsUploaded = transactionsToUpload.length === 0 && isFileUploaded;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleModalClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Upload Transactions</DialogTitle>
            <DialogDescription>Upload a CSV transactions</DialogDescription>
          </DialogHeader>

          {!isFileUploaded && (
            <div className="flex flex-col gap-2">
              <div className="flex gap-5 items-center">
                <Input type="file" onChange={(e) => parseCsvFile(e)} className="w-52" />
              </div>
            </div>
          )}
          <div>
            {isFileLoading && <p className="animate-pulse">Uploading file...</p>}
            {!accountExists && <AccountModal />}
            {uploadingIsLoading && <p className="animate-pulse">Working...</p>}
            {noCategoryTransactions.length > 0 && <UnhandledTransactions />}
          </div>

          {isTransactionsUploaded && <p>Transactions uploaded</p>}

          {isTransactionsReadyToUpload && (
            <>
              <p>
                <span className="font-bold">{transactionsToUpload.length}</span> Transactions ready to be uploaded{" "}
              </p>
              <Button onClick={handleCompletion}>Upload</Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
