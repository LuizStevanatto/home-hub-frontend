import Image from "next/image";
import { IProperty } from "@/pages";
import { IoCameraOutline, IoLocationOutline } from "react-icons/io5";

interface ICardPropertyProps {
  property: IProperty;
}

function CardProperty({ property }: ICardPropertyProps) {
  const {
    id,
    propertyType,
    numberRooms,
    numberBathrooms,
    numberGarage,
    title,
    price,
    priceCondo,
    isInCondo,
    isSale,
    isCondoPriceIncluded,
    city,
    state,
    photos,
  } = property;

  const countPhotos = photos.length;
  const priceFormatted = price.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
    maximumFractionDigits: 0,
  });
  const priceCondoFormatted = priceCondo?.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
    maximumFractionDigits: 0,
  });

  return (
    <li className=" flex-shrink-0 h-[28.875rem]  border border-gray5 rounded-lg relative">
      <a href={`/property/${id}?${title}`} className="p-5 block">
        <div className="h-[9.375rem] rounded-lg overflow-hidden relative">
          <Image
            src={photos[0].photoUrl}
            alt={title}
            width={327.11}
            height={150}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <span className="py-1 px-2 text-xs text-gray6 bg-gray3 absolute left-2 bottom-2 flex items-center gap-2  rounded">
            <IoCameraOutline size={13} />
            {String(countPhotos)}
          </span>
        </div>

        <div className="my-5 text-xs leading-normal text-gray3">
          <p>
            {propertyType.toUpperCase()} {isSale ? "À VENDA" : "PARA ALUGAR"}
          </p>
          <div className=" font-medium flex gap-1 items-center">
            <p>
              {numberRooms} {numberRooms > 1 ? "quartos" : "quarto"}
            </p>
            <span>&bull;</span>
            <p>
              {numberBathrooms} {numberBathrooms > 1 ? "banheiros" : "banheiro"}
            </p>
            <span>&bull;</span>
            <p>
              {numberGarage} {numberGarage > 1 ? "vagas" : "vaga"}
            </p>
          </div>
        </div>

        <strong className="h-24 text-xl leading-normal text-gray0 font-semibold line-clamp-3">
          {title}
        </strong>

        <div className="mt-5 leading-normal">
          <div className="text-xl font-bold flex items-center">
            <p className="text-brand1">{priceFormatted}</p>
            {!isSale && <p className="text-gray2">/mês</p>}
          </div>

          <div className="text-xs text-gray3 font-medium flex items-center">
            {isInCondo && <p>Condomínio {priceCondoFormatted}/mês</p>}
            {isInCondo && !isSale && (
              <p>- {isCondoPriceIncluded ? "INCLUSO" : "NÃO INCLUSO"}</p>
            )}
          </div>
        </div>

        <div className="text-xs text-gray3 flex items-center gap-1 absolute left-5 bottom-5">
          <IoLocationOutline />
          <p>
            {city}, {state}
          </p>
        </div>
      </a>
    </li>
  );
}

export default CardProperty;
