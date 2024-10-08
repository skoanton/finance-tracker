import { Budget } from "@/models/generatedTypes";
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