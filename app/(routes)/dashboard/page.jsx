"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import { useUser } from "@clerk/nextjs";
import LargeLoadingSkeleton from "../../components/LargeLoadingSkeleton";
import LoadingSkeleton from "../../components/LoadingSkeleton";

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
      <div className="flex flex-col gap-8 mt-10 p-6">
        <LargeLoadingSkeleton />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return null;
}
