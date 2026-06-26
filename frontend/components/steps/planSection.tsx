"use client";

import { useFormContext } from "react-hook-form";
import PlanCardRenderer from "@/components/Renderer/planRenderer";

type Props = {
  step: any;
};

export default function PlanSection({ step }: Props) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const billing = watch("billing");
  const selectedPlan = watch("plan");

  const block = step.Blocks.find(
    (item: any) => item.__component === "sections.plan-section",
  );

  if (!block) return null;

  const plans = [...block.plans].sort((a: any, b: any) => a.order - b.order);

  return (
    <div className="space-y-8">
      {/* Plans */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {plans.map((plan: any) => (
          <PlanCardRenderer
            key={plan.id}
            variant={block.variant}
            plan={plan}
            billing={billing}
            active={selectedPlan?.id === plan.id}
            onSelect={() =>
              setValue("plan", plan, {
                shouldValidate: true,
              })
            }
          />
        ))}
      </div>

      {/* Error */}
      {errors.plan && (
        <p className="text-sm font-medium text-red-500">
          {errors.plan.message as string}
        </p>
      )}

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-5 rounded-xl bg-slate-100 px-4 py-4">
        <span
          className={`text-sm font-medium transition ${
            billing === "monthly" ? "text-blue-900" : "text-gray-400"
          }`}
        >
          Monthly
        </span>

        <button
          type="button"
          onClick={() =>
            setValue("billing", billing === "monthly" ? "yearly" : "monthly", {
              shouldDirty: true,
            })
          }
          className="relative h-6 w-12 rounded-full bg-blue-900 transition"
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-300 ${
              billing === "monthly" ? "left-1" : "left-7"
            }`}
          />
        </button>

        <span
          className={`text-sm font-medium transition ${
            billing === "yearly" ? "text-blue-900" : "text-gray-400"
          }`}
        >
          Yearly
        </span>
      </div>
    </div>
  );
}
