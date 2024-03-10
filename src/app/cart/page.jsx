"use client";

import SectionHeaders from "@/components/elements/SectionHeaders";
import Image from "next/image";
import { Orelega_One } from "next/font/google";
import { useContext } from "react";
import { CartContext } from "@/components/AppContext";
import { useProfile } from "@/components/UseProfile";
import { useState, useEffect } from "react";
import AddressInputs from "@/components/layout/AddressInputs";
import toast from "react-hot-toast";
import CartProduct from "@/components/layout/CartProduct";

const orelegaOne = Orelega_One({
  subsets: ["cyrillic"],
  weight: ["400"],
});

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const [userName, setUserName] = useState("");
  const { data: profileData } = useProfile();

  let total = 0;
  
  for (const p of cartProducts) {
    total += p.price;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Платіж невдалий 😔");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { name, phone, city, country } = profileData;

      const addressFromProfile = {
        name,
        phone,
        city,
        country,
      };
      setAddress(addressFromProfile);
      setUserName(name);
    }
  }, [profileData]);

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();

    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <div className="flex justify-center my-20 p-6">
        <h1 className={orelegaOne.className + " text-2xl p-4 border-2"}>
          Корзина порожня 😔
        </h1>
      </div>
    );
  }

  return (
    <section className="mt-4 p-6">
      <SectionHeaders mainHeader={"Замовлення"} />
      <div className="flex flex-col items-center justify-center mb-8">
        <h1
          className={
            orelegaOne.className +
            " flex gap-5 items-center text-4xl text-lightBlueColor mb-4"
          }
        >
          <Image
            src={"/order/paw-icon.svg"}
            width={50}
            height={50}
            alt="Лапа"
          />
          Оформлення замовлення
          <Image
            src={"/order/paw-icon.svg"}
            width={50}
            height={50}
            alt="Лапа"
          />
        </h1>
        <p>Заповніть наступні поля для оформлення вашого замовлення</p>
      </div>

      <div className="flex gap-20 px-20 justify-center items-center">
        <div className="flex flex-col">
          <div>
            <h2 className="uppercase border-b-slate-600 border-b-2 pb-1">
              Ваші дані
            </h2>
          </div>
          <form className="cart-form my-4" onSubmit={proceedToCheckout}>
            <div className="mb-2">
              <label>Ім'я та прізвище</label>
              <input
                type="text"
                placeholder="Ім'я та прізвище"
                value={userName}
                onChange={(ev) => setUserName(ev.target.value)}
              />
            </div>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button
              type="submit"
              className={
                orelegaOne.className +
                " mt-4 order-button flex items-center justify-center gap-2 text-xl"
              }
            >
              Сплатити
              <span> {total} ₴</span>
            </button>
          </form>
        </div>

        <div className="flex flex-col border-2 p-4 gap-2 text-md">
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={index}
                product={product}
                index={index}
                onRemove={removeCartProduct}
              />
            ))}
          <div
            className={
              orelegaOne.className +
              " mt-4 text-center flex items-center justify-center gap-4 total-block"
            }
          >
            Загальна сума замовлення:
            <span className="text-xl">{total} ₴</span>
          </div>
        </div>
      </div>
    </section>
  );
}
