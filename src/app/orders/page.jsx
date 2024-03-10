"use client";

import { useProfile } from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { dbTimeForHuman } from "@/libs/datetime";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        orders.map((p) => console.log(p.cartProducts));
        setOrders(orders.reverse());
      });
    });
  }, []);

  if (loading) {
    return <h2 className="text-center my-4">Завантаження замовлень...</h2>;
  }

  if (!profile.admin) {
    return <h2 className="text-center my-4">Не адміністратор...</h2>;
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={profile.admin} />
      <div className="p-10">
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-200 rounded-lg p-4 mb-2 grid grid-cols-3 items-center max-w-[1000px] mx-auto"
            >
              <div>
                <span
                  className={
                    (order.paid ? "bg-green-500" : "bg-red-400") +
                    " p-2 rounded-md text-white"
                  }
                >
                  {order.paid ? "Оплачене" : "Не оплачене"}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  {dbTimeForHuman(order.createdAt)}
                  {order.userEmail}
                </div>
                <div className="text-sm">
                  {order.cartProducts
                    .map((p) => p.valueName + " " + p.valueSize)
                    .join(", ")}
                </div>
              </div>

              <Link
                href={"/orders/" + order._id}
                className="button flex items-center gap-1 py-2 px-4 rounded-full text-xs lowercase text-center hover:text-white"
              >
                Замовлення <Right />
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}
