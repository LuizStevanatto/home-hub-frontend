import FormInputRadio from "@/components/Form/FormInputRadio";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

function IsSale() {
  const router = useRouter();
  const { isSale } = router.query;

  async function handleIsSaleInputs(e: ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const inputValue = input.value;

    if (inputValue == "true") {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, isSale: "true" },
      });
    } else if (inputValue == "false") {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, isSale: "false" },
      });
    } else if (inputValue == "all") {
      const { query } = router;
      delete query.isSale;
      router.push({ pathname: router.pathname, query });
    }
  }

  return (
    <div className="mb-4">
      <p className="text-gray1 font-semibold">Comprar ou alugar</p>
      <div className="mt-1 flex items-center gap-4">
        <FormInputRadio
          textInput="Todos"
          defaultChecked
          value={"all"}
          name="isSale"
          onChange={handleIsSaleInputs}
        />
        <FormInputRadio
          textInput="Comprar"
          value={"true"}
          name="isSale"
          onChange={handleIsSaleInputs}
          defaultChecked={isSale == "true"}
        />
        <FormInputRadio
          textInput="Alugar"
          value={"false"}
          name="isSale"
          onChange={handleIsSaleInputs}
          defaultChecked={isSale == "false"}
        />
      </div>
    </div>
  );
}

export default IsSale;
