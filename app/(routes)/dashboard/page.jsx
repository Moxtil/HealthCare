"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import { useUser } from "@clerk/nextjs";

export default function DashboardRedirect() {
  const { role, loading } = useContext(AuthContext);
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!loading) {
      if (role === "admin") router.push("/dashboard/admin");
      else if (role === "staff") router.push("/dashboard/staff");
      else if (role === "user") router.push("/dashboard/user");
      else router.push("/sign-in");
    }

    if (!user) router.push("/dashboard/user");
  }, [role, isLoaded, router]);

  if (isLoaded) {
    return (
      <div className="w-full text-center p-4 flex items-center flex-col gap-1 pt-24 mx-auto text-gray-600">
        <p>Checking . . .</p>
        <p className="text-gray-400">
          (refresh the page when it takes so long)
        </p>
        <div className="loader"></div>
      </div>
    );
  }

  return null;
}
