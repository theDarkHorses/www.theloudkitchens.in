"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackRoute = () => {
  const router = useRouter();
  return (
    <ChevronLeft
      size={32}
      className="absolute top-3 left-3 text-white cursor-pointer z-50"
      color="white"
      onClick={() => router.back()}
    />
  );
};

export default BackRoute;
