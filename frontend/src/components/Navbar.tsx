import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

type NavbarProps = {};

export default function Navbar({}: NavbarProps) {
  const location = useLocation();

  const isAccounts = location.pathname === "/accounts";
  const isTransactions = location.pathname === "/transactions";
  const isCategories = location.pathname === "/categories";
  const isUpload = location.pathname === "/upload";

  return (
    <>
      <header className="bg-primary h-screen">
        <nav className="flex flex-col gap-10 p-5 h-full">
          <h1 className="text-2xl font-bold text-primary-foreground text-center mt-5 cursor-pointer">
            <Link to="/home">Finance Tracker</Link>
          </h1>
          <div className="flex flex-col h-full">
            <ul className="flex flex-col gap-5">
              <Link to="/accounts">
                <li
                  className={`flex gap-2 items-center font-bold  p-2 rounded-lg hover:bg-primary-foreground hover:text-primary cursor-pointer ${
                    isAccounts
                      ? "bg-primary-foreground text-primary "
                      : "text-primary-foreground"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 56 56"
                  >
                    <path
                      fill="currentColor"
                      d="M9.625 47.71h36.75c4.898 0 7.36-2.413 7.36-7.241V15.555c0-4.828-2.462-7.266-7.36-7.266H9.625c-4.898 0-7.36 2.438-7.36 7.266v24.914c0 4.828 2.461 7.242 7.36 7.242M6.039 15.767c0-2.438 1.313-3.703 3.656-3.703h36.633c2.32 0 3.633 1.265 3.633 3.703v1.968H6.039Zm3.656 28.172c-2.344 0-3.656-1.243-3.656-3.68V23.055h43.922v17.203c0 2.437-1.313 3.68-3.633 3.68ZM12.39 37h5.743c1.383 0 2.297-.914 2.297-2.25v-4.336c0-1.312-.914-2.25-2.297-2.25H12.39c-1.383 0-2.297.938-2.297 2.25v4.336c0 1.336.914 2.25 2.297 2.25"
                    />
                  </svg>{" "}
                  Konton
                </li>
              </Link>
              <Link to="/transactions">
                <li
                  className={`flex gap-2 items-center font-bold  p-2 rounded-lg hover:bg-primary-foreground hover:text-primary cursor-pointer ${
                    isTransactions
                      ? "bg-primary-foreground text-primary "
                      : "text-primary-foreground"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      d="M2 7h18m-4-5l5 5l-5 5m6 5H4m4-5l-5 5l5 5"
                    />
                  </svg>{" "}
                  Transaktioner
                </li>
              </Link>
              <Link to="/categories">
                <li
                  className={`flex gap-2 items-center font-bold  p-2 rounded-lg hover:bg-primary-foreground hover:text-primary cursor-pointer ${
                    isCategories
                      ? "bg-primary-foreground text-primary "
                      : "text-primary-foreground"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1M4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4s-4 1.794-4 4s1.794 4 4 4"
                    />
                  </svg>{" "}
                  Kategorier
                </li>
              </Link>
            </ul>
            <ul className="flex flex-col gap-5 mt-auto">
              <Link to="/upload" className="">
                <li
                  className={`flex gap-2 items-center font-bold  p-2 rounded-lg hover:bg-primary-foreground hover:text-primary cursor-pointer ${
                    isUpload
                      ? "bg-primary-foreground text-primary "
                      : "text-primary-foreground"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6.5 20q-2.275 0-3.887-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.038T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.312 3.188T18.5 20z"
                    />
                  </svg>{" "}
                  Ladda upp
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
