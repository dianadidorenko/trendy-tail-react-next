export default function AddressInputs({
  addressProps,
  setAddressProp,
  disabled = false,
}) {
  const { phone, city, country } = addressProps;

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-2">
        <label>Телефон</label>
        <input
          disabled={disabled}
          type="tel"
          placeholder="Телефон"
          value={phone || ""}
          onChange={(ev) => setAddressProp("phone", ev.target.value)}
        />
      </div>
      <div className="mb-2">
        <label>Місто</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Місто"
          value={city || ""}
          onChange={(ev) => setAddressProp("city", ev.target.value)}
        />
      </div>
      <div className="mb-2">
        <label>Країна</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Країна"
          value={country || ""}
          onChange={(ev) => setAddressProp("country", ev.target.value)}
        />
      </div>
    </div>
  );
}
