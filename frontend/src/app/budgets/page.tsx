"use client";

import BudgetModal from "@/components/budgets/BudgetModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type BudgetPageProps = {};

export default function BudgetPage({}: BudgetPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <Button onClick={() => setIsModalOpen(true)}>
          Create a new budget
        </Button>
        <BudgetModal isModalOpen={isModalOpen} onModalClose={onModalClose} />
      </div>
    </>
  );
}
