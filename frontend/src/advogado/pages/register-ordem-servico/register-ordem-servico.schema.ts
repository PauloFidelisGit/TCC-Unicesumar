import { PRIORIDADE_ORDEM_SERVICO } from "@/domain/enums/PRIORIDADE_ORDEM_SERVICO";
import { STATUS_ORDEM_SERVICO } from "@/domain/enums/STATUS_ORDEM_SERVICO";
import { x } from "@/lib/custom-zod";
import { z } from "zod";

export const formSchema = z
  .object({
    descricao: x.string().or(z.literal("")),
    data_abertura: x.string().length(16, {
      message: "Campo obrigatório.",
    }),
    data_conclusao: x.string(),
    data_cancelamento: x.string(),
    prazo_conclusao: x.string(),
    status: x.nativeEnum(STATUS_ORDEM_SERVICO),
    prioridade: x.nativeEnum(PRIORIDADE_ORDEM_SERVICO),
    valor_servico: x.floatString(),
    servico: x.selectNav({ required: true }),
    processo: x.selectNav(),
    caso: x.selectNav(),
  })
  .superRefine((data, ctx) => {
    if (data.processo.value === "" && data.caso.value === "") {
      ctx.addIssue({
        message: "É necessário selecionar um processo ou um caso",
        path: ["processo.value"],
        code: "custom",
      });
      ctx.addIssue({
        message: "É necessário selecionar um processo ou um caso",
        path: ["caso.value"],
        code: "custom",
      });
    }

    if (
      data?.prazo_conclusao &&
      new Date(data.data_abertura) > new Date(data.prazo_conclusao)
    ) {
      ctx.addIssue({
        message:
          "O prazo de conclusão não pode ser anterior à data de abertura.",
        path: ["prazo_conclusao"],
        code: "custom",
      });
    }

    if (
      data?.data_conclusao &&
      new Date(data.data_abertura) > new Date(data.data_conclusao)
    ) {
      ctx.addIssue({
        message:
          "A data de conclusão não pode ser anterior à data de abertura.",
        path: ["data_conclusao"],
        code: "custom",
      });
    }

    if (
      data?.data_cancelamento &&
      new Date(data.data_abertura) > new Date(data.data_cancelamento)
    ) {
      ctx.addIssue({
        message:
          "A data de cancelamento não pode ser anterior à data de abertura.",
        path: ["data_cancelamento"],
        code: "custom",
      });
    }
  });
export type CreateOrdemServicoFormValues = z.input<typeof formSchema>;
