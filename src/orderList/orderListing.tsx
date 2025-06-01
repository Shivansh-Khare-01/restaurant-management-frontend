import { OrderCard } from "./orderCard";
import "./orderListing.css";
import { OrderListingController } from "./orderList-controller";

export function OrderListing() {
  const { orders } = OrderListingController();

  return (
    <div className="main-content-container">
      <div className="search-wrapper hide"></div>
      <div className="main-content">
        <div className="order-listing">
          <h1 className="order-listing__title">Order Line</h1>
          <div className="order-listing__grid">
            {!!orders?.length &&orders?.map((order, idx) => (
              <OrderCard key={idx} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
