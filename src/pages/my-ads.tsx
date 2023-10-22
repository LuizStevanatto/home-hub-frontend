import Container from "@/components/Conateiner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ListPropertiesMyAds from "@/components/ListPropertiesMyAds";
import MyAdsListPropertiesProvider from "@/contexts/MyAdsListPropertiesContext";

function MyAds() {
  return (
    <>
      <Header />

      <Container>
        <main>
          <h2 className="mt-24 mb-9 text-3xl text-gray1 font-medium">
            Meus aúncios
          </h2>
          <MyAdsListPropertiesProvider>
            <ListPropertiesMyAds />
          </MyAdsListPropertiesProvider>
        </main>
      </Container>

      <Footer />
    </>
  );
}

export default MyAds;
