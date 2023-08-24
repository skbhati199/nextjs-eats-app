"use client";

import React, { useEffect, useState } from "react";
import ResturantModal from "@/components/modals/resturant-modal";

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
      <ResturantModal />
    </>
  );
};
