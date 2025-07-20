"use client";

import { createContext, use, useContext } from "react";
import { auth } from "@/libs/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

// 1. Correctly typed context (optional but helpful)
export const authContext = createContext({
  user: null,
  loading: true,
  googleLoginHandler: async () => {},
  logout: async () => {},
});

// 2. Actual provider component
export default function AuthContextProvider({ children }) {
  const [user, loading] = useAuthState(auth);
   const [hasMounted, setHasMounted] = useState(false);

  const googleProvider = new GoogleAuthProvider(); 


  useEffect(() => {
    // This will ensure that the component has mounted before rendering
    setHasMounted(true);
  }, []);

  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const values = {
    user,
    loading,
    googleLoginHandler,
    logout,
  };

  // console.log(user)

  return (
    <authContext.Provider value={values}>
      {children}
    </authContext.Provider>
  );
}
