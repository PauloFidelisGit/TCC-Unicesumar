import { ContextFunction } from "@apollo/server";
import { StandaloneServerContextFunctionArgument } from "@apollo/server/standalone";
import { Request } from "express";
import { PolicyManager } from "../security/policy.manager.js";
import { ResolverContext } from "./resolver.context.js";

export const setContext: ContextFunction<
  [StandaloneServerContextFunctionArgument],
  ResolverContext
> = async ({ req }) => {
  const user = (req as Request)?.["user"]!;
  return {
    parent: {} as Record<string, any>,
    user,
    policy: new PolicyManager({ user }),
  };
};
