/**
 * We declare a module `tm_parser?init` which will reexport the original module types `tm_parser`
 *
 * This only export types, the actual module will be imported at runtime.
 *
 * This allow Typescript to understand the module type when importing `tm_parser?init` instead of `tm_parser`
 * We need to import `tm_parser?init` to have the js glue allowing to load the wasm module
 */
declare module "tm_parser?init" {
  import type * as Module from "tm_parser";

  // Export all types from the original module
  export * from "tm_parser";
  // We also export the default export, usually imported as `init`
  export default Module.default;
}
