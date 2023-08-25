"use client";

import React, { useEffect, useState } from "react";
import ResturantModal from "@/components/restaurants/restaurant-modal";
import CuisineModal from "../cuisine/cuisine-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CuisineModal />
      <ResturantModal />
    </>
  );
};
