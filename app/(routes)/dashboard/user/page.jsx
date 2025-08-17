"use client";

import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useUser } from "@clerk/nextjs";
import { FiCalendar, FiPlusCircle, FiClock } from "react-icons/fi";

export default function UserDashboard() {
  const { user } = useUser();
  const { role } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const fetchAppointments = async () => {
      try {
        const q = query(
          collection(db, "appointments"),
          where("userEmail", "==", user.primaryEmailAddress.emailAddress)
        );

        const querySnapshot = await getDocs(q);

        const now = new Date();

        const upcomingAppointments = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((item) => item.date?.toDate?.() > now)
          .sort((a, b) => a.date.toDate() - b.date.toDate());

        setAppointments(upcomingAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [user]);

  if (user && role !== "user") {
    return (
      <div className=" flex items-center justify-center bg-gradient-to-tr from-[#E0F7F9] to-[#B2DFDB] px-4">
        <p className="text-red-600 text-xl font-semibold">
          You are not authorized to view this page.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className=" flex items-center justify-center px-4 py-16">
        <div className="max-w-3xl text-center bg-white p-10 rounded-3xl shadow-lg border border-[#007E85]/40">
          <h1 className="text-4xl font-extrabold text-[#007E85] mb-4 select-none">
            Sign in or create an account to{" "}
            <span className="text-[#059669]">simplify</span> healthcare access
            and maximize your appointment confirmations.
          </h1>
          <p className="text-gray-700 mb-8 text-lg leading-relaxed select-none">
            By signing in, you gain complete control over your healthcare
            journey, including easy appointment management, instant
            notifications, and personalized support to simplify every step.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <Link
              href="/sign-up"
              className="bg-[#007E85] hover:bg-[#005f63] transition-all px-8 py-3 rounded-full text-white font-semibold shadow-md cursor-pointer select-none"
            >
              Sign Up
            </Link>
            <Link
              href="/sign-in"
              className="border border-gray-300 hover:border-gray-500 transition-all px-8 py-3 rounded-full text-gray-700 hover:text-gray-900 font-semibold cursor-pointer select-none"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-tr  p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <header className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-4xl font-extrabold text-[#007E85] flex items-center gap-3 select-none">
            <FiCalendar size={40} /> User Dashboard
          </h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Book New Appointment */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-[#007E85]/30 flex flex-col justify-between hover:shadow-2xl transition cursor-pointer select-none">
            <div>
              <div className="flex items-center gap-3 text-[#059669] mb-4">
                <FiPlusCircle size={28} />
                <h2 className="text-2xl font-bold">Book New Appointment</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                Choose a time slot and book an appointment.
              </p>
            </div>
            <Link
              href="/appointment"
              className="self-start bg-[#059669] hover:bg-[#047857] transition-all text-white px-6 py-3 rounded-full font-semibold shadow-md transform hover:scale-105"
            >
              Book Now
            </Link>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-[#007E85]/30 max-h-[225px] overflow-y-auto">
            <div className="flex items-center gap-3 text-[#007E85] mb-6">
              <FiClock size={28} />
              <h2 className="text-2xl font-bold select-none">
                Upcoming Appointments
              </h2>
            </div>
            <ul className="space-y-5">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <li
                    key={appointment.id}
                    className="bg-[#e0f7f9] rounded-lg p-4 shadow-md border border-[#007E85]/30"
                  >
                    <p className="font-semibold text-[#007E85] text-lg select-text">
                      {appointment.service} -{" "}
                      {appointment.date.toDate().toLocaleString()}
                    </p>
                    <p className="text-gray-800 select-text">
                      Patient Name: {appointment.name || "Patient"}
                    </p>
                    <p className="text-gray-600 select-text">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          appointment.status === "confirmed"
                            ? "text-green-600"
                            : appointment.status === "pending"
                            ? "text-yellow-600"
                            : "text-gray-500"
                        }`}
                      >
                        {appointment.status || "pending"}
                      </span>
                    </p>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 text-center select-none">
                  No upcoming appointments found.
                </li>
              )}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
