"use client";

import { useFormContext } from "react-hook-form";

type Props = {
  field: any;
};

export default function CheckboxField({ field }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium text-blue-950">
          {field.label}
        </label>

        {errors[field.fieldName] && (
          <span className="text-xs font-medium text-red-500">
            {errors[field.fieldName]?.message as string}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {field.options?.map((option: any) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              value={option.value}
              {...register(field.fieldName)}
              className="h-4 w-4"
            />

            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
