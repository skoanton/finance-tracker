"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category, CategoryType } from "@/models/generatedTypes";
import { useState } from "react";
import { createCategory, updateCategory } from "@/services/api/categoryServices";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  categoryName: z.string().min(2).max(50),
  categoryType: z.nativeEnum(CategoryType),
  color: z.string(),
});

type CreateCategoryFormProps = {
  category?: Category;
  onModalClose?: () => void;
};

export default function CreateCategoryForm({ category, onModalClose }: CreateCategoryFormProps) {
  const addCategory = useCategoryStore((state) => state.addCategory);
  const updateCategoryState = useCategoryStore((state) => state.updateCategory);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: category?.name || "",
      categoryType: category?.type || CategoryType.Income,
      color: category?.color || "#000000",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    const firstLetter = values.categoryName.charAt(0).toUpperCase();
    const restOfName = values.categoryName.slice(1).toLowerCase();
    values.categoryName = firstLetter + restOfName;
    const newCategory: Category = {
      id: category?.id,
      name: values.categoryName,
      type: values.categoryType,
      description: [],
      color: values.color,
    };
    if (category && onModalClose) {
      const response = await updateCategory(newCategory);
      updateCategoryState(response);
      toast({
        description: "Budget updated",
      });
      onModalClose();
    } else {
      const response = await createCategory(newCategory);
      addCategory(response);
      toast({
        description: "Budget created",
      });
    }

    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category name</FormLabel>
                <FormControl>
                  <Input placeholder="Category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)} value={field.value.toString()}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={CategoryType.Income}>Income</SelectItem>
                      <SelectItem value={CategoryType.Expense}>Expense</SelectItem>
                      <SelectItem value={CategoryType.Transfer}>Transfer</SelectItem>
                      <SelectItem value={CategoryType.Saving}>Saving</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <FormControl>
                  <Input type="color" className="w-12 h-12 border-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-5" disabled={isLoading}>
            {category ? "Edit" : "Create"} category
          </Button>
        </form>
      </Form>
    </>
  );
}
