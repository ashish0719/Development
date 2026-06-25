"use client";

import { useFormContext } from "react-hook-form";

type Props = {
  step: any;
};

export default function AddonSection({ step }: Props) {
  const { watch, setValue } = useFormContext();

  const billing = watch("billing");
  const selectedAddons = watch("addons") || [];

  const block = step.Blocks.find(
    (item: any) => item.__component === "sections.addon-section",
  );

  if (!block) return null;

  const addons = [...block.addons].sort((a: any, b: any) => a.order - b.order);

  const handleSelect = (addon: any) => {
    const exists = selectedAddons.some((item: any) => item.id === addon.id);

    if (exists) {
      setValue(
        "addons",
        selectedAddons.filter((item: any) => item.id !== addon.id),
      );
    } else {
      setValue("addons", [...selectedAddons, addon]);
    }
  };

  return (
    <div className="space-y-4">
      {addons.map((addon: any) => {
        const active = selectedAddons.some((item: any) => item.id === addon.id);

        return (
          <div
            key={addon.id}
            onClick={() => handleSelect(addon)}
            className={`flex cursor-pointer items-center justify-between rounded-xl border p-5 transition ${
              active
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-600"
            }`}
          >
            <div className="flex items-center gap-5">
              <input
                type="checkbox"
                checked={active}
                readOnly
                className="h-5 w-5"
              />

              <div>
                <h3 className="font-semibold">{addon.title}</h3>

                <p className="text-sm text-gray-500">{addon.description}</p>
              </div>
            </div>

            <span className="font-medium text-blue-700">
              {billing === "monthly"
                ? `+$${addon.monthlyPrice}/mo`
                : `+$${addon.yearlyPrice}/yr`}
            </span>
          </div>
        );
      })}
    </div>
  );
}
