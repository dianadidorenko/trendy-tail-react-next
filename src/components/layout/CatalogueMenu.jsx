import Image from "next/image";
import SectionHeaders from "../elements/SectionHeaders";
import Link from "next/link";

export default function CatalogueMenu() {
  return (
    <section>
      <SectionHeaders mainHeader={"КАТАЛОГ"} />
      <div className="grid grid-cols-3 place-items-center max-w-[1000px] mx-auto gap-x-14 gap-y-5">
        <div className="max-w-[400px] relative catalogue-menu__item">
          <Link href={"/new"}>
            <Image
              src={"/main-page/catalogue/new.jpg"}
              width={400}
              height={300}
              alt="Новинки"
              className="rounded-3xl catalogue-menu-pic"
            />
          </Link>
          <Link href={"/new"} className="catalog-link">
            Новинки
          </Link>
        </div>
        <div className="max-w-[400px] relative catalogue-menu__item">
          <Link href={"/accessories"}>
            <Image
              src={"/main-page/catalogue/accessories.jpg"}
              width={400}
              height={300}
              alt="Аксесуари"
              className="rounded-3xl catalogue-menu-pic"
            />
          </Link>
          <Link href={"/accessories"} className="catalog-link">
            Аксесуари
          </Link>
        </div>
        <div className="max-w-[400px] relative catalogue-menu__item">
          <Link href={"/clothes"}>
            <Image
              src={"/main-page/catalogue/clothes.jpg"}
              width={400}
              height={300}
              alt="Одяг"
              className="rounded-3xl catalogue-menu-pic"
            />
          </Link>
          <Link href={"/clothes"} className="catalog-link">
            Одяг
          </Link>
        </div>

        <div className="max-w-[400px] relative catalogue-menu__item">
          <Link href={"/carrying-bags"}>
            <Image
              src={"/main-page/catalogue/carrying-bag.jpeg"}
              width={400}
              height={300}
              alt="Сумки-переноски"
              className="rounded-3xl catalogue-menu-pic"
            />
          </Link>
          <Link href={"/carrying-bags"} className="catalog-link">
            Сумки-переноски
          </Link>
        </div>
        <div className="max-w-[400px] relative catalogue-menu__item">
          <Link href={"/beds"}>
            <Image
              src={"/main-page/catalogue/beds.jpg"}
              width={400}
              height={300}
              alt="Ліжаки"
              className="rounded-3xl catalogue-menu-pic"
            />
          </Link>
          <Link href={"/beds"} className="catalog-link">
            Ліжаки
          </Link>
        </div>
        <div className="max-w-[400px] relative catalogue-menu__item">
          <Link href={"/sale"}>
            <Image
              src={"/main-page/catalogue/sale.jpg"}
              width={400}
              height={300}
              alt="Знижки"
              className="rounded-3xl catalogue-menu-pic"
            />
          </Link>
          <Link href={"/sale"} className="catalog-link">
            Знижки
          </Link>
        </div>
      </div>
    </section>
  );
}
