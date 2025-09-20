"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaStethoscope, FaMicroscope } from "react-icons/fa";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const fadeScale = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function WhyChoose() {
  const cards = [
    {
      title: "Cutting-Edge Technology",
      desc: "We utilize the latest medical equipment ensuring precise diagnostics and effective treatment plans.",
      icon: <FaMicroscope className="text-[#007E85] w-12 h-12 mx-auto mb-4" />,
    },
    {
      title: "Experienced Staff",
      desc: "Our team consists of highly qualified specialists dedicated to your well-being.",
      icon: <FaStethoscope className="text-[#007E85] w-12 h-12 mx-auto mb-4" />,
    },
    {
      title: "Patient-Centered Care",
      desc: "We believe in holistic care that respects your preferences and provides emotional support.",
      icon: <FaHeartbeat className="text-[#007E85] w-12 h-12 mx-auto mb-4" />,
    },
  ];

  return (
    <section className="relative py-6 px-6 mx-auto overflow-hidden">
      <motion.h2
        className="text-4xl text-center font-extrabold text-[#007E85] mb-16 px-2 sm:px-0"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Why Choose Our Hospital?
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="bg-white p-8 rounded-xl cursor-pointer border-2 border-transparent hover:border-[#007E85] transition-all flex flex-col items-center text-center"
            variants={fadeScale}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {card.icon}
            <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
            <p className="text-gray-700 leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
