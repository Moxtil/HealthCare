"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import { useUser } from "@clerk/nextjs";
import { GPTLoaderSkeleton } from "../../components/GPTLoaderSkeleton";

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
    return <GPTLoaderSkeleton />;
  }

  return null;
}
