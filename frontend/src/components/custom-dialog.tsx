import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shadcn/alert-dialog";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  control: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  };
  to?: string;
  description?: string;
  labelAction?: string;
  onClickAction?: () => void;
  onClickCancel?: () => void;
}
export function CustomDialog({
  control,
  to,
  description,
  labelAction,
  onClickAction,
  onClickCancel,
}: Props) {
  return (
    <AlertDialog {...control}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Registro criado com sucesso!</AlertDialogTitle>
        </AlertDialogHeader>
        {description && (
          <AlertDialogDescription>{description}</AlertDialogDescription>
        )}
        <AlertDialogFooter className="">
          <AlertDialogCancel
            onClick={onClickCancel}
            className="m-auto mt-4 w-fit md:m-0"
          >
            Fechar
          </AlertDialogCancel>
          {to ? (
            <NavLink to={to} onClick={onClickAction} className="m-auto">
              <AlertDialogAction>{labelAction}</AlertDialogAction>
            </NavLink>
          ) : (
            <AlertDialogAction onClick={onClickAction}>
              {labelAction}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
