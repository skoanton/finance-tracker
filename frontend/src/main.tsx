import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import AccountView from "./components/views/AccountView.tsx";
import TransactionView from "./components/views/TransactionView.tsx";
import CategoryView from "./components/views/CategoryView.tsx";
import FileUploader from "./components/transcations/FileUploader.tsx";
import DashboardView from "./components/views/DashboardView.tsx";
import BudgetView from "./components/views/BudgetView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardView />,
      },
      {
        path: "accounts",
        element: <AccountView />,
      },
      {
        path: "transactions",
        element: <TransactionView />,
      },
      {
        path: "categories",
        element: <CategoryView />,
      },
      {
        path: "upload",
        element: <FileUploader />,
      },
      {
        path: "budgets",
        element: <BudgetView />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
