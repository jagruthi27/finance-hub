import { useState, useMemo } from "react";
import { ArrowUpDown, Search, Pencil, FileX } from "lucide-react";
import { Transaction, categories, Category, TransactionType } from "@/data/mockData";
import { formatCurrency } from "@/utils/finance";
import { useAppState } from "@/context/AppContext";
import TransactionForm from "@/components/TransactionForm";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SortKey = "date" | "amount";
type SortDir = "asc" | "desc";

interface Props {
  data: Transaction[];
}

export default function TransactionsTable({ data }: Props) {
  const { isAdmin } = useAppState();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [editingId, setEditingId] = useState<string | null>(null);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filtered = useMemo(() => {
    let result = [...data];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== "all")
      result = result.filter((t) => t.category === categoryFilter);
    if (typeFilter !== "all")
      result = result.filter((t) => t.type === typeFilter);

    result.sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortKey === "date") return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mul * (a.amount - b.amount);
    });
    return result;
  }, [data, search, categoryFilter, typeFilter, sortKey, sortDir]);

  const SortButton = ({ label, field }: { label: string; field: SortKey }) => (
    <button
      onClick={() => toggleSort(field)}
      className="flex items-center gap-1 hover:text-foreground transition-colors"
    >
      {label}
      <ArrowUpDown size={14} className={sortKey === field ? "text-primary" : ""} />
    </button>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-36 h-9">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-28 h-9">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[110px]">
                <SortButton label="Date" field="date" />
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="text-right">
                <SortButton label="Amount" field="amount" />
              </TableHead>
              {isAdmin && <TableHead className="w-[60px]" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isAdmin ? 6 : 5} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FileX size={32} />
                    <p className="text-sm">No transactions found.</p>
                    <p className="text-xs">Try adjusting your filters or search term.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="text-sm">{t.date}</TableCell>
                  <TableCell className="text-sm font-medium">{t.description}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="secondary" className="text-xs font-normal">
                      {t.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant={t.type === "income" ? "default" : "outline"}
                      className="text-xs capitalize"
                    >
                      {t.type}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right text-sm font-medium ${
                      t.type === "income" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <TransactionForm
                        editId={t.id}
                        editData={{ date: t.date, description: t.description, amount: t.amount, category: t.category, type: t.type }}
                        trigger={
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Pencil size={14} />
                          </Button>
                        }
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
