"use client";
import { Category } from "@/models/generatedTypes";
import { Button } from "../ui/button";
import { deleteCategory } from "@/services/api/categoryServices";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EllipsisVertical } from "lucide-react";
import { useCategoryStore } from "@/stores/useCategoryStore";
type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const removeCategory = useCategoryStore((state) => state.removeCategory);
  const handleDelete = async () => {
    const response = await deleteCategory(category!.id!);
    removeCategory(response.id!);
  };

  return (
    <>
      <div className="w-1/2 shadow-mg rounded-md border p-3 flex items-center justify-between my-2">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col ">
            <p className="font-bold text-xl">{category.name} </p>
            <p className="text-sm text-gray-500"></p>
          </div>
          <div
            className="w-16 h-2 rounded-xl shadow-md"
            style={{ backgroundColor: category.color }}
          ></div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <Button variant={"ghost"} onClick={() => handleDelete()}>
              <EllipsisVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete()}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
