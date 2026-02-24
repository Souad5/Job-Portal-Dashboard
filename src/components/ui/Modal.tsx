import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  trigger?: ReactNode;
}

export const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  trigger,
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay
          style={{ zIndex: 100 }}
          className="fixed inset-0 bg-black/10 backdrop-blur-sm data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
        />

        {/* Content */}
        <Dialog.Content
          style={{ zIndex: 100 }}
          className="
            fixed left-1/2 top-1/2 w-[95%] md:w-full md:max-w-lg
            -translate-x-1/2 -translate-y-1/2
            rounded-xl bg-white p-6 shadow-lg
            focus:outline-none data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out max-h-[80vh] overflow-y-auto
          "
        >
          {/* Header */}
          {(title || description) && (
            <div className="mb-4">
              {title && (
                <Dialog.Title className="text-xl font-semibold text-slate-900">
                  {title}
                </Dialog.Title>
              )}
              {description && (
                <Dialog.Description className="mt-1 text-lg text-slate-500">
                  {description}
                </Dialog.Description>
              )}
            </div>
          )}

          {/* Body */}
          <div>{children}</div>

          {/* Close */}
          <Dialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute right-4 top-4 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4 cursor-pointer" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
