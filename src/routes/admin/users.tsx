import { eq } from "drizzle-orm";
import { Form, useLoaderData } from "react-router";
import { db } from "@/.server/db";
import { users } from "@/.server/db/schema";
import { Badge } from "@/components/core/badge";
import { Button } from "@/components/core/button";
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
                    <div className="flex gap-2">
                      <Form method="post">
                        <input type="hidden" name="intent" value="changeRole" />
                        <input type="hidden" name="id" value={user.id} />
                        <input
                          type="hidden"
                          name="role"
                          value={user.role === "admin" ? "user" : "admin"}
                        />
                        <Button type="submit" variant="outline" size="sm">
                          {user.role === "admin"
                            ? "Remove Admin"
                            : "Make Admin"}
                        </Button>
                      </Form>
                      <Form
                        method="post"
                        onSubmit={(e) => {
                          if (!confirm("Are you sure?")) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <input type="hidden" name="intent" value="delete" />
                        <input type="hidden" name="id" value={user.id} />
                        <Button type="submit" variant="destructive" size="sm">
                          Delete
                        </Button>
                      </Form>
                    </div>
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
