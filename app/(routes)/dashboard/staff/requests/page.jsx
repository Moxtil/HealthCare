"use client";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../../../context/AuthContext";

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
  });

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  return (
    <div className="p-6 max-w-4xl mx-auto pt-10" data-aos="fade-up">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📂 Manage Appointments
      </h1>

      {loading ? (
        <div className="loader"></div>
      ) : appointments.length === 0 ? (
        <p className="text-center">No appointments found.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">
                  Service
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Date & Time
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  User Email
                </th>
                <th className="border border-gray-300 p-3 text-left">Status</th>
                <th className="border border-gray-300 p-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(({ id, service, date, userEmail, status }) => (
                <tr key={id} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 p-3">{service}</td>
                  <td className="border border-gray-300 p-3">
                    {date.toLocaleDateString()}{" "}
                    {date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="border border-gray-300 p-3">{userEmail}</td>
                  <td className="border border-gray-300 p-3 capitalize">
                    {status}
                  </td>
                  <td className="border border-gray-300 p-3 text-center space-x-2 space-y-1">
                    <button
                      onClick={() => updateStatus(id, "confirmed")}
                      disabled={updatingId === id || status === "confirmed"}
                      className={`w-full px-3 py-1 rounded text-white ${
                        status === "confirmed"
                          ? "bg-green-400 cursor-not-allowed"
                          : "bg-green-600 cursor-pointer hover:bg-green-700"
                      }`}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(id, "canceled")}
                      disabled={updatingId === id || status === "canceled"}
                      className={`px-3 w-full  py-1 rounded text-white ${
                        status === "canceled"
                          ? "bg-red-400 cursor-not-allowed"
                          : "bg-red-600 cursor-pointer hover:bg-red-700"
                      }`}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
