"use client";

import { useFormContext } from "react-hook-form";

type Props = {
  step: any;
};

export default function PlanSection({ step }: Props) {
  const { watch, setValue } = useFormContext();

  const billing = watch("billing");
  const selectedPlan = watch("plan");

  const block = step.Blocks.find(
    (item: any) => item.__component === "sections.plan-section",
  );

  if (!block) return null;

  const plans = [...block.plans].sort((a: any, b: any) => a.order - b.order);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-5">
        {plans.map((plan: any) => {
          const active = selectedPlan?.id === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => setValue("plan", plan)}
              className={`cursor-pointer rounded-xl border p-5 transition-all ${
                active
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-600"
              }`}
            >
              <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                {plan.icon ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${plan.icon.url}`}
                    alt={plan.title}
                    className="h-8 w-8"
                  />
                ) : (
                  <span>🎮</span>
                )}
              </div>

              <h3 className="text-lg font-semibold">{plan.title}</h3>

              <p className="mt-1 text-gray-500">
                {billing === "monthly"
                  ? `$${plan.monthlyPrice}/mo`
                  : `$${plan.yearlyPrice}/yr`}
              </p>

              {billing === "yearly" && (
                <p className="mt-2 text-sm text-blue-700">2 months free</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 rounded-xl bg-slate-100 py-4">
        <span
          className={`font-medium ${
            billing === "monthly" ? "text-blue-900" : "text-gray-400"
          }`}
        >
          Monthly
        </span>

        <button
          type="button"
          onClick={() =>
            setValue("billing", billing === "monthly" ? "yearly" : "monthly")
          }
          className="relative h-6 w-12 rounded-full bg-blue-900"
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-300 ${
              billing === "monthly" ? "left-1" : "left-7"
            }`}
          />
        </button>

        <span
          className={`font-medium ${
            billing === "yearly" ? "text-blue-900" : "text-gray-400"
          }`}
        >
          Yearly
        </span>
      </div>
    </div>
  );
}
