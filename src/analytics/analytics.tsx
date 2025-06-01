import "./analytics.css";
import { AnalyticsController } from "./analytics-controller";

export const Analytics = () => {
  const {
    handleFilterChange,
    calculatePercentage,
    selectPeriod,
    toggleDropdown,
    chefsData,
    tablesData,
    metricsData,
    selectedFilter,
    periods,
    orderSummaryPeriod,
    showOrderSummaryDropdown,
    orderSummaryData,
    revenuePeriod,
    showRevenueDropdown
  } = AnalyticsController();
  return (
    <div className="main-content-container">
      <div className="analytics-filter-wrapper">
        <span className="analytics-filter-icon"></span>
        <select
          className="analytics-filter-select"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option className="option" value="">
            Filter...
          </option>
          <option className="option" value="order_summary">
            Order Summary
          </option>
          <option className="option" value="revenue">
            Revenue
          </option>
          <option className="option" value="tables">
            Tables
          </option>
        </select>
        <span className="analytics-dropdown-arrow"></span>
      </div>
      <div className="main-content">
        <div className="analytics-container">
          <div className="analytics-header">
            <h1>Analytics</h1>
          </div>

          <div className="stats-grid">
            <div className="stats-card">
              <div className="icon-circle blue">
                <span>👨‍🍳</span>
              </div>
              <div className="stats-info">
                <h2>{metricsData?.total_chefs}</h2>
                <p>TOTAL CHEF</p>
              </div>
            </div>

            <div className="stats-card">
              <div className="icon-circle green">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.8435 6.375C17.8435 6.74796 17.6954 7.10565 17.4316 7.36937C17.1679 7.63309 16.8102 7.78125 16.4373 7.78125H13.156C13.1539 9.76971 12.363 11.6761 10.9569 13.0822C9.55088 14.4882 7.64449 15.2791 5.65603 15.2812H5.07009L12.6873 22.2094C12.8265 22.3329 12.9398 22.4828 13.0206 22.6504C13.1015 22.818 13.1483 23 13.1583 23.1858C13.1683 23.3716 13.1413 23.5576 13.0789 23.7329C13.0165 23.9082 12.9199 24.0694 12.7948 24.2071C12.6696 24.3448 12.5184 24.4563 12.3498 24.5352C12.1812 24.614 11.9987 24.6586 11.8128 24.6664C11.6268 24.6741 11.4412 24.6449 11.2667 24.5804C11.0921 24.5159 10.9321 24.4174 10.7959 24.2906L0.483372 14.9156C0.272812 14.7243 0.125259 14.4735 0.0602015 14.1965C-0.00485579 13.9195 0.0156437 13.6293 0.118992 13.3642C0.222341 13.0991 0.403677 12.8716 0.639047 12.7117C0.874418 12.5518 1.15275 12.4671 1.43728 12.4688H5.65603C6.89923 12.4688 8.09151 11.9749 8.97059 11.0958C9.84967 10.2167 10.3435 9.02445 10.3435 7.78125H1.43728C1.06432 7.78125 0.706632 7.63309 0.442909 7.36937C0.179186 7.10565 0.031028 6.74796 0.031028 6.375C0.031028 6.00204 0.179186 5.64435 0.442909 5.38063C0.706632 5.11691 1.06432 4.96875 1.43728 4.96875H9.40603C8.9694 4.38658 8.40323 3.91406 7.75234 3.58862C7.10146 3.26318 6.38374 3.09375 5.65603 3.09375H1.43728C1.06432 3.09375 0.706632 2.94559 0.442909 2.68187C0.179186 2.41815 0.031028 2.06046 0.031028 1.6875C0.031028 1.31454 0.179186 0.956854 0.442909 0.693131C0.706632 0.429408 1.06432 0.28125 1.43728 0.28125H16.4373C16.8102 0.28125 17.1679 0.429408 17.4316 0.693131C17.6954 0.956854 17.8435 1.31454 17.8435 1.6875C17.8435 2.06046 17.6954 2.41815 17.4316 2.68187C17.1679 2.94559 16.8102 3.09375 16.4373 3.09375H11.5049C11.9612 3.66191 12.3323 4.29355 12.6064 4.96875H16.4373C16.8102 4.96875 17.1679 5.11691 17.4316 5.38063C17.6954 5.64435 17.8435 6.00204 17.8435 6.375Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="stats-info">
                <h2>{metricsData?.total_revenue}</h2>
                <p>TOTAL REVENUE</p>
              </div>
            </div>

            <div className="stats-card">
              <div className="icon-circle purple">
                <span>📋</span>
              </div>
              <div className="stats-info">
                <h2>{metricsData?.total_orders}</h2>
                <p>TOTAL ORDERS</p>
              </div>
            </div>

            <div className="stats-card">
              <div className="icon-circle orange">
                <span>👥</span>
              </div>
              <div className="stats-info">
                <h2>{metricsData?.total_users}</h2>
                <p>TOTAL CLIENTS</p>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="charts-grid">
            {/* Order Summary - show if no filter or if order_summary is selected */}
            {(selectedFilter === "" || selectedFilter === "order_summary") && (
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Order Summary</h3>
                  <div className="dropdown-container">
                    <div
                      className="dropdown"
                      onClick={(e) => toggleDropdown("orderSummary", e)}
                    >
                      <span>{orderSummaryPeriod}</span>
                      <span className="arrow-down"></span>
                    </div>
                    {showOrderSummaryDropdown && (
                      <div className="dropdown-menu">
                        {periods?.map((period) => (
                          <div
                            key={period}
                            className="dropdown-item"
                            onClick={(e) =>
                              selectPeriod("orderSummary", period, e)
                            }
                          >
                            {period}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="divid-table" />

                <div className="order-summary-content">
                  <div className="order-numbers">
                    <div className="order-number-card">
                      <h4>{orderSummaryData?.order_done}</h4>
                      <p>Served</p>
                    </div>
                    <div className="order-number-card">
                      <h4>{orderSummaryData?.dine_in_order}</h4>
                      <p>Dine In</p>
                    </div>
                    <div className="order-number-card">
                      <h4>{orderSummaryData?.take_away_order}</h4>
                      <p>Take Away</p>
                    </div>
                  </div>

                  <div className="chart-container">
                    <div id="order-summary-chart" className="donut-chart"></div>

                    <div className="legend-container">
                      {orderSummaryData && (
                        <>
                          <div className="legend-item">
                            <span className="legend-label">Take Away</span>
                            <span className="legend-percentage">
                              (
                              {calculatePercentage(
                                orderSummaryData?.take_away_order
                              )}
                              %)
                            </span>
                            <div className="progress-bar">
                              <div
                                className="progress take-away"
                                style={{
                                  width: `${calculatePercentage(
                                    orderSummaryData?.take_away_order
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div className="legend-item">
                            <span className="legend-label">Served</span>
                            <span className="legend-percentage">
                              (
                              {calculatePercentage(orderSummaryData?.order_done)}
                              %)
                            </span>
                            <div className="progress-bar">
                              <div
                                className="progress served"
                                style={{
                                  width: `${calculatePercentage(
                                    orderSummaryData?.order_done
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div className="legend-item">
                            <span className="legend-label">Dine In</span>
                            <span className="legend-percentage">
                              (
                              {calculatePercentage(
                                orderSummaryData?.dine_in_order
                              )}
                              %)
                            </span>
                            <div className="progress-bar">
                              <div
                                className="progress dine-in"
                                style={{
                                  width: `${calculatePercentage(
                                    orderSummaryData?.dine_in_order
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Revenue Chart - show if no filter or if revenue is selected */}
            {(selectedFilter === "" || selectedFilter === "revenue") && (
              <div className="chart-card">
                <div className="chart-header">
                  <div>
                    <h3>Revenue</h3>
                  </div>
                  <div className="dropdown-container">
                    <div
                      className="dropdown"
                      onClick={(e) => toggleDropdown("revenue", e)}
                    >
                      <span>{revenuePeriod}</span>
                      <span className="arrow-down"></span>
                    </div>
                    {showRevenueDropdown && (
                      <div className="dropdown-menu">
                        {periods?.map((period) => (
                          <div
                            key={period}
                            className="dropdown-item"
                            onClick={(e) => selectPeriod("revenue", period, e)}
                          >
                            {period}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="divid-table" />
                <div
                  id="revenue-chart-container"
                  className="revenue-chart-container"
                ></div>
              </div>
            )}

            {/* Tables Grid - show if no filter or if tables is selected */}
            {(selectedFilter === "" || selectedFilter === "tables") && (
              <div className="chart-card tables-card">
                <div className="chart-header">
                  <h3>Tables</h3>
                  <div className="tables-legend">
                    <div className="legend-item">
                      <span className="legend-dot reserved"></span>
                      <span className="legend-text">Reserved</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot available"></span>
                      <span className="legend-text">Available</span>
                    </div>
                  </div>
                </div>
                <div className="divid-table" />

                <div className="tables-grid">
                  {tablesData?.map((table: any, index: number) => (
                    <div
                      key={table?.id}
                      className={`table-cell ${
                        !table?.isAvailable ? "active" : ""
                      }`}
                    >
                      <div
                        className={`table-label ${
                          !table?.isAvailable ? "active" : ""
                        }`}
                      >
                        Table
                      </div>
                      <div
                        className={`table-number-analytics ${
                          !table?.isAvailable ? "active" : ""
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chef Table - always visible */}
          <div className="chef-table-container">
            <table className="chef-table">
              <thead>
                <tr>
                  <th>Chef Name</th>
                  <th>Order Taken</th>
                </tr>
              </thead>
              <tbody>
                {chefsData?.map((chef: any) => (
                  <tr key={chef.id}>
                    <td>{chef?.name}</td>
                    <td>{chef?.order_taken}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
