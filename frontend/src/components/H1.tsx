import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

type H1Props = {
  className?: string;
  children: React.ReactNode;
};

export default function H1({ className, children }: H1Props) {
  return (
    <>
      <h1 className={cn("font-bold text-5xl", className)}>{children}</h1>
    </>
  );
}
