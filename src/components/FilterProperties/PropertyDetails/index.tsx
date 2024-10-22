import { ChangeEvent } from "react";
import { useRouter } from "next/router";

function PropertyDetails() {
  const router = useRouter();
  const {
    hasPoolProperty,
    hasFurnitureProperty,
    hasGrillProperty,
    hasAirConditioningProperty,
  } = router.query;

  async function handlePropertyDetailsInputs(e: ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const isInputChecked = input.checked;
    const inputPropertyDetail = input.getAttribute("data-detail-filter")!;

    const queryInput = {
      ...(inputPropertyDetail == "hasPoolProperty" && {
        hasPoolProperty: "true",
      }),
      ...(inputPropertyDetail == "hasFurnitureProperty" && {
        hasFurnitureProperty: "true",
      }),
      ...(inputPropertyDetail == "hasGrillProperty" && {
        hasGrillProperty: "true",
      }),
      ...(inputPropertyDetail == "hasAirConditioningProperty" && {
        hasAirConditioningProperty: "true",
      }),
    };

    if (isInputChecked) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...queryInput },
      });
    } else {
      const query = router.query;
      delete query[inputPropertyDetail];

      router.push({
        pathname: router.pathname,
        query,
      });
    }
  }

  return (
    <div className="mb-4">
      <p className="text-gray1 font-semibold">Detalhes do imóvel</p>
      <div className="mt-1 flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={handlePropertyDetailsInputs}
            data-detail-filter={"hasPoolProperty"}
            defaultChecked={hasPoolProperty == "true"}
            className="accent-brand1 w-4 h-4"
          />
          Piscina
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={handlePropertyDetailsInputs}
            data-detail-filter={"hasFurnitureProperty"}
            defaultChecked={hasFurnitureProperty == "true"}
            className="accent-brand1 w-4 h-4"
          />
          Mobiliado
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={handlePropertyDetailsInputs}
            data-detail-filter={"hasAirConditioningProperty"}
            defaultChecked={hasAirConditioningProperty == "true"}
            className="accent-brand1 w-4 h-4"
          />
          Ar condicionado
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={handlePropertyDetailsInputs}
            data-detail-filter={"hasGrillProperty"}
            defaultChecked={hasGrillProperty == "true"}
            className="accent-brand1 w-4 h-4"
          />
          Churrasqueira
        </label>
      </div>
    </div>
  );
}

export default PropertyDetails;
