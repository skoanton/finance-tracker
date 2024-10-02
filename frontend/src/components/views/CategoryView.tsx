import { Category } from "@/models/generatedTypes";
import { getCategories } from "@/services/api/categoryServices";
import { useEffect, useState } from "react";
import CategoryCard from "../categories/CategoryCard";
import CreateCategoryCard from "../categories/CreateCategoryCard";

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

  return (
    <div className="grid grid-cols-5">
      <CreateCategoryCard onSetCategories={onSetCategories} />
      {categories?.map((category) => {
        return <CategoryCard key={category.id} category={category} />;
      })}
    </div>
  );
}
