import "express";
import { ResolverContext } from "./graphql-interface/context/resolver.context.ts";

declare module "express" {
  export interface Request {
    user?: ResolverContext["user"];
  }
}
