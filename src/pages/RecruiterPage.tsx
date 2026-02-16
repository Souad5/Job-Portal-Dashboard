const EmployerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 md:px-10 py-8">
      {/* Header */}
      <header className="mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            Recruiter Management
          </h1>
          <p className="text-slate-500 max-w-2xl">
            Create and manage recruiters who can post jobs on the platform
          </p>
        </div>
      </header>

      {/* Create Recruiter Card */}
      <section className="mb-10 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.07)] ring-1 ring-slate-200/70 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Create Recruiter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
          {["Recruiter Name", "Recruiter Email", "Temporary Password"].map(
            (item) => (
              <input
                key={item}
                placeholder={item}
                className="w-full rounded-xl border border-slate-300/60 px-4 py-2.5
                focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20
                transition outline-none"
              />
            ),
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="
              cursor-pointer rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600
              px-7 py-3 text-white font-medium
              hover:brightness-110 hover:shadow-xl
              active:scale-[0.97]
              focus:ring-4 focus:ring-indigo-500/40
              transition-all
            "
          >
            Create Recruiter
          </button>
        </div>
      </section>

      {/* Recruiter Table */}
      <section className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.07)] ring-1 ring-slate-200/70 p-6">
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
                { name: "John Doe", status: "Active" },
                { name: "Sarah Smith", status: "Disabled" },
              ].map((rec, idx) => (
                <tr
                  key={idx}
                  className="
                    bg-slate-50 hover:bg-indigo-50/60
                    transition cursor-pointer
                  "
                >
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {rec.name}
                  </td>

                  <td className="text-slate-600">recruiter@company.com</td>

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
