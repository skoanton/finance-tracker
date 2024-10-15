"use client";

import BudgetCard from "@/components/budgets/BudgetCard";
import BudgetModal from "@/components/budgets/BudgetModal";
import { Button } from "@/components/ui/button";
import { Budget } from "@/models/generatedTypes";
import { getBudgets } from "@/services/api/budget";
import { useEffect, useState } from "react";

type BudgetPageProps = {};

export default function BudgetPage({}: BudgetPageProps) {
  const [budgets, setBudgets] = useState<Budget[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchBudgets = async () => {
      const response = await getBudgets();
      if (response) {
        setBudgets(response);
      }
    };
    fetchBudgets();
  }, []);

  const onSetBudgets = (budget: Budget) => {
    if (!budgets) {
      setBudgets([budget]);
    } else {
      // Check if budget already exists, if so, update it, otherwise add it
      const updatedBudgets = budgets.some((b) => b.id === budget.id) ? budgets.map((b) => (b.id === budget.id ? budget : b)) : [...budgets, budget];
      setBudgets(updatedBudgets);
    }
  };

  const onRemoveBudget = (budget: Budget) => {
    if (!budgets) return;

    const updatedBudgets = budgets.filter((b) => b.id !== budget.id);
    setBudgets(updatedBudgets);
  };

  const onUpdateBudgets = (updatedBudget: Budget) => {
    if (!budgets) return;

    const updatedBudgets = budgets.map((b) => {
      // Debugging to ensure the correct budget is being updated
      console.log(`Checking budget ID: ${b.id}, Updated budget ID: ${updatedBudget.id}`);

      // If it's the updated budget, ensure it's active
      if (b.id === updatedBudget.id) {
        console.log(`Setting budget ${b.id} as active.`);
        return { ...updatedBudget, isActive: true };
      }
      // Set all other budgets to inactive
      console.log(`Setting budget ${b.id} as inactive.`);
      return { ...b, isActive: false };
    });

    console.log("Updated budgets:", updatedBudgets);
    setBudgets(updatedBudgets); // Update the state with the modified budgets array
  };

  return (
    <>
      <div>
        <Button onClick={() => setIsModalOpen(true)}>Create a new budget</Button>
        <BudgetModal isModalOpen={isModalOpen} onModalClose={onModalClose} onSetBudgets={onSetBudgets} />
        {budgets &&
          budgets.map((budget) => <BudgetCard key={budget.id} budget={budget} onUpdateBudgets={onUpdateBudgets} onRemoveBudget={onRemoveBudget} />)}
      </div>
    </>
  );
}
