import { Bell, BookOpen, LogOut, MessageCircle, Settings, UsersRound } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { BrandMark } from "../ui/BrandMark";

const navItems = [
  { to: "/admin/feed", label: "Class Feed", icon: BookOpen },
  { to: "/admin/classes", label: "Classes", icon: UsersRound },
  { to: "/admin/students", label: "Students", icon: UsersRound },
  { to: "/admin/messages", label: "Messages", icon: MessageCircle },
  { to: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <BrandMark compact />
          <div>
            <strong>King's Class</strong>
            <span>Admin Studio</span>
          </div>
        </div>

        <nav className="admin-tabs" aria-label="Admin navigation">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="eyebrow">King's Class</p>
            <h1>Admin Area</h1>
          </div>
          <div className="admin-actions">
            <button className="icon-button" type="button" aria-label="Notifications">
              <Bell size={19} />
            </button>
            <div className="admin-user">
              <span>{user?.name.charAt(0)}</span>
              <div>
                <strong>{user?.name}</strong>
                <small>{user?.email}</small>
              </div>
            </div>
            <button className="icon-button" type="button" aria-label="Sign out" onClick={logout}>
              <LogOut size={19} />
            </button>
          </div>
        </header>

        <Outlet />
      </section>
    </main>
  );
}
