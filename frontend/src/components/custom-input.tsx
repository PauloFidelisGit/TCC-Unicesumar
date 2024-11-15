import { cn, currencyNoStyle, onlyNumbers } from "@/lib/utils";
import { forwardRef, LegacyRef } from "react";
import { CustomButton } from "./custom-buttons";
import { IconBaselineClose, IconBaselineSearch } from "./icons";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./shadcn/form";
import { Input, InputProps } from "./shadcn/input";

interface ControlledInputTextProps
  extends Omit<InputProps, "onChange" | "type">,
    React.RefAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  type?: "text" | "password" | "tel";
  onChange?: ({
    onChange,
    value,
  }: {
    onChange: (...event: any[]) => void;
    value: string;
  }) => void;
}

export const ControlledInputText = forwardRef(
  (
    { label, description, ...props }: ControlledInputTextProps,
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
            <Input
              {...props}
              {...field}
              onChange={(e) => {
                if (props.onChange) {
                  props.onChange({
                    onChange: field.onChange,
                    value: e.target.value,
                  });
                } else {
                  field.onChange(e);
                }
              }}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
);

interface InputTextProps
  extends Omit<InputProps, "onChange">,
    React.RefAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
}
export const InputText = forwardRef(
  (
    { label, className, description, errorMessage, ...props }: InputTextProps,
    ref: LegacyRef<any>,
  ) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {label && (
          <FormLabel>
            {label}
            {props.required && " *"}
          </FormLabel>
        )}
        <Input {...props} />
        {errorMessage && (
          <p
            className={cn(
              "text-[0.8rem] font-medium text-red-500 dark:text-red-900",
              className,
            )}
          >
            {errorMessage}
          </p>
        )}
        {description && (
          <p
            className={cn(
              "text-[0.8rem] text-zinc-500 dark:text-zinc-400",
              className,
            )}
          />
        )}
        {description}
      </div>
    );
  },
);

interface InputFindValueProps
  extends Omit<ControlledInputTextProps, "onClick"> {
  onClick: () => void;
  buttonLabel: string;
  formatValue?: (value: string) => string;
}
export const ControlledInputFindValue = forwardRef(
  (
    {
      label,
      buttonLabel,
      description,
      onClick,
      formatValue,
      ...props
    }: InputFindValueProps,
    ref: LegacyRef<any>,
  ) => (
    <FormField
      name={props.name}
      render={({ field: { value, ...field }, formState: { errors } }) => {
        const errorMessage = (errors?.[props.name] || {}) as unknown as {
          value?: {
            message?: string;
          };
        };

        return (
          <FormItem ref={ref}>
            {label && (
              <FormLabel>
                {label}
                {props.required && " *"}
              </FormLabel>
            )}
            {!value?.value ? (
              <div>
                <CustomButton
                  label={buttonLabel}
                  icon={IconBaselineSearch}
                  variant="outline"
                  onClick={onClick}
                  type="button"
                  disabled={props.disabled}
                />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-[1fr_auto] items-center gap-1">
                  <FormControl>
                    <Input
                      {...props}
                      {...field}
                      readOnly
                      value={
                        formatValue ? formatValue(value?.label) : value?.label
                      }
                      onChange={(e) => {
                        if (props.onChange) {
                          props.onChange({
                            onChange: field.onChange,
                            value: e.target.value,
                          });
                        } else {
                          field.onChange(e);
                        }
                      }}
                    />
                  </FormControl>
                  {value?.value && (
                    <CustomButton
                      variant="ghost"
                      onClick={() => field.onChange({ label: "", value: "" })}
                      type="button"
                      icon={IconBaselineClose}
                      disabled={props.disabled}
                    />
                  )}
                </div>
                {description && (
                  <FormDescription>{description}</FormDescription>
                )}
              </>
            )}
            {errorMessage.value?.message && (
              <p className="text-[0.8rem] font-medium text-red-500 dark:text-red-900">
                {errorMessage.value?.message}
              </p>
            )}
          </FormItem>
        );
      }}
    />
  ),
);

interface ControlledInputIntProps
  extends Omit<InputProps, "onChange" | "type">,
    React.RefAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
}

export const ControlledInputInt = forwardRef(
  (
    { label, description, ...props }: ControlledInputIntProps,
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
            <Input
              {...props}
              {...field}
              onChange={(e) => {
                field.onChange(onlyNumbers(e.target.value));
              }}
              type="text"
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
);

interface ControlledInputFloatProps
  extends Omit<InputProps, "onChange">,
    React.RefAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  type?: "datetime-local" | "date";
}
export const ControlledInputFloat = forwardRef(
  (
    { label, description, ...props }: ControlledInputFloatProps,
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
            <Input
              {...props}
              {...field}
              onChange={(e) => {
                field.onChange(currencyNoStyle(e.target.value));
              }}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  ),
);
