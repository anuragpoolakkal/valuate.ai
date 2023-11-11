"use client";
import { useSession, signIn } from "next-auth/react";

function SignUp() {
  const session = useSession();

  const handleLogin = async () => {
    await signIn("google");

    // if (session) {
    //   console.log(session);
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-6 py-2 rounded-md"
      >
        Sign Up with Google
      </button>
    </div>
  );
}

export default SignUp;
