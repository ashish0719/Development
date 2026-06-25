"use client";

import { useFormContext } from "react-hook-form";

type Props = {
  goToStep?: (step: number) => void;
};

export default function SummarySection({ goToStep }: Props) {
  const { watch } = useFormContext();

  const billing = watch("billing");
  const selectedPlan = watch("plan");
  const selectedAddons = watch("addons") || [];

  const planPrice =
    billing === "monthly"
      ? selectedPlan?.monthlyPrice || 0
      : selectedPlan?.yearlyPrice || 0;

  const addonPrice = selectedAddons.reduce(
    (total: number, addon: any) =>
      total + (billing === "monthly" ? addon.monthlyPrice : addon.yearlyPrice),
    0,
  );

  const total = planPrice + addonPrice;

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-slate-100 p-6">
        <div className="flex items-center justify-between border-b pb-5">
          <div>
            <h3 className="font-semibold">
              {selectedPlan?.title} ({billing})
            </h3>

            <button
              type="button"
              onClick={() => goToStep?.(1)}
              className="text-sm text-gray-500 underline"
            >
              Change
            </button>
          </div>

          <p className="font-bold">
            ${planPrice}/{billing === "monthly" ? "mo" : "yr"}
          </p>
        </div>

        {selectedAddons.length > 0 && (
          <div className="mt-5 space-y-4">
            {selectedAddons.map((addon: any) => (
              <div key={addon.id} className="flex items-center justify-between">
                <p className="text-gray-500">{addon.title}</p>

                <p>
                  +$
                  {billing === "monthly"
                    ? addon.monthlyPrice
                    : addon.yearlyPrice}
                  /{billing === "monthly" ? "mo" : "yr"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-6">
        <p className="text-gray-500">
          Total (per {billing === "monthly" ? "month" : "year"})
        </p>

        <p className="text-2xl font-bold text-blue-700">
          +${total}/{billing === "monthly" ? "mo" : "yr"}
        </p>
      </div>
    </div>
  );
}
