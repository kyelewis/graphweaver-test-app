import { build as buildContentful } from "./contentful/build";

(async () => {
  console.log("Building Contentful");
  await buildContentful();
  console.log("Done!");
})();
