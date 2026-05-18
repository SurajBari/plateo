import HeritagePageLayout from "@/components/public_pages/heritage/HeritagePageLayout";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";

export default function HeritagePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeritagePageLayout />
      <Footer />
    </div>
  );
}
