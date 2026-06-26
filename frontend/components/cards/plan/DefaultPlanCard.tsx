type Props = {
  plan: any;
  active: boolean;
  billing: string;
  onSelect: () => void;
};

export default function DefaultPlanCard({
  plan,
  active,
  billing,
  onSelect,
}: Props) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-xl border p-5 transition-all ${
        active
          ? "border-blue-600 bg-blue-50"
          : "border-gray-300 hover:border-blue-600"
      }`}
    >
      <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        {plan.icon ? (
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${plan.icon.url}`}
            alt={plan.title}
            className="h-8 w-8"
          />
        ) : (
          <span>🎮</span>
        )}
      </div>

      <h3 className="text-lg font-semibold">{plan.title}</h3>

      <p className="mt-1 text-gray-500">
        {billing === "monthly"
          ? `$${plan.monthlyPrice}/mo`
          : `$${plan.yearlyPrice}/yr`}
      </p>

      {billing === "yearly" && (
        <p className="mt-2 text-sm text-blue-700">2 months free</p>
      )}
    </div>
  );
}
