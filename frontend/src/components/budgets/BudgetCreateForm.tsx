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
import { useEffect, useState } from "react";
import { getCategories } from "@/services/api/categoryServices";
import { Budget, Category } from "@/models/generatedTypes";
import { Checkbox } from "../ui/checkbox";
import BudgetSetForm from "./BudgetSetForm";

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

export default function BudgetCreateForm({
  onSetBudgets,
  onModalClose,
}: BudgetCreateFormProps) {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [showNextForm, setShowNextForm] = useState(false);
  const [categoriesToAdd, setCategoriesToAdd] = useState<
    Partial<Category>[] | null
  >(null);
  const [budgetName, setBudgetName] = useState<string>("");
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();

      if (response) {
        setCategories(response);
      }
    };
    fetchCategories();
  }, []);

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
            <FormField
              control={form.control}
              name="categoriesChoices"
              render={() => (
                <FormItem>
                  {categories &&
                    categories.map((category) => (
                      <FormField
                        key={category.id!}
                        control={form.control}
                        name="categoriesChoices"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={category.id!}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  name="categoriesChoices"
                                  checked={field.value?.some(
                                    (value: { id: number; name: string }) =>
                                      value.id === category.id &&
                                      value.name === category.name
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
                                      : field.onChange(
                                          field.value?.filter(
                                            (value: {
                                              id: number;
                                              name: string;
                                            }) => value.id !== category.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {category.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Confirm</Button>
          </form>
        </Form>
      )}
      {showNextForm && (
        <BudgetSetForm
          categories={categoriesToAdd}
          name={budgetName}
          onSetBudgets={onSetBudgets}
          onModalClose={onModalClose}
        />
      )}
    </>
  );
}
