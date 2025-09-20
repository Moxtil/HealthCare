"use client";

import React from "react";

export default function ContactForm() {
  return (
    <div className="bg-[#eee] py-12 flex items-center justify-center px-4">
      <form className="w-full max-w-2xl space-y-8 bg-white rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold text-[#007E85] uppercase tracking-wide">
            Get In Touch
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900">Contact Us</h1>
          <p className="text-gray-500">
            Have a question or need assistance? We’re here to help.
          </p>
        </div>

        {/* Name & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full bg-[#f9f9f9] border border-[#007E85] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#007E85] focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full bg-[#f9f9f9] border border-[#007E85] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#007E85] focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-[#f9f9f9] border border-[#007E85] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#007E85] focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full bg-[#f9f9f9] border border-[#007E85] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#007E85] focus:outline-none transition"
            />
          </div>
        </div>

        {/* Topic */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Choose a Topic
          </label>
          <select className="w-full bg-[#f9f9f9] border border-[#007E85] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#007E85] focus:outline-none text-gray-500 transition">
            <option>Select one...</option>
            <option>General Inquiry</option>
            <option>Support</option>
            <option>Feedback</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block mb-2 text-sm font-medium">Message</label>
          <textarea
            placeholder="Type your message..."
            rows="5"
            className="w-full bg-[#f9f9f9] border border-[#007E85] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#007E85] focus:outline-none resize-none transition"
          ></textarea>
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-[#007E85] border-gray-300 rounded focus:ring-2 focus:ring-[#007E85]"
          />
          <label htmlFor="terms" className="text-sm text-gray-500">
            I accept the terms
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="cursor-pointer w-full text-white bg-gradient-to-r from-[#007E85] to-[#2b8186] hover:from-[#2b8186] hover:to-[#005f60] transition rounded-xl py-3 font-semibold shadow-md text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
