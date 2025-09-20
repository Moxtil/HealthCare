"use client";
import React from "react";
import CarouselComponent from "./Carousel";
import { motion } from "framer-motion";

export default function Numbers() {
  return (
    <section className="my-14 relative overflow-hidden">
      <motion.h1
        className="text-center mt-2 text-[#007E85] text-4xl font-semibold"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Trusted by 10,000+ companies around the world
      </motion.h1>

      <motion.div
        className="flex items-center justify-center w-full mt-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <CarouselComponent />
      </motion.div>
    </section>
  );
}
