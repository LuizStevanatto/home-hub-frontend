import FormInputRadio from "@/components/Form/FormInputRadio";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

function IsInCondo() {
  const router = useRouter();
  const { isInCondo } = router.query;

  async function handleIsInCondoInputs(e: ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const inputValue = input.value;

    if (inputValue == "true") {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, isInCondo: "true" },
      });
    } else if (inputValue == "false") {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, isInCondo: "false" },
      });
    } else if (inputValue == "all") {
      const { query } = router;
      delete query.isInCondo;
      router.push({ pathname: router.pathname, query });
    }
  }

  return (
    <div className="mb-4">
      <p className="text-gray1 font-semibold">Condomínio ou rua</p>
      <div className="mt-1 flex items-center gap-4">
        <FormInputRadio
          textInput="Todos"
          defaultChecked
          value={"all"}
          name="isInCondo"
          onChange={handleIsInCondoInputs}
        />
        <FormInputRadio
          textInput="Condomínio"
          value={"true"}
          name="isInCondo"
          onChange={handleIsInCondoInputs}
          defaultChecked={isInCondo == "true"}
        />
        <FormInputRadio
          textInput="Rua"
          value={"false"}
          name="isInCondo"
          onChange={handleIsInCondoInputs}
          defaultChecked={isInCondo == "false"}
        />
      </div>
    </div>
  );
}

export default IsInCondo;
