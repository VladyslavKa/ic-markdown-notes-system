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

interface DialogConfirmProps {
  triggerText: React.ReactNode;
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
      <DialogTrigger render={<Button variant="destructive" />}>
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
