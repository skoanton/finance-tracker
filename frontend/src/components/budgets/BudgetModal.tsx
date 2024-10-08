import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import BudgetCreateForm from "./BudgetCreateForm";
type BudgetModalProps = {
  isModalOpen: boolean;
  onModalClose: () => void;
};

export default function BudgetModal({
  isModalOpen,
  onModalClose,
}: BudgetModalProps) {
  const handleCreateBudget = () => {
    console.log("Creating a new budget");
  };
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onModalClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new budget</DialogTitle>
            <DialogDescription>
              Enter the name of the budget you want to create
            </DialogDescription>
          </DialogHeader>
          <BudgetCreateForm />
          <Button onClick={() => handleCreateBudget()}>Create</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
