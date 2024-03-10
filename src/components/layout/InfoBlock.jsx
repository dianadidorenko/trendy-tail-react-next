import Image from "next/image";
import Link from "next/link";

export default function InfoBlock() {
  return (
    <section className="pb-32">
      <div className="relative flex justify-center items-center max-w-[800px] mx-auto">
        <Image
          src={"/main-page/info-block/01.png"}
          width={800}
          height={332}
          alt="Зареєструватися"
        />
        <div>
          <h4 className="text-darkBlueColor pb-4 text-2xl font-bold info-block-title">
            СТАНЬ СВОЇМ
          </h4>
          <p className="info-block-text text-white text-base">
            Зареєструйся на сайті та <br />
            отримайте масу привилеїв
          </p>
          {/* color: var(--search-text-color); font-size: 1.5em; font-weight: 700;
          line-height: 120%; max-width: 320px; */}
          <Link
            href={"/profile"}
            className="info-block-btn button bg-redColor rounded-full py-4 px-11 text-white text-center"
          >
            ЗАРЕЄСТРУВАТИСЯ
          </Link>
        </div>
      </div>
    </section>
  );
}
