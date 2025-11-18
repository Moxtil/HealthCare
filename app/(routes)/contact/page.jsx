"use client";

import Link from "next/link";
import { Suspense } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { GPTLoaderSkeleton } from "@/app/components/GPTLoaderSkeleton";

export default function ContactPage() {
  return (
    <Suspense fallback={<GPTLoaderSkeleton />}>
      <div className=" text-[#007E85] flex items-center justify-center p-6">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            <motion.h1
              className="text-4xl md:text-5xl font-bold tracking-tight"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Get in Touch
            </motion.h1>

            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              We’d love to hear from you! Whether you have a question, feedback,
              or just want to say hello, feel free to reach out.
            </motion.p>

            <div className="space-y-3">
              {[
                { label: "Email", value: "contact@example.com" },
                { label: "Phone", value: "+123 456 7890" },
                { label: "Location", value: "Istanbul, Turkey" },
              ].map((item, i) => (
                <motion.p
                  key={i}
                  className="text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="font-semibold">{item.label}:</span>{" "}
                  {item.value}
                </motion.p>
              ))}
            </div>

            {/* Social Media */}
            <motion.div
              className="flex space-x-4 mt-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
            >
              {[
                { icon: <FaFacebookF size={20} />, delay: 0 },
                { icon: <FaTwitter size={20} />, delay: 0.1 },
                { icon: <FaInstagram size={20} />, delay: 0.2 },
                { icon: <FaLinkedinIn size={20} />, delay: 0.3 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <button className="cursor-pointer p-3 rounded-full bg-[#007E85] text-white hover:bg-[#015f63] transition w-full">
                    {item.icon}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="bg-gray-800 rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-2xl font-semibold mb-6 text-white"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Send a Message
            </motion.h2>

            <form className="space-y-5">
              {[
                { label: "Name", type: "text", placeholder: "Your Name" },
                { label: "Email", type: "email", placeholder: "Your Email" },
              ].map((field, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <label className="block mb-2 text-sm font-medium text-white">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full p-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:ring-1 focus:ring-white outline-none"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label className="block mb-2 text-sm font-medium text-white">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full p-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:ring-1 focus:ring-white outline-none"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                className="cursor-pointer w-full py-3 rounded-xl bg-[#007E85] text-white hover:bg-[#007076] transition font-semibold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </Suspense>
  );
}
