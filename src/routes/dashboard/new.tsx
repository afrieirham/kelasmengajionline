import { eq } from "drizzle-orm";
import { useRef, useState } from "react";
import {
  Form,
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
    return { error: "Slug telah digunakan. Sila pilih yang lain." };
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
        <h1 className="text-2xl font-bold">Cipta Profil Baharu</h1>
      </div>

      {actionData?.error && (
        <div className="mb-4 rounded bg-red-50 p-4 text-red-600">
          {actionData.error}
        </div>
      )}

      <Form method="post" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Maklumat Asas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama *</Label>
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
              <Label htmlFor="type">Jenis</Label>
              <Select name="type" defaultValue="individual">
                <SelectTrigger>
                  <SelectValue className="capitalize" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individu</SelectItem>
                  <SelectItem value="organization">Organisasi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="headline">Tajuk</Label>
              <Input
                name="headline"
                id="headline"
                placeholder="cth., Guru Al-Quran berpengalaman 10 tahun"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                name="bio"
                id="bio"
                rows={4}
                placeholder="Terangkan kelas anda, pengalaman mengajar, dll."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL Imej</Label>
              <Input name="imageUrl" id="imageUrl" placeholder="https://..." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maklumat Perhubungan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">Nombor WhatsApp</Label>
                <Input
                  name="whatsappNumber"
                  id="whatsappNumber"
                  placeholder="+60123456789"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsappLabel">Label WhatsApp</Label>
                <Input
                  name="whatsappLabel"
                  id="whatsappLabel"
                  placeholder="cth., Untuk pertanyaan"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteUrl">URL Laman Web</Label>
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
            <CardTitle>Tag</CardTitle>
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
            {isSubmitting ? "Mencipta..." : "Cipta Profil"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
