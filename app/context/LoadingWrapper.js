"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import icon from "../../assets/icon.svg";
import LargeLoadingSkeleton from "../components/LargeLoadingSkeleton";
import LoadingSkeleton from "../components/LoadingSkeleton";
export default function LoadingWrapper({ children }) {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!user && !isLoaded) {
    return (
      <div className="flex flex-col gap-8 mt-10 p-6">
        <LargeLoadingSkeleton />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 1.0,
        ease: [0.33, 1, 0.68, 1], // smooth, custom bezier
      }}
    >
      {children}
    </motion.div>
  );
}
