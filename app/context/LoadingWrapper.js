"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import icon from "../../assets/icon.svg";
import LargeLoadingSkeleton from "../components/LargeLoadingSkeleton";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { GPTLoaderSkeleton } from "../components/GPTLoaderSkeleton";
export default function LoadingWrapper({ children }) {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!user && !isLoaded) {
    return <GPTLoaderSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 1.0,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
