import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import MenuItemSizes from "./MenuItemSizes";

export default function MenuProductForm({ onSumbit, productItem }) {
  const [image, setImage] = useState(productItem?.image || "");
  const [company, setCompany] = useState(productItem?.company || "");
  const [name, setName] = useState(productItem?.name || "");
  const [category, setCategory] = useState(productItem?.category || "");
  const [categories, setCategories] = useState(productItem?.categories || []);
  const [sizes, setSizes] = useState(productItem?.sizes || []);
  const [label, setLabel] = useState(productItem?.label || "");
  const [labels, setLabels] = useState(productItem?.labels || []);
  const [brand, setBrand] = useState(productItem?.brand || "");
  const [brands, setBrands] = useState(productItem?.brands || []);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
    fetch("/api/labels").then((res) => {
      res.json().then((labels) => {
        setLabels(labels);
      });
    });
    fetch("/api/brands").then((res) => {
      res.json().then((brands) => {
        setBrands(brands);
      });
    });
  }, []);

  return (
    <form
      className="my-10 products-form mx-auto flex flex-col gap-2"
      onSubmit={(ev) =>
        onSumbit(ev, { image, name, category, sizes, label, brand })
      }
    >
      <div className="border p-2 max-w-[200px] mx-auto rounded-lg mb-4">
        <EditableImage link={image} setLink={setImage} />
      </div>

      <label className="text-left mb-1 text-sm flex gap-2">Фірма</label>
      <select value={brand} onChange={(e) => setBrand(e.target.value)}>
        {brands?.length > 0 &&
          brands.map((b) => (
            <option key={b._id} value={b.name}>
              {b.name}
            </option>
          ))}
      </select>

      <label className="text-left mb-1 text-sm flex gap-2">Назва товару</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="text-left mb-1 text-sm flex gap-2">Категорія</label>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        {categories?.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
      </select>

      <label className="text-left mb-1 text-sm flex gap-2">Лейбл</label>
      <select
        value={label}
        onChange={(e) => {
          setLabel(e.target.value);
        }}
      >
        {labels?.length > 0 &&
          labels.map((l) => (
            <option key={l._id} value={l.name}>
              {l.name}
            </option>
          ))}
      </select>

      <MenuItemSizes
        name={"Розміри"}
        addLabel={"Додати розмір"}
        props={sizes}
        setProps={setSizes}
      />

      <div className="mt-4 flex justify-center">
        <button
          type="submit"
          className="button bg-darkBlueColor rounded-full py-2 px-8 text-white text-center text-xs hover:bg-lightBlueColor"
        >
          Створити
        </button>
      </div>
    </form>
  );
}
