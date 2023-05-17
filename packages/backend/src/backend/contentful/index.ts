import { createContentfulResolver } from "@exogee/graphweaver-contentful";
import { clientOptions } from "./client";

import { createContentfulSearch } from "./search";

export const article = createContentfulResolver(
  clientOptions,
  "article"
);

export const Search = createContentfulSearch(
  { articleEntity: () => article.entity }
);
