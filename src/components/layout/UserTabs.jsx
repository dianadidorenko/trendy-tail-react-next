"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();

  return (
    <div className="flex justify-center my-4 gap-2 tabs">
      <Link href={"/profile"} className={path === "/profile" ? "active" : ""}>
        Профіль
      </Link>
      {isAdmin && (
        <>
          <Link
            href={"/categories"}
            className={path === "/categories" ? "active" : ""}
          >
            Категорії
          </Link>
          <Link href={"/brands"} className={path === "/brands" ? "active" : ""}>
            Бренди
          </Link>
          <Link href={"/labels"} className={path === "/labels" ? "active" : ""}>
            Лейбли
          </Link>
          <Link
            href={"/products"}
            className={path.includes("products") ? "active" : ""}
          >
            Товари
          </Link>
          <Link
            href={"/users"}
            className={path.includes("users") ? "active" : ""}
          >
            Користувачі
          </Link>
        </>
      )}
      <Link href={"/orders"} className={path === "/orders" ? "active" : ""}>
        Замовлення
      </Link>
    </div>
  );
}
