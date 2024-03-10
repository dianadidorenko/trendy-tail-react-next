"use client";

import DeleteButton from "@/components/DeleteButton";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);
  
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((response) => {
      response.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(e) {
    e.preventDefault();
    const createdPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };

      if (editedCategory) {
        data._id = editedCategory._id;
      }

      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(createdPromise, {
      loading: editedCategory
        ? "Оновлення категорії..."
        : "Створення категорії...",
      success: editedCategory ? "Категорія оновлена" : "Категорія створена",
      error: editedCategory
        ? "Помилка оновлення категорії"
        : "Помилка створення категорії",
    });
  }

  async function handleDeleteClick(_id) {
    const createdPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
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

    fetchCategories();
  }

  if (profileLoading) {
    return <h2 className="text-center my-4">Завантаження категорій...</h2>;
  }

  if (!profileData.admin) {
    return <h2 className="text-center my-4">Не адміністратор...</h2>;
  }
  return (
    <section className="text-center">
      <UserTabs isAdmin={true} />
      <form
        className="my-12 categories-form mx-auto flex justify-between gap-4"
        onSubmit={handleCategorySubmit}
      >
        <div className="flex flex-col mb-6">
          <label className="text-left mb-2 text-sm flex items-center gap-2">
            {editedCategory
              ? "Оновити назву категорії: "
              : "Нова назва категорії"}
            {editedCategory && (
              <div className="underline">{editedCategory.name}</div>
            )}
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="button bg-darkBlueColor rounded-xl py-2 px-4 text-white text-center text-xs hover:bg-lightBlueColor"
          >
            {editedCategory ? "Оновити" : "Створити"}
          </button>

          <button
            className="border rounded-xl py-2 px-4 text-xs uppercase"
            type="button"
            onClick={() => {
              setEditedCategory(null);
              setCategoryName("");
            }}
          >
            Відміна
          </button>
        </div>
      </form>

      <div>
        <h2 className="text-center border-b-2 pb-1 text-lg mb-6">
          Існуючі категорії
        </h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 rounded-xl p-2 px-4 mt-2 flex gap-1 mb-6 items-center justify-center max-w-[500px] mx-auto border-2"
            >
              <div className="grow flex items-center gap-4">{c.name}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
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
