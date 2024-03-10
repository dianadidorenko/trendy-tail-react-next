"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  });

  if (loading) {
    return <h2 className="text-center my-4">Завантаження...</h2>;
  }

  if (!data.admin) {
    return <h2 className="text-center my-4">Не адміністратор...</h2>;
  }
  return (
    <section className="mt-8 mb-8">
      <UserTabs isAdmin={true} />
      <div className="border-2 p-2 max-w-[800px] mx-auto my-10 rounded-lg border-gray-300">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._i89234warsdfzxçd}
              className="bg-gray-100 rounded-lg mb-4 py-2 px-4 flex items-center gap-6"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
                <Link
                  className="button rounded-lg py-1 px-4 text-center text-xs hover:bg-hoverBlueColor hover:text-white"
                  href={"/users/" + user._id}
                >
                  Редагувати
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
