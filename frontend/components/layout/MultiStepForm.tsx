"use client";

import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import UserInformation from "@/components/steps/userInformation";
import PlanSection from "@/components/steps/planSection";
import AddonSection from "@/components/steps/addonSection";
import SummarySection from "@/components/steps/summarySection";

import { validationSchema } from "@/lib/validationSchema";

type Props = {
  form: any;
};

const buttonVariants: Record<string, string> = {
  primary: "bg-blue-700 text-white hover:bg-blue-800",
  secondary: "bg-gray-500 text-white hover:bg-gray-600",
  success: "bg-green-600 text-white hover:bg-green-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  ghost: "bg-transparent text-gray-500 hover:text-gray-700",
};

export default function MultiStepForm({ form }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const schema = validationSchema(form.steps);

  const methods = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      billing: "monthly",
      plan: null,
      addons: [],
    },

    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const steps = useMemo(() => {
    return [...form.steps].sort((a, b) => a.stepNumber - b.stepNumber);
  }, [form.steps]);

  const step = steps[currentStep];

  const handleNext = async () => {
    const fields: string[] = [];

    step.Blocks.forEach((block: any) => {
      if (block.fieldName) {
        fields.push(block.fieldName);
      }

      if (block.__component === "sections.plan-section") {
        fields.push("plan");
      }

      if (block.__component === "sections.addon-section") {
        fields.push("addons");
      }
    });

    if (fields.length) {
      const valid = await methods.trigger(fields);

      if (!valid) return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mx-auto flex min-h-screen max-w-6xl rounded-xl bg-white p-4 shadow-lg"
      >
        <div
          className="w-72 rounded-xl bg-cover bg-center p-8"
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${form.sideImage.url})`,
          }}
        >
          {steps.map((item, index) => (
            <div key={item.id} className="mb-8 flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                  currentStep === index
                    ? "bg-sky-300 text-black"
                    : "border-white text-white"
                }`}
              >
                {index + 1}
              </div>

              <div>
                <p className="text-xs uppercase text-gray-300">
                  Step {index + 1}
                </p>

                <h3 className="text-sm font-semibold uppercase text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col justify-between p-12">
          <div>
            <h1 className="text-3xl font-bold">{step.title}</h1>

            <p className="mt-2 text-gray-500">{step.subtitle}</p>

            <div className="mt-10">
              {step.stepType === "info" && <UserInformation step={step} />}

              {step.stepType === "plans" && <PlanSection step={step} />}

              {step.stepType === "addons" && <AddonSection step={step} />}

              {step.stepType === "summary" && (
                <SummarySection
                  goToStep={(stepNumber) => setCurrentStep(stepNumber)}
                />
              )}
            </div>
          </div>

          <div className="mt-10 flex justify-between">
            <button
              type="button"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className={`rounded-lg px-6 py-3 transition ${
                buttonVariants[step.backButton?.variant || "ghost"]
              } ${currentStep === 0 ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {step.backButton?.text || "Go Back"}
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                type="submit"
                className={`rounded-lg px-6 py-3 transition ${
                  buttonVariants[step.nextButton?.variant || "primary"]
                }`}
              >
                {step.nextButton?.text || "Confirm"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className={`rounded-lg px-6 py-3 transition ${
                  buttonVariants[step.nextButton?.variant || "primary"]
                }`}
              >
                {step.nextButton?.text || "Next Step"}
              </button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
