import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import {
  MdOutlineBathtub,
  MdOutlineBed,
  MdOutlineGarage,
  MdOutlineOutdoorGrill,
  MdOutlineWhatsapp,
} from "react-icons/md";
import { FaSwimmingPool } from "react-icons/fa";
import { TbAirConditioning, TbSofa } from "react-icons/tb";
import { GiPartyPopper, GiSecurityGate } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Container from "@/components/Conateiner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import api from "@/services/api";
import { handleCreateMuskPhone } from "@/utils/inputMaskPhone";

interface IPropertyPhotosRequest {
  photoUrl: string;
}

interface IOwnerProperty {
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
}

interface IPropertyRequest {
  title: string;
  description: string;
  numberRooms: number;
  numberBathrooms: number;
  numberGarage: number;
  isSale: boolean;
  isInCondo: boolean;
  hasPoolProperty: boolean;
  hasAirConditioningProperty: boolean;
  hasGrillProperty: boolean;
  hasFurnitureProperty: boolean;
  hasPollCondo: boolean;
  hasSecurity24hCondo: boolean;
  hasGymCondo: boolean;
  hasPartyHallCondo: boolean;
  price: number;
  priceCondo: number | null;
  isCondoPriceIncluded: boolean;
  state: string;
  city: string;
  contact?: string;
  isDisplayContact: boolean;
  photos: IPropertyPhotosRequest[];
  owner: IOwnerProperty;
}

