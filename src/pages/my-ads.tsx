import Container from "@/components/Conateiner";
import ListPropertiesMyAds from "@/components/ListPropertiesMyAds";
import MyAdsListPropertiesProvider from "@/contexts/MyAdsListPropertiesContext";

function MyAds() {
  return (
    <>
      <Container>
        <main>
          <h2 className="my-4 text-3xl text-gray1 font-bold">Meus aúncios</h2>
          <MyAdsListPropertiesProvider>
            <ListPropertiesMyAds />
          </MyAdsListPropertiesProvider>
        </main>
      </Container>
    </>
  );
}

export default MyAds;
