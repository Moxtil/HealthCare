"use client";

import { motion } from "framer-motion";
import { FaMobileAlt, FaHeartbeat } from "react-icons/fa";

export default function FinalCTA() {
  return (
    <section className="relative py-10">
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <FaMobileAlt className="text-[#007E85] w-12 h-12" />
          <motion.h2 className="text-4xl md:text-5xl font-bold text-[#007E85]">
            Take Care of Your Health Anywhere
          </motion.h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-500 max-w-2xl"
        >
          Download the HealthCare app to book appointments, consult doctors, and
          manage your health anytime, anywhere. Fast, simple, and reliable.
        </motion.p>

        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
          href="#"
          className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#007E85] to-[#2b8186] px-12 py-3 text-sm font-medium text-white shadow-md transition hover:from-[#2b8186] hover:to-[#005f60]"
        >
          <FaHeartbeat className="w-5 h-5" />
          Get the App
        </motion.a>
      </div>
    </section>
  );
}
