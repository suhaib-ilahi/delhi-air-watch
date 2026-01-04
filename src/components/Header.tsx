import { Link, useLocation } from 'react-router-dom';
import { Wind, Map, BarChart3, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Wind className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Delhi Air</h1>
            <p className="text-xs text-muted-foreground leading-tight">Ward-Wise Dashboard</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" icon={<Map className="h-4 w-4" />} active={location.pathname === '/'}>
            Map View
          </NavLink>
          <NavLink
            to="/"
            icon={<BarChart3 className="h-4 w-4" />}
            active={false}
          >
            Analytics
          </NavLink>
          <NavLink
            to="/"
            icon={<FileText className="h-4 w-4" />}
            active={false}
          >
            Reports
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-primary font-medium">Live Data</span>
          </span>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
}

const NavLink = ({ to, children, icon, active }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        active
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      )}
    >
      {icon}
      {children}
    </Link>
  );
};
