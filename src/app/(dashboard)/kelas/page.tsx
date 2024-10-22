import React from "react";

import { db } from "@/server/db";
import SubmitForm from "./_components/form";

async function KelasPage() {
  const tags = await db.query.tag.findMany();
  return <SubmitForm tags={tags} />;
}

export default KelasPage;
