"use client";

import React, { useEffect, useState } from "react";
import CuisineModal from "../cuisine/cuisine-modal";
import ResturantModal from "../resturants/resturant-modal";
import MenuModal from "../menu/menu-modal";
import ReviewModal from "../review/review-modal";

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
      <ReviewModal />
      <MenuModal />
      <CuisineModal />
      <ResturantModal />
    </>
  );
};
