import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import HighlightsBar from "./HighlightsBar";
import ProcessSection from "./ProcessSection";
import ProductCollection from "./ProductCollection";
import StorySection from "./StorySection";

export default function HomePageLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <HighlightsBar />
        <ProductCollection />
        <StorySection />
        <ProcessSection />
      </main>
      <Footer />
    </div>
  );
}
