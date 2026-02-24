import { eq } from "drizzle-orm";
import { Form, useLoaderData } from "react-router";
import { db } from "@/.server/db";
import { claimRequests, profiles, users } from "@/.server/db/schema";
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

  const claimList = await db
    .select({
      id: claimRequests.id,
      profileId: claimRequests.profileId,
      userId: claimRequests.userId,
      message: claimRequests.message,
      status: claimRequests.status,
      createdAt: claimRequests.createdAt,
      profileName: profiles.name,
      profileSlug: profiles.slug,
      userEmail: users.email,
      userName: users.name,
    })
    .from(claimRequests)
    .leftJoin(profiles, eq(claimRequests.profileId, profiles.id))
    .leftJoin(users, eq(claimRequests.userId, users.id))
    .orderBy(claimRequests.createdAt);

  return { claims: claimList };
}

export async function action({ request }: { request: Request }) {
  await requireAdmin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "approve") {
    const id = formData.get("id") as string;

    const claimList = await db
      .select()
      .from(claimRequests)
      .where(eq(claimRequests.id, id))
      .limit(1);

    if (claimList.length > 0) {
      const claim = claimList[0];
      await db
        .update(claimRequests)
        .set({ status: "approved" })
        .where(eq(claimRequests.id, id));
      await db
        .update(profiles)
        .set({ ownerId: claim.userId, isClaimed: true })
        .where(eq(profiles.id, claim.profileId));
    }
  }

  if (intent === "reject") {
    const id = formData.get("id") as string;
    await db
      .update(claimRequests)
      .set({ status: "rejected" })
      .where(eq(claimRequests.id, id));
  }

  return { success: true };
}

const _statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  approved: "bg-green-500",
  rejected: "bg-red-500",
};

export default function AdminClaims() {
  const { claims } = useLoaderData<typeof loader>();

  const pending = claims.filter((c) => c.status === "pending");
  const approved = claims.filter((c) => c.status === "approved");
  const rejected = claims.filter((c) => c.status === "rejected");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Claims</h1>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Pending ({pending.length})
          </h2>
          <div className="rounded-md border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pending.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-gray-500"
                    >
                      No pending claims
                    </TableCell>
                  </TableRow>
                ) : (
                  pending.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">
                        {claim.profileName ||
                          claim.profileSlug ||
                          claim.profileId}
                      </TableCell>
                      <TableCell>{claim.userName || claim.userEmail}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {claim.message || "-"}
                      </TableCell>
                      <TableCell>
                        {claim.createdAt
                          ? new Date(claim.createdAt).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Form method="post">
                            <input
                              type="hidden"
                              name="intent"
                              value="approve"
                            />
                            <input type="hidden" name="id" value={claim.id} />
                            <Button type="submit" variant="outline" size="sm">
                              Approve
                            </Button>
                          </Form>
                          <Form method="post">
                            <input type="hidden" name="intent" value="reject" />
                            <input type="hidden" name="id" value={claim.id} />
                            <Button
                              type="submit"
                              variant="destructive"
                              size="sm"
                            >
                              Reject
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

        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Approved ({approved.length})
          </h2>
          <div className="rounded-md border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approved.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-gray-500"
                    >
                      No approved claims
                    </TableCell>
                  </TableRow>
                ) : (
                  approved.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">
                        {claim.profileName || claim.profileSlug}
                      </TableCell>
                      <TableCell>{claim.userName || claim.userEmail}</TableCell>
                      <TableCell>
                        {claim.createdAt
                          ? new Date(claim.createdAt).toLocaleDateString()
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Rejected ({rejected.length})
          </h2>
          <div className="rounded-md border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rejected.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-gray-500"
                    >
                      No rejected claims
                    </TableCell>
                  </TableRow>
                ) : (
                  rejected.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">
                        {claim.profileName || claim.profileSlug}
                      </TableCell>
                      <TableCell>{claim.userName || claim.userEmail}</TableCell>
                      <TableCell>
                        {claim.createdAt
                          ? new Date(claim.createdAt).toLocaleDateString()
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
