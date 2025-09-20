"use client";
import React from "react";
import TestimonialCard from "./TestimonialCard";
import commentIm1 from "../../assets/comment.svg";
import commentIm2 from "../../assets/comment2.svg";
import commentIm3 from "../../assets/comment3.svg";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
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

export default function Testimonial() {
  const testimonials = [
    {
      time: "31",
      name: "John Carter",
      comment: "“An amazing service”",
      img: commentIm1,
    },
    {
      time: "16",
      name: "Sophie Moore",
      comment: "“One of a kind service”",
      img: commentIm2,
    },
    {
      time: "24",
      name: "Andy Smith",
      comment: "“The best service”",
      img: commentIm3,
    },
  ];

  return (
    <section className="my-14 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-10 h-64 w-64 bg-[#007E85]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-1/4 bottom-10 h-72 w-72 bg-[#6EAB36]/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.h1
        className="text-center mt-2 text-[#007E85] text-4xl font-semibold"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Testimonial
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
        className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <TestimonialCard
              time={t.time}
              name={t.name}
              comment={t.comment}
              img={t.img}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
