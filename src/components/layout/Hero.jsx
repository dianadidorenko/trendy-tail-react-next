import Image from "next/image";
import Button from "../elements/Button";
import { Orelega_One } from "next/font/google";
const orelegaOne = Orelega_One({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
  return (
    <section className="flex items-center justify-center text-center pt-12 pb-24">
      <Image src={"/main-page/hero/01.png"} width={400} height={424} alt="" />
      <div>
        <h1
          className={
            orelegaOne.className +
            " text-5xl text-lightBlueColor pb-3 max-w-[795px]"
          }
        >
          Якісні зоотовари від виробника для ваших улюбленців
        </h1>
        <h2 className="text-xl max-w-[514px] mx-auto pb-12">
          Онлайн магазин з продажу товарів для домашніх тварин з доставкою по
          всій Україні
        </h2>
        <Button href={"/catalogue"} text={"ПЕРЕЙТИ ДО КАТАЛОГУ"} />
      </div>
      <Image src={"/main-page/hero/02.png"} width={388} height={424} alt="" />
    </section>
  );
}