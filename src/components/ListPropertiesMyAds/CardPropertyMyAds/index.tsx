import { BsPeople, BsTrash } from "react-icons/bs";
import { RiCalendar2Line } from "react-icons/ri";
import { Switch } from "@chakra-ui/react";
import Image from "next/image";
import { IProperty } from "@/pages";
import ModalDeleteProperty from "./ModalDeleteProperty";
import ModalDisableProperty from "./ModalDisableProperty";

interface ICardPropertyMyAds {
  property: IProperty;
}

function CardPropertyMyAds({ property }: ICardPropertyMyAds) {
  const { id, title, price, photos, viewsCounter, isActive, createdAt } =
    property;
  const priceFormatted = price.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
    maximumFractionDigits: 0,
  });

  const propertyDateTimeCreated = new Date(createdAt);
  const propertyDate = propertyDateTimeCreated.toLocaleDateString();
  const propertyTime = propertyDateTimeCreated.toLocaleTimeString();
  const propertyTimeFormatted = propertyTime.slice(0, 5);

  return (
    <li className="flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="h-36 sm:w-36 sm:flex-shrink-0 rounded-lg overflow-hidden relative">
        <Image
          src={photos[0].photoUrl}
          alt={title}
          fill={true}
          className="object-cover"
        />
      </div>
      <div className=" flex flex-col gap-3">
        <h2 className="text-lg text-gray1 font-semibold leading-normal line-clamp-2">
          {title}
        </h2>
        <div className="flex items-center">
          <p className="text-brand1 font-semibold">{priceFormatted}</p>
          {!property.isSale && (
            <span className="text-gray2 font-semibold">/mês</span>
          )}
        </div>

        <div className="text-xs text-gray3 flex items-center gap-4">
          <span className="flex items-center gap-1">
            <BsPeople size={16} />
            {viewsCounter} {viewsCounter == 1 ? "Visita" : "Visitas"}
          </span>

          <span className="flex items-center gap-1">
            <RiCalendar2Line size={16} />
            {propertyDate}
            <time>às {propertyTimeFormatted}</time>
          </span>
        </div>
        <div className="text-sm text-brand1 flex items-center gap-5">
          <ModalDeleteProperty propertyId={id} />
          <ModalDisableProperty property={property} />
        </div>
      </div>
    </li>
  );
}

export default CardPropertyMyAds;
