import { useState } from "react";
import { BookOpen, GraduationCap, LogOut, MessageCircle, PanelLeftClose, PanelLeftOpen, School, Settings } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { BrandMark } from "../ui/BrandMark";

const navItems = [
  { to: "/admin/feed", label: "Class Feed", icon: BookOpen },
  { to: "/admin/classes", label: "Classes", icon: School },
  { to: "/admin/students", label: "Students", icon: GraduationCap },
  { to: "/admin/messages", label: "Messages", icon: MessageCircle },
  { to: "/admin/settings", label: "Settings", icon: Settings }
];

function NavTooltip({ children, placement }: { children: string; placement: "side" | "bottom" }) {
  return (
    <span className={`nav-tooltip nav-tooltip--${placement}`} aria-hidden="true">
      {children}
    </span>
  );
}

export function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const activeNavItem = navItems.find((item) => location.pathname.startsWith(item.to));
  const pageTitle = activeNavItem?.label ?? "Admin";

  return (
    <main className={`admin-shell${isSidebarCollapsed ? " admin-shell--sidebar-collapsed" : ""}`}>
      <aside className={`admin-sidebar${isSidebarCollapsed ? " admin-sidebar--collapsed" : ""}`}>
        <div className="admin-brand">
          <div className="admin-brand__identity">
            <BrandMark compact />
            <div className="admin-brand__copy">
              <strong>King's Class</strong>
            </div>
          </div>
        </div>

        <nav className="admin-tabs" aria-label="Admin navigation">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to}>
              <Icon className="nav-icon" size={18} />
              <span className="nav-label">{label}</span>
              <NavTooltip placement="side">{label}</NavTooltip>
            </NavLink>
          ))}
          <span className="nav-control-divider" aria-hidden="true" />
          <button
            className="nav-control"
            type="button"
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={isSidebarCollapsed}
            onClick={() => setIsSidebarCollapsed((current) => !current)}
          >
            {isSidebarCollapsed ? <PanelLeftOpen className="nav-icon" size={18} /> : <PanelLeftClose className="nav-icon" size={18} />}
            <span className="nav-label">{isSidebarCollapsed ? "Expand" : "Collapse"}</span>
            <NavTooltip placement="side">{isSidebarCollapsed ? "Expand" : "Collapse"}</NavTooltip>
          </button>
        </nav>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div className="admin-page-title">
            <h1>{pageTitle}</h1>
          </div>
          <div className="admin-actions">
            <div className="admin-user">
              <span>{user?.name.charAt(0)}</span>
              <div>
                <strong>{user?.name}</strong>
                <small>{user?.email}</small>
              </div>
            </div>
            <button className="icon-button icon-button--signout" type="button" aria-label="Log out" onClick={logout}>
              <LogOut size={19} />
              <NavTooltip placement="bottom">Log out</NavTooltip>
            </button>
          </div>
        </header>

        <Outlet />
      </section>
    </main>
  );
}
