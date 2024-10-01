/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { APIWithToken } from "../../../libs/axios";

const useTransaction = () => {
    const [transactions, setTransactions] = useState<any>([]);

    const fetchTransaction = async () => {
        try {
            const response = await APIWithToken.get('/transaction');
            // console.log(response);
            setTransactions(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTransaction();
    }, []);

    return {
        transactions
    };
}

export default useTransaction;
