import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import BudgetCreateForm from "./BudgetCreateForm";
import { Budget } from "@/models/generatedTypes";
type BudgetModalProps = {
  isModalOpen: boolean;
  onModalClose: () => void;
  onSetBudgets: (budget: Budget) => void;
};

export default function BudgetModal({ isModalOpen, onModalClose, onSetBudgets }: BudgetModalProps) {
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onModalClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new budget</DialogTitle>
            <DialogDescription>Enter the name of the budget you want to create</DialogDescription>
          </DialogHeader>
          <BudgetCreateForm onSetBudgets={onSetBudgets} onModalClose={onModalClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
