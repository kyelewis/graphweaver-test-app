import { createContentfulResolver } from "@kyedoesdev/graphweaver-contentful";
import { clientOptions } from "./client";

export const contentfulArticle = createContentfulResolver(
  clientOptions,
  "article"
);

export const contentfulPersonProfile = createContentfulResolver(
  clientOptions,
  "personProfile"
);

export const contentfulLink = createContentfulResolver(
  clientOptions,
  "link"
);
