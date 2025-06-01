import { toast } from "react-toastify";
import { AnalyticsService } from "../services/apis";

export const OrderCardController = (order: any) => {
  const getCardClass = () => {
    if (order?.status === "SERVED" || order?.status === "PICKED_UP")
      return "order-card order-card--done";
    if (order?.type === "TAKE_AWAY") return "order-card order-card--takeaway";
    return "order-card order-card--dinein";
  };

  // Determine type badge style
  const getTypeClass = () => {
    if (order?.status === "SERVED" || order?.status === "PICKED_UP")
      return "order-card__type order-card__type--done";
    if (order?.type === "TAKE_AWAY")
      return "order-card__type order-card__type--takeaway";
    return "order-card__type order-card__type--dinein";
  };

  // Determine button style and text
  const getButtonClass = () => {
    if (order?.status === "SERVED" || order?.status === "PICKED_UP")
      return "order-card__button order-card__button--done";
    if (order?.status === "order-done")
      return "order-card__button order-card__button--order-done";
    if (order?.status === "NOT_PICKED_UP")
      return "order-card__button order-card__button--not-picked-up";
    return "order-card__button order-card__button--processing";
  };

  function formatSnakeCase(input: string) {
    return input
      ?.toLowerCase()
      ?.split("_")
      ?.map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
      ?.join(" ");
  }

  const handleStatusChange = async (e: any, id: any) => {
    const newStatus = e.target?.value;
    const data = await AnalyticsService?.updateItem(
      `https://restaurant-management-backend-bntp.onrender.com/api/v1/orders/${id}/status`,
      {
        status: newStatus,
      }
    );
    if (data?.status === "success") {
      toast("Status Changed Successfully");
    }
  };
  return {
    getCardClass,
    handleStatusChange,
    formatSnakeCase,
    getButtonClass,
    getTypeClass,
  };
};
