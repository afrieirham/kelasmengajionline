import { eq } from "drizzle-orm";
import { Send } from "lucide-react";
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
import { Badge } from "@/components/core/badge";
import { Button } from "@/components/core/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/core/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/core/dialog";
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

function getStatusLabel(status: string): string {
  switch (status) {
    case "draft":
      return "Draf";
    case "pending":
      return "Menunggu semakan";
    case "approved":
      return "Diterima";
    case "rejected":
      return "Ditolak";
    default:
      return status;
  }
}

function getStatusBadgeVariant(
  status: string,
): "default" | "secondary" | "outline" | "destructive" {
  switch (status) {
    case "approved":
      return "default";
    case "pending":
      return "outline";
    case "rejected":
      return "destructive";
    default:
      return "secondary";
  }
}

export async function loader({ request }: { request: Request }) {
  const user = await requireUser(request);

  const profileList = await db
    .select()
    .from(profiles)
    .where(eq(profiles.ownerId, user.id))
    .limit(1);

  const profile = profileList[0];

  if (!profile) {
    throw redirect("/dashboard/new");
  }

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

  const profileTags = await db
    .select({ tagId: profilesToTags.tagId })
    .from(profilesToTags)
    .where(eq(profilesToTags.profileId, profile.id));

  return {
    profile,
    tagsByGroup,
    profileTagIds: profileTags.map((t) => t.tagId),
  };
}

export async function action({ request }: { request: Request }) {
  const user = await requireUser(request);
  const formData = await request.formData();

  const profileList = await db
    .select()
    .from(profiles)
    .where(eq(profiles.ownerId, user.id))
    .limit(1);

  const profile = profileList[0];

  if (!profile) {
    throw redirect("/dashboard/new");
  }

  const intent = formData.get("intent") as string | null;

  if (intent === "submitForReview") {
    if (profile.moderationStatus !== "draft") {
      return { error: "Hanya profil dalam draf boleh dihantar untuk semakan." };
    }

    await db
      .update(profiles)
      .set({ moderationStatus: "pending" })
      .where(eq(profiles.id, profile.id));

    return { success: true, submitted: true };
  }

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

  if (slug !== profile.slug) {
    const existingSlug = await db
      .select()
      .from(profiles)
      .where(eq(profiles.slug, slug))
      .limit(1);

    if (existingSlug.length > 0) {
      return { error: "Slug telah digunakan. Sila pilih yang lain." };
    }
  }

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
    })
    .where(eq(profiles.id, profile.id));

  await db
    .delete(profilesToTags)
    .where(eq(profilesToTags.profileId, profile.id));

  if (tagIds.length > 0) {
    await db.insert(profilesToTags).values(
      tagIds.map((tagId) => ({
        profileId: profile.id,
        tagId,
      })),
    );
  }

  return { success: true };
}

export default function DashboardProfile() {
  const { profile, tagsByGroup, profileTagIds } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Profil Saya</h1>
          <Badge variant={getStatusBadgeVariant(profile.moderationStatus)}>
            {getStatusLabel(profile.moderationStatus)}
          </Badge>
        </div>

        {profile.moderationStatus === "draft" && (
          <Dialog>
            <DialogTrigger>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Hantar untuk semakan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hantar untuk semakan?</DialogTitle>
                <DialogDescription>
                  Profil anda akan dihantar untuk semakan oleh admin. Anda tidak
                  boleh mengubah profil selepas ia dihantar sehingga admin
                  meluluskan atau menolak.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Form method="post">
                  <input type="hidden" name="intent" value="submitForReview" />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? "Menghantar..."
                      : "Ya, hantar untuk semakan"}
                  </Button>
                </Form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {actionData?.error && (
        <div className="mb-4 rounded bg-red-50 p-4 text-red-600">
          {actionData.error}
        </div>
      )}

      {actionData?.success && !actionData?.submitted && (
        <div className="mb-4 rounded bg-green-50 p-4 text-green-600">
          Profil berjaya disimpan!
        </div>
      )}

      {actionData?.success && actionData?.submitted && (
        <div className="mb-4 rounded bg-green-50 p-4 text-green-600">
          Profil berjaya dihantar untuk semakan!
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
              <Select name="type" defaultValue={profile?.type || "individual"}>
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
                defaultValue={profile?.headline || ""}
                placeholder="cth., Guru Al-Quran berpengalaman 10 tahun"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                name="bio"
                id="bio"
                rows={4}
                defaultValue={profile?.bio || ""}
                placeholder="Terangkan kelas anda, pengalaman mengajar, dll."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL Imej</Label>
              <Input
                name="imageUrl"
                id="imageUrl"
                defaultValue={profile?.imageUrl || ""}
                placeholder="https://..."
              />
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
                  defaultValue={profile?.whatsappNumber || ""}
                  placeholder="+60123456789"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsappLabel">Label WhatsApp</Label>
                <Input
                  name="whatsappLabel"
                  id="whatsappLabel"
                  defaultValue={profile?.whatsappLabel || ""}
                  placeholder="cth., Untuk pertanyaan"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteUrl">URL Laman Web</Label>
              <Input
                name="websiteUrl"
                id="websiteUrl"
                defaultValue={profile?.websiteUrl || ""}
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
                        defaultChecked={(profileTagIds as string[]).includes(
                          tag.id,
                        )}
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
            {isSubmitting ? "Menyimpan..." : "Simpan Profil"}
          </Button>
          <Link to={`/@${profile.slug}`} target="_blank">
            <Button variant="outline">Lihat Profil</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
