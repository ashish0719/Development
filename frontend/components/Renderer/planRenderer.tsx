import DefaultPlanCard from "@/components/cards/plan/DefaultPlanCard";
import CompactPlanCard from "@/components/cards/plan/CompactPlanCard";
import HorizontalPlanCard from "@/components/cards/plan/HorizontalPlanCard";
import FeaturedPlanCard from "@/components/cards/plan/FeaturedPlanCard";

type Props = {
  variant: string;
  plan: any;
  active: boolean;
  billing: string;
  onSelect: () => void;
};

export default function PlanCardRenderer({ variant, ...props }: Props) {
  switch (variant) {
    case "compact":
      return <CompactPlanCard {...props} />;

    case "horizontal":
      return <HorizontalPlanCard {...props} />;

    case "featured":
      return <FeaturedPlanCard {...props} />;

    default:
      return <DefaultPlanCard {...props} />;
  }
}
