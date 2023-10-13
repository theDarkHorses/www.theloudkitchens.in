"use client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackRoute = () => {
  const router = useRouter();
  return (
    <MoveLeft
      className="absolute top-3 left-3 text-white"
      onClick={() => router.back()}
    />
  );
};

export default BackRoute;
