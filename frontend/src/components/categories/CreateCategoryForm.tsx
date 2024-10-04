import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Button } from "@/components/ui/button";
import { Category, CategoryType } from "@/models/generatedTypes";
import { useState } from "react";
import { createCategory } from "@/services/api/categoryServices";
const formSchema = z.object({
  categoryName: z.string().min(2).max(50),
  categoryType: z.nativeEnum(CategoryType),
  color: z.string(),
});

type CreateCategoryFormProps = {
  onSetCategories: (categories: Category) => void;
};

export default function CreateCategoryForm({
  onSetCategories,
}: CreateCategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      categoryType: 0,
      color: "#000000",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    const firstLetter = values.categoryName.charAt(0).toUpperCase();
    const restOfName = values.categoryName.slice(1).toLowerCase();
    values.categoryName = firstLetter + restOfName;
    const newCategory: Category = {
      name: values.categoryName,
      type: values.categoryType as CategoryType,
      description: [],
      color: values.color,
    };

    await createCategory(newCategory).then((response) => {
      onSetCategories(response);
      setIsLoading(false);
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
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
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value.toString()}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Income</SelectItem>
                      <SelectItem value="1">Expense</SelectItem>
                      <SelectItem value="2">Savings</SelectItem>
                      <SelectItem value="3">Transfer</SelectItem>
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
                  <Input
                    type="color"
                    className="w-12 h-12 border-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-5" disabled={isLoading}>
            Add Category
          </Button>
        </form>
      </Form>
    </>
  );
}
