"use client";
import { CsvFile } from "@/models/generatedTypes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AccountForm from "./account/AccountForm";
import { useState } from "react";

type AccountModalProps = {
  newAccountName: string | null;
  handleTransactionUpload: (message: string) => void;
};

export default function AccountModal({
  newAccountName,
  handleTransactionUpload,
}: AccountModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const onSetIsOpen = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
            <DialogDescription>New Account Detected</DialogDescription>
          </DialogHeader>
          <AccountForm
            newAccountName={newAccountName}
            onSetIsOpen={onSetIsOpen}
            handleTransactionUpload={handleTransactionUpload}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
