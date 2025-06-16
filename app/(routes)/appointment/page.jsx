"use client";
import { useUser } from "@clerk/nextjs";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { db } from "../../firebase/config";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Link from "next/link";

const showError = (text) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
};
const showSuccess = () => {
  Swal.fire({
    title: "Good job!",
    text: "Appointment booked successfully ✅",
    icon: "success",
    timer: 1000,
    showConfirmButton: false,
  });
};

export default function BookingPage() {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { role } = useContext(AuthContext);

  // Format date to YYYY-MM-DD
  const pad = (n) => (n < 10 ? "0" + n : n);
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
    today.getDate()
  )}`;

  // Generate time slots from 09:00 to 17:00 in 30-min intervals
  const generateTimeSlots = () => {
    let slots = [];
    let startHour = 9;
    let endHour = 17;

    // If date is today, adjust startHour and startMinutes accordingly
    if (date === todayStr) {
      const now = new Date();
      let currentHour = now.getHours();
      let currentMinutes = now.getMinutes();

      // Round minutes up to next 30 min slot
      if (currentMinutes > 0 && currentMinutes <= 30) {
        currentMinutes = 30;
      } else if (currentMinutes > 30) {
        currentHour += 1;
        currentMinutes = 0;
      }

      // Make sure startHour is at least 9
      if (currentHour < startHour) {
        currentHour = startHour;
        currentMinutes = 0;
      }

      // If current time passed or equals 17:00, no slots left
      if (currentHour >= endHour) {
        return [];
      }

      // Generate slots starting from currentHour:currentMinutes
      let hour = currentHour;
      let minute = currentMinutes;

      while (hour < endHour || (hour === endHour && minute === 0)) {
        // Push time slot string
        slots.push(`${pad(hour)}:${minute === 0 ? "00" : "30"}`);

        // Increment 30 minutes
        if (minute === 0) {
          minute = 30;
        } else {
          minute = 0;
          hour++;
        }

        // Stop if hour reaches endHour and minute > 0
        if (hour > endHour || (hour === endHour && minute > 0)) break;
      }
      return slots;
    }

    // For other days, generate full slots from 09:00 to 17:00
    for (let h = startHour; h < endHour; h++) {
      slots.push(`${pad(h)}:00`);
      slots.push(`${pad(h)}:30`);
    }
    // Add 17:00 slot exactly if needed (usually end time exclusive, but adding it here for clarity)
    // slots.push(`${pad(endHour)}:00`); // usually bookings end at 17:00, not start

    return slots;
  };

  const handleBooking = async () => {
    if (!user) return;

    if (!service || !date || !time || !name) {
      showError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const dateTime = new Date(`${date}T${time}`);

      await addDoc(collection(db, "appointments"), {
        service,
        date: Timestamp.fromDate(dateTime),
        createdAt: Timestamp.now(),
        status: "pending",
        userId: user.id,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        name: name,
      });

      router.push("/dashboard");
      showSuccess();
      setName("");
      setService("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      showError("Failed to book appointment. Please try again.");
    }
    setLoading(false);
  };

  const timeSlots = generateTimeSlots();

  if (!user) {
    return (
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Create an account or sign in to{" "}
            <strong className="text-[#007E85]"> book </strong>
            your healthcare appointments quickly and securely.
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            By logging in, you can easily book, reschedule, or cancel
            appointments with just a few clicks, ensuring your healthcare is
            always on track.
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <Link
              className="inline-block rounded border  bg-[#007E85] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#539498]"
              href="/sign-up"
            >
              Sign Up
            </Link>

            <Link
              className="inline-block rounded border border-gray-200 px-5 py-3 bg-[#ffffff] font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              href="/sign-in"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 pt-10 max-w-2xl mx-auto" data-aos="fade-up">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📝 Book an Appointment
      </h1>

      {/* Service Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Enter You Name</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Full Name"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#007E85]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Service</label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#007E85]"
        >
          <option value="">-- Choose a service --</option>
          <option value="examination">Medical examination</option>
          <option value="review">Review</option>
          <option value="check-up">Medical check-up</option>
        </select>
      </div>

      {/* Date Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Date</label>
        <input
          type="date"
          value={date}
          min={todayStr}
          onChange={(e) => {
            setDate(e.target.value);
            setTime(""); // reset time when date changes
          }}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#007E85]"
        />
      </div>

      {/* Time Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Select Time</label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          disabled={!date || timeSlots.length === 0}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#007E85]"
        >
          <option value="">
            {timeSlots.length === 0
              ? "No available slots"
              : "-- Choose a time --"}
          </option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleBooking}
        disabled={loading || timeSlots.length === 0}
        className="w-full bg-[#007E85] text-white px-4 py-2 rounded hover:bg-[#2b6265] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirm Booking
      </button>
    </div>
  );
}
