import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ComponentProps, ReactNode } from "react";

interface DialogConfirmProps {
  triggerText: ReactNode;
  triggerButtonProps?: Omit<ComponentProps<typeof Button>, "children">;
  title?: string;
  buttonSubmitText?: string;
  buttonCancelText?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function DialogConfirm({
  triggerText,
  triggerButtonProps,
  title = "Are you absolutely sure?",
  buttonSubmitText = "Confirm",
  buttonCancelText = "Cancel",
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: DialogConfirmProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        render={<Button variant="destructive" {...triggerButtonProps} />}
      >
        {triggerText}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />} onClick={onCancel}>
            {buttonCancelText}
          </DialogClose>
          <Button type="submit" onClick={onConfirm}>
            {buttonSubmitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
