"use client";

import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/elements/SectionHeaders";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/components/layout/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const { id } = useParams();

  console.log(order);

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }

    if (id) {
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
        });
      });
    }
  }, [clearCart, id]);

  let total = 0;

  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      total += product.price;
    }
  }

  return (
    <section className="mt-8">
      <SectionHeaders mainHeader={"Ваше замовлення"} />
      <div className="flex justify-center py-6">
        <p className="text-2xl">Дякуємо за Ваше замовлення!</p>
      </div>

      {order && (
        <div className="grid grid-cols-2 gap-16 p-8 max-w-[900px] mx-auto">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct product={product} />
            ))}
            <div className="mt-4">
              <p className="pl-2">Сума замовлення: {total} ₴</p>
            </div>
          </div>
          <div className="cart-form">
            <div className="bg-gray-100 p-4 rounded-lg border">
              <div className="mb-4">
                <label>Ім'я та прізвище</label>
                <input type="text" value={order.name} disabled />
              </div>
              <AddressInputs disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
