import { eq } from "drizzle-orm";
import { useState } from "react";
import { Form, useLoaderData, useSubmit } from "react-router";
import { db } from "@/.server/db";
import { type tagGroupEnum, tags } from "@/.server/db/schema";
import { ActionsDropdown } from "@/components/admin/actions-dropdown";
import { Badge } from "@/components/core/badge";
import { Button } from "@/components/core/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/core/dialog";
import { Input } from "@/components/core/input";
import { Label } from "@/components/core/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/core/table";
import { Textarea } from "@/components/core/textarea";
import { requireAdmin } from "@/lib/admin";

export async function loader({ request }: { request: Request }) {
  await requireAdmin(request);

  const tagList = await db.select().from(tags).orderBy(tags.group, tags.order);

  return { tags: tagList };
}

export async function action({ request }: { request: Request }) {
  await requireAdmin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "save") {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const group = formData.get(
      "group",
    ) as (typeof tagGroupEnum.enumValues)[number];
    const order = parseInt(formData.get("order") as string, 10) || 0;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const pageTitle = formData.get("pageTitle") as string;
    const descriptionText = formData.get("descriptionText") as string;

    if (id === "new") {
      const newId = crypto.randomUUID();
      await db.insert(tags).values({
        id: newId,
        name,
        slug,
        group,
        order,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        pageTitle: pageTitle || null,
        descriptionText: descriptionText || null,
      });
    } else {
      await db
        .update(tags)
        .set({
          name,
          slug,
          group,
          order,
          metaTitle: metaTitle || null,
          metaDescription: metaDescription || null,
          pageTitle: pageTitle || null,
          descriptionText: descriptionText || null,
        })
        .where(eq(tags.id, id));
    }

    return { success: true };
  }

  if (intent === "delete") {
    const id = formData.get("id") as string;
    await db.delete(tags).where(eq(tags.id, id));
  }

  return { success: false };
}

const groupLabels: Record<string, string> = {
  jantina_guru: "Jantina Guru",
  kategori_pelajar: "Kategori Pelajar",
  format_kelas: "Format Kelas",
  yuran_kelas: "Yuran Kelas",
  polisi_kelas: "Polisi Kelas",
  kelebihan_tambahan: "Kelebihan Tambahan",
};

export default function AdminTags() {
  const { tags: tagList } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const [editingTagId, setEditingTagId] = useState<string | null>(null);

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
        <h1 className="text-2xl font-bold">Tags</h1>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>SEO Title</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tagList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No tags found
                </TableCell>
              </TableRow>
            ) : (
              tagList.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell className="font-medium">{tag.name}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {tag.slug}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {groupLabels[tag.group] || tag.group}
                    </Badge>
                  </TableCell>
                  <TableCell>{tag.order}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {tag.metaTitle || "-"}
                  </TableCell>
                  <TableCell>
                    <Dialog
                      open={editingTagId === tag.id}
                      onOpenChange={(open) => !open && setEditingTagId(null)}
                    >
                      <ActionsDropdown
                        actions={[
                          {
                            label: "Edit",
                            key: `edit-${tag.id}`,
                            onClick: () => setEditingTagId(tag.id),
                          },
                          {
                            label: "Delete",
                            variant: "destructive",
                            key: `delete-${tag.id}`,
                            onClick: () => handleDelete(tag.id),
                          },
                        ]}
                      />
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Tag</DialogTitle>
                        </DialogHeader>
                        <Form method="post" className="space-y-4">
                          <input type="hidden" name="intent" value="save" />
                          <input type="hidden" name="id" value={tag.id} />
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`name-${tag.id}`}>Name</Label>
                              <Input
                                name="name"
                                id={`name-${tag.id}`}
                                defaultValue={tag.name}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`slug-${tag.id}`}>Slug</Label>
                              <Input
                                name="slug"
                                id={`slug-${tag.id}`}
                                defaultValue={tag.slug}
                                required
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`group-${tag.id}`}>Group</Label>
                              <Input
                                name="group"
                                id={`group-${tag.id}`}
                                defaultValue={tag.group}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`order-${tag.id}`}>Order</Label>
                              <Input
                                name="order"
                                id={`order-${tag.id}`}
                                type="number"
                                defaultValue={tag.order}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`metaTitle-${tag.id}`}>
                              Meta Title
                            </Label>
                            <Input
                              name="metaTitle"
                              id={`metaTitle-${tag.id}`}
                              defaultValue={tag.metaTitle || ""}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`metaDescription-${tag.id}`}>
                              Meta Description
                            </Label>
                            <Textarea
                              name="metaDescription"
                              id={`metaDescription-${tag.id}`}
                              defaultValue={tag.metaDescription || ""}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`pageTitle-${tag.id}`}>
                              Page Title
                            </Label>
                            <Input
                              name="pageTitle"
                              id={`pageTitle-${tag.id}`}
                              defaultValue={tag.pageTitle || ""}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`descriptionText-${tag.id}`}>
                              Description Text
                            </Label>
                            <Textarea
                              name="descriptionText"
                              id={`descriptionText-${tag.id}`}
                              defaultValue={tag.descriptionText || ""}
                            />
                          </div>
                          <Button type="submit">Save Tag</Button>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Dialog>
          <DialogTrigger>
            <Button>Add Tag</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>New Tag</DialogTitle>
            </DialogHeader>
            <Form method="post" className="space-y-4">
              <input type="hidden" name="intent" value="save" />
              <input type="hidden" name="id" value="new" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name-new">Name</Label>
                  <Input name="name" id="name-new" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug-new">Slug</Label>
                  <Input name="slug" id="slug-new" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="group-new">Group</Label>
                  <Input name="group" id="group-new" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order-new">Order</Label>
                  <Input
                    name="order"
                    id="order-new"
                    type="number"
                    defaultValue="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaTitle-new">Meta Title</Label>
                <Input name="metaTitle" id="metaTitle-new" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription-new">Meta Description</Label>
                <Textarea name="metaDescription" id="metaDescription-new" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pageTitle-new">Page Title</Label>
                <Input name="pageTitle" id="pageTitle-new" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionText-new">Description Text</Label>
                <Textarea name="descriptionText" id="descriptionText-new" />
              </div>
              <Button type="submit">Create Tag</Button>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
