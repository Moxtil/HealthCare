"use client";
import React from "react";
import TeamCards from "./TeamCards";
import teamImg1 from "../../assets/team-1.svg";
import teamImg2 from "../../assets/team-2.svg";
import teamImg3 from "../../assets/team-3.svg";
import teamImg4 from "../../assets/team-4.svg";
import teamImg5 from "../../assets/team-5.svg";
import teamImg6 from "../../assets/Doc.svg";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

export default function Team() {
  return (
    <section className="my-14 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-20 h-64 w-64 bg-[#007E85]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-10 bottom-20 h-72 w-72 bg-[#6EAB36]/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.h1
        className="text-center mt-2 text-[#007E85] text-4xl font-semibold"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Meet our team members
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
        className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {[
          { name: "John Carter", job: "CEO & Co-Founder", img: teamImg1 },
          { name: "Sophie Moore", job: "Dental specialist", img: teamImg2 },
          { name: "Matt Cannon", job: "Orthopedic", img: teamImg6 },
          { name: "Andy Smith", job: "Brain surgeon", img: teamImg4 },
          { name: "Lily Woods", job: "Heart specialist", img: teamImg5 },
          { name: "Patrick Meyer", job: "Eye specialist", img: teamImg3 },
        ].map((member, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <TeamCards name={member.name} job={member.job} img={member.img} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
