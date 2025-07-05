"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { db } from "../../firebase/config";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Link from "next/link";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiCheckCircle,
  FiInfo,
  FiChevronRight,
  FiHome,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

const showError = (text) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text,
    confirmButtonColor: "#007E85",
  });
};
const showSuccess = () => {
  Swal.fire({
    title: "Good job!",
    text: "Appointment booked successfully",
    icon: "success",
    timer: 1200,
    showConfirmButton: false,
  });
};

export default function BookingPage() {
  const { user } = useUser();
  const router = useRouter();

  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const pad = (n) => (n < 10 ? "0" + n : n);
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
    today.getDate()
  )}`;

  const generateTimeSlots = () => {
    let slots = [];
    const startHour = 9;
    const endHour = 17;

    if (date === todayStr) {
      const now = new Date();
      let hour = now.getHours();
      let minutes = now.getMinutes();

      if (minutes > 0 && minutes <= 30) minutes = 30;
      else if (minutes > 30) {
        hour++;
        minutes = 0;
      }

      if (hour < startHour) {
        hour = startHour;
        minutes = 0;
      }
      if (hour >= endHour) return [];

      while (hour < endHour || (hour === endHour && minutes === 0)) {
        slots.push(`${pad(hour)}:${minutes === 0 ? "00" : "30"}`);
        if (minutes === 0) minutes = 30;
        else {
          minutes = 0;
          hour++;
        }
        if (hour > endHour || (hour === endHour && minutes > 0)) break;
      }
      return slots;
    }

    for (let h = startHour; h < endHour; h++) {
      slots.push(`${pad(h)}:00`);
      slots.push(`${pad(h)}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleBooking = async () => {
    if (!user) return;

    if (!name.trim() || !service || !date || !time) {
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
        name: name.trim(),
      });

      showSuccess();
      router.push("/dashboard");

      setName("");
      setService("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error(error);
      showError("Failed to book appointment. Please try again.");
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-[#E0F7F9] to-[#B2DFDB] px-6">
        <div className="max-w-xl bg-white rounded-xl shadow-xl p-12 text-center w-full">
          <h1 className="text-4xl font-extrabold text-[#007E85] mb-6 flex justify-center items-center gap-3 select-none">
            <FiCheckCircle size={40} />
            Book your healthcare appointment
          </h1>
          <p className="text-gray-700 mb-10 text-lg leading-relaxed">
            Create an account or sign in to book your healthcare appointments
            quickly and securely.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/sign-up"
              className="bg-[#007E85] hover:bg-[#005f63] transition-colors text-white px-7 py-3 rounded-md font-semibold cursor-pointer shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Sign Up <FiChevronRight />
            </Link>
            <Link
              href="/sign-in"
              className="border-2 border-[#007E85] text-[#007E85] hover:bg-[#007E85] hover:text-white transition-colors px-7 py-3 rounded-md font-semibold cursor-pointer shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Login <FiChevronRight />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-tr ">
      {/* Header */}

      <section className="flex flex-1 flex-col lg:flex-row gap-6 py-5">
        {/* Sidebar Left */}
        <aside className="bg-white w-full lg:w-1/5 p-8 shadow-inner flex flex-col gap-8">
          <div>
            <h2 className="text-xl font-bold text-[#007E85] mb-4 select-none">
              Welcome!
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We provide quality healthcare services with trusted professionals.
              Book your appointment now and stay healthy!
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-[#007E85] select-none">
              Contact Info
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <FiHome /> 123 Health St., Wellness City
              </li>
              <li className="flex items-center gap-2">
                <FiPhone /> +1 234 567 890
              </li>
              <li className="flex items-center gap-2">
                <FiMail /> contact@yourclinic.com
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin /> Open: Mon - Fri, 9am - 5pm
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content: Booking Form */}
        <main className="bg-white flex-grow p-8 shadow-lg rounded-tr-3xl rounded-br-3xl max-w-4xl mx-auto lg:mx-0 lg:w-3/5">
          <h2 className="text-3xl font-extrabold text-[#007E85] mb-8 text-center select-none">
            Book Your Appointment
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleBooking();
            }}
            className="flex flex-col gap-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-semibold text-gray-700 select-none flex items-center gap-2"
              >
                <FiUser /> Your Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007E85] transition duration-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="block mb-2 font-semibold text-gray-700 select-none flex items-center gap-2"
              >
                <FiInfo /> Select Service
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-5 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007E85] transition duration-300 cursor-pointer"
                required
              >
                <option value="" disabled>
                  -- Choose a service --
                </option>
                <option value="examination">Medical examination</option>
                <option value="review">Review</option>
                <option value="check-up">Medical check-up</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block mb-2 font-semibold text-gray-700 select-none flex items-center gap-2"
                >
                  <FiCalendar /> Select Date
                </label>
                <input
                  id="date"
                  type="date"
                  min={todayStr}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setTime("");
                  }}
                  className="w-full px-5 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007E85] transition duration-300 cursor-pointer"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block mb-2 font-semibold text-gray-700 select-none flex items-center gap-2"
                >
                  <FiClock /> Select Time
                </label>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={!date || timeSlots.length === 0}
                  className={`w-full px-5 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007E85] transition duration-300 ${
                    !date || timeSlots.length === 0
                      ? "cursor-not-allowed bg-gray-100"
                      : "cursor-pointer"
                  }`}
                  required
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
            </div>

            <button
              type="submit"
              disabled={loading || timeSlots.length === 0}
              className={`mt-6 w-full py-3 rounded-md text-white font-semibold shadow-lg transition 
              duration-300 transform ${
                loading || timeSlots.length === 0
                  ? "bg-[#007E85]/60 cursor-not-allowed"
                  : "bg-[#007E85] hover:bg-[#005f63] cursor-pointer hover:scale-105"
              }`}
            >
              {loading ? (
                <span className="animate-pulse">Booking...</span>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </form>
        </main>

        {/* Info Right Card */}
        <aside className="bg-[#007E85] text-white rounded-l-3xl p-8 flex flex-col justify-between w-full lg:w-1/5 shadow-lg select-none">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FiInfo size={28} />
              Important Info
            </h3>
            <ul className="space-y-4 text-sm leading-relaxed">
              <li className="flex items-center gap-3">
                <FiCheckCircle className="text-green-300" size={20} />
                Please arrive 10 minutes before your appointment.
              </li>
              <li className="flex items-center gap-3">
                <FiCheckCircle className="text-green-300" size={20} />
                Bring your ID and insurance card.
              </li>
              <li className="flex items-center gap-3">
                <FiCheckCircle className="text-green-300" size={20} />
                Call us if you need to reschedule.
              </li>
              <li className="mt-6 text-xs opacity-80 text-center">
                © 2025 Your Clinic. All rights reserved.
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
