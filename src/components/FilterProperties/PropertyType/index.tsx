import { ChangeEvent } from "react";
import { useRouter } from "next/router";

function PropertyType() {
  const router = useRouter();
  const { propertyType_0, propertyType_1 } = router.query;

  async function handleTypePropertyInput(e: ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const isInputChecked = input.checked;
    const inputPropertyType = input.getAttribute("data-type-filter")!;

    const queryInput = {
      ...(inputPropertyType == "propertyType_0" && { propertyType_0: "casa" }),
      ...(inputPropertyType == "propertyType_1" && {
        propertyType_1: "apartamento",
      }),
    };

    if (isInputChecked) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...queryInput },
      });
    } else {
      const query = router.query;
      delete query[inputPropertyType];

      router.push({
        pathname: router.pathname,
        query: query,
      });
    }
  }

  return (
    <>
      <div className="mb-4">
        <p className="text-gray1 font-semibold">Tipo de imóvel</p>
        <div className="mt-1 flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={handleTypePropertyInput}
              data-type-filter={"propertyType_0"}
              value="casa"
              defaultChecked={propertyType_0 ? true : false}
              className="accent-brand1 w-4 h-4"
            />
            Casa
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={handleTypePropertyInput}
              data-type-filter={"propertyType_1"}
              value="apartamento"
              defaultChecked={propertyType_1 ? true : false}
              className="accent-brand1 w-4 h-4"
            />
            Apartamento
          </label>
        </div>
      </div>
    </>
  );
}

export default PropertyType;
