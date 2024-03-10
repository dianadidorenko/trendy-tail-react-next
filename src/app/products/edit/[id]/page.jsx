"use client";

import Left from "@/components/icons/Left";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MenuProductForm from "@/components/layout/MenuProductForm";
import { resolve } from "styled-jsx/css";
import DeleteButton from "@/components/DeleteButton";

export default function EditProductItem() {
  const { id } = useParams();
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();
  const [productItem, setProductItem] = useState(null);

  useEffect(() => {
    fetch("/api/products").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setProductItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/products", {
        method: "PUT",
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

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/products?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Видалення товару...",
      success: "Товар видалений",
      error: "Помилка видлаення товару",
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
      <MenuProductForm productItem={productItem} onSumbit={handleFormSubmit} />
      <div className="max-w-xs mx-auto mt-1">
        <div className="max-w-xs p-2 text-center mb-8">
          <DeleteButton
            label={"Видалити цей товар"}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
    </section>
  );
}
