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
          className="
            fixed inset-0 z-40 bg-black/30 backdrop-blur-sm
            data-[state=open]:animate-fade-in
            data-[state=closed]:animate-fade-out
          "
        />

        {/* Modal container */}
        <Dialog.Content
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            p-4
            focus:outline-none
          "
        >
          {/* Modal box */}
          <div
            className="
              relative
              w-full max-w-lg
              max-h-[90vh]
              rounded-xl bg-white shadow-xl
              overflow-hidden
              data-[state=open]:animate-scale-in
              data-[state=closed]:animate-scale-out
              motion-reduce:animate-none
            "
          >
            {/* Close button */}
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="
                  absolute right-4 top-4 z-20
                  rounded-md p-1
                  text-slate-400
                  hover:bg-slate-100 hover:text-slate-600
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                "
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>

            {/* Header */}
            {(title || description) && (
              <div className="sticky top-0 z-10 bg-white px-6 pt-6 pb-4 border-b border-gray-200">
                {title && (
                  <Dialog.Title className="text-xl font-semibold text-slate-900">
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <Dialog.Description className="mt-1 text-sm text-slate-500">
                    {description}
                  </Dialog.Description>
                )}
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-6rem)]">
              {children}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
