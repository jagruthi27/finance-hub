import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardProps {
  label: string;
  value: string;
  trend: number; // percentage
  variant?: "default" | "income" | "expense";
}

export default function SummaryCard({ label, value, trend, variant = "default" }: SummaryCardProps) {
  const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const trendColor =
    variant === "expense"
      ? trend > 0
        ? "text-destructive"
        : "text-success"
      : trend > 0
      ? "text-success"
      : trend < 0
      ? "text-destructive"
      : "text-muted-foreground";

  return (
    <Card className="shadow-sm">
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
            <TrendIcon size={14} />
            {Math.abs(trend)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
