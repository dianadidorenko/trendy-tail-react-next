"use client";

import { useProfile } from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ItemsPage() {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/products").then((response) => {
      response.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return <h2 className="text-center my-4">Завантаження...</h2>;
  }

  if (!data.admin) {
    return <h2 className="text-center my-4">Не адміністратор...</h2>;
  }

  return (
    <section>
      <UserTabs isAdmin={true} />
      <div className="border-2 p-2 max-w-[400px] mx-auto my-10 rounded-lg border-gray-300">
        <Link
          href={"/products/new"}
          className="flex justify-center gap-2 items-center"
        >
          Створити новий товар <Right />
        </Link>
      </div>
      <div className="flex justify-center flex-col items-center gap-4 mb-8">
        {menuItems?.length > 0 && (
          <h2 className="text-sm text-gray-500 mt-4">Редагувати товар:</h2>
        )}
        <div className="grid grid-cols-6 gap-6 flex-wrap px-12">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={"/products/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <div className="relative">
                  <Image
                    className="rounded-md"
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center pt-4">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
