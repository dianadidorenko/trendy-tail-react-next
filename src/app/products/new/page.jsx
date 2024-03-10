"use client";

import Left from "@/components/icons/Left";
import MenuProductForm from "@/components/layout/MenuProductForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewProductItemPage() {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();
  // const [productItem, setProductItem] = useState(null);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Створення товару...",
      success: "Товар створений",
      error: "Помилка створення товару",
    });
    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/products");
  }

  if (loading) {
    return <h2 className="text-center my-4">Завантаження...</h2>;
  }

  if (!data.admin) {
    return <h2 className="text-center my-4">Не адміністратор...</h2>;
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="border-2 p-2 max-w-[400px] mx-auto my-10 rounded-lg border-gray-300">
        <Link
          href={"/products"}
          className="flex justify-center gap-2 items-center"
        >
          <Left />
          Показати усі товари
        </Link>
      </div>
      <MenuProductForm productItem={null} onSumbit={handleFormSubmit} />
    </section>
  );
}
