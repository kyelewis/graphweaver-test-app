import { buildContentfulSchema } from "@exogee/graphweaver-contentful/build";
import { clientOptions } from "./client";

export const build = async () => {
  console.log("Building Contentful Schema");
  await buildContentfulSchema(clientOptions, "article");
  await buildContentfulSchema(clientOptions, "link");
  await buildContentfulSchema(clientOptions, "personProfile");
  console.log("Done!");
};
