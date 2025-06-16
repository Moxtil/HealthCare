"use client";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../firebase/config"; // adjust path as needed
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { RxDashboard } from "react-icons/rx";

import { FaUserAlt, FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Manage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSnap = await getDocs(collection(db, "users"));
        const usersData = userSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersData);
      } catch (err) {
        console.error("Error loading data:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setUsers(users.filter((user) => user.id !== id));
  };

  const toggleUserRole = async (id, currentRole) => {
    const newRole = currentRole === "user" ? "staff" : "user";
    await updateDoc(doc(db, "users", id), { role: newRole });
    setUsers(
      users.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
  };

  if (role !== "admin")
    return (
      <p className="p-6 pt-24 text-center text-red-500">
        You are not authorized to view this page.
      </p>
    );
  return (
    <div className="p-6 max-w-5xl mx-auto pt-10">
      <h1 className="text-4xl font-bold mb-10 text-center flex items-center justify-center gap-1 text-[#007E85]">
        <RxDashboard /> Admin Dashboard
      </h1>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="space-y-10">
          {/* Users */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaUserAlt className="text-[#007E85] text-xl" />
              <h2 className="text-2xl font-semibold">Users</h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="py-3 flex items-start gap-3 justify-between flex-col md:flex-row md:items-center"
                >
                  <div>
                    <p className="text-gray-800 font-medium">
                      #{user.name || "Anonymous"}
                    </p>
                    <p className="text-gray-800 font-medium">{user.email}</p>
                    <p className="text-sm text-gray-500">Role: {user.role}</p>
                  </div>
                  <div className="flex gap-3">
                    {user?.role !== "admin" && (
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, Change it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              toggleUserRole(user.id, user.role);
                            }
                          });
                        }}
                        className="text-sm md:text-[16px] text-yellow-500 hover:text-yellow-700 hover:border-yellow-700 cursor-pointer transition border-2 border-yellow-500 px-4 py-2"
                        title="Toggle Role"
                      >
                        Change role to {user.role === "user" ? "Staff" : "User"}
                      </button>
                    )}

                    {user?.role !== "admin" && (
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, Delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteUser(user.id);
                            }
                          });
                        }}
                        className="text-sm md:text-[16px] text-red-500 hover:text-red-700 hover:border-red-700 transition border-2 border-red-600 px-5 py-2 cursor-pointer"
                        title="Delete User"
                      >
                        Delete User
                      </button>
                    )}
                  </div>
                </li>
              ))}
              {users.length === 0 && (
                <li className="text-gray-400">No users found.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
