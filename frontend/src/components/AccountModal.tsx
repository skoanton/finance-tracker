"use client";
import { CsvFile } from "@/models/generatedTypes";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AccountForm from "./account/AccountForm";
import { useState } from "react";

type AccountModalProps = {};

export default function AccountModal({}: AccountModalProps) {
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
          <AccountForm onSetIsOpen={onSetIsOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}
