"use client";

import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../firebase/config";
import {
  collection,
  query,
  orderBy,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../../../context/AuthContext";
import {
  FiCheckCircle,
  FiXCircle,
  FiUser,
  FiMail,
  FiCalendar,
  FiInfo,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function StaffAppointmentsPage() {
  const { user } = useUser();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const router = useRouter();
  const { role } = useContext(AuthContext);

  const fetchAppointments = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const q = query(collection(db, "appointments"), orderBy("date", "asc"));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      }));
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const docRef = doc(db, "appointments", id);
      await updateDoc(docRef, { status: newStatus });
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
    setUpdatingId(null);
  };

  useEffect(() => {
    if (!user && !loading) {
      if (role !== "staff") {
        router.push("/sign-in");
      }
    }
  }, [user, loading, role, router]);

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const deleteApp = async (appId) => {
    if (!user) return;

    const ref = doc(db, "appointments", appId);
    await deleteDoc(ref);

    setAppointments((prev) => prev.filter((ap) => ap.id !== appId));
  };

  if (role !== "staff") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#B2DFDB] to-[#80CBC4] px-4">
        <p className="text-red-600 text-lg font-semibold select-none">
          You are not authorized to view this page.
        </p>
      </div>
    );
  }

  return (
    <main className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#007E85] mb-10">
          Manage Appointments
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="loader border-t-[#007E85]"></div>
          </div>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-600 text-lg py-20 select-none">
            No appointments found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map(
              ({ id, service, name, date, userEmail, status }) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`rounded-xl p-6 shadow-xl transition-colors border-2 relative overflow-hidden bg-white ${
                    status === "confirmed"
                      ? "border-green-400"
                      : status === "canceled"
                      ? "border-red-400"
                      : "border-gray-200"
                  }`}
                >
                  <h3 className="text-2xl font-semibold text-[#007E85] mb-4 flex items-center gap-2">
                    <FiInfo className="text-[#007E85]" size={22} />
                    {service.toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-900 font-semibold mb-1 break-words flex items-center gap-2">
                    <FiUser size={16} className="text-gray-600" />
                    {name}
                  </p>
                  <p className="text-sm text-gray-700 mb-1 flex items-center gap-2">
                    <FiCalendar size={16} className="text-gray-600" />
                    {date.toLocaleDateString()} at{" "}
                    {date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm text-gray-700 mb-3 break-words flex items-center gap-2">
                    <FiMail size={16} className="text-gray-600" />
                    {userEmail}
                  </p>

                  <p
                    className={`capitalize font-semibold mb-4 text-sm flex items-center gap-2 ${
                      status === "confirmed"
                        ? "text-green-600"
                        : status === "canceled"
                        ? "text-red-600"
                        : "text-gray-700"
                    }`}
                  >
                    <FiInfo size={16} />
                    Status: {status}
                  </p>

                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => updateStatus(id, "confirmed")}
                      disabled={updatingId === id || status === "confirmed"}
                      className={`flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
                        status === "confirmed"
                          ? "bg-green-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      <FiCheckCircle size={18} /> Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(id, "canceled")}
                      disabled={updatingId === id || status === "canceled"}
                      className={`flex-1 flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
                        status === "canceled"
                          ? "bg-red-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      <FiXCircle size={18} /> Cancel
                    </button>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "Deleted!",
                              text: "Appointment has been deleted.",
                              icon: "success",
                              showConfirmButton: false,
                              timer: 1200,
                            });
                            deleteApp(id);
                          }
                        });
                      }}
                      className="flex-1 flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 bg-red-500"
                    >
                      <FaTrash size={18} /> Delete
                    </button>
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}
