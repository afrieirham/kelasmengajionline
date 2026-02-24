import { desc, eq, or } from "drizzle-orm";
import { useEffect } from "react";
import {
  Form,
  Link,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "react-router";
import { db } from "@/.server/db";
import { profiles, users } from "@/.server/db/schema";
import { ActionsDropdown } from "@/components/admin/actions-dropdown";
import { Badge } from "@/components/core/badge";
import { Button } from "@/components/core/button";
import { Input } from "@/components/core/input";
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

  const url = new URL(request.url);
  const search = url.searchParams.get("q") || "";

  const profileList = await db
    .select({
      id: profiles.id,
      name: profiles.name,
      slug: profiles.slug,
      type: profiles.type,
      isClaimed: profiles.isClaimed,
      moderationStatus: profiles.moderationStatus,
      isBoosted: profiles.isBoosted,
      ownerId: profiles.ownerId,
      createdAt: profiles.createdAt,
    })
    .from(profiles)
    .orderBy(desc(profiles.createdAt));

  let filtered = profileList;
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = profileList.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.slug.toLowerCase().includes(searchLower),
    );
  }

  const ownerIds = [
    ...new Set(filtered.map((p) => p.ownerId).filter(Boolean)),
  ] as string[];

  let owners: { id: string; name: string | null; email: string }[] = [];
  if (ownerIds.length > 0) {
    const conditions = ownerIds.map((id) => eq(users.id, id));
    owners = await db
      .select({ id: users.id, name: users.name, email: users.email })
      .from(users)
      .where(or(...conditions));
  }

  const ownerMap = new Map(owners.map((o) => [o.id, o]));

  return { profiles: filtered, search, ownerMap: Object.fromEntries(ownerMap) };
}

export async function action({ request }: { request: Request }) {
  await requireAdmin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "setStatus") {
    const id = formData.get("id") as string;
    const status = formData.get("status") as
      | "draft"
      | "pending"
      | "approved"
      | "rejected";
    await db
      .update(profiles)
      .set({ moderationStatus: status })
      .where(eq(profiles.id, id));
  }

  if (intent === "toggleBoosted") {
    const id = formData.get("id") as string;
    const profileList = await db
      .select({ isBoosted: profiles.isBoosted })
      .from(profiles)
      .where(eq(profiles.id, id))
      .limit(1);
    if (profileList.length > 0) {
      await db
        .update(profiles)
        .set({ isBoosted: !profileList[0].isBoosted })
        .where(eq(profiles.id, id));
    }
  }

  if (intent === "delete") {
    const id = formData.get("id") as string;
    await db.delete(profiles).where(eq(profiles.id, id));
  }

  return { success: true };
}

export default function AdminProfiles() {
  const {
    profiles: profileList,
    search,
    ownerMap,
  } = useLoaderData<typeof loader>();
  const [_searchParams, setSearchParams] = useSearchParams();
  const submit = useSubmit();
  const success = _searchParams.get("success") === "true";

  useEffect(() => {
    if (success) {
      alert("Profile saved successfully!");
      setSearchParams({});
    }
  }, [success, setSearchParams]);

  const _handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    if (q) {
      setSearchParams({ q });
    } else {
      setSearchParams({});
    }
  };

  const handleSetStatus = (
    id: string,
    status: "draft" | "pending" | "approved" | "rejected",
  ) => {
    const formData = new FormData();
    formData.append("intent", "setStatus");
    formData.append("id", id);
    formData.append("status", status);
    submit(formData, { method: "post" });
  };

  const handleToggleBoosted = (id: string) => {
    const formData = new FormData();
    formData.append("intent", "toggleBoosted");
    formData.append("id", id);
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profiles</h1>
        <Link to="/admin/profiles/new">
          <Button>Add Profile</Button>
        </Link>
      </div>

      <Form method="get" className="mb-4 flex gap-2">
        <Input
          name="q"
          placeholder="Search by name or slug..."
          defaultValue={search}
          className="max-w-sm"
        />
        <Button type="submit">Search</Button>
      </Form>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profileList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No profiles found
                </TableCell>
              </TableRow>
            ) : (
              profileList.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {profile.slug}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{profile.type}</Badge>
                  </TableCell>
                  <TableCell>
                    {profile.ownerId && ownerMap[profile.ownerId]
                      ? ownerMap[profile.ownerId].name ||
                        ownerMap[profile.ownerId].email
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {profile.isClaimed && (
                        <Badge variant="secondary">Claimed</Badge>
                      )}
                      <Badge
                        variant={
                          profile.moderationStatus === "approved"
                            ? "default"
                            : profile.moderationStatus === "pending"
                              ? "outline"
                              : profile.moderationStatus === "rejected"
                                ? "destructive"
                                : "secondary"
                        }
                      >
                        {profile.moderationStatus === "approved"
                          ? "Approved"
                          : profile.moderationStatus === "pending"
                            ? "Pending"
                            : profile.moderationStatus === "rejected"
                              ? "Rejected"
                              : "Draft"}
                      </Badge>
                      {profile.isBoosted && (
                        <Badge className="bg-amber-500">Boosted</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <ActionsDropdown
                      actions={[
                        {
                          label: "Edit",
                          key: `edit-${profile.id}`,
                          onClick: () =>
                            (window.location.href = `/admin/profiles/${profile.id}`),
                        },
                        {
                          label:
                            profile.moderationStatus === "approved"
                              ? "Unapprove"
                              : "Approve",
                          key: `status-${profile.id}`,
                          onClick: () =>
                            handleSetStatus(
                              profile.id,
                              profile.moderationStatus === "approved"
                                ? "pending"
                                : "approved",
                            ),
                        },
                        {
                          label: profile.isBoosted ? "Unboost" : "Boost",
                          key: `boost-${profile.id}`,
                          onClick: () => handleToggleBoosted(profile.id),
                        },
                        {
                          label: "Delete",
                          variant: "destructive",
                          key: `delete-${profile.id}`,
                          onClick: () => handleDelete(profile.id),
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
