import { eq } from "drizzle-orm";
import { useRef, useState } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router";
import { db } from "@/.server/db";
import { profiles, profilesToTags, tags } from "@/.server/db/schema";
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
import { Textarea } from "@/components/core/textarea";
import { slugify } from "@/lib/slugify";
import { requireUser } from "@/lib/user";

export async function loader({ request }: { request: Request }) {
  await requireUser(request);

  const allTags = await db
    .select()
    .from(tags)
    .orderBy(tags.group, tags.order, tags.name);

  const tagsByGroup = allTags.reduce(
    (acc, tag) => {
      if (!acc[tag.group]) {
        acc[tag.group] = [];
      }
      acc[tag.group].push(tag);
      return acc;
    },
    {} as Record<string, typeof allTags>,
  );

  return { tagsByGroup };
}

export async function action({ request }: { request: Request }) {
  const user = await requireUser(request);
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const type = formData.get("type") as "individual" | "organization";
  const headline = formData.get("headline") as string;
  const bio = formData.get("bio") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const whatsappNumber = formData.get("whatsappNumber") as string;
  const whatsappLabel = formData.get("whatsappLabel") as string;
  const websiteUrl = formData.get("websiteUrl") as string;
  const tagIds = formData.getAll("tagIds") as string[];

  const existingSlug = await db
    .select()
    .from(profiles)
    .where(eq(profiles.slug, slug))
    .limit(1);

  if (existingSlug.length > 0) {
    return { error: "Slug is already taken. Please choose another." };
  }

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
    ownerId: user.id,
    isClaimed: true,
    isVerified: false,
    isBoosted: false,
  });

  if (tagIds.length > 0) {
    await db.insert(profilesToTags).values(
      tagIds.map((tagId) => ({
        profileId: id,
        tagId,
      })),
    );
  }

  throw redirect("/dashboard/profile");
}

export default function DashboardNewProfile() {
  const { tagsByGroup } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
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
        <h1 className="text-2xl font-bold">Create New Profile</h1>
        <Link to="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      {actionData?.error && (
        <div className="mb-4 rounded bg-red-50 p-4 text-red-600">
          {actionData.error}
        </div>
      )}

      <Form method="post" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
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
                <p className="text-xs text-gray-500">
                  URL: kelasmengaji.online/@{slug}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select name="type" defaultValue="individual">
                <SelectTrigger>
                  <SelectValue className="capitalize" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                name="headline"
                id="headline"
                placeholder="e.g., Guru Al-Quran berpengalaman 10 tahun"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                name="bio"
                id="bio"
                rows={4}
                placeholder="Describe your classes, teaching experience, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input name="imageUrl" id="imageUrl" placeholder="https://..." />
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
                  placeholder="+60123456789"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsappLabel">WhatsApp Label</Label>
                <Input
                  name="whatsappLabel"
                  id="whatsappLabel"
                  placeholder="e.g., Untuk pertanyaan"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input
                name="websiteUrl"
                id="websiteUrl"
                placeholder="https://..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(tagsByGroup).map(([group, tags]) => (
              <div key={group}>
                <Label className="mb-2 block text-sm font-medium capitalize">
                  {group.replace(/_/g, " ")}
                </Label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <label
                      key={tag.id}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        name="tagIds"
                        value={tag.id}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Profile"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
