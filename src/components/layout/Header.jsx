"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Orelega_One } from "next/font/google";
import { useContext, useState } from "react";
import Bars from "../icons/Bars";
import Close from "../icons/Close";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { CartContext } from "../AppContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

const orelegaOne = Orelega_One({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
});

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const path = usePathname();

  const session = useSession();
  const status = session.status;

  const { cartProducts } = useContext(CartContext);

  return (
    <>
      <header
        className={
          orelegaOne.className +
          " flex items-center justify-between 2xl:px-20 max-w-[1800px] lg:px-10 md:px-5 sm:px-2"
        }
      >
        <div className="flex items-center 2xl:gap-20 xl:gap-16 md:gap-40 sm:gap-5">
          <div>
            <Link href={"/"}>
              <Image src={"/logo.svg"} alt="Лого" width={60} height={100} />
            </Link>
          </div>

          <div className="flex items-center 2xl:gap-16 lg:gap-10 md:gap-5 max-[1230px]:hidden">
            <Link
              href={"/catalogue"}
              className={
                path === "/catalogue"
                  ? "header-link text-primary header-link-active"
                  : "text-primary header-link"
              }
            >
              Каталог
            </Link>
            <Link
              href={"/about"}
              className={
                path === "/about"
                  ? "header-link text-primary header-link-active"
                  : "text-primary header-link"
              }
            >
              О нас
            </Link>
            <Link
              href={"/delivery"}
              className={
                path === "/delivery"
                  ? "header-link text-primary header-link-active"
                  : "text-primary header-link"
              }
            >
              Доставка і оплата
            </Link>
            <Link
              href={"/contacts"}
              className={
                path === "/contacts"
                  ? "header-link text-primary header-link-active"
                  : "text-primary header-link"
              }
            >
              Контакти
            </Link>
            <Link
              href={"/feedback"}
              className={
                path === "/feedback"
                  ? "header-link text-primary header-link-active"
                  : "text-primary header-link"
              }
            >
              Відгуки
            </Link>
          </div>
          <button
            className="p-1 flex items-center gap-2 min-[1231px]:hidden"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <Bars />
            <span className="bg-darkBlueColor text-white text-xl rounded-xl px-2 py-1">
              Меню
            </span>
          </button>
        </div>
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-9">
            <Link href={"/"}>
              <Image
                src={"/icons/search.svg"}
                alt="Пошук"
                width={50}
                height={50}
                className="header-icon"
              />
            </Link>
            <Link href={"/"}>
              <Image
                src={"/icons/settings.svg"}
                alt="Налаштування"
                width={50}
                height={50}
                className="header-icon"
              />
            </Link>

            {status !== "authenticated" && (
              <Link href={"/profile"}>
                <Image
                  src={"/icons/profile.svg"}
                  alt="Профіль"
                  width={48}
                  height={47}
                  className="header-icon"
                />
              </Link>
            )}
            {status === "authenticated" && (
              <div className="flex items-center gap-9">
                <Link href={"/profile"}>
                  <Image
                    src={"/icons/profileLogged.svg"}
                    alt="Профіль"
                    width={48}
                    height={47}
                    className="header-icon"
                  />
                </Link>
              </div>
            )}
            <div className="relative">
              <Link href={"/cart"}>
                <Image
                  src={"/icons/cart.svg"}
                  alt="Корзина"
                  width={50}
                  height={50}
                  className="header-icon"
                />
              </Link>

              {cartProducts.length > 0 && (
                <Link
                  href={"/cart"}
                  className={
                    poppins.className +
                    " cart-quantity absolute -top-6 -right-4 text-lg bg-lightBlueColor rounded-full text-white cart-items"
                  }
                >
                  {cartProducts.length}
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      {mobileNavOpen && (
        <>
          <div
            onClick={() => setMobileNavOpen(false)}
            className="flex flex-col text-3xl text-center gap-6 relative burger-menu"
          >
            <Link
              href={"/catalogue"}
              className="header-link header-burger-link"
            >
              Каталог
            </Link>
            <Link href={"/about"} className="header-link header-burger-link">
              О нас
            </Link>
            <Link href={"/delivery"} className="header-link header-burger-link">
              Доставка і оплата
            </Link>
            <Link href={"/contacts"} className="header-link header-burger-link">
              Контакти
            </Link>
            <Link href={"/feedback"} className="header-link header-burger-link">
              Відгуки
            </Link>
            <button
              className="absolute -top-14 right-20"
              onClick={() => setMobileNavOpen(false)}
            >
              <Close />
            </button>
          </div>
          <div className="burger-menu__overlay"></div>
        </>
      )}
    </>
  );
}
