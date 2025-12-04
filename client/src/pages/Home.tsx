import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Bio from "@/components/sections/Bio";
import Music from "@/components/sections/Music";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Bio />
      <Music />
      <Newsletter />
    </main>
  );
}
