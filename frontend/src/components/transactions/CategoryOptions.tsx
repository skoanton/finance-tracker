import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Transaction } from "@/models/generatedTypes";
import { useState } from "react";
type CategoryOptionsProps = {
  transaction: Transaction;
  categories: Category[];
  onSetTransactions: (transaction: Transaction, category: Category) => void;
};

export default function CategoryOptions({
  transaction,
  categories,
  onSetTransactions,
}: CategoryOptionsProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    transaction.category.id?.toString()
  );
  const handleChangeCategory = (id: string) => {
    const newCategoryToAdd = categories!.find((c) => c.id === parseInt(id));
    if (newCategoryToAdd) {
      onSetTransactions(transaction, newCategoryToAdd);
      setSelectedCategory(id);
    }
  };

  return (
    <>
      <Select
        value={selectedCategory}
        onValueChange={(value) => handleChangeCategory(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue>
            {
              categories.find((c) => c.id!.toString() === selectedCategory)
                ?.name
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id!.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
