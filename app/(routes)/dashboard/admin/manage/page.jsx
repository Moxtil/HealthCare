"use client";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../firebase/config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { RxDashboard } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../context/AuthContext";

export default function Manage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role } = useContext(AuthContext);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#E0F7F9] to-[#B2DFDB] px-4">
        <p className="text-red-600 text-xl font-semibold select-none">
          You are not authorized to view this page.
        </p>
      </div>
    );

  return (
    <main className="min-h-screen p-8 bg-gradient-to-tr from-[#E0F7F9] to-[#B2DFDB]">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <header className="flex items-center justify-center gap-3 text-[#007E85] select-none">
          <RxDashboard size={40} />
          <h1 className="text-4xl font-extrabold">
            Admin Dashboard - Manage Users
          </h1>
        </header>

        {loading ? (
          <div className="flex justify-center">
            <div className="loader border-t-[#007E85]"></div>
          </div>
        ) : (
          <section className="bg-white rounded-3xl shadow-lg p-8 border border-[#007E85]/30">
            <div className="flex items-center gap-3 mb-6 text-[#007E85]">
              <FaUserAlt size={28} />
              <h2 className="text-3xl font-bold select-none">Users</h2>
            </div>
            <ul className="divide-y divide-gray-200 max-h-[480px] overflow-y-auto">
              {users.length === 0 && (
                <li className="text-gray-500 text-center py-10">
                  No users found.
                </li>
              )}

              {users.map((user) => (
                <li
                  key={user.id}
                  className="py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0"
                >
                  <div>
                    <p className="text-gray-900 font-semibold select-text">
                      #{user.name || "Anonymous"}
                    </p>
                    <p className="text-gray-700 select-text">{user.email}</p>
                    <p className="text-sm text-gray-500 select-text">
                      Role:{" "}
                      <span className="capitalize font-medium">
                        {user.role}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
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
                        className="text-yellow-600 border-2 border-yellow-500 hover:text-yellow-800 hover:border-yellow-700 px-5 py-2 rounded-full font-semibold transition cursor-pointer select-none whitespace-nowrap"
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
                        className="text-red-600 border-2 border-red-500 hover:text-red-800 hover:border-red-700 px-5 py-2 rounded-full font-semibold transition cursor-pointer select-none whitespace-nowrap"
                        title="Delete User"
                      >
                        Delete User
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
