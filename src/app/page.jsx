import AboutUs from "@/components/layout/AboutUs";
import CatalogueMenu from "@/components/layout/CatalogueMenu";
import Hero from "@/components/layout/Hero";
import InfoBlock from "@/components/layout/InfoBlock";
import MainSlider from "@/components/layout/MainSlider";
import VTrendy from "@/components/layout/VTrendy";
import "./globals.css";

export default function Home() {
  return (
    <>
      <Hero />
      <MainSlider />
      <AboutUs />
      <CatalogueMenu />
      <VTrendy />
      <InfoBlock />
    </>
  );
}
