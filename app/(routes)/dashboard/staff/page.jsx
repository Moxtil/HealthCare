"use client";
import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/config";
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

      const count = querySnapshot.size;

      setRequestsCount(count);
    } catch (err) {
      console.error("Error fetching appointment count:", err);
      setRequestsCount(0);
    }
  };
  const getConfirmedReqCount = async () => {
    try {
      const q = query(collection(db, "appointments"), orderBy("date", "asc"));
      const querySnapshot = await getDocs(q);

      // Filter confirmed appointments
      const confirmed = querySnapshot.docs.filter(
        (doc) => doc.data().status === "confirmed"
      );

      // Set the count of confirmed appointments
      setConfirmedCount(confirmed.length);
    } catch (err) {
      console.error("Error fetching appointment count:", err);
      setConfirmedCount(0);
    }
  };

  useEffect(() => {
    getReqCount();
    getConfirmedReqCount();
    console.log(confirmedCount);
  }, []);
  if (role !== "staff")
    return (
      <p className="p-6 pt-24 text-center text-red-500">
        You are not authorized to view this page.
      </p>
    );

  return (
    <div className="p-6" data-aos="fade-up">
      <h1 className="text-3xl font-bold mb-6">🛠️ Staff Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Requests */}
        <div className="bg-white shadow-lg flex flex-col items-start gap-2 rounded-2xl p-6 border">
          <h2 className="text-xl font-semibold mb-2">🆕 New Requests</h2>
          <p className="text-gray-600">
            You have {requestsCount} pending appointments.
          </p>
          <Link
            href={"/dashboard/staff/requests"}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            View Requests
          </Link>
        </div>

        {/* Confirmed Appointments */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          <h2 className="text-xl font-semibold mb-2">
            📋 Confirmed Appointments
          </h2>
          <p className="text-gray-600">
            {confirmedCount} confirmed appointments.
          </p>
        </div>

        {/* Messages */}
        <div className="bg-white shadow-lg flex flex-col items-start gap-2 rounded-2xl p-6 border">
          <h2 className="text-xl font-semibold mb-2">💬 Customer Messages</h2>
          <p className="text-gray-600">{chatsCount.length} Chat/s Available.</p>

          <Link
            href={"/staff-chat"}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Check For Messages
          </Link>
        </div>
      </div>
    </div>
  );
}
