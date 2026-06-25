const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getForm(slug: string) {
  const res = await fetch(
    `${STRAPI_URL}/api/forms?filters[slug][$eq]=${slug}&populate=*`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch form");
  }

  const data = await res.json();

  return data.data[0];
}