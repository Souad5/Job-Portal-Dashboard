import { useForm, FormProvider } from "react-hook-form";
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  recruiterSchema,
  type RecruiterFormValues,
} from "../types/recruiter.schema";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
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
import { API_BASE_URL } from "@/config";
import Loading from "@/components/ui/Loading";

/* ---------------- types ---------------- */
type Recruiter = {
  _id: string;
  name: string;
  email: string;
  temPassword: string;
};

/* ---------------- page ---------------- */
const RecruiterPage = () => {
  const queryClient = useQueryClient();
  const editMethods = useForm<Recruiter>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(
    null,
  );

  // ------------------create recruiter-------------------

  const createRecruiterMutation = useMutation({
    mutationFn: async (data: RecruiterFormValues) => {
      const res = await axios.post(`${API_BASE_URL}/admin/create-recruiter`, {
        name: data.recruiterName,
        email: data.recruiterEmail,
        temPassword: data.temPassword,
        confirmTemPassword: data.confirmPassword,
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Recruiter added successfully");
      methods.reset();
      queryClient.invalidateQueries({ queryKey: ["recruiters"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log("Backend error:", error.response?.data);
      toast.error(
        error.response?.data?.message || "Failed to create recruiter",
      );
    },
  });

  // -----------------------Get---------------------------------

  const { data: recruiters = [], isLoading } = useQuery({
    queryKey: ["recruiters"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/admin/recruiter-all`);
      return res.data;
    },
  });

  // ------------------update-----------------

  const updateRecruiterMutation = useMutation({
    mutationFn: async (data: Recruiter) => {
      const res = await axios.put(
        `${API_BASE_URL}/admin/recruiter/${data._id}`,
        {
          name: data.name,
          email: data.email,
          temPassword: data.temPassword,
        },
      );

      return res.data;
    },
    onSuccess: () => {
      toast.success("Recruiter updated");
      queryClient.invalidateQueries({ queryKey: ["recruiters"] });
      setModalType(null);
    },
  });

  // -------------------delete--------------------

  const deleteRecruiterMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`${API_BASE_URL}/admin/recruiter/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Recruiter deleted");
      queryClient.invalidateQueries({ queryKey: ["recruiters"] });
      setModalType(null);
    },
  });

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
        accessorKey: "temPassword",
        header: ({ column }) => (
          <button
            onClick={column.getToggleSortingHandler()}
            className="flex items-center gap-2 font-medium cursor-pointer select-none text-slate-700 dark:text-slate-300"
          >
            <span>Temporary Password</span>

            <span>
              {column.getIsSorted() === "asc" && "▲"}
              {column.getIsSorted() === "desc" && "▼"}
              {!column.getIsSorted() && "⇅"}
            </span>
          </button>
        ),
        cell: (info) => (
          <span className="text-slate-600 dark:text-slate-400 font-mono">
            {info.getValue() as string}
          </span>
        ),
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
    data: recruiters,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const onSubmit = (data: RecruiterFormValues) => {
    createRecruiterMutation.mutate(data);
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
        <h1 className="md:text-3xl text-xl font-semibold text-[#044635] dark:text-emerald-300">
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
              <Button
                value={
                  createRecruiterMutation.isPending
                    ? "Creating..."
                    : "Create Recruiter"
                }
                type="submit"
              />
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
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    <Loading />
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
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
                ))
              )}
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
          <form
            onSubmit={editMethods.handleSubmit((data) => {
              if (!selectedRecruiter) return;

              updateRecruiterMutation.mutate({
                ...data,
                _id: selectedRecruiter._id,
              });
            })}
            className="space-y-4 px-4 py-6"
          >
            <Input name="name" label="Recruiter Name" />
            <Input name="email" label="Recruiter Email" />
            <PasswordInput
              name="temPassword"
              label="Temporary Password"
              placeholder="Enter temporary password"
            />
            <div className="flex justify-end gap-3">
              <SecondaryButton
                value="Cancel"
                className="text-black dark:text-white "
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
        <div className="flex justify-end gap-3 px-4 py-6">
          <SecondaryButton
            value="Cancel"
            className="text-black dark:text-white"
            onClick={() => setModalType(null)}
          />
          <Button
            value="Delete"
            onClick={() =>
              selectedRecruiter &&
              deleteRecruiterMutation.mutate(selectedRecruiter._id)
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default RecruiterPage;
