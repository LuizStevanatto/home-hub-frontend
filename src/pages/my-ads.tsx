import Container from "@/components/Conateiner";
import Footer from "@/components/Footer";
import ListPropertiesMyAds from "@/components/ListPropertiesMyAds";
import MyAdsListPropertiesProvider from "@/contexts/MyAdsListPropertiesContext";

function MyAds() {
  return (
    <div className="flex flex-col min-h-screen">
      <Container className="flex-grow">
        <main className="pb-16">
          <h2 className="my-4 text-3xl text-gray1 font-bold">Meus anúncios</h2>
          <MyAdsListPropertiesProvider>
            <ListPropertiesMyAds />
          </MyAdsListPropertiesProvider>
        </main>
      </Container>
      <Footer />
    </div>
  );
}

export default MyAds;
