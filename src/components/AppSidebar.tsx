import { useState } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Shield,
  Eye,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Role } from "@/data/mockData";
import { useAppState } from "@/context/AppContext";
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

const roleIcons: Record<string, typeof Shield> = {
  Admin: Shield,
  Viewer: Eye,
};

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { role, setRole } = useAppState();

  const RoleIcon = roleIcons[role] || Shield;

  return (
    <aside
      className={`hidden md:flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-200 shrink-0 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex items-center justify-between px-4 h-14 border-b border-sidebar-border">
        {!collapsed && (
          <span className="text-sm font-semibold text-sidebar-accent-foreground tracking-wide">
            FinDash
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-sidebar-accent text-sidebar-muted"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 py-3 space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
          >
            <item.icon size={18} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        {collapsed ? (
          <div className="flex justify-center">
            <RoleIcon size={18} className="text-sidebar-muted" />
          </div>
        ) : (
          <>
            <label className="text-xs text-sidebar-muted mb-1 block">Role</label>
            <Select value={role} onValueChange={(v) => setRole(v as Role)}>
              <SelectTrigger className="h-8 bg-sidebar-accent border-sidebar-border text-sidebar-accent-foreground text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin" className="text-xs">Admin</SelectItem>
                <SelectItem value="Viewer" className="text-xs">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}
      </div>
    </aside>
  );
}
