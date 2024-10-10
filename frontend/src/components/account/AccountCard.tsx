"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Account } from "@/models/generatedTypes";
import { Button } from "../ui/button";
import { useState } from "react";
import WarningDialog from "../WarningDialog";
import { deleteAccount } from "@/services/api/accountService";
import { useAccountStore } from "@/stores/useAccountStore";
import { formatToSek } from "@/lib/utils/formatToSek";
type AccountCardProps = {
  account: Account;
};

export default function AccountCard({ account }: AccountCardProps) {
  const handleEditAccount = () => {
    console.log("Edit Account");
  };
  const [showDialog, setShowDialog] = useState(false);
  const removeAccount = useAccountStore((state) => state.removeAccount);
  const handleDelete = async () => {
    await deleteAccount(account.id!);
    removeAccount(account.id!);
    setShowDialog(false);
  };

  return (
    <>
      <Card className="cursor-pointer transform transition duration-200 hover:scale-105">
        <CardHeader>
          <h3 className=" text-sm">{account.name}</h3>
          <p className="font-bold text-3xl">{formatToSek(account.balance)}</p>
          <CardDescription>{account.type}</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
