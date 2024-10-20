import { useState } from "react";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TestLinkButton from "./test-link-button";

export default function PhoneContactForm({
  index,
  phone,
  message,
  onRemove,
}: {
  index: number;
  phone: { id: number; name: string; value: string };
  message?: string;
  onRemove?: (phoneId: number) => void;
}) {
  const [value, setValue] = useState("");
  return (
    <div
      key={phone.id}
      className="grid w-full max-w-sm items-center gap-2 rounded-lg border p-4"
    >
      <div className="flex items-center justify-between">
        <Label>Nombor Telefon {index + 1}</Label>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(phone.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Label className="mt-2 text-xs" htmlFor="phone-name">
        Nama
      </Label>
      <Input id="phone-name" placeholder="Ustaz Amir" />
      <Label className="text-xs" htmlFor="phone-contact">
        Nombor
      </Label>
      <Input
        id="phone-contact"
        placeholder="60 13 123 1234"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <TestLinkButton phone={value} message={message} />
    </div>
  );
}
