import { eq } from "drizzle-orm";
import { useLoaderData, useSubmit } from "react-router";
import { db } from "@/.server/db";
import { profiles } from "@/.server/db/schema";
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

  const [boosted, notBoosted] = await Promise.all([
    db.select().from(profiles).where(eq(profiles.isBoosted, true)),
    db.select().from(profiles).where(eq(profiles.isBoosted, false)),
  ]);

  return { boosted, notBoosted };
}

export async function action({ request }: { request: Request }) {
  await requireAdmin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "toggle") {
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

  return { success: true };
}

export default function AdminBoosting() {
  const { boosted, notBoosted } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const handleToggle = (id: string) => {
    const formData = new FormData();
    formData.append("intent", "toggle");
    formData.append("id", id);
    submit(formData, { method: "post" });
  };

  const renderActions = (profile: { id: string; isBoosted: boolean }) => (
    <ActionsDropdown
      actions={[
        {
          label: "Edit",
          key: `edit-${profile.id}`,
          onClick: () => {
            window.location.href = `/admin/profiles/${profile.id}`;
          },
        },
        {
          label: profile.isBoosted ? "Remove Boost" : "Boost",
          key: `toggle-${profile.id}`,
          onClick: () => handleToggle(profile.id),
        },
      ]}
    />
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Boosting</h1>
        <p className="text-gray-500">
          Manage boosted profiles for priority listing
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Boosted Profiles ({boosted.length})
          </h2>
          <div className="rounded-md border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {boosted.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-gray-500"
                    >
                      No boosted profiles
                    </TableCell>
                  </TableRow>
                ) : (
                  boosted.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">
                        {profile.name}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {profile.slug}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{profile.type}</Badge>
                      </TableCell>
                      <TableCell>{renderActions(profile)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Not Boosted ({notBoosted.length})
          </h2>
          <div className="rounded-md border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notBoosted.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-gray-500"
                    >
                      All profiles are boosted
                    </TableCell>
                  </TableRow>
                ) : (
                  notBoosted.slice(0, 50).map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">
                        {profile.name}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {profile.slug}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{profile.type}</Badge>
                      </TableCell>
                      <TableCell>{renderActions(profile)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {notBoosted.length > 50 && (
            <p className="mt-2 text-sm text-gray-500">
              Showing first 50 of {notBoosted.length} non-boosted profiles
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
