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
import { deleteCategory } from "@/services/api/categoryServices";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
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
  const handleDelete = async () => {
    await deleteCategory(category!.id!).then(() => {
      handleDeleteCategories!(category!);
    });
  };

  return (
    <div className="w-1/2 shadow-mg rounded-md border p-3 flex items-center justify-between">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col ">
          <p className="font-bold text-xl">{category.name} </p>
          <p className="text-sm text-gray-500">
            {/* {categoryTypeMap[category.type]} */}
          </p>
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
  );
}

/*  */
