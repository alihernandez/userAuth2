"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const checkEmail = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // console.log(inputEmail);
    setUserEmail(emailRegex.test(email));

    // console.log(userEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  // e => setEmail(e.target.value)
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            id="userEmail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={checkEmail}
            type="text"
            placeholder="Email"
          ></input>
          {userEmail ? (
            <p style={{ color: "green" }}>Valid email address</p>
          ) : (
            <p style={{ color: "red" }}>Invalid email address</p>
          )}
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          ></input>
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            <span className="underline">Resgister Here</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
