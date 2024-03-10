import Image from "next/image";
import SectionHeaders from "../elements/SectionHeaders";

export default function AboutUs() {
  return (
    <section>
      <SectionHeaders mainHeader={"О НАС"} />
      <div className="flex items-center justify-center gap-x-44">
        <Image
          src={"/main-page/about-us/01.png"}
          width={550}
          height={419}
          alt="Фото"
        />
        <div className="flex flex-col items-center">
          <Image src={"/logo.svg"} alt="Лого" width={140} height={194} />
          <p className="max-w-[650px] text-center pt-12 font-semibold">
            Давним-давно група любителів собак відкрила інтернет-магазин модного
            одягу для собак у невеликому містечку біля моря. Урочисте відкриття
            магазину пройшло успішно, на ньому було представлено стильні
            варіанти для собак усіх розмірів та порід. Команда використовувала
            маркетингові тактики, такі як соціальні мережі та співпраця з
            впливовими особами свійських тварин, щоб поширити інформацію. Вони
            спростили процес онлайн-покупок та забезпечили швидке обслуговування
            клієнтів. Магазин також пропонував практичні, але модні аксесуари.
            Цей інтернет-магазин одягу для собак ознаменував новий початок в
            індустрії моди для домашніх тварин, обіцяючи привнести інноваційні
            можливості у моду.
          </p>
        </div>
      </div>
    </section>
  );
}
