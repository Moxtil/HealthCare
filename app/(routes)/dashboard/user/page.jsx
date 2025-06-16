"use client";

import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useUser } from "@clerk/nextjs";

export default function UserDashboard() {
  const { user } = useUser();
  const { role } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const fetchAppointments = async () => {
      try {
        // استعلام فقط ب where بدون orderBy
        const q = query(
          collection(db, "appointments"),
          where("userEmail", "==", user.primaryEmailAddress.emailAddress)
        );

        const querySnapshot = await getDocs(q);

        const now = new Date();

        // جلب البيانات، ثم تصفية حسب التاريخ وترتيب بالـ JavaScript
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
      <p className="p-6 pt-24 text-center text-red-500">
        You are not authorized to view this page.
      </p>
    );
  }

  if (!user) {
    return (
      <>
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Sign in or create an account to{" "}
              <strong className="text-[#007E85]"> simplify </strong>
              healthcare access and maximize your appointment confirmations.
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              By signing in, you gain complete control over your healthcare
              journey, including easy appointment management, instant
              notifications, and personalized support to simplify every step.
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
      </>
    );
  }
  return (
    <div className="p-6 pt-10" data-aos="fade-up">
      <h1 className="text-3xl font-bold mb-6">👤 User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* New Appointment */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          <h2 className="text-xl font-semibold mb-2">
            ➕ Book New Appointment
          </h2>
          <p className="text-gray-600 mb-4">
            Choose a time slot and book an appointment.
          </p>
          <Link
            href={"/appointment"}
            className="bg-[#007E85] text-white px-4 py-2 rounded hover:bg-[#2b6265] cursor-pointer"
          >
            Book Now
          </Link>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border overflow-y-auto max-h-[240px]">
          <h2 className="text-xl font-semibold mb-2">
            📅 Upcoming Appointments
          </h2>
          <ul className="space-y-4 ">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="bg-white rounded-lg shadow-lg p-4"
              >
                <p className="font-semibold text-gray-800">
                  {appointment.service} -{" "}
                  {appointment.date.toDate().toLocaleString()}
                </p>
                <p className="text-sm text-gray-800">
                  Patient Name: {appointment.name || "Patient"}
                </p>
                <p className="text-sm text-gray-500">
                  Status: {appointment.status || "pending"}
                </p>
              </li>
            ))}
            {appointments.length === 0 && (
              <li className="text-gray-400 text-center">
                No upcoming appointments found.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
