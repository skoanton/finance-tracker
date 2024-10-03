import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "@/models/generatedTypes";
import { Button } from "../ui/button";
import { useState } from "react";
import CreateCategoryForm from "./CreateCategoryForm";

type CategoryCardProps = {
  onSetCategories?: (categories: Category) => void;
  category?: Category;
  isCreate?: boolean;
};

export default function CategoryCard({
  category,
  isCreate = false,
  onSetCategories,
}: CategoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="flex-row justify-between">
          <CardTitle>{isCreate ? "New Category" : category!.name}</CardTitle>
          {isCreate ? (
            <Button onClick={() => setIsEditing(!isEditing)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
                />
              </svg>
            </Button>
          ) : (
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
              >
                <g fill="currentColor">
                  <path
                    d="M200 56v152a8 8 0 0 1-8 8H64a8 8 0 0 1-8-8V56Z"
                    opacity="0.2"
                  />
                  <path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16M96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0m48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0" />
                </g>
              </svg>
            </Button>
          )}
        </CardHeader>
        {isCreate && (
          <CardContent>
            {isEditing && (
              <CreateCategoryForm onSetCategories={onSetCategories!} />
            )}
          </CardContent>
        )}
      </Card>
    </>
  );
}
