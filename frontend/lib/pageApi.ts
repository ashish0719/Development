export async function getPage(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?filters[slug][$eq]=${slug}&populate=*`,
    {
      cache: "no-store", // SSR
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch page");
  }

  const { data } = await res.json();

  return data?.[0] ?? null;
}