import { useState } from "react";

export function useDialog(initial = false) {
  const [open, onOpenChange] = useState(initial);
  return {
    closeDialog: () => onOpenChange(false),
    openDialog: () => onOpenChange(true),
    toogleDialog: () => onOpenChange(!open),
    control: {
      open,
      onOpenChange,
    },
  };
}

export type UseDialog = ReturnType<typeof useDialog>;
