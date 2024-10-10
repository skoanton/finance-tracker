"use client";
import CategoryCard from "@/components/categories/CategoryCard";
import CategoryModal from "@/components/categories/CategoryModal";
import { Category } from "@/models/generatedTypes";
import { useEffect, useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useGetAllCategories } from "@/hooks/useGetAllCategories";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { get } from "http";
type CategoriesViewProps = {};

export default function CategoriesView({}: CategoriesViewProps) {
  const { getCategories } = useGetAllCategories();

  useEffect(() => {
    getCategories();
  }, []);

  const categories = useCategoryStore((state) => state.categories);

  const categoryTypeMap: Record<string, string> = {
    Income: "Income",
    Expense: "Expense",
    Saving: "Saving",
    // Add any other categories as needed
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <CategoryModal />
        </div>
        <div className="flex flex-col gap-5">
          {Object.keys(categoryTypeMap).map((typeKey) => {
            return (
              <div key={typeKey}>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-bold">
                      {categoryTypeMap[typeKey]} ({categories.filter((c) => c.type === typeKey).length})
                    </AccordionTrigger>
                    <AccordionContent>
                      {/* Display the title for each type */}
                      {categories
                        ?.filter((c) => c.type === typeKey)
                        .map((category) => (
                          <CategoryCard key={category.id} category={category} />
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
