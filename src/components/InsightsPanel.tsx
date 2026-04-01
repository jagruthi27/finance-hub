import { useMemo } from "react";
import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from "@/context/AppContext";
import { generateInsights } from "@/utils/insights";

export default function InsightsPanel() {
  const { transactions } = useAppState();
  const insights = useMemo(() => generateInsights(transactions), [transactions]);

  if (insights.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={16} className="text-warning" />
          <h3 className="text-sm font-semibold text-foreground">Insights</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight) => (
            <div key={insight.label} className="space-y-1">
              <p className="text-xs text-muted-foreground">{insight.label}</p>
              <p className="text-base font-semibold text-foreground">{insight.value}</p>
              <p className="text-xs text-muted-foreground">{insight.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
