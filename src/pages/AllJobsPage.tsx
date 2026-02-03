import { useState, useMemo } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Briefcase, MapPin } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedAt: string;
  color: string;
}

// Fake Data
const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Acme Technologies",
    location: "San Francisco, CA",
    type: "Full-time",
    postedAt: "2 days ago",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Nimbus Labs",
    location: "Remote",
    type: "Remote",
    postedAt: "5 days ago",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "Atlas Systems",
    location: "Berlin, Germany",
    type: "Full-time",
    postedAt: "1 week ago",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "4",
    title: "Engineering Manager",
    company: "Vertex Corp",
    location: "New York, NY",
    type: "Hybrid",
    postedAt: "2 weeks ago",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "Aurora AI",
    location: "London, UK",
    type: "Full-time",
    postedAt: "3 days ago",
    color: "bg-pink-100 text-pink-800",
  },
  {
    id: "6",
    title: "UX Researcher",
    company: "Nimbus Labs",
    location: "Remote",
    type: "Remote",
    postedAt: "1 day ago",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "7",
    title: "Data Scientist",
    company: "Aurora AI",
    location: "London, UK",
    type: "Full-time",
    postedAt: "3 days ago",
    color: "bg-pink-100 text-pink-800",
  },
];

export default function JobsTablePage() {
  const [pageSize] = useState(10);

  const columns = useMemo<ColumnDef<Job>[]>(
    () => [
      {
        header: "Job Title",
        accessorKey: "title",
        cell: (info) => (
          <span className="font-medium text-gray-900 hover:text-indigo-600 cursor-pointer">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        header: "Company",
        accessorKey: "company",
        cell: (info) => (
          <div className="flex items-center gap-1 text-gray-500">
            <Briefcase size={14} /> {info.getValue() as string}
          </div>
        ),
      },
      {
        header: "Location",
        accessorKey: "location",
        cell: (info) => (
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin size={14} /> {info.getValue() as string}
          </div>
        ),
      },
      {
        header: "Type",
        accessorKey: "type",
        cell: (info) => {
          const job = info.row.original;
          return (
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${job.color}`}
            >
              {info.getValue() as string}
            </span>
          );
        },
      },
      {
        header: "Posted",
        accessorKey: "postedAt",
        cell: (info) => (
          <span className="text-gray-400">{info.getValue() as string}</span>
        ),
      },
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: jobs,
    columns,
    pageCount: Math.ceil(jobs.length / pageSize),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="px-6 py-12">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">
        Open Positions
      </h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-6 text-left text-xl font-semibold text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {table
              .getRowModel()
              .rows.slice(0, pageSize) // pagination
              .map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-5 text-md">
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

      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-2 items-center text-sm text-gray-700">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {Math.ceil(jobs.length / pageSize)}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
