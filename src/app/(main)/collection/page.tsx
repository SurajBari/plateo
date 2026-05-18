import CollectionCatalog from "@/components/public_pages/collection/CollectionCatalog";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";

export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <CollectionCatalog />
      </main>
      <Footer />
    </div>
  );
}
