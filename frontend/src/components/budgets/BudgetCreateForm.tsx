import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Budget, Category } from "@/models/generatedTypes";
import { Checkbox } from "../ui/checkbox";
import BudgetSetForm from "./BudgetSetForm";
import { useGetAllCategories } from "@/hooks/useGetAllCategories";
import { get } from "http";
import { useCategoryStore } from "@/stores/useCategoryStore";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  categoriesChoices: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .refine((value) => value.some((category) => category), {
      message: "You have to select at least one category.",
    }),
});

type BudgetCreateFormProps = {
  onSetBudgets: (budget: Budget) => void;
  onModalClose: () => void;
};

export default function BudgetCreateForm({ onSetBudgets, onModalClose }: BudgetCreateFormProps) {
  const { getCategories } = useGetAllCategories();
  const categories = useCategoryStore((state) => state.categories);
  useEffect(() => {
    getCategories();
  }, []);

  const [showNextForm, setShowNextForm] = useState(false);
  const [categoriesToAdd, setCategoriesToAdd] = useState<Partial<Category>[] | null>(null);
  const [budgetName, setBudgetName] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoriesChoices: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setCategoriesToAdd(values.categoriesChoices);
    setBudgetName(values.name);
    setShowNextForm(true);
  }

  const categoryTypeMap: Record<string, string> = {
    Income: "Income",
    Expense: "Expense",
    Savings: "Savings",
    // Add any other categories as needed
  };

  return (
    <>
      {!showNextForm && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget name</FormLabel>
                  <FormControl>
                    <Input placeholder="Budget" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {Object.keys(categoryTypeMap).map((typeKey) => {
              return (
                <FormField
                  control={form.control}
                  name="categoriesChoices"
                  render={() => (
                    <FormItem>
                      <h1 className="font-bold">{categoryTypeMap[typeKey]}</h1>
                      {categories &&
                        categories
                          .filter((c) => c.type === typeKey)
                          .map((category) => (
                            <FormField
                              key={category.id!}
                              control={form.control}
                              name="categoriesChoices"
                              render={({ field }) => {
                                return (
                                  <FormItem key={category.id!} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        name="categoriesChoices"
                                        checked={field.value?.some(
                                          (value: { id: number; name: string }) => value.id === category.id && value.name === category.name
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                {
                                                  id: category.id!,
                                                  name: category.name,
                                                },
                                              ])
                                            : field.onChange(field.value?.filter((value: { id: number; name: string }) => value.id !== category.id));
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{category.name}</FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
            <Button type="submit">Confirm</Button>
          </form>
        </Form>
      )}
      {showNextForm && <BudgetSetForm categories={categoriesToAdd} name={budgetName} onSetBudgets={onSetBudgets} onModalClose={onModalClose} />}
    </>
  );
}
