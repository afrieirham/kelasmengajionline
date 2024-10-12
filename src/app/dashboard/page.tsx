import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-lg font-bold">Maklumat Pengajar</p>
          <div className="mt-4 flex flex-col gap-6 rounded-t-lg border bg-white p-6 lg:flex-row">
            <div className="w-full space-y-6">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="instructor-type">Jenis Pengajar</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis pengajar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individu</SelectItem>
                    <SelectItem value="organization">Organisasi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="logo">Gambar</Label>
                <Input id="logo" type="file" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="name">Nama</Label>
                <Input id="name" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" />
              </div>
            </div>
            <div className="w-full space-y-6">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="tiktok">TikTok</Label>
                <Input id="tiktok" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" />
              </div>
            </div>
          </div>
          <div className="w-full rounded-b-lg border-x border-b bg-gray-100 px-6 py-4">
            <Button>Simpan</Button>
          </div>
        </div>
        <div>
          <p className="text-lg font-bold">Maklumat Lain</p>
          <div className="mt-4 flex flex-col gap-6 rounded-t-lg border bg-white p-6 lg:flex-row">
            <div className="w-full space-y-6">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="name">Nama</Label>
                <Input id="name" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="instructor-type">Jantina</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jantina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Lelaki</SelectItem>
                    <SelectItem value="female">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="phone">Nombor Telefon</Label>
                <Input id="phone" placeholder="60 13 123 1234" />
              </div>
            </div>
          </div>
          <div className="w-full rounded-b-lg border-x border-b bg-gray-100 px-6 py-4">
            <Button>Simpan</Button>
          </div>
        </div>
      </div>
    </>
  );
}
