import { buildContentfulSchema } from "@exogee/graphweaver-contentful/build";
import { clientOptions } from "./client";

export const build = async () => {
  console.log("Building Contentful Schema");
  await buildContentfulSchema(clientOptions, "article");
  console.log("Done!");
};
