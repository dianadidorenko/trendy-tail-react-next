"use client";

import AddressInputs from "@/components/layout/AddressInputs";
import EditableImage from "@/components/layout/EditableImage";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  }

  return (
    <div className="md:flex flex-col justify-center items-center gap-4 products-form mb-8 max-w-[800px] mx-auto">
      <div className="border rounded-lg">
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow flex flex-col gap-2"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            admin,
            city,
            country,
          })
        }
      >
        <label>Ім'я та прізвище</label>
        <input
          type="text"
          placeholder="Ім'я та прізвище"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Імейл</label>
        <input
          type="email"
          disabled={true}
          value={user?.email}
          placeholder={"Імейл"}
        />
        <AddressInputs
          user={user}
          addressProps={{ phone, city, country }}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-4 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value={"1"}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Адмін</span>
            </label>
          </div>
        )}
        <button
          type="submit"
          className="button px-4 py-2 rounded-lg text-sm border hover:bg-slate-300"
        >
          Зберегти
        </button>
      </form>
    </div>
  );
}
