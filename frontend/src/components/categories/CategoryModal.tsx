import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateCategoryForm from "./CreateCategoryForm";
import { Category } from "@/models/generatedTypes";
import { Button } from "../ui/button";
type CategoryModalProps = {
  onSetCategories: (categories: Category) => void;
};

export default function CategoryModal({ onSetCategories }: CategoryModalProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Skapa ny kategori</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ny kategori</DialogTitle>
            <DialogDescription>
              Skapa en ny kategori för att kategorisera dina transaktioner.
            </DialogDescription>
          </DialogHeader>
          <CreateCategoryForm onSetCategories={onSetCategories} />
        </DialogContent>
      </Dialog>
    </>
  );
}
