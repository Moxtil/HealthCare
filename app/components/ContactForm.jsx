"use client";

import React from "react";

export default function ContactForm() {
  return (
    <div className="min-h-screen bg-[#eee] my-8 text-[#222] flex items-center justify-center px-4">
      <form className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-[#007E85]">Get In Touch</p>
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm">First name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full bg-transparent border border-teal-500 px-4 py-2 rounded outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Last name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full bg-transparent border border-teal-500 px-4 py-2 rounded outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent border border-teal-500 px-4 py-2 rounded outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Phone number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full bg-transparent border border-teal-500 px-4 py-2 rounded outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm">Choose a topic</label>
          <select className="w-full bg-transparent border border-teal-500 px-4 py-2 rounded outline-none text-gray-400">
            <option>Select one...</option>
            <option>General Inquiry</option>
            <option>Support</option>
            <option>Feedback</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm">Message</label>
          <textarea
            placeholder="Type your message..."
            rows="5"
            className="w-full bg-transparent border border-teal-500 px-4 py-2 rounded outline-none resize-none"
          ></textarea>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms" className="text-sm text-gray-400">
            I accept the terms
          </label>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer text-white bg-[#007E85] hover:bg-teal-700 transition rounded py-2 font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
