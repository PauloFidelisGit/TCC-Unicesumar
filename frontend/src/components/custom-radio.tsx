import { cn } from "@/lib/utils";
import { forwardRef, LegacyRef } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./shadcn/form";
import { RadioGroup, RadioGroupItem } from "./shadcn/radio-group";

interface InputTextProps {
  name: string;
  children: React.ReactNode;
  className?: string;
}
export const CustomRadioGroup = forwardRef(
  ({ children, className, name }: InputTextProps, ref: LegacyRef<any>) => (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              id="radio-group"
              ref={ref}
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn(className ? className : "flex flex-col space-y-1")}
            >
              {children}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
);

interface CustomRadioItemProps {
  value: string;
  label: string;
}
export const CustomRadioItem = forwardRef<HTMLButtonElement, CustomRadioItemProps>(
  ({ value, label }, ref) => (
    <FormItem className="flex items-center space-x-2 space-y-0">
      <FormControl>
        <RadioGroupItem value={value} ref={ref} />
      </FormControl>
      <FormLabel className="font-normal">{label}</FormLabel>
    </FormItem>
  ),
);
