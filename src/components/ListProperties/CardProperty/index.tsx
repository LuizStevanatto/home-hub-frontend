import { IProperty } from "@/stores/property";
import Link from "next/link";

interface ICardPropertyProps {
  property: IProperty;
}

function CardProperty({ property }: ICardPropertyProps) {
  const {
    id,
    address,
    price,
    country,
    state,
    description,
    city,
    zipCode,
    name,
  } = property;

  const priceFormatted = price.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
    maximumFractionDigits: 0,
  });

  return (
    <li className=" flex-shrink-0 h-[28.875rem]  border border-gray5 rounded-lg relative">
      <Link href={`/property/${id}`} className="p-5 block">
        <strong className="h-24 text-xl leading-normal text-gray0 font-semibold line-clamp-3">
          {name}
        </strong>

        <div className="flex flex-col gap-4 text-base">
          <span>
            <strong>Descrição</strong>: {description}
          </span>
          <span>
            <strong>Valor</strong>: {priceFormatted}
          </span>
          <span>
            <strong>País</strong>: {country}
          </span>
          <span>
            <strong>CEP:</strong> {zipCode}
          </span>
          <span>
            <strong>Estado</strong>: {state}
          </span>
          <span>
            <strong>Cidade</strong>: {city}
          </span>
          <span>
            <strong>Endereço</strong>: {address}
          </span>
        </div>
      </Link>
    </li>
  );
}

export default CardProperty;
