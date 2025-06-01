import { useRef, useEffect, useState } from "react";
import { AnalyticsService } from "../services/apis";

const TableController = () => {
  const addButtonRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const [tables, setTables] = useState<any>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [chairCount, setChairCount] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const chairsCountArray=[2, 3, 4,5, 6,7, 8,9, 10]

  // Filter tables based on search query
  const filteredTables = tables?.filter((table: any) => {
    if (!searchQuery?.trim()) return true;
    return table?.name
      ?.toString()
      .toLowerCase()
      .includes(searchQuery?.toLowerCase());
  });

  const handleAddTable = () => {
    setShowPopup(true);
    // Set default chair count
    setChairCount(4);
  };

  const handleSaveTable = () => {
    setShowPopup(false);
    createTable(chairCount);
  };

  const handleDeleteTable = (idToDelete: number) => {
    // Remove the table
    const filteredTables = tables?.find(
      (table: any) => table?._id === idToDelete
    );
    if (filteredTables) {
      deleteTable(filteredTables?._id);
    }
  };

  // Position the popup relative to the add button

  const getTableData = async () => {
    const data = await AnalyticsService.getCategoriesAndSubCategories(
      "https://restaurant-management-backend-rv3e.onrender.com/api/v1/tables"
    );
    if (data?.status === "success") {
      setTables(data?.data?.tables);
    }
  };

  const deleteTable = async (id: any) => {
    const data = await AnalyticsService?.deleteItem(
      `https://restaurant-management-backend-rv3e.onrender.com/api/v1/tables/${id}`
    );
    if (data?.status === "success") {
      getTableData();
    }
  };
  const createTable = async (chairs: any) => {
    const chairscount = { chairs };
    const data = await AnalyticsService.postAnalyticsData(
      `https://restaurant-management-backend-rv3e.onrender.com/api/v1/tables`,
      chairscount
    );
    if (data?.status === "success") {
      getTableData();
    }
  };

  useEffect(() => {
    getTableData();
  }, []);
  useEffect(() => {
    if (showPopup && addButtonRef?.current && popupRef?.current) {
      const addButtonRect = addButtonRef.current?.getBoundingClientRect();
      const popup = popupRef?.current;
      const popupRect = popup?.getBoundingClientRect();

      // Calculate initial position
      let leftPos = addButtonRect?.left + 50;
      let topPos = addButtonRect?.top + 100;

      // Check if popup would go beyond right edge of window
      const rightEdge = leftPos + popupRect?.width;
      if (rightEdge > window?.innerWidth) {
        leftPos = window?.innerWidth - popupRect?.width - 20; // 20px padding from edge
      }

      // Check if popup would go beyond bottom edge of window
      const bottomEdge = topPos + popupRect?.height;
      if (bottomEdge > window?.innerHeight) {
        topPos = window?.innerHeight - popupRect?.height - 20; // 20px padding from edge
      }

      // Apply the calculated position
      popup.style.left = `${leftPos}px`;
      popup.style.top = `${topPos}px`;
    }
  }, [showPopup]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef?.current &&
        !popupRef?.current?.contains(event.target as Node) &&
        addButtonRef?.current &&
        !addButtonRef?.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup, setShowPopup]);

  return {
    handleAddTable,
    handleSaveTable,
    handleDeleteTable,
    showPopup,
    tables,
    chairCount,
    setChairCount,
    setShowPopup,
    addButtonRef,
    popupRef,
    searchQuery,
    setSearchQuery,
    filteredTables,
    chairsCountArray
  };
};

export default TableController;
