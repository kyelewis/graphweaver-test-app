import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { createClient, ContentfulTypeField } from "contentful";

import { fieldFromContentfulTypeField } from "./util";

export const buildContentfulSchema = async (clientConfig, content_type) => {
  const schemaDir = join(cwd(), ".graphweaver", "contentful");
  const schemaFile = join(schemaDir, `${content_type}.schema.json`);

  // Get 'profile' content type
  const client = createClient(clientConfig);
  const contentType = await client.getContentType(content_type);

  // Map fields to simple-resolver fields
  const fields = contentType.fields.flatMap(
    (field) => fieldFromContentfulTypeField(field) || []
  );

  // Write out schema file
  mkdirSync(schemaDir, { recursive: true });
  writeFileSync(schemaFile, JSON.stringify(fields));
};
