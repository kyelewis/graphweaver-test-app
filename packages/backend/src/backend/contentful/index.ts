import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { createClient } from "contentful";
import GraphweaverSimpleResolver, {
  FieldOptions,
} from "@kyedoesdev/graphweaver-simple-resolver";
import { addResolveToFields, mapContentfulItem } from "./util";

const schemaPath = join(cwd(), ".graphweaver", "contentful", "schema.json");
const fields = addResolveToFields(JSON.parse(readFileSync(schemaPath)));

export const contentful = new GraphweaverSimpleResolver({
  name: "contentful",
  fields,
  init: async () => {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
    return { client };
  },
  read: async ({ client }, filter, pagination) => {
    if (filter?.id)
      return mapContentfulItem(await client.getEntry(filter.id), fields);
    return (await client.getEntries({ content_type: "profile" })).items.map(
      (item) => mapContentfulItem(item, fields)
    );
  },
});
