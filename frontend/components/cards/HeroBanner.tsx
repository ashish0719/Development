type HeroBannerProps = {
  data: {
    title: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: {
      url: string;
      alternativeText?: string;
    };
  };
};

export default function HeroBanner({ data }: HeroBannerProps) {
  const image = data.backgroundImage?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.backgroundImage.url}`
    : "";

  return (
    <section
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-4xl px-6 text-center text-white">
        {data.subtitle && (
          <p className="mb-3 text-lg uppercase tracking-widest">
            {data.subtitle}
          </p>
        )}

        <h1 className="mb-6 text-6xl font-bold">{data.title}</h1>

        {data.description && (
          <p className="text-xl text-gray-200">{data.description}</p>
        )}
      </div>
    </section>
  );
}
