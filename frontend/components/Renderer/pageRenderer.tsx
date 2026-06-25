import HeroBanner from "@/components/cards/HeroBanner";

export default function PageRenderer({ sections }: { sections: any[] }) {
  return (
    <>
      {sections?.map((section: any) => {
        switch (section.__component) {
          case "shared.hero-banner":
            return <HeroBanner key={section.id} data={section} />;

          default:
            return null;
        }
      })}
    </>
  );
}
