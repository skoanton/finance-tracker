import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex">
      <Navbar />
      <main className="w-screen p-5">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