function Property() {
  const [indexActualPhoto, setIndexActualPhoto] = useState(0);

  const [property, setProperty] = useState<null | IPropertyRequest>(null);
  const router = useRouter();
  const propertyId = router.query.id;

  useEffect(() => {
    async function handleGetProperty() {
      try {
        const resp = await api.get(`/properties/${propertyId}`);

        const dataProperty: IPropertyRequest = resp.data;
        setProperty(dataProperty);
      } catch (error) {}
    }

    if (propertyId) handleGetProperty();
  }, [propertyId]);

  if (!property) {
    return null;
  }

  function handleFormatedCurrency(value: number | undefined) {
    if (value == undefined) return null;
    return value.toLocaleString("pt-BR", {
      currency: "BRL",
      style: "currency",
      maximumFractionDigits: 0,
    });
  }

  const {
    title,
    description,
    numberRooms,
    numberBathrooms,
    numberGarage,
    isSale,
    isInCondo,
    hasPoolProperty,
    hasAirConditioningProperty,
    hasGrillProperty,
    hasFurnitureProperty,
    hasPollCondo,
    hasSecurity24hCondo,
    hasGymCondo,
    hasPartyHallCondo,
    price,
    priceCondo,
    isCondoPriceIncluded,
    state,
    city,
    contact,
    isDisplayContact,
    photos,
    owner: { firstName, lastName, avatarUrl },
  } = property;

  function handleNextPhoto() {
    if (photos.length - 1 > indexActualPhoto) {
      setIndexActualPhoto(indexActualPhoto + 1);
    }
  }

  function handlePrevPhoto() {
    if (indexActualPhoto > photos.length - 1 - indexActualPhoto - 1) {
      setIndexActualPhoto(indexActualPhoto - 1);
    }
  }

  const linkWhatsApp = `https://api.whatsapp.com/send?phone=55${contact}&text=Olá, ${firstName}, podemos conversar sobre o seu anúncio "${title}" da WebCasas?`;
  const contactFormatted = handleCreateMuskPhone(contact);
  const priceFormatted = handleFormatedCurrency(price);
  const priceCondoFormatted = handleFormatedCurrency(priceCondo!);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Header />

      <Container>
        <section className="relative">
          {indexActualPhoto > 0 && (
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="p-1 absolute top-2/4 left-0 z-10 bg-gray3/70 rounded-full hover:bg-gray3/80"
            >
              <GrFormPrevious size={36} />
            </button>
          )}
          <div className="w-full h-72 sm:h-[31.25rem] relative top-0 left-0  sm:rounded-b-lg sm:overflow-hidden">
            <Image
              src={`${photos[indexActualPhoto].photoUrl}`}
              alt={title}
              fill={true}
            />
          </div>
          {indexActualPhoto != photos.length - 1 && (
            <button
              type="button"
              onClick={handleNextPhoto}
              className="p-1 absolute top-2/4 right-0 z-10 bg-gray3/70 rounded-full hover:bg-gray3/80"
            >
              <GrFormNext size={36} />
            </button>
          )}
        </section>

        <main className="sm:flex sm:flex-row-reverse sm:justify-between sm:gap-9">
          <div className="h-max w-full sm:min-w-min sm:max-w-max p-7 bg-white border border-gray5 rounded-b-lg flex flex-col sm:relative sm:z-10 sm:-mt-10 sm:p-9 sm:flex-col sm:gap-5 sm:rounded-lg">
            <div className="flex items-center justify-between sm:flex-col gap-4">
              <div className="font-medium flex items-center gap-4">
                <div className="w-10 h-10 relative rounded-full overflow-hidden">
                  {!avatarUrl ? (
                    <div className="text-white  bg-brand1 w-full h-full flex items-center justify-center">
                      {firstName[0]}
                      {lastName[0]}
                    </div>
                  ) : (
                    <Image
                      src={avatarUrl!}
                      alt={`${firstName} ${lastName}`}
                      fill={true}
                    />
                  )}
                </div>
                <p className="text-gray1">{firstName}</p>
              </div>

              {isDisplayContact && (
                <div className="flex flex-col items-center gap-4">
                  <Link href={`+55${contact}`} target="_blank">
                    {contactFormatted}
                  </Link>

                  <Link
                    href={linkWhatsApp}
                    target="_blank"
                    className="block max-w-max px-8 py-3 text-white bg-green-wpp rounded-lg sm:flex sm:gap-3"
                  >
                    <MdOutlineWhatsapp size={22} />
                    <span className="hidden sm:block">WhatsApp</span>
                  </Link>
                </div>
              )}
            </div>

            <div className="my-7 h-[0.0625rem] w-full bg-gray5" />

            <div className="text-2xl font-semibold flex items-center sm:justify-center">
              <p className="text-brand1">{priceFormatted}</p>
              {!isSale && <span className="text-gray2">/mês</span>}
            </div>
            {isInCondo && (
              <div className="mt-1 text-gray2 leading-normal">
                <p>Condomínio {priceCondoFormatted}/mês</p>
                <span className="mt-1 block text-sm sm:text-center">
                  {isCondoPriceIncluded ? "INCLUSO" : "NÂO INCLUSO"}
                </span>
              </div>
            )}
          </div>

          <div className="w-full mt-9 flex flex-col gap-9 max-w-3xl">
            <section className="max-w-xl">
              <h2 className="text-2xl text-gray1 font-semibold leading-normal">
                {title}
              </h2>
              <div className="mt-4 text-gray2 flex items-center gap-1">
                <IoLocationOutline />
                <p>
                  {city}, {state}
                </p>
              </div>
            </section>

            <section className="flex items-center flex-wrap gap-3">
              <div className="text-gray2 flex items-center gap-3">
                <MdOutlineBed size={18} />
                <p>
                  {numberRooms} {numberBathrooms == 1 ? "Quarto" : "Quartos"}
                </p>
              </div>
              <div className="text-gray2 flex items-center gap-3">
                <MdOutlineBathtub size={18} />
                <p>
                  {numberBathrooms}{" "}
                  {numberBathrooms == 1 ? "Banheiro" : "Banheiros"}
                </p>
              </div>
              <div className="text-gray2 flex items-center gap-3">
                <MdOutlineGarage size={18} />
                <p>
                  {numberGarage} {numberGarage == 1 ? "Vaga" : "Vagas"}
                </p>
              </div>
            </section>

            <section className="text-gray1 leading-normal">
              <h3 className="text-xl  font-semibold ">Descrição do imóvel</h3>
              <p className="mt-5">{description}</p>
            </section>

            <section className="  text-gray1 leading-normal">
              <h3 className="text-xl  font-semibold ">Detalhes do imóvel</h3>
              <div className="mt-5 flex flex-col gap-3">
                {hasPoolProperty && (
                  <div className="text-gray2 flex items-center gap-3">
                    <FaSwimmingPool size={18} />
                    <p>Piscina</p>
                  </div>
                )}

                {hasAirConditioningProperty && (
                  <div className="text-gray2 flex items-center gap-3">
                    <TbAirConditioning size={18} />
                    <p>Ar condicionado</p>
                  </div>
                )}

                {hasGrillProperty && (
                  <div className="text-gray2 flex items-center gap-3">
                    <MdOutlineOutdoorGrill size={18} />
                    <p>Churrasqueira</p>
                  </div>
                )}

                {hasFurnitureProperty && (
                  <div className="text-gray2 flex items-center gap-3">
                    <TbSofa size={18} />
                    <p>Mobília</p>
                  </div>
                )}
              </div>
            </section>

            {isInCondo && (
              <section className="text-gray1 leading-normal">
                <h3 className="text-xl  font-semibold ">
                  Detalhes do condomínio
                </h3>
                <div className="mt-5 flex flex-col gap-3">
                  {hasPollCondo && (
                    <div className="text-gray2 flex items-center gap-3">
                      <FaSwimmingPool size={18} />
                      <p>Piscina</p>
                    </div>
                  )}

                  {hasSecurity24hCondo && (
                    <div className="text-gray2 flex items-center gap-3">
                      <GiSecurityGate size={18} />
                      <p>Segurança 24h</p>
                    </div>
                  )}

                  {hasGymCondo && (
                    <div className="text-gray2 flex items-center gap-3">
                      <CgGym size={18} />
                      <p>Academia</p>
                    </div>
                  )}

                  {hasPartyHallCondo && (
                    <div className="text-gray2 flex items-center gap-3">
                      <GiPartyPopper size={18} />
                      <p>Salão de festas</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </main>
      </Container>

      <Footer />
    </>
  );
}

export default Property;
