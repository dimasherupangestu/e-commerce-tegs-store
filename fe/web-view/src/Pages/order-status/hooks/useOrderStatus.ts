import { useLocation, useParams } from "react-router-dom";
import { APIWithToken } from "../../../libs/axios";
import { useEffect, useState } from "react";
import { OrderStatus } from "../../../types/order-status";

const useOrderStatus = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const transaction_id = queryParams.get("transaction_id");
  const { id: urlId } = useParams<{ id: string }>();

  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderStatus = async (idToFetch: string) => {
    try {
      const response = await APIWithToken.get(`/transaction/${idToFetch}`);
      setOrderStatus(response.data.data);
    } catch (error) {
      setError("Failed to fetch order status. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const idToFetch = transaction_id || urlId;
    
    if (idToFetch) {
      fetchOrderStatus(idToFetch);
    } else {
      setError("Transaction ID is missing.");
      setLoading(false);
    }
  }, [transaction_id, urlId]);

  return {
    orderStatus,
    loading,
    error,
  };
};

export default useOrderStatus;
