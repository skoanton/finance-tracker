"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateCategoryForm from "./CreateCategoryForm";
import { Category } from "@/models/generatedTypes";
import { Button } from "../ui/button";
type CategoryModalProps = {};

export default function CategoryModal({}: CategoryModalProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Skapa ny kategori</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ny kategori</DialogTitle>
            <DialogDescription>Skapa en ny kategori för att kategorisera dina transaktioner.</DialogDescription>
          </DialogHeader>
          <CreateCategoryForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
