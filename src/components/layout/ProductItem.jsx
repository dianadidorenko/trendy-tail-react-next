import Image from "next/image";
import Link from "next/link";

export default function ProductItem(productItem) {
  const { image, name, brand, sizes, category, label } = productItem;

  const nameLink = name.split(" ")[1];
  const startedPrice = sizes[0].price;

  return (
    <div className="catalogue-item relative">
      <div className="item-page">
        <Link href={"/pages/" + nameLink}>
          <div className="item-page-image">
            <Image
              className="rounded-md cursor-pointer item-page-product"
              src={image}
              alt={name}
              width={250}
              height={250}
              objectFit={"cover"}
            />
          </div>
        </Link>
      </div>

      {label && label === "Знижка" && (
        <p className="bg-red-600 text-white py-1 px-2 rounded-md absolute top-2 right-2 text-sm">
          {label}
        </p>
      )}
      {label && label === "Хіт" && (
        <p className="bg-violet-500 text-white py-1 px-2 rounded-md absolute top-2 right-2 text-sm">
          {label}
        </p>
      )}
      {label && label === "Новинки" && (
        <p className="bg-green-600 text-white py-1 px-2 rounded-md absolute top-2 right-2 text-sm">
          {label}
        </p>
      )}

      <div className="flex items-center gap-12">
        <p>{brand}</p>
        <p className="flex items-center gap-1 text-redColor">
          <span className="text-sm">від</span> {startedPrice}
          <span className="text-sm">₴</span>
        </p>
      </div>

      <p className="hidden">{category}</p>
      <h3 className="text-lg">{name}</h3>

      <div className="flex gap-2">
        {sizes?.length > 0 &&
          sizes.map((s) => (
            <div>
              <p key={s.name._id} className="text-md">
                {s.name}
              </p>
            </div>
          ))}
      </div>

      <div className="relative">
        <Link
          href={"/pages/" + nameLink}
          className="custom-btn catalog-item-btn"
        >
          Перейти
        </Link>
      </div>
    </div>
  );
}
