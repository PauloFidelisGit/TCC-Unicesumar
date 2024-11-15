import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { cn } from "@/lib/utils";
import { SelectProps } from "@radix-ui/react-select";
import { forwardRef, LegacyRef } from "react";
import { CustomButton } from "./custom-buttons";
import { IconBaselineClose } from "./icons";
import { Label } from "./shadcn/label";

interface InputSelectProps
  extends SelectProps,
    React.RefAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  options: readonly {
    label: string;
    value: string;
  }[];
  className?: string;
}
export const ControlledInputSelect = forwardRef(
  (
    {
      label,
      description,
      options,
      className,
      placeholder,
      ...props
    }: InputSelectProps,
    ref: LegacyRef<any>,
  ) => (
    <FormField
      name={props.name}
      render={({ field }) => (
        <FormItem ref={ref} className={cn(className)}>
          <FormLabel>{label}</FormLabel>
          <div className="grid grid-cols-[1fr_auto] items-center gap-1">
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
              {...props}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!props.required ||
              (field.value !== "" && (
                <CustomButton
                  className="w-full px-2"
                  variant="ghost"
                  size="sm"
                  onClick={() => field.onChange("")}
                  type="button"
                  icon={IconBaselineClose}
                />
              ))}
          </div>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
);

interface CustomUncontrolledSelectProps extends Omit<InputSelectProps, "name"> {
  name?: string;
}
export const CustomUncontrolledSelect = forwardRef(
  (
    {
      label,
      options,
      placeholder,
      className,
      ...props
    }: CustomUncontrolledSelectProps,
    ref: LegacyRef<any>,
  ) => (
    <div ref={ref} className={cn("space-y-2", className)}>
      <Label>
        {label}
        {props.required && " *"}
      </Label>
      <div className="grid grid-cols-[1fr_auto] items-center gap-1">
        <Select defaultValue={props.value} {...props}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
);
