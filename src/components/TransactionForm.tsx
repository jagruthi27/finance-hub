import { useState } from "react";
import { Plus, X } from "lucide-react";
import { categories, Category, TransactionType } from "@/data/mockData";
import { useAppState } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  editId?: string;
  editData?: { date: string; description: string; amount: number; category: Category; type: TransactionType };
  onClose?: () => void;
  trigger?: React.ReactNode;
}

export default function TransactionForm({ editId, editData, onClose, trigger }: Props) {
  const { addTransaction, updateTransaction } = useAppState();
  const [open, setOpen] = useState(false);
  const isEdit = !!editId;

  const [date, setDate] = useState(editData?.date || new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState(editData?.description || "");
  const [amount, setAmount] = useState(editData?.amount?.toString() || "");
  const [category, setCategory] = useState<Category>(editData?.category || "Food");
  const [type, setType] = useState<TransactionType>(editData?.type || "expense");

  const reset = () => {
    setDate(new Date().toISOString().slice(0, 10));
    setDescription("");
    setAmount("");
    setCategory("Food");
    setType("expense");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!description || isNaN(parsed) || parsed <= 0) return;

    if (isEdit && editId) {
      updateTransaction(editId, { date, description, amount: parsed, category, type });
    } else {
      addTransaction({ date, description, amount: parsed, category, type });
    }
    reset();
    setOpen(false);
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) onClose?.(); }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="gap-1.5">
            <Plus size={16} />
            Add Transaction
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Transaction" : "New Transaction"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Amount</Label>
              <Input type="number" step="0.01" min="0.01" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-9" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Description</Label>
            <Input placeholder="Transaction description" value={description} onChange={(e) => setDescription(e.target.value)} className="h-9" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as TransactionType)}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => { setOpen(false); onClose?.(); }}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {isEdit ? "Save Changes" : "Add Transaction"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
