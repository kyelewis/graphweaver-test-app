import { buildContentfulSchema } from "@kyedoesdev/graphweaver-contentful/build";
import { clientOptions } from "./client";

export const build = async () => {
  console.log("Building 'Profile'");
  await buildContentfulSchema(clientOptions, "profile");
  console.log("Done!");
};
