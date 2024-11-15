import { forwardRef, LegacyRef } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./shadcn/form";
import { Input, InputProps } from "./shadcn/input";

interface ControlledInputDateProps
  extends Omit<InputProps, "onChange">,
    React.RefAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  type?: "datetime-local" | "date";
}

export const ControlledInputDate = forwardRef(
  (
    { label, description, type, ...props }: ControlledInputDateProps,
    ref: LegacyRef<any>,
  ) => (
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
            <Input {...props} {...field} type={type ? type : "date"} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
);
