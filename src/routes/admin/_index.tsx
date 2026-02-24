import { eq } from "drizzle-orm";
import { useLoaderData } from "react-router";
import { db } from "@/.server/db";
import { claimRequests, profiles, tags, users } from "@/.server/db/schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/core/card";
import { requireAdmin } from "@/lib/admin";

export async function loader({ request }: { request: Request }) {
  await requireAdmin(request);

  const [totalProfiles, totalUsers, totalTags, pendingClaims] =
    await Promise.all([
      db.select().from(profiles),
      db.select().from(users),
      db.select().from(tags),
      db
        .select()
        .from(claimRequests)
        .where(eq(claimRequests.status, "pending")),
    ]);

  return {
    stats: {
      totalProfiles: totalProfiles.length,
      totalUsers: totalUsers.length,
      totalTags: totalTags.length,
      pendingClaims: pendingClaims.length,
      claimedProfiles: totalProfiles.filter((p) => p.isClaimed).length,
      approvedProfiles: totalProfiles.filter(
        (p) => p.moderationStatus === "approved",
      ).length,
      pendingProfiles: totalProfiles.filter(
        (p) => p.moderationStatus === "pending",
      ).length,
      boostedProfiles: totalProfiles.filter((p) => p.isBoosted).length,
    },
  };
}

export default function AdminDashboard() {
  const { stats } = useLoaderData<typeof loader>();

  const statCards = [
    { title: "Total Profiles", value: stats.totalProfiles, color: "blue" },
    { title: "Claimed Profiles", value: stats.claimedProfiles, color: "green" },
    {
      title: "Approved Profiles",
      value: stats.approvedProfiles,
      color: "emerald",
    },
    {
      title: "Pending (Moderation)",
      value: stats.pendingProfiles,
      color: "orange",
    },
    { title: "Boosted Profiles", value: stats.boostedProfiles, color: "amber" },
    { title: "Total Users", value: stats.totalUsers, color: "purple" },
    { title: "Pending Claims", value: stats.pendingClaims, color: "red" },
    { title: "Total Tags", value: stats.totalTags, color: "indigo" },
  ];

  const colorClasses: Record<string, string> = {
    blue: "border-l-blue-500",
    green: "border-l-green-500",
    emerald: "border-l-emerald-500",
    amber: "border-l-amber-500",
    orange: "border-l-orange-500",
    purple: "border-l-purple-500",
    red: "border-l-red-500",
    indigo: "border-l-indigo-500",
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card
            key={card.title}
            className={`border-l-4 ${colorClasses[card.color]}`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
