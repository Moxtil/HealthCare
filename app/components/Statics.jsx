"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ResultsNum from "./ResultsNum";
import ContainImg from "../../assets/Container.svg";
import { motion } from "framer-motion";
import { FaSmile, FaUserMd, FaHeart, FaChartLine } from "react-icons/fa";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
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

export default function Statics() {
  const stats = [
    {
      num: "99",
      perc: "%",
      title: "Customer satisfaction",
      icon: <FaSmile className="text-[#007E85] w-6 h-6 mb-2 mx-auto" />,
    },
    {
      num: "15",
      perc: "K",
      title: "Online Patients",
      icon: <FaUserMd className="text-[#007E85] w-6 h-6 mb-2 mx-auto" />,
    },
    {
      num: "12",
      perc: "K",
      title: "Patients Recovered",
      icon: <FaHeart className="text-[#007E85] w-6 h-6 mb-2 mx-auto" />,
    },
    {
      num: "240",
      perc: "%",
      title: "Company growth",
      icon: <FaChartLine className="text-[#007E85] w-6 h-6 mb-2 mx-auto" />,
    },
  ];

  return (
    <section className="my-8 relative overflow-hidden">
      <motion.h1
        className="text-center my-6 text-[#007E85] text-4xl font-semibold"
        variants={scaleUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        Our results in numbers
      </motion.h1>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 my-8 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border-2 border-transparent hover:border-[#007E85] transition-all"
          >
            {stat.icon}
            <ResultsNum num={stat.num} perc={stat.perc} title={stat.title} />
          </motion.div>
        ))}
      </motion.div>

      <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center rounded-xl shadow-md">
        <motion.div
          className="p-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right"
            variants={container}
          >
            <motion.h2
              className="text-3xl font-bold text-[#007E85] md:text-3xl"
              variants={scaleUp}
            >
              You have lots of reasons to choose us
            </motion.h2>

            <motion.p
              className="text-[#555555] md:mt-4 block leading-relaxed"
              variants={fadeUp}
            >
              We combine expertise, compassion, and the latest technology to
              offer unparalleled care tailored just for you. From emergency
              services to preventive care, your health is our priority.
            </motion.p>

            <motion.ul
              className="mt-6 list-disc list-inside text-left text-[#007E85] space-y-2 font-semibold"
              variants={container}
            >
              {[
                "Experienced & compassionate medical team",
                "State-of-the-art diagnostic equipment",
                "Personalized treatment plans",
                "24/7 Emergency care availability",
              ].map((text, i) => (
                <motion.li key={i} variants={fadeUp}>
                  {text}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div className="mt-8" variants={fadeUp}>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link
                  href="/appointment"
                  className="inline-block float-left mb-6 rounded-sm bg-gradient-to-r from-[#007E85] to-[#2b8186] px-12 py-3 text-sm font-medium text-white shadow-md transition hover:from-[#2b8186] hover:to-[#005f60]"
                >
                  Get Started Today
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            alt="BG"
            src={ContainImg}
            className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px] drop-shadow-xl"
          />
        </motion.div>
      </section>
    </section>
  );
}
