import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import VideoSection from "@/components/sections/VideoSection";
import Bio from "@/components/sections/Bio";
import Music from "@/components/sections/Music";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";
import PageTransition from "@/components/layout/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <VideoSection />
        <Bio />
        <Music />
        <Newsletter />
      </main>
    </PageTransition>
  );
}
