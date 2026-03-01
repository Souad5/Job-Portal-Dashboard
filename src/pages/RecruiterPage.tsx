import { useForm, FormProvider } from "react-hook-form";
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  recruiterSchema,
  RecruiterFormValues,
} from "../types/recruiter.schema";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import { Modal } from "../components/ui/Modal";
import SecondaryButton from "../components/ui/SecondaryButton";
import toast from "react-hot-toast";

/* ---------------- types ---------------- */
type Recruiter = {
  name: string;
  email: string;
  status: "Active" | "Disabled";
};

/* ---------------- mock data ---------------- */
const DATA: Recruiter[] = [
  { name: "John Doe", email: "john@company.com", status: "Active" },
  { name: "Sarah Smith", email: "sarah@company.com", status: "Disabled" },
];

/* ---------------- page ---------------- */
const RecruiterPage = () => {
  const editMethods = useForm<Recruiter>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(
    null,
  );

  const columns = useMemo<ColumnDef<Recruiter>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button
            onClick={column.getToggleSortingHandler()}
            className="flex items-center gap-2 font-medium cursor-pointer select-none text-slate-700 dark:text-slate-300"
          >
            <span>Recruiter</span>
            <span>
              {column.getIsSorted() === "asc" && "▲"}
              {column.getIsSorted() === "desc" && "▼"}
              {!column.getIsSorted() && "⇅"}
            </span>
          </button>
        ),
        cell: (info) => (
          <span className="font-medium text-slate-600 dark:text-slate-400">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <button
            onClick={column.getToggleSortingHandler()}
            className="flex items-center gap-2 font-medium cursor-pointer select-none text-slate-700 dark:text-slate-300"
          >
            <span>Email</span>
            <span>
              {column.getIsSorted() === "asc" && "▲"}
              {column.getIsSorted() === "desc" && "▼"}
              {!column.getIsSorted() && "⇅"}
            </span>
          </button>
        ),
        cell: (info) => (
          <span className="text-slate-600 dark:text-slate-400">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <button
            onClick={column.getToggleSortingHandler()}
            className="flex items-center gap-2 font-medium cursor-pointer select-none text-slate-700 dark:text-slate-300"
          >
            <span>Status</span>

            <span>
              {column.getIsSorted() === "asc" && "▲"}
              {column.getIsSorted() === "desc" && "▼"}
              {!column.getIsSorted() && "⇅"}
            </span>
          </button>
        ),
        cell: (info) => {
          const value = info.getValue() as string;
          return (
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                value === "Active"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
              }`}
            >
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: "Actions",
        enableSorting: false,
        header: () => (
          <div className="text-right text-slate-700 font-medium dark:text-slate-300">
            Actions
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setSelectedRecruiter(row.original);
                editMethods.reset(row.original);
                setModalType("edit");
              }}
              className="text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 cursor-pointer"
              title="Edit"
            >
              <AiFillEdit size={25} />
            </button>
            <button
              onClick={() => {
                setSelectedRecruiter(row.original);
                setModalType("delete");
              }}
              title="Delete"
              className="text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 cursor-pointer"
            >
              <MdDelete size={25} />
            </button>
          </div>
        ),
      },
    ],
    [editMethods],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: DATA,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const onSubmit = (data: unknown) => {
    toast.success("Recruiter added successfully");
    console.log("Form Data:", data);
  };

  const methods = useForm<RecruiterFormValues>({
    resolver: zodResolver(recruiterSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <div className="min-h-screen px-4 py-6 bg-white dark:bg-slate-900 transition-colors duration-500 ease-in-out">
      {/* Header */}
      <header className="mb-10">
        <h1 className="md:text-3xl text-xl font-semibold text-slate-900 dark:text-emerald-300">
          Recruiter Management
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Create and manage recruiters who can post jobs
        </p>
      </header>

      {/* Create Recruiter */}
      <section className="mb-10 rounded-2xl p-6 shadow ring-1 ring-blue-200/70 dark:bg-slate-800 dark:ring-blue-900/40">
        <h2 className="text-lg font-semibold mb-6 text-slate-900 dark:text-slate-100">
          Create Recruiter
        </h2>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-5"
          >
            <Input
              name="recruiterName"
              placeholder="Enter name"
              label="Recruiter Name"
            />
            <Input
              name="recruiterEmail"
              placeholder="Enter email"
              label="Recruiter Email"
            />
            <PasswordInput
              name="temPassword"
              placeholder="Password"
              label="Temporary Password"
            />
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm password"
              label="Confirm Password"
            />

            <div className="flex justify-end mt-4">
              <Button value="Create Recruiter" type="submit" />
            </div>
          </form>
        </FormProvider>
      </section>

      {/* Recruiter Table */}
      <section className="rounded-2xl p-6 shadow ring-1 ring-blue-200/70 bg-white dark:bg-slate-800 dark:ring-blue-900/40">
        <h2 className="text-xl font-semibold mb-5 text-slate-900 dark:text-slate-100">
          Recruiter List
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr
                  key={hg.id}
                  className="text-lg text-slate-500 dark:text-slate-400"
                >
                  {hg.headers.map((header) => (
                    <th key={header.id} className="text-left px-4">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="bg-slate-50 hover:bg-indigo-50/60 dark:bg-slate-700 dark:hover:bg-slate-600 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modals */}
      <Modal
        open={modalType === "edit"}
        onOpenChange={() => setModalType(null)}
        title="Edit Recruiter"
        description={`Update details for ${selectedRecruiter?.name}`}
      >
        <FormProvider {...editMethods}>
          <form className="space-y-4">
            <Input name="name" label="Recruiter Name" />
            <Input name="email" label="Recruiter Email" />

            <div className="flex justify-end gap-3">
              <SecondaryButton
                value="Cancel"
                className="text-black dark:text-white"
                onClick={() => setModalType(null)}
              />
              <Button value="Save Changes" type="submit" />
            </div>
          </form>
        </FormProvider>
      </Modal>

      <Modal
        open={modalType === "delete"}
        onOpenChange={() => setModalType(null)}
        title="Delete Recruiter"
        description="This action cannot be undone"
      >
        <div className="flex justify-end gap-3">
          <SecondaryButton
            value="Cancel"
            className="text-black dark:text-white"
            onClick={() => setModalType(null)}
          />
          <Button value="Delete" />
        </div>
      </Modal>
    </div>
  );
};

export default RecruiterPage;
