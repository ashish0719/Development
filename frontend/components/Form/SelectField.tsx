"use client";

import { useFormContext } from "react-hook-form";

type Props = {
  field: any;
};

export default function SelectField({ field }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-blue-950">
          {field.label}
        </label>

        {errors[field.fieldName] && (
          <span className="text-xs font-medium text-red-500">
            {errors[field.fieldName]?.message as string}
          </span>
        )}
      </div>

      <select
        {...register(field.fieldName)}
        className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-600"
      >
        <option value="">{field.placeholder}</option>

        {field.options?.map((option: any) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
