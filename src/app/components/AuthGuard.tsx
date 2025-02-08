"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser(); // isLoaded ensures proper loading state
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        router.replace("/login"); // Use replace() to prevent back navigation
      } else {
        setIsCheckingAuth(false);
      }
    }
  }, [isSignedIn, isLoaded, router]);

  if (isCheckingAuth) {
    return <p>Loading...</p>; // Show a loading message or skeleton
  }

  return <>{children}</>;
};

export default AuthGuard;
