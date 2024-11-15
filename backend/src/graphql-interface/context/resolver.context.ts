import { PolicyManager } from "../security/policy.manager.js";

type CreateKind<K, T> = {
  kind: K;
} & T;

type Admin = CreateKind<"admin", { uuid: string; permissoes: string[] }>;

type Advogado = CreateKind<"advogado", { uuid: string; permissoes: string[] }>;

type User = Admin | Advogado;

export interface ResolverContext {
  user: User | null;
  policy: PolicyManager;
}
