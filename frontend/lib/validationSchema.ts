import { z } from "zod";

export function validationSchema(steps: any[]) {
  const shape: Record<string, any> = {};

  steps.forEach((step) => {
    step.Blocks.forEach((field: any) => {
      if (!field.__component.startsWith("form-fields")) return;

      const validation = field.validation;

      let validator: any;

      switch (field.inputType) {
        case "number":
          validator = z.coerce.number();

          if (validation?.minValue) {
            validator = validator.min(
              validation.minValue,
              validation.minValueMessage
            );
          }

          if (validation?.maxValue) {
            validator = validator.max(
              validation.maxValue,
              validation.maxValueMessage
            );
          }

          break;

        default:
          validator = z.string();

          if (validation?.required) {
            validator = validator.min(
              2,
              validation.requiredMessage || "Required"
            );
          }

          if (validation?.minLength) {
            validator = validator.min(
              validation.minLength,
              validation.minLengthMessage
            );
          }

          if (validation?.maxLength) {
            validator = validator.max(
              validation.maxLength,
              validation.maxLengthMessage
            );
          }

          if (validation?.pattern) {
            validator = validator.regex(
              new RegExp(validation.pattern),
              validation.patternMessage
            );
          }

          switch (field.inputType) {
            case "email":
              validator = validator.email("Invalid email address");
              break;

            case "tel":
              validator = validator.regex(
                /^[0-9]{10}$/,
                "Invalid phone number"
              );
              break;

            case "url":
              validator = validator.url("Invalid URL");
              break;
          }
      }

      shape[field.fieldName] = validator;
    });
  });

  return z.object(shape);
}