import { Link } from "react-router-dom";

type HeaderProps = {};

export default function Header({}: HeaderProps) {
  return (
    <header className="bg-primary h-screen">
      <nav className="flex flex-col gap-10 p-5">
        <h1 className="text-2xl font-bold text-primary-foreground text-center mt-5">
          Finance Tracker
        </h1>
        <ul className="flex flex-col gap-5 items-center">
          <li className="font-bold text-primary-foreground p-1 rounded-lg hover:bg-primary-foreground hover:text-primary cursor-pointer">
            <Link to="/home">Hem</Link>
          </li>
          <li className="font-bold text-primary-foreground p-1 rounded-lg hover:bg-primary-foreground hover:text-primary cursor-pointer">
            Transaktioner
          </li>
        </ul>
      </nav>
    </header>
  );
}
