"use client";
import Link from "next/link";
import React from "react";
import DocImg from "../../assets/undraw_medicine_hqqg.svg";
import Image from "next/image";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section className="relative bg-white lg:grid lg:h-screen lg:place-content-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#007E85]/20 blur-3xl animate-pulse" />
        <div className="absolute left-0 bottom-1/3 h-80 w-80 rounded-full bg-[#6EAB36]/20 blur-3xl animate-pulse" />
      </div>

      <motion.div
        className="mx-auto w-full px-4 py-8 sm:px-6 sm:py-24 flex flex-col-reverse md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="max-w-prose text-left" variants={container}>
          <motion.h1
            className="text-4xl font-bold text-gray-900 sm:text-5xl leading-snug"
            variants={scaleUp}
          >
            Providing Quality <span className="text-[#007E85]">Healthcare</span>{" "}
            for a <span className="text-[#6EAB36]">Brighter</span> and{" "}
            <span className="text-[#6EAB36]">Healthy</span> Future
          </motion.h1>

          <motion.p
            className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed"
            variants={fadeUp}
          >
            At our hospital, we are dedicated to providing exceptional medical
            care to our patients and their families. Our experienced team of
            medical professionals, cutting-edge technology, and compassionate
            approach make us a leader in the healthcare industry.
          </motion.p>

          <motion.div className="mt-4 flex gap-4 sm:mt-6" variants={fadeUp}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                className="inline-block rounded border border-[#007E85] bg-[#007E85] px-6 py-3 font-medium text-white shadow-lg transition-colors hover:bg-[#2b8186] tracking-wider"
                href="/appointment"
              >
                Appointments
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative m-2 flex justify-center"
          variants={fadeUp}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Image
              src={DocImg}
              alt="Doc"
              width={600}
              height={500}
              className="z-20 relative drop-shadow-xl"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
