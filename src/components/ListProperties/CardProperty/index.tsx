import { IProperty } from "@/stores/property";
import useUserStore from "@/stores/user";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

interface ICardPropertyProps {
  property: IProperty;
}

function CardProperty({ property }: ICardPropertyProps) {
  const { user } = useUserStore();
  const router = useRouter();

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
    isAvailable,
  } = property;

  const priceFormatted = price.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
    maximumFractionDigits: 0,
  });

  const handleNavigateToRoute = () => {
    let route = `/property/${id}`;

    if (user && user.isAdmin) {
      route = route;
      router.push(route);
    } else if (!user) {
      toast("Você precisa estar logado para visualizar esta propriedade!", {
        position: "top-center",
        autoClose: 5000,
        type: "error",
      });

      route = "/login";
    } else {
      toast("Você não é um usuário administrador!", {
        position: "top-center",
        autoClose: 5000,
        type: "error",
      });

      route = "/";
    }

    router.push(route);
  };

  return (
    <li className="flex-shrink-0 p-2 w-[420px]  bg-neutral-300 rounded-lg relative">
      <div className="p-5 bg-transparent flex flex-col justify-center ">
        <strong className="h-14 first:text-xl leading-normal text-gray0 font-semibold line-clamp-3">
          {name}
        </strong>

        <div className="flex flex-col gap-4 text-base text-left">
          <span className="max-w-[350px] sm:w-[365px] sm:max-w-[365px] truncate overflow-hidden">
            <strong>Descrição</strong>: {description}
          </span>
          <span>
            <strong>Valor</strong>: {priceFormatted}
          </span>
          <span>
            <strong>País</strong>: {country}
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

          <span>
            <strong>Situação:</strong> {isAvailable ? "Á venda" : "Vendida"}
          </span>
        </div>

        <button
          className="mt-5 bg-brand1 p-2 rounded-lg text-white font-semibold hover:bg-brand2"
          onClick={handleNavigateToRoute}
        >
          Visualizar
        </button>
      </div>
    </li>
  );
}

export default CardProperty;
