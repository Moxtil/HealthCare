"use client";

import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { FiUsers, FiSettings, FiBarChart2 } from "react-icons/fi";

export default function AdminDashboard() {
  const { role } = useContext(AuthContext);

  if (role !== "admin")
    return (
      <div className=" flex items-center justify-center bg-gradient-to-tr from-[#E0F7F9] to-[#B2DFDB] px-4">
        <p className="text-red-600 text-xl font-semibold select-none">
          You are not authorized to view this page.
        </p>
      </div>
    );

  return (
    <main className=" bg-gradient-to-tr from-[#E0F7F9] to-[#B2DFDB] p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-[#007E85] flex items-center gap-3 select-none">
            <FiUsers size={40} /> Admin Dashboard
          </h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-[#007E85]/30 flex flex-col justify-between hover:shadow-2xl transition cursor-pointer select-none">
            <div>
              <div className="flex items-center gap-3 text-[#007E85] mb-4">
                <FiUsers size={28} />
                <h2 className="text-2xl font-bold">Manage Users</h2>
              </div>
              <p className="text-gray-700 text-lg">
                Assign roles, edit, or remove users.
              </p>
            </div>
            <Link
              href="/dashboard/admin/manage"
              className="self-start mt-6 bg-[#007E85] hover:bg-[#276164] transition-colors text-white px-6 py-3 rounded-full font-semibold shadow-md transform hover:scale-105"
            >
              View Users
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-[#007E85]/30 flex flex-col justify-between hover:shadow-2xl transition cursor-pointer select-none">
            <div className="flex items-center gap-3 text-[#059669] mb-4">
              <FiSettings size={28} />
              <h2 className="text-2xl font-bold">Manage Services</h2>
            </div>
            <p className="text-gray-700 text-lg">
              Add, edit, or delete platform services.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-[#007E85]/30 flex flex-col justify-between hover:shadow-2xl transition cursor-pointer select-none">
            <div className="flex items-center gap-3 text-[#059669] mb-4">
              <FiBarChart2 size={28} />
              <h2 className="text-2xl font-bold">Booking Reports</h2>
            </div>
            <p className="text-gray-700 text-lg">
              View analytics and booking performance.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
