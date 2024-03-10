"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const regexName = /^[a-zA-Zа-яА-я]+$/;
    const regexEmail = /\w+@\w+\.\w+/;

    if (regexEmail.test(email)) {
      setEmail(email);
    } else {
      toast.error("Формат мейла повинен виглядати так - trendy@ukr.net");
    }

    if (text.length < 10) {
      toast.error("Повідомлення повинно містити мімінмум 10 літер");
    } else {
      setText(text);
    }

    if (regexName.test(name)) {
      setName(name);
    } else {
      toast.error("Введіть тільки літери");
    }
  };

  return (
    <footer className="flex gap-8 justify-between max-w-[1800px] 2xl:px-20 lg:px-10 md:px-5 sm:px-2">
      <div>
        <Link href={"/"}>
          <Image src={"/logo.svg"} alt="Лого" width={70} height={97} />
        </Link>
        <p className="text-black max-w-[150px] mt-6">
          Тому що ми <br />
          піклуємося про собак
        </p>
      </div>

      <div>
        <nav>
          <ul className="grid grid-cols-1 gap-y-6">
            <li className="text-xl">Каталог</li>
            <li>
              <Link href={"/new"}>Новинки</Link>
            </li>
            <li>
              <Link href={"/accessories"}>Аксесуари</Link>
            </li>
            <li>
              <Link href={"/clothes"}>Одяг</Link>
            </li>
            <li>
              <Link href={"/carrying-bags"}>Сумки-переноски</Link>
            </li>
            <li>
              <Link href={"/beds"}>Ліжаки</Link>
            </li>
            <li>
              <Link href={"/sale"}>Знижки</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <nav>
          <ul className="grid grid-cols-1 gap-y-6">
            <li className="text-xl">Меню</li>
            <li>
              <Link href={"/new"}> Доставка і оплата</Link>
            </li>
            <li>
              <Link href={"/accessories"}>О нас</Link>
            </li>
            <li>
              <Link href={"/clothes"}>Доставка і оплата</Link>
            </li>
            <li>
              <Link href={"/carrying-bags"}>Контакти</Link>
            </li>
            <li>
              <Link href={"/beds"}>Відгуки</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-y-2">
        <h3 className="text-xl">Зв’язатися з нами</h3>
        <form
          className="grid grid-cols-1 gap-y-4"
          onSubmit={(e) => handleChange(e)}
        >
          <div className="grid grid-cols-1">
            <label>Ім'я</label>
            <input
              type="text"
              placeholder="Trendy"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="trendy@ukr.net"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1">
            <label>Текст повідомлення</label>
            <input
              type="text"
              placeholder="Ваш текст"
              value={text}
              name="text"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-darkBlueColor rounded-2xl uppercase border-double cursor-pointer border-4 text-sm p-2 text-white text-center hover:bg-hoverBlueColor transition"
          >
            Надіслати
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-y-4">
        <h3 className="text-xl">Наші контакти</h3>
        <Link href="tel:+380974379424">Тел:+38 (097) 437 94 24</Link>
        <p>Графік роботи: Пн - Нд 9.00-19.00</p>
        <a href="mailto:trendytail@ukr.net">Пошта: trendytail@ukr.net</a>
        <div className="flex gap-6">
          <Link href={"/"}>
            <Image
              src={"/main-page/footer/insta.svg"}
              width={40}
              height={40}
              alt="Instagram Icon"
            />
          </Link>
          <Link href={"/"}>
            <Image
              src={"/main-page/footer/fb.svg"}
              width={40}
              height={40}
              alt="Facebook Icon"
            />
          </Link>
          <Link href={"/"}>
            <Image
              src={"/main-page/footer/youtube.svg"}
              width={40}
              height={40}
              alt="Youtube Icon"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
