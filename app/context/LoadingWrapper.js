"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import icon from "../../assets/icon.svg";
export default function LoadingWrapper({ children }) {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!user && !isLoaded) {
    return (
      <div className="text-4xl justify-center items-center my-[50px] flex flex-col gap-3 w-full">
        <div className="flex items-center gap-1">
          <Image src={icon} width={100} height={75} alt="HealthCare" />
          <h2 className="font-semibold text-4xl text-[#007E85]">
            Health<span className="text-[#6EAB36]">Care</span>
          </h2>
        </div>
        {/* <br /> */}
        <div className="loader"></div>
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
