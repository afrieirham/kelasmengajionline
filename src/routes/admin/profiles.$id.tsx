import { eq } from "drizzle-orm";
import { useRef, useState } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router";
import { db } from "@/.server/db";
import { profiles, users } from "@/.server/db/schema";
import { Button } from "@/components/core/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/core/card";
import { Input } from "@/components/core/input";
import { Label } from "@/components/core/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core/select";
import { Switch } from "@/components/core/switch";
import { Textarea } from "@/components/core/textarea";
import { requireAdmin } from "@/lib/admin";
import { slugify } from "@/lib/slugify";

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  await requireAdmin(request);

  const profileId = params.id;

  if (profileId === "new") {
    return { profile: null, users: [] };
  }

  const [profile, userList] = await Promise.all([
    db.select().from(profiles).where(eq(profiles.id, profileId)).limit(1),
    db
      .select({ id: users.id, name: users.name, email: users.email })
      .from(users),
  ]);

  return { profile: profile[0] || null, users: userList };
}

export async function action({
  request,
  params,
}: {
  request: Request;
  params: { id: string };
}) {
  await requireAdmin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "save") {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const type = formData.get("type") as "individual" | "organization";
    const headline = formData.get("headline") as string;
    const bio = formData.get("bio") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const whatsappNumber = formData.get("whatsappNumber") as string;
    const whatsappLabel = formData.get("whatsappLabel") as string;
    const websiteUrl = formData.get("websiteUrl") as string;
    const ownerId = formData.get("ownerId") as string;
    const isClaimed = formData.get("isClaimed") === "on";
    const isVerified = formData.get("isVerified") === "on";
    const isBoosted = formData.get("isBoosted") === "on";

    const profileId = params.id;

    if (profileId === "new") {
      const id = crypto.randomUUID();
      await db.insert(profiles).values({
        id,
        name,
        slug,
        type,
        headline,
        bio,
        imageUrl,
        whatsappNumber,
        whatsappLabel,
        websiteUrl,
        ownerId: ownerId || null,
        isClaimed,
        isVerified,
        isBoosted,
      });
      return redirect("/admin/profiles?success=true");
    } else {
      await db
        .update(profiles)
        .set({
          name,
          slug,
          type,
          headline,
          bio,
          imageUrl,
          whatsappNumber,
          whatsappLabel,
          websiteUrl,
          ownerId: ownerId || null,
          isClaimed,
          isVerified,
          isBoosted,
        })
        .where(eq(profiles.id, profileId));
    }

    return redirect("/admin/profiles?success=true");
  }

  return { success: false };
}

export default function AdminProfileEdit() {
  const { profile, users } = useLoaderData<typeof loader>();
  const _actionData = useActionData<typeof action>();
  const isNew = !profile;

  const [name, setName] = useState(profile?.name || "");
  const [slug, setSlug] = useState(profile?.slug || "");
  const slugEdited = useRef(false);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugEdited.current) {
      setSlug(slugify(value));
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isNew ? "New Profile" : "Edit Profile"}
        </h1>
        <Link to="/admin/profiles">
          <Button variant="outline">Back to Profiles</Button>
        </Link>
      </div>

      <Form method="post" className="space-y-6">
        <input type="hidden" name="intent" value="save" />

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  name="slug"
                  id="slug"
                  value={slug}
                  required
                  onChange={(e) => {
                    setSlug(e.target.value);
                    slugEdited.current = true;
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  name="type"
                  defaultValue={profile?.type || "individual"}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select type"
                      className="capitalize"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerId">Owner</Label>
                <Select name="ownerId" defaultValue={profile?.ownerId || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name || user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                name="headline"
                id="headline"
                defaultValue={profile?.headline || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                name="bio"
                id="bio"
                rows={4}
                defaultValue={profile?.bio || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                name="imageUrl"
                id="imageUrl"
                defaultValue={profile?.imageUrl || ""}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  name="whatsappNumber"
                  id="whatsappNumber"
                  defaultValue={profile?.whatsappNumber || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsappLabel">WhatsApp Label</Label>
                <Input
                  name="whatsappLabel"
                  id="whatsappLabel"
                  defaultValue={profile?.whatsappLabel || ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input
                name="websiteUrl"
                id="websiteUrl"
                defaultValue={profile?.websiteUrl || ""}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Switch
                name="isClaimed"
                id="isClaimed"
                defaultChecked={profile?.isClaimed || false}
              />
              <Label htmlFor="isClaimed">Claimed</Label>
            </div>
            <div className="flex items-center gap-4">
              <Switch
                name="isVerified"
                id="isVerified"
                defaultChecked={profile?.isVerified || false}
              />
              <Label htmlFor="isVerified">Verified</Label>
            </div>
            <div className="flex items-center gap-4">
              <Switch
                name="isBoosted"
                id="isBoosted"
                defaultChecked={profile?.isBoosted || false}
              />
              <Label htmlFor="isBoosted">Boosted</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button type="submit">Save Profile</Button>
        </div>
      </Form>
    </div>
  );
}
