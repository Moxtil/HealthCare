"use client";

import { createContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, isSignedIn } = useUser();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn) {
        setRole(null);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.id);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: user.fullName,
          email: user.emailAddresses[0].emailAddress,
          role: "user",
          avatar: user?.imageUrl,
        });
        setRole("user");
      } else {
        setRole(docSnap.data().role);
      }

      setLoading(false);
    };

    console.log(user);
    syncUser();
  }, [isSignedIn, user]);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
