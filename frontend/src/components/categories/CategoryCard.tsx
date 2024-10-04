import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "@/models/generatedTypes";
import { Button } from "../ui/button";
import { useState } from "react";
import CreateCategoryForm from "./CreateCategoryForm";
import { deleteCategory } from "@/services/api/categoryServices";

type CategoryCardProps = {
  category: Category;
  handleDeleteCategories: (category: Category) => void;
};

const categoryTypeMap = {
  0: "Income",
  1: "Expense",
  2: "Savings",
  3: "Transfers",
};

export default function CategoryCard({
  category,
  handleDeleteCategories,
}: CategoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    await deleteCategory(category!.id!).then(() => {
      handleDeleteCategories!(category!);
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex-row justify-between">
          <CardTitle>{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{categoryTypeMap[category.type!]}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleDelete()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
              />
            </svg>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
