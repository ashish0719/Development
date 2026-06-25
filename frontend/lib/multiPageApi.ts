export async function getMultiStepForm() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/multi-step-form?populate=*`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch form");
  }

  const json = await res.json();

  return json.data;
}