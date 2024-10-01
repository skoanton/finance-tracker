import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex">
      <Header />
      <main className="w-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
