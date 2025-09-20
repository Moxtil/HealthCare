"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export default function AppDownload() {
  return (
    <section className="py-10">
      <div className="mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-4xl font-bold text-[#007E85]">
            Book Your Appointment Easily
          </h2>
          <p className="mt-4 text-[#007E85]">
            Download the HealthCare app to manage your health anytime, anywhere.
            Quick, simple, and secure.
          </p>

          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <Link
              href="#"
              className="flex items-center gap-2 bg-[#007E85] text-white backdrop-blur-md px-5 py-3 rounded-xl hover:scale-105 transition-transform"
            >
              <FaApple className="text-2xl" /> App Store
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 bg-[#007E85] text-white backdrop-blur-md px-5 py-3 rounded-xl hover:scale-105 transition-transform"
            >
              <FaGooglePlay className="text-2xl" /> Google Play
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center"
        >
          <Image
            width={600}
            height={400}
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGVhbHRofGVufDB8fDB8fHww"
            alt="Phone mockup"
            className="w-full rounded-lg shadow-2xl shadow-gray-700 border-2 border-[#007E85]"
          />
        </motion.div>
      </div>
    </section>
  );
}
