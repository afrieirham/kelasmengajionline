import { ArrowRightLeft, LogOut, User } from "lucide-react";
import { NavLink, Outlet, useLoaderData } from "react-router";
import { Button } from "@/components/core/button";
import { authClient } from "@/lib/auth-client";
import { requireUser } from "@/lib/user";

export async function loader({ request }: { request: Request }) {
  const user = await requireUser(request);
  return { user };
}

export default function DashboardLayout() {
  const { user } = useLoaderData<typeof loader>();
  const isAdmin = user.role === "admin";

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <NavLink to="/dashboard" className="text-xl font-bold">
              Papan Pemuka
            </NavLink>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <NavLink
                to="/admin"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <Button variant="outline" size="sm">
                  <ArrowRightLeft className="h-4 w-4" />
                  Admin
                </Button>
              </NavLink>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{user.name || user.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Log Keluar
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
