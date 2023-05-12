import { join } from "node:path";
import type { AdditionalFunctionConfig } from "@exogee/graphweaver-builder";

interface GraphweaverConfig {
  backend?: {
    additionalFunctions?: Array<AdditionalFunctionConfig>;
  };
  adminUI?: {
    customPagesPath?: string;
  };
}

const config: GraphweaverConfig = {
  backend: {
    additionalFunctions: [],
  },
  adminUI: {
    customPagesPath: join(process.cwd(), "src", "admin-ui", "custom-pages"),
  },
};

export const backend = config.backend;
export const adminUI = config.adminUI;
