import { createContentfulResolver } from "@exogee/graphweaver-contentful";
import { clientOptions } from "./client";

export const article = createContentfulResolver(
  clientOptions,
  "article"
);

export const personProfile = createContentfulResolver(
  clientOptions,
  "personProfile"
);

export const link = createContentfulResolver(
  clientOptions,
  "link"
);
