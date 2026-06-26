export default function FeaturedPlanCard({
  plan,
  billing,
  active,
  onSelect,
}: any) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl border-2 p-6 shadow-lg ${
        active ? "border-blue-600 bg-blue-50" : "border-yellow-400"
      }`}
    >
      <span className="rounded-full bg-yellow-400 px-2 py-1 text-xs">
        POPULAR
      </span>

      <h2 className="mt-4 text-xl font-bold">{plan.title}</h2>

      <p>{plan.description}</p>

      <h3 className="mt-6 text-2xl font-bold">
        {billing === "monthly"
          ? `$${plan.monthlyPrice}/mo`
          : `$${plan.yearlyPrice}/yr`}
      </h3>
    </div>
  );
}
