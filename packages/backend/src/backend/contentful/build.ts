import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { createClient, ContentfulTypeField } from "contentful";

import { fieldFromContentfulTypeField } from "./util";

const schemaDir = join(cwd(), ".graphweaver", "contentful");
const schemaFile = join(schemaDir, "schema.json");

export const build = async () => {
  // Get 'profile' content type
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
  const contentType = await client.getContentType("profile");

  // Map fields to simple-resolver fields
  const fields = contentType.fields.flatMap(
    (field) => fieldFromContentfulTypeField(field) || []
  );

  // Write out schema file
  mkdirSync(schemaDir, { recursive: true });
  writeFileSync(schemaFile, JSON.stringify(fields));
};
