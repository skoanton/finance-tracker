"use client";
import CategoryCard from "@/components/categories/CategoryCard";
import CategoryModal from "@/components/categories/CategoryModal";
import { Category } from "@/models/generatedTypes";
import { getCategories } from "@/services/api/categoryServices";
import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
type CategoriesViewProps = {};

export default function CategoriesView({}: CategoriesViewProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getCategories();

        setCategories(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const onSetCategories = (category: Category) => {
    setCategories([...categories, category]);
  };

  const handleDeleteCategories = (category: Category) => {
    setCategories(categories.filter((cat) => cat.id !== category.id));
    console.log("Category deleted");
  };

  const categoryTypeMap: Record<number, string> = {
    0: "Income",
    1: "Expense",
    2: "Savings",
    3: "Transfers",
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <CategoryModal onSetCategories={onSetCategories} />
        </div>
        <div className="flex flex-col gap-5">
          {Object.keys(categoryTypeMap).map((typeKey) => {
            const type = parseInt(typeKey, 10); // Convert the key back to a number
            return (
              <div key={type}>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-bold">
                      {categoryTypeMap[type]} (
                      {categories.filter((c) => c.type === type).length})
                    </AccordionTrigger>
                    <AccordionContent>
                      {/* Display the title for each type */}
                      {categories
                        ?.filter((c) => c.type === type)
                        .map((category) => (
                          <CategoryCard
                            key={category.id}
                            category={category}
                            handleDeleteCategories={handleDeleteCategories}
                          />
                        ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
