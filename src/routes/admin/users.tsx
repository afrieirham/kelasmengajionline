import { eq } from "drizzle-orm";
import { useLoaderData, useSubmit } from "react-router";
import { db } from "@/.server/db";
import { users } from "@/.server/db/schema";
import { ActionsDropdown } from "@/components/admin/actions-dropdown";
import { Badge } from "@/components/core/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/core/table";
import { requireAdmin } from "@/lib/admin";

export async function loader({ request }: { request: Request }) {
  await requireAdmin(request);

  const userList = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users);

  return { users: userList };
}

export async function action({ request }: { request: Request }) {
  await requireAdmin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "changeRole") {
    const id = formData.get("id") as string;
    const role = formData.get("role") as "admin" | "user";

    await db.update(users).set({ role }).where(eq(users.id, id));
  }

  if (intent === "delete") {
    const id = formData.get("id") as string;
    await db.delete(users).where(eq(users.id, id));
  }

  return { success: true };
}

export default function AdminUsers() {
  const { users: userList } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const handleRoleChange = (id: string, role: "admin" | "user") => {
    const formData = new FormData();
    formData.append("intent", "changeRole");
    formData.append("id", id);
    formData.append("role", role);
    submit(formData, { method: "post" });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure?")) return;
    const formData = new FormData();
    formData.append("intent", "delete");
    formData.append("id", id);
    submit(formData, { method: "post" });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              userList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.name || "-"}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "admin" ? "default" : "outline"}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <ActionsDropdown
                      actions={[
                        {
                          label:
                            user.role === "admin"
                              ? "Remove Admin"
                              : "Make Admin",
                          onClick: () =>
                            handleRoleChange(
                              user.id,
                              user.role === "admin" ? "user" : "admin",
                            ),
                        },
                        {
                          label: "Delete",
                          variant: "destructive",
                          onClick: () => handleDelete(user.id),
                          key: `delete-${user.id}`,
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
