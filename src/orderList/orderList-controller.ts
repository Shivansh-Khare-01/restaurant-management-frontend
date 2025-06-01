import { useEffect, useState } from "react";
import { AnalyticsService } from "../services/apis";

export const OrderListingController = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const orderData = await AnalyticsService.getCategoriesAndSubCategories(
      "https://restaurant-management-backend-bntp.onrender.com/api/v1/orders"
    );
    if (orderData?.status === "success") {
      setOrders(orderData?.data?.orders);
    }
  };
  useEffect(() => {
    // Simulate data fetch
    getOrders();
  }, []);

  return {
    orders,
  };
};
