export default function CompactPlanCard({
  plan,
  billing,
  active,
  onSelect,
}: any) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-lg border p-3 ${
        active ? "border-blue-600" : ""
      }`}
    >
      <h3>{plan.title}</h3>

      <p>
        {billing === "monthly"
          ? `$${plan.monthlyPrice}/mo`
          : `$${plan.yearlyPrice}/yr`}
      </p>
    </div>
  );
}
