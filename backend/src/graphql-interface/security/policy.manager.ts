import { Logger } from "../../utils/logger.js";
import { ResolverContext } from "../context/resolver.context.js";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { AllPermissionsName } from "./all-permissions.js";

export interface PolicyManagerContextProps {
  user: ResolverContext["user"] | null;
}

type Rule = (
  policy: {
    requiredAll: (servicePermissions: AllPermissionsName[]) => boolean;
    requiredOne: (servicePermissions: AllPermissionsName[]) => boolean;
    required: (servicePermissions: AllPermissionsName) => boolean;
  },
  context: { user: PolicyManagerContextProps["user"] },
) => boolean;

export class PolicyManager {
  private rules: Set<Rule> = new Set();

  constructor(private context: PolicyManagerContextProps) {}

  addRule(rule: Rule) {
    this.rules.add(rule);
    return this;
  }

  executeRules(): void {
    if (!this.context?.user?.permissoes) {
      throw new UnauthorizedError("Permissões não encontradas.");
    }

    this.rules.forEach((rule) => {
      const missingPermissions: string[] = [];

      const required = (servicePermissions: AllPermissionsName) => {
        const isInclude =
          this.context.user?.permissoes.includes(servicePermissions);
        if (!isInclude) {
          missingPermissions.push(servicePermissions);
          return false;
        }
        return true;
      };

      const requiredOne = (servicePermissions: AllPermissionsName[]) => {
        return servicePermissions.some((permission) => {
          const isInclude = this.context.user?.permissoes.includes(permission);
          if (isInclude) return true;
          return false;
        });
      };

      const requiredAll = (servicePermissions: AllPermissionsName[]) => {
        return servicePermissions.some((permission) => {
          const isInclude = this.context.user?.permissoes.includes(permission);
          if (!isInclude) missingPermissions.push(permission);
          return missingPermissions.length === 0;
        });
      };

      const isPermited = rule(
        {
          requiredAll,
          requiredOne,
          required,
        },
        this.context,
      );

      if (!isPermited) {
        Logger.error("Permissões ausentes: ", {
          user: this.context.user,
          missingPermissions,
        });

        throw new UnauthorizedError(
          "Você não tem permissão para executar essa ação.",
        );
      }
    });
  }
}
