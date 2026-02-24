import {
  ArrowRightLeft,
  BookOpen,
  FileCheck,
  LayoutDashboard,
  LogOut,
  Tags,
  Users,
  Zap,
} from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { requireAdmin } from "@/lib/admin";
import { authClient } from "@/lib/auth-client";

export async function loader({ request }: { request: Request }) {
  await requireAdmin(request);
  return {};
}

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/profiles", label: "Profiles", icon: BookOpen, end: false },
  { to: "/admin/users", label: "Users", icon: Users, end: false },
  { to: "/admin/tags", label: "Tags", icon: Tags, end: false },
  { to: "/admin/claims", label: "Claims", icon: FileCheck, end: false },
  { to: "/admin/boosting", label: "Boosting", icon: Zap, end: false },
];

export default function AdminLayout() {
  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed top-0 left-0 z-40 h-screen w-64 border-r bg-white">
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-bold">KMO Admin</h1>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}

          <div className="absolute bottom-0 my-4 w-56 border-t pt-4">
            <NavLink
              to="/dashboard/profile?fromAdmin=true"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <ArrowRightLeft className="h-5 w-5" />
              Go to User Dashboard
            </NavLink>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
          </div>
        </nav>
      </aside>
      <main className="pl-64">
        <div className="mx-auto max-w-7xl p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
