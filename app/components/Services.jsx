"use client";
import React from "react";
import ServicesCard from "./ServicesCard";
import img1 from "../../assets/img1.svg";
import img2 from "../../assets/img2.svg";
import img3 from "../../assets/img3.svg";
import img4 from "../../assets/img4.svg";
import img5 from "../../assets/img5.svg";
import img6 from "../../assets/img6.svg";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Services() {
  return (
    <section className="my-12 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-10 h-64 w-64 bg-[#007E85]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-1/4 bottom-10 h-72 w-72 bg-[#6EAB36]/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.h1
        className="text-center mt-2 text-[#007E85] text-4xl font-semibold"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Services we provide
      </motion.h1>

      <motion.p
        className="text-[#555555aa] text-sm text-center mt-2 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
        elementum tempus hac tellus libero accumsan.
      </motion.p>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-4 my-12"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {[
          { title: "Dental treatments", img: img1 },
          { title: "Bones treatments", img: img2 },
          { title: "Diagnosis", img: img3 },
          { title: "Cardiology", img: img4 },
          { title: "Surgery", img: img5 },
          { title: "Eye care", img: img6 },
        ].map((service, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <ServicesCard title={service.title} img={service.img} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
