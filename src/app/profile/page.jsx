"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";

export default function ProfilePage() {
  const session = useSession();

  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(e, data) {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Профіль оновлюється...",
      success: "Профіль оновлено!",
      error: "Помилка оновлення профілю",
    });
  }

  if (status === "loading") {
    return <h2 className="text-center my-4">Завантаження...</h2>;
  }

  if (status === "unauthenticated" || !profileFetched) {
    return (
      <>
        <div className="flex flex-col justify-center gap-8 py-8">
          <div className="flex flex-col gap-2">
            <label className="text-center">Створимо профіль?</label>
            <Link
              href={"/register"}
              className="max-w-[200px] mx-auto bg-darkBlueColor text-sm hover:bg-lightBlueColor transition rounded-full text-white px-8 py-2"
            >
              Реєстрація
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-center">Чи вже маєте?</label>
            <Link
              href={"/login"}
              className="max-w-[200px] mx-auto bg-darkBlueColor text-sm hover:bg-lightBlueColor transition rounded-full text-white px-8 py-2"
            >
              Логін
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {status === "authenticated" && (
        <>
          <div className="flex items-center justify-between px-4">
            <h2 className="border-b-2">Вітаємо, {user?.name}</h2>
            <button
              className="m-4 border-2 p-2 rounded-lg uppercase bg-lightBlueColor text-white text-sm transition hover:bg-darkBlueColor"
              onClick={() => signOut()}
            >
              Вийти з акаунту
            </button>
          </div>

          <UserTabs isAdmin={isAdmin} />

          <section>
            <div className="text-center flex flex-col items-center pt-6 pb-4">
              <Image
                src={"/icons/heart-icon.svg"}
                width={86}
                height={73}
                alt="Icon"
              />

              <h2 className="text-black uppercase text-3xl">Профіль</h2>
            </div>

            <div className="max-w-2xl mx-auto mt-8">
              <UserForm user={user} onSave={handleProfileInfoUpdate} />
            </div>
          </section>
        </>
      )}
    </>
  );
}
