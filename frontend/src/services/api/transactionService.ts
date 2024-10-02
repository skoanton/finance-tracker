import { Transaction } from "@/models/generatedTypes";
import axios from "axios";

export const uploadDataToDatabase = async(transactions: Transaction[]) => {


    try {
        for(const transaction of transactions) {
            const response = await axios.post("http://localhost:5000/api/transactions/create", transaction);

            if(response.status !== 200) {
                throw new Error("Error uploading data to database");
            }
            
        }
    } catch (error) {
        throw new Error("Error uploading data to database");
    }

};