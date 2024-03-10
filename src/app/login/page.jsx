"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmailRegister] = useState("");
  const [password, setPasswordRegister] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  //   const session = useSession();
  //   const status = session.status;

  async function handleFormSumbit(e) {
    e.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setLoginInProgress(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-center pt-4 text-2xl mb-4">Логін</h1>
      <form
        className="flex flex-col gap-2 p-6 mb-8 gap-x-28 border-2 rounded-lg max-w-[800px] mx-auto"
        onSubmit={handleFormSumbit}
      >
        <div className="flex flex-col items-center gap-2">
          <label className="text-sm">Мейл</label>
          <input
            type="email"
            value={email}
            disabled={loginInProgress}
            onChange={(e) => setEmailRegister(e.target.value)}
            className="border-2 py-1 px-2 rounded-lg"
            placeholder="trendy@ukr.net"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="text-sm">Пароль</label>
          <input
            type="password"
            className="border-2 py-1 px-2 rounded-lg"
            disabled={loginInProgress}
            value={password}
            onChange={(e) => setPasswordRegister(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loginInProgress}
          className="bg-redColor rounded-full text-white px-8 py-2 mt-4 text-sm"
        >
          Логін
        </button>

        <div className="flex flex-col gap-2 mt-4">
          <div className="text-center text-xs text-gray-500">
            чи залогінтеся з google
          </div>
          <button
            className="flex justify-center items-center gap-2 border-2 text-sm rounded-full p-2"
            onClick={() => signIn("google", { callbackUrl: "/profile" })}
            type="button"
          >
            <Image
              src={"/profile/google.png"}
              width={24}
              height={24}
              alt="Логін з google"
            />
            Залогінтеся
          </button>
        </div>
      </form>
    </div>
  );
}
