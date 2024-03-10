"use client";

import DeleteButton from "@/components/DeleteButton";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function BrandsPage() {
  const [brandName, setBrandName] = useState("");
  const [brands, setBrands] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedBrand, setEditedBrand] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  function fetchBrands() {
    fetch("/api/brands").then((response) => {
      response.json().then((brands) => {
        setBrands(brands);
      });
    });
  }

  async function handleBrandSubmit(e) {
    e.preventDefault();
    const createdPromise = new Promise(async (resolve, reject) => {
      const data = { name: brandName };

      if (editedBrand) {
        data._id = editedBrand._id;
      }

      const response = await fetch("/api/brands", {
        method: editedBrand ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setBrandName("");
      fetchBrands();
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(createdPromise, {
      loading: editedBrand ? "Оновлення бренду..." : "Створення бренду...",
      success: editedBrand ? "Бренд оновлен" : "Бренд створен",
      error: editedBrand
        ? "Помилка оновлення бренду"
        : "Помилка створення бренду",
    });
  }

  async function handleDeleteClick(_id) {
    const createdPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/brands?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) resolve();
      else reject();
    });

    toast.promise(createdPromise, {
      loading: "Видаляється",
      success: "Видалено",
      error: "Не вдалося видалити",
    });

    fetchBrands();
  }

  if (profileLoading) {
    return <h2 className="text-center my-4">Завантаження брендів...</h2>;
  }

  if (!profileData.admin) {
    return <h2 className="text-center my-4">Не адміністратор...</h2>;
  }
  return (
    <section className="text-center">
      <UserTabs isAdmin={true} />
      <form
        className="my-12 categories-form mx-auto flex justify-between gap-4"
        onSubmit={handleBrandSubmit}
      >
        <div className="flex flex-col mb-6">
          <label className="text-left mb-2 text-sm flex items-center gap-2">
            {editedBrand ? "Оновити назву бренду: " : "Нова назва бренду"}
            {editedBrand && <div className="underline">{editedBrand.name}</div>}
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="button bg-darkBlueColor rounded-full py-2 px-8 text-white text-center text-xs hover:bg-lightBlueColor"
          >
            {editedBrand ? "Оновити" : "Створити"}
          </button>
          <button
            className="border rounded-xl py-2 px-4 text-xs uppercase"
            type="button"
            onClick={() => {
              setEditedBrand(null);
              setBrandName("");
            }}
          >
            Відміна
          </button>
        </div>
      </form>

      <div>
        {brands?.length > 0 && (
          <h2 className="text-center border-b-2 pb-1 text-lg mb-6">
            Існуючі бренди
          </h2>
        )}
        {brands?.length > 0 &&
          brands.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 rounded-xl p-2 px-4 mt-2 flex gap-1 mb-6 items-center justify-center max-w-[500px] mx-auto border-2"
            >
              <div className="grow flex items-center gap-4">{c.name}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditedBrand(c);
                    setBrandName(c.name);
                  }}
                  type="button"
                  className="text-sm border-2 p-2 rounded-lg hover:bg-slate-200 transition"
                >
                  Редагувати
                </button>
                <DeleteButton
                  label={"Видалити"}
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
