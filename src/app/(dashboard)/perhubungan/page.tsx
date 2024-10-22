"use client";
import React, { useState } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserRole } from "@/types";

import PhoneContactForm from "./_components/phone-contact-form";
import TestLinkButton from "./_components/test-link-button";

function PerhubunganPage() {
  const type = UserRole.Individual;
  const [parent] = useAutoAnimate();

  const [counter, setCounter] = useState(1);
  const [phones, setPhones] = useState([{ id: 0, name: "", value: "" }]);
  const [message, setMessage] = useState("");

  if (type === UserRole.Individual) {
    return (
      <div>
        <p className="text-lg font-bold">Maklumat Perhubungan (WhatsApp)</p>
        <div className="mt-4 flex flex-col gap-6 rounded-t-lg border bg-white p-6 lg:flex-row">
          <div className="w-full space-y-6">
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="phone">Nombor Telefon</Label>
              <Input id="phone" placeholder="60 13 123 1234" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="message">Template Mesej (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Asalamualaikum, saya berminat untuk sertai kelas mengaji online."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {phones[0] && (
              <TestLinkButton phone={phones[0].value} message={message} />
            )}
          </div>
        </div>
        <div className="w-full rounded-b-lg border-x border-b bg-gray-100 px-6 py-4">
          <Button>Simpan</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-lg font-bold">Maklumat Perhubungan (WhatsApp)</p>
      <div className="mt-4 flex flex-col gap-6 rounded-t-lg border bg-white p-6 lg:flex-row">
        <div className="w-full space-y-6">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="message">Template Mesej (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Asalamualaikum, saya berminat untuk sertai kelas mengaji online."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div ref={parent} className="flex flex-col gap-4">
            {phones.map((phone, i) => (
              <PhoneContactForm
                index={i}
                key={phone.id}
                phone={phone}
                message={message}
                onRemove={
                  i > 0
                    ? (phoneId) =>
                        setPhones(phones.filter(({ id }) => id !== phoneId))
                    : undefined
                }
              />
            ))}
            <div>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => {
                  setPhones([...phones, { id: counter, name: "", value: "" }]);
                  setCounter(counter + 1);
                }}
              >
                Tambah Nombor
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-b-lg border-x border-b bg-gray-100 px-6 py-4">
        <Button>Simpan</Button>
      </div>
    </div>
  );
}

export default PerhubunganPage;
