import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Budget } from "@/models/generatedTypes";
import { Button } from "../ui/button";
import { activateBudget, deleteBudget } from "@/services/api/budget";
import { useState } from "react";
import { on } from "events";
import { formatToSek } from "@/lib/utils/formatToSek";

type BudgetCardProps = {
  budget: Budget;
  onUpdateBudgets: (budget: Budget) => void;
  onRemoveBudget: (budget: Budget) => void;
};

export default function BudgetCard({ budget, onUpdateBudgets, onRemoveBudget }: BudgetCardProps) {
  const [isActive, setIsActive] = useState(budget.isActive);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleActive = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const activatedBudget = await activateBudget(budget.id!);
      setIsActive(true);
      onUpdateBudgets(activatedBudget);
    } catch (err) {
      setError("Failed to activate the budget. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
      onUpdateBudgets({ ...budget, isActive: true });
    }
  };

  const handleDelete = async () => {
    await deleteBudget(budget.id!);
    onRemoveBudget(budget);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{budget.name}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Total Budget: {formatToSek(budget.totalBudget)}</p>
        </CardContent>
        <CardFooter>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button onClick={handleActive} disabled={budget.isActive || isLoading}>
            {budget.isActive ? "Active" : isLoading ? "Activating..." : "Activate Budget"}
          </Button>
          <Button onClick={() => handleDelete()}>Delete</Button>
        </CardFooter>
      </Card>
    </>
  );
}
