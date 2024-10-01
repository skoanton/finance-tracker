import { Account } from "@/models/generated";

export const getAllAccounts = async ():Promise<Account[]> => {
    try {
        const response = await fetch("https://localhost:5001/api/accounts");

        if(!response.ok) {
            throw new Error("Failed to fetch accounts");
        }
        const accounts : Account[] = await response.json();
        return accounts;
    }
    catch (error) {
        console.log(error);
        throw error; 
    }
}