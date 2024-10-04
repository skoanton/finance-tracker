import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="flex">
      <Navbar />
      <main className="w-screen p-5">
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
}

export default App;
