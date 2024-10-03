import { Category, CsvFile, Transaction } from "@/models/generatedTypes";
import axios from "axios";

export const uploadTransactions = async(transactions: CsvFile[]) => {
    
    try {
        
            const response = await axios.post("http://localhost:5000/api/transaction/create", transactions);

            if(response.status !== 200) {
                throw new Error("Error uploading data to database");
            }
            
            console.log(response);
            const transactionsWithoutCategories:CsvFile[] | null = response.data.filter((d:any) => d.status === "No Category Found").map((d: any) => d.transaction);
            const transactionsWithMultipleCategories:CsvFile[] | null = response.data.filter((d:any) => d.status === "Multiple Categories Found").map((d: any) => d.transaction);
            const categoriesWithMultipleMatches:Category[] | null = response.data.filter((d:any) => d.status === "Multiple Categories Found").map((d: any) => d.categories);
            const allCategories:Category[] | null = response.data.filter((d:any) => d.status === "All Categories").flatMap((d: any) => d.allCategories);
            const newAccounts:Transaction[] | null = response.data.filter((d:any) => d.status === "No account found").map((d: any) => d.transaction);
            const newAccount = newAccounts && newAccounts.length > 0 ? newAccounts[0] : null;
            console.log({transactionsWithoutCategories,transactionsWithMultipleCategories, categoriesWithMultipleMatches, allCategories,newAccount});
            return {transactionsWithoutCategories,transactionsWithMultipleCategories, categoriesWithMultipleMatches, allCategories,newAccount};
    } catch (error) {
        throw new Error("Error uploading data to database");
    }

};