import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";
import { useState } from "react";

export default function MenuItemSizes({ name, addLabel, props, setProps }) {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0, priceBeforeDiscount: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <>
      <div className="bg-gray-200 p-2 rounded-md mt-2">
        <div className="flex gap-2 items-center">
          <button
            className="inline-flex shrink text-sm"
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen && <ArrowUp />}
            {!isOpen && <ArrowDown />}
          </button>

          <span className="grow text-gray-700 text-sm">{name}</span>
          <span>({props?.length})</span>
        </div>
        <div className={isOpen ? "flex flex-col gap-2 mt-2" : "hidden"}>
          {props?.length > 0 &&
            props.map((s, index) => (
              <div
                key={index}
                className="text-left pb-4 border-2 border-b-slate-300 text-sm flex gap-4 items-center justify-center"
              >
                <div className="flex flex-col gap-1">
                  <label className="pl-1">Розмір</label>
                  <input
                    type="text"
                    placeholder="Розмір"
                    value={s.name}
                    onChange={(ev) => editProp(ev, index, "name")}
                    className="mt-1 size-input"
                  />
                  <label className="pl-1">Ціна до знижки</label>
                  <input
                    type="text"
                    placeholder="Ціна до знижки"
                    value={s.priceBeforeDiscount}
                    onChange={(ev) =>
                      editProp(ev, index, "priceBeforeDiscount")
                    }
                    className="mt-1"
                  />
                  <label className="pl-1">Ціна</label>
                  <input
                    type="text"
                    placeholder="Ціна"
                    value={s.price}
                    onChange={(ev) => editProp(ev, index, "price")}
                    className="mt-1"
                  />
                </div>
                <button
                  type="button"
                  className="bg-white p-1 rounded-md"
                  onClick={() => removeProp(index)}
                >
                  <Trash />
                </button>
              </div>
            ))}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={addProp}
              className="flex gap-2 items-center bg-slate-50 py-1 px-2 rounded-lg"
            >
              <Plus className="w-4 h-4" />
              <span>{addLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
