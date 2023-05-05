var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/backend/index.ts
var backend_exports = {};
__export(backend_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(backend_exports);
var import_reflect_metadata = require("reflect-metadata");
var import_graphweaver_apollo = __toESM(require("@exogee/graphweaver-apollo"));
var import_aws_lambda = require("@as-integrations/aws-lambda");
console.log(process.env);
var graphweaver = new import_graphweaver_apollo.default({
  resolvers: [],
  adminMetadata: { enabled: true },
  mikroOrmOptions: []
});
var handler = (0, import_aws_lambda.startServerAndCreateLambdaHandler)(
  graphweaver.server,
  import_aws_lambda.handlers.createAPIGatewayProxyEventRequestHandler(),
  {}
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=index.js.map
