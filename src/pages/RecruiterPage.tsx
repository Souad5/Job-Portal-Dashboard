import { useForm, FormProvider } from "react-hook-form";
import { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import { Modal } from "../components/ui/Modal";

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

const EmployerPage = () => {
  const methods = useForm();
  const editMethods = useForm<Recruiter>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(
    null,
  );

  /* ---------------- columns ---------------- */

  const columns = useMemo<ColumnDef<Recruiter>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button
            onClick={column.getToggleSortingHandler()}
            className="flex items-center gap-2 font-medium cursor-pointer select-none
"
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
          <span className="font-medium text-slate-900">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <button
            onClick={column.getToggleSortingHandler()}
            className="flex items-center gap-1 font-medium"
          >
            Email
            {column.getIsSorted() === "asc" && "▲"}
            {column.getIsSorted() === "desc" && "▼"}
          </button>
        ),
        cell: (info) => (
          <span className="text-slate-600">{info.getValue() as string}</span>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <button
            onClick={column.getToggleSortingHandler()}
            className="flex items-center gap-1 font-medium"
          >
            Status
            {column.getIsSorted() === "asc" && "▲"}
            {column.getIsSorted() === "desc" && "▼"}
          </button>
        ),
        cell: (info) => {
          const value = info.getValue() as string;
          return (
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                value === "Active"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
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
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => (
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setSelectedRecruiter(row.original);
                editMethods.reset(row.original);
                setModalType("edit");
              }}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setSelectedRecruiter(row.original);
                setModalType("delete");
              }}
              className="text-sm font-medium text-rose-600 hover:text-rose-800 cursor-pointer"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [editMethods],
  );

  /* ---------------- table ---------------- */

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: DATA,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  /* ---------------- form submit ---------------- */

  const onSubmit = (data: unknown) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-slate-50">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-[#044635]">
          Recruiter Management
        </h1>
        <p className="text-slate-500">
          Create and manage recruiters who can post jobs
        </p>
      </header>

      {/* Create Recruiter */}
      <section className="mb-10 bg-white rounded-2xl p-6 shadow ring-1 ring-blue-200/70">
        <h2 className="text-lg font-semibold mb-6">Create Recruiter</h2>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-5"
          >
            <Input
              name="recruiterName"
              label="Recruiter Name"
              placeholder="Enter name"
              required
            />

            <Input
              name="recruiterEmail"
              label="Recruiter Email"
              placeholder="Enter email"
              type="email"
              required
            />

            <PasswordInput
              name="tempPassword"
              label="Temporary Password"
              placeholder="Enter password"
              required
            />

            <PasswordInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm password"
              required
            />

            <div className="flex justify-end mt-4">
              <Button value="Create Recruiter" type="submit" />
            </div>
          </form>
        </FormProvider>
      </section>

      {/* Recruiter Table */}
      <section className="bg-white rounded-2xl p-6 shadow ring-1 ring-blue-200/70">
        <h2 className="text-lg font-semibold mb-5">Recruiter List</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="text-sm text-slate-500">
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
                  className="bg-slate-50 hover:bg-indigo-50/60 transition"
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

      {/* Edit Modal */}
      <Modal
        open={modalType === "edit"}
        onOpenChange={() => setModalType(null)}
        title="Edit Recruiter"
        description={`Update details for ${selectedRecruiter?.name}`}
      >
        <FormProvider {...editMethods}>
          <form
            onSubmit={editMethods.handleSubmit((data) => {
              console.log("Edited recruiter:", data);
              setModalType(null);
            })}
            className="space-y-4"
          >
            <Input
              name="name"
              label="Recruiter Name"
              placeholder="Enter recruiter name"
              required
            />

            <Input
              name="email"
              label="Recruiter Email"
              placeholder="Enter recruiter email"
              required
            />

            <div className="flex justify-end gap-3">
              <Button value="Cancel" onClick={() => setModalType(null)} />
              <Button value="Save Changes" type="submit" />
            </div>
          </form>
        </FormProvider>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={modalType === "delete"}
        onOpenChange={() => setModalType(null)}
        title="Delete Recruiter"
        description="This action cannot be undone"
      >
        <div className="flex justify-end gap-3">
          <Button value="Cancel" onClick={() => setModalType(null)} />
          <Button value="Delete" />
        </div>
      </Modal>
    </div>
  );
};

export default EmployerPage;
