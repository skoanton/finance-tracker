import { Link } from "react-router-dom";
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
  return (
    <>
      <header className="bg-primary h-screen">
        <nav className="flex flex-col gap-10 p-5">
          <h1 className="text-2xl font-bold text-primary-foreground text-center mt-5 cursor-pointer">
            <Link to="/home">Finance Tracker</Link>
          </h1>
          <ul className="flex flex-col gap-5 items-center">
            <Link to="/accounts">
              <li className="font-bold text-primary-foreground p-1 rounded-lg hover:bg-primary-foreground hover:text-primary cursor-pointer">
                Konton
              </li>
            </Link>
            <Link to="/transactions">
              <li className="font-bold text-primary-foreground p-1 rounded-lg hover:bg-primary-foreground hover:text-primary cursor-pointer">
                Transaktioner
              </li>
            </Link>
            <Link to="/categories">
              <li className="font-bold text-primary-foreground p-1 rounded-lg hover:bg-primary-foreground hover:text-primary cursor-pointer">
                Kategorier
              </li>
            </Link>
          </ul>
        </nav>
      </header>
    </>
  );
}
