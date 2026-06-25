import { notFound } from "next/navigation";
import MultiStepForm from "@/components/layout/MultiStepForm";
import { getForm } from "@/lib/formApi";

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const formSlug = slug?.join("/") || "registration-form";

  const form = await getForm(formSlug);

  if (!form) {
    notFound();
  }

  return <MultiStepForm form={form} />;
}
