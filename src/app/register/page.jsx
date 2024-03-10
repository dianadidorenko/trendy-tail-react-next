"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Register() {
  const [email, setEmailRegister] = useState("");
  const [password, setPasswordRegister] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSumbit(e) {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "ap plication/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }

    setCreatingUser(false);
  }
  return (
    <section className="mb-30 mt-30">
      <h1 className="text-center pt-4 text-2xl mb-4">Профіль</h1>
      <div className="flex items-center justify-center pt-8 pb-8 mb-8 gap-x-28 border-2 rounded-lg max-w-[800px] mx-auto">
        <div className="flex flex-col gap-4">
          <h2 className="text-center">Реєстрація</h2>
          {userCreated && (
            <div className="flex flex-col items-center gap-1">
              <p className="text-center border-2 p-2 bg-green-600 text-white/90 border-b-2 rounded-lg">
                Користувач створений.
              </p>
              <Link
                href={"/login"}
                className="bg-redColor rounded-full text-white px-8 py-2 mt-4 text-sm"
              >
                Логін
              </Link>
            </div>
          )}
          {error && (
            <p className="text-center border-2 p-2 bg-green-600 text-white/90 border-b-2 rounded-lg">
              Виникла помилка. Спробуйте знову.
            </p>
          )}

          <form
            className="flex flex-col items-center justify-center gap-y-4 p-6 border-2"
            onSubmit={handleFormSumbit}
          >
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm">Мейл</label>
              <input
                type="email"
                value={email}
                disabled={userCreated}
                onChange={(e) => setEmailRegister(e.target.value)}
                className="border-2 py-1 px-2 rounded-lg"
                placeholder="trendy@ukr.net"
              />
            </div>
            <label className="text-sm">Пароль</label>
            <input
              type="password"
              className="border-2 py-1 px-2 rounded-lg "
              value={password}
              disabled={userCreated}
              onChange={(e) => setPasswordRegister(e.target.value)}
            />
            <button
              type="submit"
              disabled={userCreated}
              className="btnHover bg-redColor rounded-full text-white px-8 py-2 mt-4 text-sm"
            >
              Зареєструватися
            </button>
            <div className="flex flex-col gap-2 mt-4">
              <div className="text-center text-xs text-gray-500">
                чи є google акаунт?
              </div>
              <button
                className="flex justify-center items-center gap-2 border-2 text-sm rounded-full p-2"
                disabled={userCreated}
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <Image
                  src={"/profile/google.png"}
                  width={24}
                  height={24}
                  alt="Логін з google"
                />
                Зареєструватися
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center gap-2">
          Вже є акаунт?
          <Link
            href={"/login"}
            className="btnHover bg-redColor rounded-full text-white px-8 py-2 text-sm"
          >
            Логін
          </Link>
        </div>
      </div>
    </section>
  );
}
