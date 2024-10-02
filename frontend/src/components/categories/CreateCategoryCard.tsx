import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { Category, CategoryType } from "@/models/generatedTypes";
import { createCategory } from "@/services/api/categoryServices";
const formSchema = z.object({
  categoryName: z.string().min(2).max(50),
  categoryType: z.nativeEnum(CategoryType),
  budget: z.coerce.number().min(0),
});

type CreateCategoryCardProps = {
  onSetCategories: (categories: Category) => void;
};

export default function CreateCategoryCard({
  onSetCategories,
}: CreateCategoryCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      categoryType: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    const newCategory: Category = {
      name: values.categoryName,
      type: values.categoryType as CategoryType,
      budget: values.budget,
      description: [],
    };

    await createCategory(newCategory).then((response) => {
      onSetCategories(response);
      setIsLoading(false);
    });
  }

  return (
    <div className="p-5 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold">Create Account</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
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
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input placeholder="Budget" {...field} />
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
    </div>
  );
}
