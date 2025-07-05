"use client";
import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/config";
import {
  FiUsers,
  FiCheckCircle,
  FiMessageSquare,
  FiClipboard,
  FiChevronRight,
} from "react-icons/fi";

export default function StaffDashboard() {
  const { role } = useContext(AuthContext);
  const [requestsCount, setRequestsCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [chatsCount, setChatCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSnap = await getDocs(collection(db, "users"));
        const usersData = userSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatCounts(usersData);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    fetchData();
  }, []);

  const getReqCount = async () => {
    try {
      const q = query(collection(db, "appointments"), orderBy("date", "asc"));
      const querySnapshot = await getDocs(q);
      setRequestsCount(querySnapshot.size);
    } catch (err) {
      console.error("Error fetching appointment count:", err);
      setRequestsCount(0);
    }
  };

  const getConfirmedReqCount = async () => {
    try {
      const q = query(collection(db, "appointments"), orderBy("date", "asc"));
      const querySnapshot = await getDocs(q);

      const confirmed = querySnapshot.docs.filter(
        (doc) => doc.data().status === "confirmed"
      );
      setConfirmedCount(confirmed.length);
    } catch (err) {
      console.error("Error fetching appointment count:", err);
      setConfirmedCount(0);
    }
  };

  useEffect(() => {
    getReqCount();
    getConfirmedReqCount();
  }, []);

  if (role !== "staff") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#E0F7F9] to-[#B2DFDB] p-6">
        <p className="text-red-600 text-xl font-semibold">
          You are not authorized to view this page.
        </p>
      </div>
    );
  }

  return (
    <main className="p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-[#007E85] flex items-center gap-3 select-none">
            <FiClipboard size={40} /> Staff Dashboard
          </h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between border border-[#007E85]/30 hover:shadow-2xl transition-shadow cursor-pointer">
            <div>
              <div className="flex items-center gap-3 text-[#16a34a] mb-4">
                <FiUsers size={28} />
                <h2 className="text-2xl font-bold select-none">New Requests</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                You have <span className="font-semibold">{requestsCount}</span>{" "}
                pending appointment{requestsCount !== 1 ? "s" : ""}.
              </p>
            </div>
            <Link
              href="/dashboard/staff/requests"
              className="transition-all self-start bg-[#16a34a] hover:bg-[#15803d]  text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-md transform hover:scale-105"
            >
              View Requests <FiChevronRight />
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between border border-[#007E85]/30 hover:shadow-2xl transition-shadow cursor-default">
            <div>
              <div className="flex items-center gap-3 text-[#2563eb] mb-4">
                <FiCheckCircle size={28} />
                <h2 className="text-2xl font-bold select-none">
                  Confirmed Appointments
                </h2>
              </div>
              <p className="text-gray-700 text-lg">
                You have <span className="font-semibold">{confirmedCount}</span>{" "}
                confirmed appointment{confirmedCount !== 1 ? "s" : ""}.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between border border-[#007E85]/30 hover:shadow-2xl transition-shadow cursor-pointer">
            <div>
              <div className="flex items-center gap-3 text-[#059669] mb-4">
                <FiMessageSquare size={28} />
                <h2 className="text-2xl font-bold select-none">
                  Customer Messages
                </h2>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                {chatsCount.length} chat{chatsCount.length !== 1 ? "s" : ""}{" "}
                available.
              </p>
            </div>
            <Link
              href="/staff-chat"
              className="self-start bg-[#059669] hover:bg-[#047857] transition-all text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-md transform hover:scale-105"
            >
              Check Messages <FiChevronRight />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
