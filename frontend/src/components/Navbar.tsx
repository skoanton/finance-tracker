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
import {
  ArrowLeftRight,
  Banknote,
  Coins,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";

type NavbarProps = {};

export default function Navbar({}: NavbarProps) {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const isAccounts = location.pathname === "/accounts";
  const isTransactions = location.pathname === "/transactions";
  const isCategories = location.pathname === "/categories";
  const isUpload = location.pathname === "/upload";
  const isBudget = location.pathname === "/budgets";

  return (
    <>
      <header className=" bg-primary w-64 fixed h-full">
        <nav className="flex flex-col gap-10 p-5 h-full">
          <h1 className="text-2xl font-bold text-primary-foreground text-center mt-5 cursor-pointer">
            <Link to="/">Finance Tracker</Link>
          </h1>
          <div className="flex flex-col h-full">
            <ul className="flex flex-col gap-5">
              <Link to="/">
                <li
                  className={`flex gap-2 items-center font-bold  p-2 rounded-lg hover:bg-primary-foreground hover:text-primary cursor-pointer ${
                    isDashboard
                      ? "bg-primary-foreground text-primary "
                      : "text-primary-foreground"
                  }`}
                >
                  <LayoutDashboard />
                  Dashboard
                </li>
              </Link>
              <Link to="/accounts">
                <li
                  className={`flex gap-2 items-center font-bold  p-2 rounded-lg hover:bg-primary-foreground hover:text-primary cursor-pointer ${
                    isAccounts
                      ? "bg-primary-foreground text-primary "
                      : "text-primary-foreground"
                  }`}
                >
                  <CreditCard />
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
                  <ArrowLeftRight />
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
                  <Coins />
                  Kategorier
                </li>
              </Link>
              <Link to="/budgets">
                <li
                  className={`flex gap-2 items-center font-bold  p-2 rounded-lg hover:bg-primary-foreground hover:text-primary cursor-pointer ${
                    isBudget
                      ? "bg-primary-foreground text-primary "
                      : "text-primary-foreground"
                  }`}
                >
                  <Banknote />
                  Budget
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
