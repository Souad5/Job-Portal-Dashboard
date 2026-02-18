import { useForm, FormProvider } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const EmployerPage = () => {
  const methods = useForm();

  const onSubmit = (data: unknown) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 px-4 py-6">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#044635]">
          Recruiter Management
        </h1>
        <p className="text-slate-500 max-w-2xl">
          Create and manage recruiters who can post jobs on the platform
        </p>
      </header>

      {/* Create Recruiter Card */}
      <section className="mb-10 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.07)] ring-1 ring-blue-200/70 p-6">
        <h2 className="text-lg font-semibold mb-6">Create Recruiter</h2>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-1 gap-5"
          >
            <Input
              name="recruiterName"
              label="Recruiter Name"
              placeholder="Enter name"
            />
            <Input
              name="recruiterEmail"
              label="Recruiter Email"
              placeholder="Enter email"
              type="email"
            />
            <Input
              name="tempPassword"
              label="Temporary Password"
              placeholder="Enter password"
              type="password"
            />
            <Input
              name="tempPassword"
              label="Temporary Confirm Password"
              placeholder="Enter password"
              type="password"
            />

            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => {}}
                style={{}}
                value="Create Recruiter"
                type="submit"
              />
            </div>
          </form>
        </FormProvider>
      </section>

      {/* Recruiter Table */}
      <section className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.07)] ring-1 ring-blue-200/70 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-5">
          Recruiter List
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-sm text-slate-500">
                <th className="text-left px-4">Recruiter</th>
                <th className="text-left">Email</th>
                <th className="text-left">Status</th>
                <th className="text-right pr-6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  name: "John Doe",
                  email: "john@company.com",
                  status: "Active",
                },
                {
                  name: "Sarah Smith",
                  email: "sarah@company.com",
                  status: "Disabled",
                },
              ].map((rec, idx) => (
                <tr
                  key={idx}
                  className="bg-slate-50 hover:bg-indigo-50/60 transition cursor-pointer"
                >
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {rec.name}
                  </td>
                  <td className="text-slate-600">{rec.email}</td>
                  <td>
                    <span
                      className={`
                        inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
                        ${
                          rec.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }
                      `}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="text-right pr-4">
                    <button
                      className="
                        cursor-pointer text-sm font-medium text-indigo-600
                        hover:text-indigo-800
                        focus:ring-2 focus:ring-indigo-500/30
                        rounded-md px-2 py-1
                      "
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default EmployerPage;
