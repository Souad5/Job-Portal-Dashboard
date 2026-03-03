import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string | ReactNode;
  description?: ReactNode;
  children: ReactNode;
  trigger?: ReactNode;
}

export const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 dark:bg-black/50 transition-opacity" />

        {/* Modal Content */}
        <Dialog.Content
          className="
            fixed inset-0 z-50 flex items-center justify-center p-4
            focus:outline-none
          "
        >
          <div
            className="
              relative w-full max-w-xl md:max-w-2xl
              max-h-[90vh] sm:max-h-[85vh]
              rounded-xl bg-white dark:bg-gray-800 shadow-xl
              overflow-hidden
              flex flex-col
              data-[state=open]:animate-scale-in
              data-[state=closed]:animate-scale-out
              motion-reduce:animate-none
            "
          >
            {/* Close Button */}
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="
                  absolute top-4 right-4 z-20 p-1 rounded-md
                  text-slate-400 dark:text-slate-200
                  hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-slate-600 dark:hover:text-white
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                  transition cursor-pointer
                "
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>

            {/* Header */}
            {(title || description) && (
              <div className="sticky top-0 z-10 px-6 pt-6 pb-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
                {title && (
                  <Dialog.Title className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <Dialog.Description className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {description}
                  </Dialog.Description>
                )}
              </div>
            )}

            {/* Body */}
            <div className="overflow-y-auto flex-1 max-h-[calc(90vh-6rem)] sm:max-h-[calc(85vh-6rem)]">
              {children}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
