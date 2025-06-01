import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnalyticsService } from "../services/apis";
import { toast } from "react-toastify";

export const cartController = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any>([]);
  const [deliveryOption, setDeliveryOption] = useState<string>("DINE_IN");
  const [cookingInstructionsText, setCookingInstructionsText] = useState("");
  const [cookingInstructionsModal, setCookingInstructionsModal] =
    useState<boolean>(false);
  const [instructions, setInstructions] = useState(""); // stored value
  const [searchQuery, setSearchQuery] = useState("");

  // Swipe functionality states
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isSwipeComplete, setIsSwipeComplete] = useState(false);
  const swipeButtonRef = useRef<HTMLDivElement>(null);
  const swipeIconRef = useRef<HTMLDivElement>(null);
  const swipeTrackRef = useRef<HTMLDivElement>(null);
  const swipeProgressRef = useRef<HTMLDivElement>(null);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [userDetails, setUserDetails] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setShowModal(false);
    setUserDetails(formData);
  };

  const handleBackToMenu = () => {
    navigate("/menu");
  };

  const handleCloseCart = () => {
    if (cartItems?.length > 0) {
      // If cart has items, just update the cart
      setCartItems([]);
    } else {
      // If cart is empty, go back to menu
      navigate("/");
    }
  };

  const calculateTotal = () => {
    const itemTotal = cartItems?.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
    const deliveryCharge = deliveryOption === "DINE_IN" ? 0 : 50;
    const taxes = deliveryOption === "DINE_IN" ? 0 : 5;
    return {
      itemTotal,
      deliveryCharge,
      taxes,
      grandTotal: itemTotal + deliveryCharge + taxes,
    };
  };
  const totalPreparationTime = cartItems?.reduce((acc: number, item: any) => {
    return acc + item?.preparation_time * item?.quantity;
  }, 0);

  const { itemTotal, deliveryCharge, taxes, grandTotal } = calculateTotal();

  const handleQuantityUpdate = (id: any, operator: string) => {
    const updatedCartItems = cartItems?.map((item: any) => {
      if (item?._id === id) {
        const newQuantity =
          operator === "inc"
            ? item?.quantity + 1
            : operator === "dec" && item?.quantity > 1
            ? item?.quantity - 1
            : item?.quantity;

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  const handleDeleteItem = (id: any) => {
    const updatedCartItems = cartItems?.filter((elem: any) => {
      return id !== elem?._id;
    });
    setCartItems(updatedCartItems);
  };

  const handleSaveCookingInstructions = (newInstructions: string) => {
    setInstructions(newInstructions);
    setCookingInstructionsModal(false);
  };

  // Swipe functionality
  const handleSwipeStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    const swipeButton = swipeButtonRef?.current;
    const swipeTrack = swipeTrackRef?.current;
    const swipeIcon = swipeIconRef?.current;
    const swipeProgressEl = swipeProgressRef?.current;

    if (!swipeButton || !swipeTrack || !swipeIcon || !swipeProgressEl) return;

    const trackWidth = swipeTrack?.offsetWidth;
    const iconWidth = swipeIcon?.offsetWidth;
    const maxSwipe = trackWidth - iconWidth - 20; // 20px padding
    const thresholdPercentage = 99; // Percentage threshold to trigger order

    let startX = 0;
    if ("touches" in e) {
      startX = e.touches[0].clientX;
    } else {
      startX = e.clientX;
    }

    let hasTriggeredOrder = false; // Flag to prevent multiple triggers

    const handleSwipeMove = (moveEvent: MouseEvent | TouchEvent) => {
      let currentX = 0;
      if ("touches" in moveEvent) {
        currentX = moveEvent?.touches[0].clientX;
      } else {
        currentX = moveEvent.clientX;
      }

      const deltaX = currentX - startX;
      const newPosition = Math.max(0, Math.min(deltaX, maxSwipe));
      const progress = (newPosition / maxSwipe) * 100;

      setSwipeProgress(progress);
      swipeProgressEl.style.width = `${progress}%`;
      swipeIcon.style.transform = `translateX(${newPosition}px)`;

      // Check if we've reached the threshold and haven't triggered the order yet
      if (progress > thresholdPercentage && !hasTriggeredOrder) {
        hasTriggeredOrder = true; // Set flag to prevent multiple triggers
        setIsSwipeComplete(true);
        swipeButton.classList?.add("swipe-complete");

        // Trigger order immediately
        handleOrderSubmit();

        // Clean up event listeners
        document.removeEventListener("mousemove", handleSwipeMove);
        document.removeEventListener("touchmove", handleSwipeMove);
        document.removeEventListener("mouseup", handleSwipeEnd);
        document.removeEventListener("touchend", handleSwipeEnd);
      }
    };

    const handleSwipeEnd = () => {
      document.removeEventListener("mousemove", handleSwipeMove);
      document.removeEventListener("touchmove", handleSwipeMove);
      document.removeEventListener("mouseup", handleSwipeEnd);
      document.removeEventListener("touchend", handleSwipeEnd);

      // Only reset if we haven't triggered the order
      if (!hasTriggeredOrder) {
        // Reset position with animation
        swipeIcon.style.transition = "transform 0.3s ease";
        swipeProgressEl.style.transition = "width 0.3s ease";
        swipeIcon.style.transform = "translateX(0)";
        swipeProgressEl.style.width = "0%";

        setTimeout(() => {
          if (swipeIcon && swipeProgressEl) {
            swipeIcon.style.transition = "";
            swipeProgressEl.style.transition = "";
          }
        }, 300);
      }
    };

    document.addEventListener("mousemove", handleSwipeMove);
    document.addEventListener("touchmove", handleSwipeMove, { passive: false });
    document.addEventListener("mouseup", handleSwipeEnd);
    document.addEventListener("touchend", handleSwipeEnd);
  };

  const handleOrderSubmit = () => {
    // Process the order
    const menu_items = cartItems?.map((item: any) => ({
      menu_item_id: item?._id,
      quantity: item?.quantity,
    }));

    const finalData = {
      menu_items,
      type: deliveryOption,
      cooking_instructions: instructions,
      subtotal: itemTotal,
      tax: taxes,
      delivery_charges: deliveryCharge,
      delivery_time: totalPreparationTime,
      total: grandTotal,
      name: userDetails?.name,
      phone: userDetails?.phone,
      address: userDetails?.address,
    };

    if (Object.keys(userDetails)?.length > 0) {
      createOrder(finalData);
    } else {
      toast.error("Please add user details");
      resetSwipeButton();
      setShowModal(true); // Open the user details modal
    }
  };

  const createOrder = async (data: any) => {
    try {
      const response = await AnalyticsService.postAnalyticsData(
        "https://restaurant-management-backend-bntp.onrender.com/api/v1/orders",
        data
      );
      if (response?.status === "success") {
        toast.success("Order Placed Successfully");
        setCartItems([]);
        localStorage.removeItem("_od");
      } else {
        // Reset swipe button if API returns error
        resetSwipeButton();
      }
    } catch (error) {
      // Reset swipe button if API call fails
      resetSwipeButton();
      // toast.error("Failed to place order. Please try again.");
    }
  };

  // Function to reset the swipe button
  const resetSwipeButton = () => {
    setIsSwipeComplete(false);
    setSwipeProgress(0);

    const swipeIcon = swipeIconRef?.current;
    const swipeProgressEl = swipeProgressRef?.current;
    const swipeButton = swipeButtonRef?.current;

    if (swipeIcon && swipeProgressEl && swipeButton) {
      swipeButton.classList?.remove("swipe-complete");

      swipeIcon.style.transition = "transform 0.3s ease";
      swipeProgressEl.style.transition = "width 0.3s ease";
      swipeIcon.style.transform = "translateX(0)";
      swipeProgressEl.style.width = "0%";

      setTimeout(() => {
        if (swipeIcon && swipeProgressEl) {
          swipeIcon.style.transition = "";
          swipeProgressEl.style.transition = "";
        }
      }, 300);
    }
  };

  useEffect(() => {
    const orderData = localStorage.getItem("_od");

    if (orderData) {
      const parsedData = JSON.parse(orderData);
      setCartItems(parsedData);
    }
  }, []);

  // Save cart items to localStorage when they change
  useEffect(() => {
    if (cartItems?.length > 0) {
      localStorage.setItem("_od", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("_od");
    }
  }, [cartItems]);
  return {
    handleOrderSubmit,
    handleSwipeStart,
    handleSaveCookingInstructions,
    handleDeleteItem,
    handleQuantityUpdate,
    handleBackToMenu,
    handleCloseCart,
    handleSave,
    handleChange,
    showModal,
    setDeliveryOption,
    cookingInstructionsText,
    setCookingInstructionsText,
    cookingInstructionsModal,
    searchQuery,
    setSearchQuery,
    cartItems,
    setCookingInstructionsModal,
    deliveryOption,
    itemTotal,
    deliveryCharge,
    taxes,
    grandTotal,
    setShowModal,
    userDetails,
    formData,
    swipeIconRef,
    swipeButtonRef,
    totalPreparationTime,
    swipeProgressRef,
    swipeTrackRef,
    instructions,
    navigate,
    swipeProgress,
    isSwipeComplete,
  };
};
