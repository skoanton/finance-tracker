import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, CategoryType, Transaction } from "@/models/generatedTypes";
import { useState } from "react";
type CategoryOptionsProps = {
  transaction: Transaction;
  categories: Category[];
  onSetTransactions: (transaction: Transaction, category: Category) => void;
};

export default function CategoryOptions({ transaction, categories, onSetTransactions }: CategoryOptionsProps) {
  const [selectedCategory, setSelectedCategory] = useState(transaction.category.id?.toString());
  const handleChangeCategory = (id: string) => {
    const newCategoryToAdd = categories!.find((c) => c.id === parseInt(id));
    if (newCategoryToAdd) {
      onSetTransactions(transaction, newCategoryToAdd);
      setSelectedCategory(id);
    }
  };
  const filteredCategories = categories.filter((c) => {
    return transaction.amount > 0
      ? [CategoryType.Income, CategoryType.Saving, CategoryType.Transfer].includes(c.type) // Positive transactions
      : [CategoryType.Expense, CategoryType.Saving, CategoryType.Transfer].includes(c.type); // Negative transactions
  });

  return (
    <>
      <Select value={selectedCategory} onValueChange={(value) => handleChangeCategory(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue>{categories.find((c) => c.id!.toString() === selectedCategory)?.name}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {filteredCategories.map((category) => (
            <SelectItem key={category.id} value={category.id!.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
