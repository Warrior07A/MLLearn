import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = [
  { aspect: "Data Type", classical: "Structured / tabular", ml: "Any (images, text, audio)" },
  { aspect: "Feature Engineering", classical: "Manual, domain-driven", ml: "Learned automatically" },
  { aspect: "Interpretability", classical: "High — rules are explicit", ml: "Often low (black box)" },
  { aspect: "Scale", classical: "Small–medium datasets", ml: "Scales with big data" },
  { aspect: "Training Time", classical: "Fast", ml: "Can be very slow (GPUs)" },
  { aspect: "Examples", classical: "Decision trees, linear regression", ml: "Neural networks, deep learning" },
];

export default function ComparisonTable() {
  return (
    <div className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-heading font-semibold text-foreground w-40">Aspect</TableHead>
            <TableHead className="font-heading font-semibold text-blue-500">Classical / Task-Driven</TableHead>
            <TableHead className="font-heading font-semibold text-green-500">ML / Data-Driven</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium text-sm text-foreground">{row.aspect}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{row.classical}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{row.ml}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
