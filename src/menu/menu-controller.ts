import { useEffect, useState } from "react";
import { AnalyticsService } from "../services/apis";
import { useNavigate } from "react-router-dom";

export const MenuController = () => {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const [activeCategory, setActiveCategory] = useState(
    url?.searchParams?.get("_sc") || "burger"
  );
  const [cart, setCart] = useState<any>(
    JSON.parse(localStorage.getItem("_od") || "[]")
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [categories, setCategories] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const images: any = {
    pizza: [
      "https://images.pexels.com/photos/4109122/pexels-photo-4109122.jpeg",
      "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBpenphfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBpenphfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1613564834361-9436948817d1?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    burger: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop",

      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop",

      "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg",

      "https://images.pexels.com/photos/1639564/pexels-photo-1639564.jpeg",

      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600",

      "https://images.pexels.com/photos/750073/pexels-photo-750073.jpeg",
    ],
    "french-fries": [
      "https://plus.unsplash.com/premium_photo-1672774750509-bc9ff226f3e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlbmNoJTIwZnJpZXN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlbmNoJTIwZnJpZXN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1598679253544-2c97992403ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlbmNoJTIwZnJpZXN8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1683121324474-83460636b0ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlbmNoJTIwZnJpZXN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlbmNoJTIwZnJpZXN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZyZW5jaCUyMGZyaWVzfGVufDB8fDB8fHww",
    ],
    drinks: [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2157&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1669680785172-919af9458e37?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1618799805265-4f27cb61ede9?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1597075759290-5c29a23c8a16?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1601887573188-79fb3c767157?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGRyaW5rc3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    veggies: [
      "https://plus.unsplash.com/premium_photo-1698843275177-670fd3d889db?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1698867575634-d39ef95fa6a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGZvb2R8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1676106623769-539ecc6d7f92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGZvb2R8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1672242676660-923c3bd446d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fGZvb2R8ZW58MHx8MHx8fDA%3D",
    ],
  };

  const handleAddToCart = (product: any, index: number) => {
    const existingProduct = cart?.find(
      (item: any) => item?._id === product?._id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
        img: images[activeCategory]?.[index],
      });
    }
    setCart([...cart]);
  };

  const handleRemoveFromCart = (product: any) => {
    const existingProduct = cart?.find(
      (item: any) => item?._id === product?._id
    );
    if (existingProduct) {
      if (existingProduct?.quantity === 1) {
        cart?.splice(cart?.indexOf(existingProduct), 1);
      } else {
        existingProduct.quantity -= 1;
      }
      setCart([...cart]);
    }
  };

  const handleNextClick = () => {
    navigate("/cart");
  };

  const getTotalPrice = (cart: any) => {
    return cart?.reduce(
      (total: number, item: any) => total + item?.price * item?.quantity,
      0
    );
  };
  const totalAmount = getTotalPrice(cart);
  const getCategories = async () => {
    const data = await AnalyticsService.getCategoriesAndSubCategories(
      "https://restaurant-management-backend-rv3e.onrender.com/api/v1/menu/categories"
    );

    if (data?.status == "success") {
      setCategories(data?.data?.categories);
    }
  };

  const getMenuData = async () => {
    const data = await AnalyticsService.getCategoriesAndSubCategories(
      `https://restaurant-management-backend-rv3e.onrender.com/api/v1/menu/category/${activeCategory}`
    );
    if (data?.status == "success") {
      setProducts(data?.data?.menuItems);
      setFilteredProducts(data?.data?.menuItems);
    }
  };

  function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }

  const handleChangeCategory = (value: string) => {
    url?.searchParams?.set("_sc", value); // set() will add or replace the key
    window.history.replaceState({}, "", url.toString()); // update the URL without reloading
    setActiveCategory(value);
  };
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    localStorage.setItem("_od", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    getMenuData();
  }, [activeCategory]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000); // 300ms debounce delay

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const filteredProduts = products?.filter((product: any) =>
      product?.name?.toLowerCase()?.includes(debouncedQuery?.toLowerCase())
    );
    setFilteredProducts(filteredProduts);
  }, [debouncedQuery]);

  return {
    activeCategory,
    categories,
    filteredProducts,
    handleChangeCategory,
    cart,
    getMenuData,
    capitalizeFirstLetter,
    searchQuery,
    setSearchQuery,
    totalAmount,
    handleNextClick,
    handleRemoveFromCart,
    handleAddToCart,
    images,
  };
};
