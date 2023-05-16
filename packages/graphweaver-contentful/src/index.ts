import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { createClient } from "contentful";
import { createResolver, createProvider } from '@exogee/graphweaver-helpers';

import { caps, addResolveToFields, mapContentfulItem } from "./util";

export const createContentfulResolver = (config, content_type) => {
  const schemaPath = join(
    cwd(),
    ".graphweaver",
    "contentful",
    `${content_type}.schema.json`
  );
  const fields = addResolveToFields(JSON.parse(readFileSync(schemaPath)));

  return createResolver({
    name: `contentful${caps(content_type)}`,
    fields,
    provider: createProvider({
      backendId: "Contentful",
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
        return (await client.getEntries({ content_type })).items.map((item) =>
          mapContentfulItem(item, fields)
        );
      },
    }),
  });

};
