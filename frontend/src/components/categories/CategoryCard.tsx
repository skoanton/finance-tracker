import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "@/models/generatedTypes";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Budget: 1000</p>
        </CardContent>
        <CardFooter>
          <p>Edit</p>
        </CardFooter>
      </Card>
    </>
  );
}
