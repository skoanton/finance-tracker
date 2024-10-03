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
            const newAccountName: string | null = response.data.filter((d: any) => d.status === "No account found")[0]?.accountName || null;
            console.log({transactionsWithoutCategories,transactionsWithMultipleCategories, categoriesWithMultipleMatches, allCategories,newAccountName});
            return {transactionsWithoutCategories,transactionsWithMultipleCategories, categoriesWithMultipleMatches, allCategories,newAccountName};
    } catch (error) {
        throw new Error("Error uploading data to database");
    }

};

export const getTransactions = async():Promise<Transaction[]> => {
    try {
        const response = await axios.get("http://localhost:5000/api/transaction");
        if(response.status !== 200) {
            throw new Error("Error fetching data from database");
        }
        return response.data;
    } catch (error) {
        throw new Error("Error fetching data from database");
    }
};

export const deleteTransaction = async(id: number) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/transaction/${id}`);
        if(response.status !== 200) {
            throw new Error("Error deleting transaction");
        }
    } catch (error) {
        throw new Error("Error deleting transaction");
    }
}