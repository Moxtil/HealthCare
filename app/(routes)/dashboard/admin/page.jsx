"use client";
import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

export default function AdminDashboard() {
  const { role } = useContext(AuthContext);

  if (role !== "admin")
    return (
      <p className="p-6 pt-24 text-center text-red-500">
        You are not authorized to view this page.
      </p>
    );

  return (
    <div className="p-6 pt-10" data-aos="fade-up">
      <h1 className="text-3xl font-bold mb-6">🧑‍💼 Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Manage Users */}
        <div className="bg-white shadow-lg flex flex-col items-start gap-1 rounded-2xl p-6 border">
          <h2 className="text-xl font-semibold mb-2">👥 Manage Users</h2>
          <p className="text-gray-600">Assign roles, edit or remove users.</p>
          <Link
            href={"/dashboard/admin/manage"}
            className="mt-4 bg-[#007E85] text-white px-4 py-2 rounded hover:bg-[#276164] transition cursor-pointer"
          >
            View Users
          </Link>
        </div>

        {/* Manage Services */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          <h2 className="text-xl font-semibold mb-2">🛎️ Manage Services</h2>
          <p className="text-gray-600">
            Add, edit or delete platform services.
          </p>
        </div>

        {/* Booking Reports */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          <h2 className="text-xl font-semibold mb-2">📊 Booking Reports</h2>
          <p className="text-gray-600">
            View analytics and booking performance.
          </p>
        </div>
      </div>
    </div>
  );
}
