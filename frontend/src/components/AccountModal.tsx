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
  newAccount: CsvFile | null;
};

export default function AccountModal({ newAccount }: AccountModalProps) {
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
          <AccountForm account={newAccount} onSetIsOpen={onSetIsOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}
