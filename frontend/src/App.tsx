import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ActionButton from "./components/ActionButton";

function App() {
  return (
    <div className="flex">
      <Navbar />
      <main className="w-screen p-5">
        <Outlet />
        <ActionButton />
      </main>
    </div>
  );
}

export default App;
