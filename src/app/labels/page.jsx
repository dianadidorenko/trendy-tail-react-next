"use client";

import DeleteButton from "@/components/DeleteButton";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function LabelsPage() {
  const [labelName, setLabelName] = useState("");
  const [labels, setLabels] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedLabel, setEditedLabel] = useState(null);

  useEffect(() => {
    fetchLabels();
  }, []);

  function fetchLabels() {
    fetch("/api/labels").then((response) => {
      response.json().then((labels) => {
        setLabels(labels);
      });
    });
  }

  async function handleLabelSubmit(e) {
    e.preventDefault();
    const createdPromise = new Promise(async (resolve, reject) => {
      const data = { name: labelName };

      if (editedLabel) {
        data._id = editedLabel._id;
      }

      const response = await fetch("/api/labels", {
        method: editedLabel ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setLabelName("");
      fetchLabels();
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(createdPromise, {
      loading: editedLabel ? "Оновлення лейбла..." : "Створення лейбла...",
      success: editedLabel ? "Лейбл оновлен" : "Лейбл створен",
      error: editedLabel
        ? "Помилка оновлення лейбла"
        : "Помилка створення лейбла",
    });
  }

  async function handleDeleteClick(_id) {
    const createdPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/labels?_id=" + _id, {
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

    fetchLabels();
  }

  if (profileLoading) {
    return <h2 className="text-center my-4">Завантаження лейблів...</h2>;
  }

  if (!profileData.admin) {
    return <h2 className="text-center my-4">Не адміністратор...</h2>;
  }

  return (
    <section className="text-center">
      <UserTabs isAdmin={true} />
      <form
        className="my-12 categories-form mx-auto flex justify-between gap-4"
        onSubmit={handleLabelSubmit}
      >
        <div className="flex flex-col mb-6">
          <label className="text-left mb-2 text-sm flex items-center gap-2">
            {editedLabel ? "Оновити назву лейбла: " : "Нова назва лейбла"}
            {editedLabel && <div className="underline">{editedLabel.name}</div>}
          </label>
          <input
            type="text"
            value={labelName}
            onChange={(e) => setLabelName(e.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="button bg-darkBlueColor rounded-full py-2 px-8 text-white text-center text-xs hover:bg-lightBlueColor"
          >
            {editedLabel ? "Оновити" : "Створити"}
          </button>
          <button
            className="border rounded-xl py-2 px-4 text-xs uppercase"
            type="button"
            onClick={() => {
              setEditedLabel(null);
              setLabelName("");
            }}
          >
            Відміна
          </button>
        </div>
      </form>

      <div>
        {labels?.length > 0 && (
          <h2 className="text-center border-b-2 pb-1 text-lg mb-6">
            Існуючі лейбли
          </h2>
        )}
        {labels?.length > 0 &&
          labels.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 rounded-xl p-2 px-4 mt-2 flex gap-1 mb-6 items-center justify-center max-w-[500px] mx-auto border-2"
            >
              <div className="grow flex items-center gap-4">{c.name}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditedLabel(c);
                    setLabelName(c.name);
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
