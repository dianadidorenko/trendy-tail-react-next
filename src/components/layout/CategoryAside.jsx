import { useEffect, useState } from "react";
import ArrowDown from "@/components/icons/ArrowDown";
import ArrowUp from "@/components/icons/ArrowUp";

export default function CategoryAside({
  setSelectedCategory,
  setSelectedBrand,
}) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isOpenCategories, setIsOpenCategory] = useState(false);
  const [isOpenBrands, setIsOpenBrands] = useState(false);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
    fetch("/api/brands").then((res) => {
      res.json().then((brands) => {
        setBrands(brands);
      });
    });
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedBrand(false);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedCategory(false);
  };

  return (
    <>
      <p
        className="text-md flex items-center gap-2 cursor-pointer"
        onClick={() => {
          setIsOpenCategory((prev) => !prev);
          setIsOpenBrands(false);
        }}
      >
        {isOpenCategories && <ArrowUp />}
        {!isOpenCategories && <ArrowDown />}
        Категорія
      </p>

      {categories?.length > 0 &&
        categories.map((c) => (
          <div
            key={c._id}
            className={isOpenCategories ? "flex gap-8 items-center" : "hidden"}
          >
            <input
              type="radio"
              value={c.name}
              name="category"
              onChange={handleCategoryChange}
            />
            <label className="text-left text-sm flex gap-2">{c.name}</label>
          </div>
        ))}

      <p
        className="text-md flex items-center gap-2 cursor-pointer"
        onClick={() => {
          setIsOpenBrands((prev) => !prev);
          setIsOpenCategory(false);
        }}
      >
        {isOpenBrands && <ArrowUp />}
        {!isOpenBrands && <ArrowDown />}
        Бренд
      </p>

      {brands?.length > 0 &&
        brands.map((b) => (
          <div
            key={b._id}
            className={isOpenBrands ? "flex gap-8 items-center" : "hidden"}
          >
            <input
              type="radio"
              value={b.name}
              name="brand"
              onChange={handleBrandChange}
            />
            <label className="text-left text-sm flex gap-2">{b.name}</label>
          </div>
        ))}
    </>
  );
}
