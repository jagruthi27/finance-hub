interface TopbarProps {
  title: string;
  children?: React.ReactNode;
}

export default function Topbar({ title, children }: TopbarProps) {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-card">
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-3">{children}</div>
    </header>
  );
}
