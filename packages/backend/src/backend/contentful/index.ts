import { createContentfulResolver } from "@kyedoesdev/graphweaver-contentful";
import { clientOptions } from "./client";

export const contentfulProfile = createContentfulResolver(
  clientOptions,
  "profile"
);
