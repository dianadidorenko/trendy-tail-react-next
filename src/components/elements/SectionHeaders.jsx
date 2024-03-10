import Image from "next/image";

export default function SectionHeaders({ mainHeader }) {
  return (
    <div className="text-center flex flex-col items-center pt-14 pb-14">
      <Image src={"/icons/heart-icon.svg"} width={86} height={73} alt="Icon" />
      <h2 className="text-black uppercase text-4xl">{mainHeader}</h2>
    </div>
  );
}
