import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Account } from "@/models/generatedTypes";
type AccountCardProps = {
  account: Account;
};

export default function AccountCard({ account }: AccountCardProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{account.name}</CardTitle>
          <CardDescription>{account.type}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{account.balance}</p>
        </CardContent>
      </Card>
    </>
  );
}
