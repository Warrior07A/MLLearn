import { SectionHeading } from "@/components/shared/SectionHeading";
import { IconGrid } from "@/components/shared/IconGrid";
import { regressionApplications } from "@/data/regressionApplications";

export default function RegressionApplications() {
  return (
    <div className="space-y-6">
      <SectionHeading
        tag="Real World"
        title="Applications of Regression"
        subtitle="Regression models power decisions across every industry."
        accentColor="#22c55e"
      />
      <IconGrid
        items={regressionApplications.map((app) => ({
          icon: app.icon,
          label: app.label,
          description: app.description,
        }))}
        color="#22c55e"
        columns={3}
      />
    </div>
  );
}
