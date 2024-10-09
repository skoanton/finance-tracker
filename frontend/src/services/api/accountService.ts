import { Account, AccountsBalanceSummary } from "@/models/generatedTypes";
import axios from "axios";
export const getAllAccounts = async ():Promise<Account[]> => {
    try {
        const response = await fetch("http://localhost:5000/api/accounts");

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

export const createAccount = async (account: Account):Promise<Account> => {
    try {
        const response = await fetch("http://localhost:5000/api/accounts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(account)
        });

        if(!response.ok) {
            throw new Error("Failed to create account");
        }
        const createdAccount : Account = await response.json();
        return createdAccount;
    }
    catch (error) {
        console.log(error);
        throw error; 
    }
}

export const deleteAccount = async (id: number):Promise<void> => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/accounts/${id}`);

        if(response.status !== 200) {
            throw new Error("Error deleting category");
        }

    }
    catch (error) {
        console.log(error);
        throw error; 
    }
}

export const getAccountBalanceSummaryByWeek = async ():Promise<AccountsBalanceSummary[]> => {
    try {
        const response = await axios.get("http://localhost:5000/api/accounts/balance/week");

        if(response.status !== 200) {
            throw new Error("Error deleting category");
        }
        const accounts : AccountsBalanceSummary[] = response.data;
        return accounts;
    }
    catch (error) {
        console.log(error);
        throw error; 
    }
}

export const getAccountBalanceSummaryByMonth = async ():Promise<AccountsBalanceSummary[]> => {
    try {
        const response = await axios.get("http://localhost:5000/api/accounts/balance/month");

        if(response.status !== 200) {
            throw new Error("Error deleting category");
        }
        const accounts : AccountsBalanceSummary[] = response.data;
        return accounts;
    }
    catch (error) {
        console.log(error);
        throw error; 
    }
}

export const getAccountBalanceSummaryByYear = async ():Promise<AccountsBalanceSummary[]> => {
    try {
        const response = await axios.get("http://localhost:5000/api/accounts/balance/year");

        if(response.status !== 200) {
            throw new Error("Error deleting category");
        }
        const accounts : AccountsBalanceSummary[] = response.data;
        return accounts;
    }
    catch (error) {
        console.log(error);
        throw error; 
    }
}