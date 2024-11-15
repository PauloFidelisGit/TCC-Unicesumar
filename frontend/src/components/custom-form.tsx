import { cn } from "@/lib/utils";
import * as React from "react";
import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  UseFormHandleSubmit,
} from "react-hook-form";

type FormProps = <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  methods,
  children,
  onSubmit,
  className,
}: {
  methods: Omit<
    FormProviderProps<TFieldValues, TContext, TTransformedValues>,
    "children"
  >;
  children: React.ReactNode;
  onSubmit: Parameters<
    UseFormHandleSubmit<TFieldValues, TTransformedValues>
  >[0];
  className?: string;
  disabled?: boolean;
}) => React.JSX.Element;

export const CustomForm: FormProps = ({
  methods,
  children,
  disabled,
  onSubmit,
  className,
}) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <fieldset disabled={disabled} className={cn(className)}>
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};
