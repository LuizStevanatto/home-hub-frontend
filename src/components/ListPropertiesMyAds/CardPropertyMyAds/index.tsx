import { RiCalendar2Line } from "react-icons/ri";
import ModalDeleteProperty from "./ModalDeleteProperty";
import ModalDisableProperty from "./ModalDisableProperty";
import { IProperty } from "@/stores/property";

interface ICardPropertyMyAds {
  property: IProperty;
}

function CardPropertyMyAds({ property }: ICardPropertyMyAds) {
  const { id, name, price, createdAt } = property;
  const priceFormatted = price.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
    maximumFractionDigits: 0,
  });

  const propertyDateTimeCreated = new Date(String(createdAt));
  const propertyDate = propertyDateTimeCreated.toLocaleDateString();
  const propertyTime = propertyDateTimeCreated.toLocaleTimeString();
  const propertyTimeFormatted = propertyTime.slice(0, 5);

  return (
    <li className="flex flex-col bg-neutral-300 rounded-md p-4 w-[370px] sm:flex-row sm:items-center gap-4">
      <div className=" flex flex-col gap-3">
        <h2 className="text-lg text-gray1 font-semibold leading-normal line-clamp-2">
          {name}
        </h2>
        <div className="flex items-center">
          <p className="text-brand1 font-semibold">{priceFormatted}</p>
          {!property.isAvailable && (
            <span className="text-gray2 font-semibold">/mês</span>
          )}
        </div>

        <div className="text-xs text-gray3 flex items-center gap-4">
          <span className="flex items-center gap-1">
            <RiCalendar2Line size={16} />
            {propertyDate}
            <time>às {propertyTimeFormatted}</time>
          </span>
        </div>
        <div className="text-sm text-brand1 flex items-center gap-5">
          <ModalDeleteProperty propertyId={String(id)} />
          <ModalDisableProperty property={property} />
        </div>
      </div>
    </li>
  );
}

export default CardPropertyMyAds;
