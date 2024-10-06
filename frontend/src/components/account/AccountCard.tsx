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
type AccountCardProps = {
  account: Account;
  onDeleteAccount: (id: number) => void;
};

export default function AccountCard({
  account,
  onDeleteAccount,
}: AccountCardProps) {
  const handleEditAccount = () => {
    console.log("Edit Account");
  };

  return (
    <>
      <Card className="w-80 h-52">
        <CardHeader>
          <CardTitle>{account.name}</CardTitle>
          <CardDescription>{account.type}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{account.balance} SEK</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button className="" onClick={() => handleEditAccount()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
              />
            </svg>
          </Button>
          <Button className="" onClick={() => onDeleteAccount(account.id!)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75M4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.75 1.75 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15M6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25"
              />
            </svg>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
