"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";
type ActionButtonProps = {};

export default function ActionButton({}: ActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleUpload = () => {
    router.push("/transactions/upload");
  };

  return (
    <>
      <Collapsible className="fixed bottom-5 right-5" open={isOpen}>
        <CollapsibleTrigger asChild>
          <button
            onClick={handleClick}
            className="flex justify-center text-primary-foreground items-center p-5 rounded-full bg-primary cursor-pointer shadow-lg hover:bg-primary-dark hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6.5 20q-2.275 0-3.887-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.038T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.312 3.188T18.5 20z"
              />
            </svg>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="absolute bottom-full mb-3 right-5">
          <button onClick={() => handleUpload()} className="bg-primary text-primary-foreground rounded-full p-5 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M2 7h18m-4-5l5 5l-5 5m6 5H4m4-5l-5 5l5 5" />
            </svg>
          </button>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
