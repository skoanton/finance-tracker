import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import CreateCategoryForm from "./CreateCategoryForm";
import { Category } from "@/models/generatedTypes";

type EditCategoryModalProps = {
  category: Category;
};

export default function EditCategoryModal({ category }: EditCategoryModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const onModalClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit category</DialogTitle>
            <DialogDescription>Edit the category name,type and color</DialogDescription>
          </DialogHeader>
          <CreateCategoryForm category={category} onModalClose={onModalClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
