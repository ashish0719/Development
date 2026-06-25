import FormRenderer from "@/components/Renderer/formRenderer";

type Props = {
  step: any;
};

export default function UserInformation({ step }: Props) {
  return (
    <>
      {step.Blocks.map((field: any) => (
        <FormRenderer key={field.id} field={field} />
      ))}
    </>
  );
}
