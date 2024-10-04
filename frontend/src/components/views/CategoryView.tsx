import { Category } from "@/models/generatedTypes";
import { getCategories } from "@/services/api/categoryServices";
import { useEffect, useState } from "react";
import CategoryCard from "../categories/CategoryCard";
import CategoryModal from "../categories/CategoryModal";

type CategoryViewProps = {};

export default function CategoryView({}: CategoryViewProps) {
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

  return (
    <div className="flex flex-col gap-5">
      <div className="w-1/2">
        <CategoryModal onSetCategories={onSetCategories} />
      </div>
      <div className="flex flex-col gap-5">
        {categories?.map((category) => {
          return (
            <CategoryCard
              key={category.id}
              category={category}
              handleDeleteCategories={handleDeleteCategories}
            />
          );
        })}
      </div>
    </div>
  );
}
