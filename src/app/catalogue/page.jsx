"use client";

import CategoryAside from "@/components/layout/CategoryAside";
import ProductItem from "@/components/layout/ProductItem";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";

export default function CataloguePage() {
  const [items, setItems] = useState([]);
  const [newInput, setNewInput] = useState(false);
  const [saleInput, setSaleInput] = useState(false);
  const [hitInput, setHitInput] = useState(false);
  const session = useSession();

  const { status } = session;

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    fetch("/api/products").then((res) => {
      res.json().then((productItems) => {
        setItems(productItems);
      });
    });
  }, []);

  const filterCategory = (items, selectedCategory) => {
    return items.filter((item) => item.category === selectedCategory);
  };

  useEffect(() => {
    const filteredCategories = filterCategory(items, selectedCategory);
    setFilteredCategories(filteredCategories);
  }, [selectedCategory]);

  const filterBrand = (items, selectedBrand) => {
    return items.filter((item) => item.brand === selectedBrand);
  };

  useEffect(() => {
    const filteredBrands = filterBrand(items, selectedBrand);
    setFilteredBrands(filteredBrands);
  }, [selectedBrand]);

  if (status === "loading") {
    return <h2 className="text-center my-4">Завантаження...</h2>;
  }

  return (
    <section>
      <div className="flex justify-center gap-20 px-20 py-10">
        <div>
          <aside>
            <div className="flex flex-col gap-6">
              <CategoryAside
                products={items}
                setSelectedCategory={setSelectedCategory}
                setSelectedBrand={setSelectedBrand}
              />
              <div className="border-t-2 border-gray-200 flex flex-col gap-6">
                <div className="flex gap-8 items-center pt-6">
                  <input
                    type="radio"
                    value={newInput}
                    onChange={(e) => {
                      setNewInput(e.target.value);
                    }}
                  />
                  <label className="text-left text-sm flex gap-2">
                    Новинки
                  </label>
                </div>
                <div className="flex gap-8 items-center">
                  <input
                    type="radio"
                    value={saleInput}
                    onChange={(e) => setSaleInput(e.target.value)}
                  />
                  <label className="text-left text-sm flex gap-2">Знижки</label>
                </div>
                <div className="flex gap-8 items-center">
                  <input
                    type="radio"
                    value={hitInput}
                    onChange={(e) => setHitInput(e.target.value)}
                  />
                  <label className="text-left text-sm flex gap-2">Хіт</label>
                </div>
                {(selectedCategory.length > 0 || selectedBrand.length > 0) && (
                  <button
                    type="button"
                    className="text-sm border py-2 px-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                    onClick={() => {
                      setSelectedCategory("");
                      setSelectedBrand("");
                    }}
                  >
                    Скинути фільтри
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>
        <div className="flex flex-col">
          <div
            className={
              selectedCategory.length === 0 && selectedBrand.length === 0
                ? " catalog-items grid grid-cols-3 gap-4 p-10"
                : "hidden"
            }
          >
            {items?.length > 0 &&
              items.map((i) => <ProductItem {...i} key={i._id} />)}
          </div>
        </div>
        <div
          className={
            selectedCategory
              ? " catalog-items grid grid-cols-3 gap-4 p-10"
              : "hidden"
          }
        >
          {filteredCategories.length > 0 &&
            filteredCategories.map((item) => (
              <ProductItem {...item} key={item._id} />
            ))}
        </div>

        <div
          className={
            selectedBrand
              ? " catalog-items grid grid-cols-3 gap-4 p-10"
              : "hidden"
          }
        >
          {filteredBrands.length > 0 &&
            filteredBrands.map((item) => (
              <ProductItem {...item} key={item._id} />
            ))}
          {filteredBrands.length === 0 && <h2>Нічого не знайдено</h2>}
        </div>
      </div>
    </section>
  );
}
