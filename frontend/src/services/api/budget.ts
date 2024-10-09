import { Budget, BudgetChartData } from "@/models/generatedTypes";
import axios from "axios";

export const createNewBudget = async (newBudget: Budget) => {
  try {
    const response = await axios.post("http://localhost:5000/api/budget", newBudget);
    
    if (response.status !== 201) {
      throw new Error("Error updating Budget Category");
    }

    const createdBudget: Budget = response.data;
    return createdBudget;
  } catch (error) {
    throw new Error(`Error updating Budget Category: ${error}`);
  }
};


export const getBudgets = async (): Promise<Budget[]> => {
    try {
        const response = await axios.get("http://localhost:5000/api/budget");
    
        if (response.status !== 200) {
        throw new Error("Error getting budgets");
        }
    
        const budgets: Budget[] = response.data;
        return budgets;
    } catch (error) {
        throw new Error("Error getting budgets");
    }
}


export const activateBudget = async (id: number) => {
    try {
        const active = await axios.post(`http://localhost:5000/api/budget/${id}/activate`);
        if (active.status !== 200) {
            throw new Error("Error activating budget");
        }
        return active.data;

    } catch (error) {
        throw new Error("Error activating budget");
    }
}

export const getBudgetChartMonthData = async ():Promise<BudgetChartData[]> => {
    try {
        const response = await axios.get("http://localhost:5000/api/budget/month/chart");
        if (response.status !== 200) {
            throw new Error("Error fetching data from database");
        }
        const chartData: BudgetChartData[] = response.data;
        return chartData;
    } catch (error) {
        throw new Error("Error fetching data from database");
    }
}