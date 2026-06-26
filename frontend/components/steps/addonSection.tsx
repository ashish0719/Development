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
            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition md:p-5 ${
              active
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-600"
            }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={active}
                readOnly
                className="h-5 w-5 shrink-0 accent-blue-600"
              />

              <div>
                <h3 className="text-sm font-semibold text-blue-950 md:text-base">
                  {addon.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500 md:text-sm">
                  {addon.description}
                </p>
              </div>
            </div>

            <span className="ml-4 whitespace-nowrap text-sm font-medium text-blue-700">
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
