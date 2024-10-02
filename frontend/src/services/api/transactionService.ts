import { CsvFile, Transaction } from "@/models/generatedTypes";
import axios from "axios";

export const uploadDataToDatabase = async(transactions: CsvFile[]) => {

    console.log(transactions);

    try {
        
            const response = await axios.post("http://localhost:5000/api/transaction/create", transactions);

            if(response.status !== 200) {
                throw new Error("Error uploading data to database");
            }
          
            console.log(response);
        
    } catch (error) {
        throw new Error("Error uploading data to database");
    }

};