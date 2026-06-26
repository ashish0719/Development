import InputField from "@/components/Form/InputField";
import TextAreaField from "@/components/Form/TextAreaField";
import SelectField from "@/components/Form/SelectField";
import RadioField from "@/components/Form/RadioField";
import CheckboxField from "@/components/Form/CheckboxField";

type Props = {
  field: any;
};

export default function FormRenderer({ field }: Props) {
  switch (field.__component) {
    case "form-fields.input-field":
      return <InputField field={field} />;

    case "form-fields.text-area":
      return <TextAreaField field={field} />;

    case "form-fields.select":
      return <SelectField field={field} />;

    case "form-fields.radio":
      return <RadioField field={field} />;

    case "form-fields.check-box":
      return <CheckboxField field={field} />;

    default:
      return null;
  }
}
