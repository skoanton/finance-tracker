import { Account } from "@/models/generatedTypes";
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