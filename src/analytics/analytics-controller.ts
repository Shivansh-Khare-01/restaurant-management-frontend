import { useEffect, useState } from "react";
import { AnalyticsService } from "../services/apis";
import Highcharts from "highcharts";

const AnalyticsController = () => {
  const [orderSummaryPeriod, setOrderSummaryPeriod] = useState("Daily");
  const [revenuePeriod, setRevenuePeriod] = useState("Daily");
  const [showOrderSummaryDropdown, setShowOrderSummaryDropdown] =
    useState(false);
  const [showRevenueDropdown, setShowRevenueDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const periods = ["Daily", "Weekly", "Monthly", "Yearly"];

  const [metricsData, setMetricsData] = useState<any>([]);
  const [revenueData, setRevenueData] = useState<any>([]);
  const [orderSummaryData, setOrderSummaryData] = useState<any>([]);
  const [tablesData, setTablesData] = useState<any>([]);
  const [chefsData, setChefsData] = useState<any>([]);

  const getMetricsData = async () => {
    const data = await AnalyticsService.getCategoriesAndSubCategories(
      "https://restaurant-management-backend-bntp.onrender.com/api/v1/analytics/metrics"
    );
    if (data?.status === "success") {
      setMetricsData(data?.data);
    }
  };

  const getRevenueData = async (timespan: any) => {
    const data = await AnalyticsService.getCategoriesAndSubCategories(
      `https://restaurant-management-backend-bntp.onrender.com/api/v1/analytics/revenue?timespan=${timespan}`
    );
    if (data?.status === "success") {
      const revenueLabels = data?.data?.revenues?.map((r: any) => r?.label);
      const revenue = data?.data?.revenues?.map((r: any) => r?.revenue);
      setRevenueData({ revenue, revenueLabels });
    }
  };

  const getOrderSummryData = async (timespan: any) => {
    const data = await AnalyticsService.getCategoriesAndSubCategories(
      `https://restaurant-management-backend-bntp.onrender.com/api/v1/analytics/order-summary?timespan=${timespan}`
    );
    if (data?.status === "success") {
      setOrderSummaryData(data?.data);
      return data?.data;
    }
  };

  const getTableData = async () => {
    const data = await AnalyticsService.getCategoriesAndSubCategories(
      "https://restaurant-management-backend-bntp.onrender.com/api/v1/tables"
    );
    if (data?.status === "success") {
      setTablesData(data?.data?.tables);
    }
  };

  const getChefsData = async () => {
    const data = await AnalyticsService.getCategoriesAndSubCategories(
      "https://restaurant-management-backend-bntp.onrender.com/api/v1/chefs"
    );
    if (data?.status === "success") {
      setChefsData(data?.data?.chefs);
    }
  };

  // Handle dropdown toggle
  const toggleDropdown = (dropdown: any, event: any) => {
    event.stopPropagation();
    if (dropdown === "orderSummary") {
      setShowOrderSummaryDropdown(!showOrderSummaryDropdown);
      setShowRevenueDropdown(false);
    } else {
      setShowRevenueDropdown(!showRevenueDropdown);
      setShowOrderSummaryDropdown(false);
    }
  };

  // Handle period selection
  const selectPeriod = (dropdown: any, period: any, event: any) => {
    event.stopPropagation();
    if (dropdown === "orderSummary") {
      setOrderSummaryPeriod(period);
      setShowOrderSummaryDropdown(false);
    } else {
      setRevenuePeriod(period);
      setShowRevenueDropdown(false);
    }
  };

  const calculatePercentage = (value: number) => {
    const total =
      orderSummaryData?.order_done +
      orderSummaryData?.dine_in_order +
      orderSummaryData?.take_away_order;
    return total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };
  useEffect(() => {
    getMetricsData();
    getTableData();
    getChefsData();
  }, []);
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowOrderSummaryDropdown(false);
      setShowRevenueDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getRevenueData(revenuePeriod.toUpperCase());
  }, [revenuePeriod]);

  useEffect(() => {
    getOrderSummryData(orderSummaryPeriod.toUpperCase());
  }, [orderSummaryPeriod]);
  useEffect(() => {
    (selectedFilter === "" || selectedFilter === "revenue") &&
      //@ts-ignore
      Highcharts.chart("revenue-chart-container", {
        chart: {
          type: "spline",
          height: 260,
          backgroundColor: "transparent",
          marginLeft: 0,
          marginRight: 0,
          spacingLeft: 0,
          spacingRight: 0,
        },
        title: { text: null },
        credits: { enabled: false },
        legend: { enabled: false },
        xAxis: {
          categories: revenueData?.revenueLabels || [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ],
          labels: {
            style: { color: "#2E2E30", fontSize: "10px" },
            y: 15,
          },
          lineColor: "transparent",
          tickColor: "transparent",
          gridLineWidth: 0,
          plotBands: [
            {
              from: -0.5,
              to: 0.4,
              color: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // Vertical gradient
                stops: [
                  [0, "rgba(0, 0, 0, 0.01)"], // Top - lighter
                  [1, "rgba(0, 0, 0, 0.05)"], // Bottom - darker
                ],
              },
              zIndex: 0,
            },
            {
              from: 0.5,
              to: 1.4,
              color: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // Vertical gradient
                stops: [
                  [0, "rgba(0, 0, 0, 0.01)"], // Top - lighter
                  [1, "rgba(0, 0, 0, 0.05)"], // Bottom - darker
                ],
              },
              zIndex: 0,
            },
            {
              from: 1.5,
              to: 2.4,
              color: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // Vertical gradient
                stops: [
                  [0, "rgba(0, 0, 0, 0.01)"], // Top - lighter
                  [1, "rgba(0, 0, 0, 0.05)"], // Bottom - darker
                ],
              },
              zIndex: 0,
            },
            {
              from: 2.5,
              to: 3.4,
              color: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // Vertical gradient
                stops: [
                  [0, "rgba(0, 0, 0, 0.01)"], // Top - lighter
                  [1, "rgba(0, 0, 0, 0.05)"], // Bottom - darker
                ],
              },
              zIndex: 0,
            },
            {
              from: 3.5,
              to: 4.4,
              color: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // Vertical gradient
                stops: [
                  [0, "rgba(0, 0, 0, 0.01)"], // Top - lighter
                  [1, "rgba(0, 0, 0, 0.05)"], // Bottom - darker
                ],
              },
              zIndex: 0,
            },
            {
              from: 4.5, // Saturday is at index 5
              to: 5.4, // End before Sunday
              color: "rgba(0, 0, 0, 0.08)",
              zIndex: 0,
            },
            {
              from: 5.5,
              to: 6.4,
              color: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // Vertical gradient
                stops: [
                  [0, "rgba(0, 0, 0, 0.01)"], // Top - lighter
                  [1, "rgba(0, 0, 0, 0.05)"], // Bottom - darker
                ],
              },
              zIndex: 0,
            },
          ],
        },
        yAxis: {
          title: { text: null },
          gridLineColor: "transparent",
          gridLineWidth: 0,
          labels: { enabled: false },
        },
        tooltip: { enabled: false },
        plotOptions: {
          spline: {
            marker: {
              enabled: false,
            },
            lineWidth: 2,
            zIndex: 2,
          },
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
            groupPadding: 0.1,
            color: "rgba(0, 0, 0, 0.05)",
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
        series: [
          // Bar chart in the background with different colors for each day
          {
            type: "column",
            data: [
              { y: 0, color: "rgba(0, 0, 0, 0.05)" },
              { y: 0, color: "rgba(0, 0, 0, 0.05)" },
              { y: 0, color: "rgba(0, 0, 0, 0.05)" },
              { y: 0, color: "rgba(0, 0, 0, 0.05)" },
              { y: 0, color: "rgba(0, 0, 0, 0.05)" },
              { y: 0, color: "rgba(0, 0, 0, 0.08)" }, // Saturday slightly darker
              { y: 0, color: "rgba(0, 0, 0, 0.05)" },
            ],
            pointWidth: 40,
            enableMouseTracking: false,
            zIndex: 1,
            groupPadding: 0,
            pointPadding: 0,
            borderWidth: 0,
          },
          // Spline chart on top
          {
            type: "spline",
            color: "#333333",
            data: revenueData?.revenue,
            zIndex: 2,
          },
        ],
      });
  }, [revenueData, selectedFilter]);

  // Initialize pie chart after component mounts
  useEffect(() => {
    orderSummaryData &&
      (selectedFilter === "" || selectedFilter === "order_summary") &&
      (orderSummaryData?.order_done ||
        orderSummaryData?.dine_in_order ||
        orderSummaryData?.take_away_order) &&
      //@ts-ignore
      Highcharts.chart("order-summary-chart", {
        chart: {
          type: "pie",
          height: 140,
          width: 140,
          backgroundColor: "transparent",
        },
        title: { text: null },
        credits: { enabled: false },
        tooltip: { enabled: false },
        plotOptions: {
          pie: {
            innerSize: "60%",
            borderWidth: 2,
            dataLabels: { enabled: false },
            states: {
              hover: { enabled: false },
            },
            size: "100%",
          },
        },
        series: [
          {
            data: [
              {
                name: "Served",
                y: orderSummaryData?.order_done,
                color: "#5B5B5B",
              },
              {
                name: "Dine In",
                y: orderSummaryData?.dine_in_order,
                color: "#828282",
              },
              {
                name: "Take Away",
                y: orderSummaryData?.take_away_order,
                color: "#2C2C2C",
              },
            ],
          },
        ],
      });
  }, [orderSummaryData, selectedFilter]);

  return {
    handleFilterChange,
    calculatePercentage,
    selectPeriod,
    toggleDropdown,
    chefsData,
    tablesData,
    metricsData,
    periods,
    selectedFilter,
    orderSummaryPeriod,
    showOrderSummaryDropdown,
    orderSummaryData,
    revenuePeriod,
    showRevenueDropdown,
  };
};
export { AnalyticsController };
