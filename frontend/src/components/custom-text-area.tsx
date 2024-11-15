import { forwardRef, LegacyRef } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./shadcn/form";
import { Textarea, TextareaProps } from "./shadcn/textarea";
import { Text } from "./typography";

interface Props
  extends Omit<TextareaProps, "onChange">,
    React.RefAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  onChange?: ({
    onChange,
    value,
  }: {
    onChange: (...event: any[]) => void;
    value: string;
  }) => void;
}

export const ControlledTextArea = forwardRef(
  ({ label, description, ...props }: Props, ref: LegacyRef<any>) => (
    <FormField
      name={props.name}
      render={({ field }) => (
        <FormItem ref={ref}>
          {label && (
            <FormLabel>
              {label}
              {props.required && " *"}
            </FormLabel>
          )}
          <FormControl>
            <Textarea {...props} {...field} />
          </FormControl>
          {props.maxLength && (
            <Text variant="muted" className="text-sm">
              {props.maxLength - field.value.length} caracteres restantes
            </Text>
          )}
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
);
