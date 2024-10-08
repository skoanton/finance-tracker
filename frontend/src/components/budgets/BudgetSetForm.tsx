import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Checkbox } from "../ui/checkbox";
import { Budget, BudgetCategory, Category } from "@/models/generatedTypes";
import { createBudgetCategory } from "@/services/api/budgetCategory";
import { createNewBudget } from "@/services/api/budget";
const formSchema = z.object({
  budget: z.array(
    z.object({
      categoryId: z.coerce.number(),
      amount: z.coerce.number(),
    })
  ),
});
type BudgetSetFormProps = {
  categories: Partial<Category>[] | null;
  allCategories: Category[] | null;
  name: string;
};

export default function BudgetSetForm({
  categories,
  name,
  allCategories,
}: BudgetSetFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: [],
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values); // Add debugging here
    const newBudgetCategories: BudgetCategory[] = values.budget.map(
      (category) => {
        return {
          categoryId: category.categoryId,
          amount: category.amount,
        };
      }
    );
    const date = new Date();
    const startOfTheMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfTheMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const newBudget: Budget = {
      name: name,
      totalBudget: newBudgetCategories.reduce(
        (acc, curr) => acc + curr.amount,
        0
      ),
      startDate: startOfTheMonth,
      endDate: endOfTheMonth,
    };

    const createdBudget = await createNewBudget(newBudget);

    console.log("New budgetCategories:", newBudgetCategories);

    const newBudgetCategoriesWithBudgetId: BudgetCategory[] =
      newBudgetCategories.map((category) => {
        return {
          ...category,
          budgetId: createdBudget.id,
        };
      });
    const hej = await Promise.all(
      newBudgetCategoriesWithBudgetId.map((category) =>
        createBudgetCategory(category)
      )
    );
    console.log("New budgetCategories with budgetId:", hej);
    console.log("added new budget:", newBudget);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {categories &&
            categories?.map((category, index) => (
              <div key={category.id}>
                <FormField
                  control={form.control}
                  name={`budget.${index}.amount`}
                  render={({ field }) => (
                    <FormItem key={category.id}>
                      <FormLabel>{category.name}</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <input
                  key={category.id}
                  type="hidden"
                  {...form.register(`budget.${index}.categoryId`, {
                    value: category.id,
                  })}
                />
              </div>
            ))}
          <Button type="submit">Create budget</Button>
        </form>
      </Form>
    </>
  );
}
