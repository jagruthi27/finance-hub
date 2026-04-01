import { LayoutDashboard, ArrowLeftRight, Shield, Eye } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAppState } from "@/context/AppContext";
import { Role } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const navItems = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Transactions", to: "/transactions", icon: ArrowLeftRight },
];

export default function MobileNav() {
  const { role, setRole } = useAppState();

  return (
    <div className="md:hidden flex items-center justify-between gap-2 px-4 py-2 border-b border-border bg-card">
      <nav className="flex gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-muted transition-colors"
            activeClassName="bg-muted text-primary font-medium"
          >
            <item.icon size={14} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <Select value={role} onValueChange={(v) => setRole(v as Role)}>
        <SelectTrigger className="h-7 w-24 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Admin" className="text-xs">Admin</SelectItem>
          <SelectItem value="Viewer" className="text-xs">Viewer</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
