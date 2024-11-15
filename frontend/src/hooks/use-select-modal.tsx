import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export function useSelectModal(
  fieldName: string,
  args: {
    initialValue?: {
      label: string;
      value: string;
    };
    setFieldValue: UseFormSetValue<any>;
  },
) {
  const [open, onOpenChange] = useState(false);

  useEffect(() => {
    if (args.initialValue) {
      args.setFieldValue(fieldName, args.initialValue);
    }
  }, [args.initialValue]);

  return {
    openModal: () => onOpenChange(true),
    closeModal: () => onOpenChange(false),
    control: {
      open,
      onOpenChange,
      setData: (data: { label: string; value: string }) => {
        args.setFieldValue(fieldName, data);
      },
    },
  };
}
export type UseSelectModalControl = ReturnType<
  typeof useSelectModal
>["control"];
