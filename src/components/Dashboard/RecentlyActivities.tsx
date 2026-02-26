import { FileText, UserPlus, Calendar, CheckCircle, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "application" | "interview" | "hire" | "job";
  message: string;
  time: string;
  status?: "new" | "pending" | "completed";
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "application",
    message: "Sarah Johnson applied for Senior Developer",
    time: "2 min ago",
    status: "new",
  },
  {
    id: "2",
    type: "interview",
    message: "Interview scheduled with Michael Chen",
    time: "15 min ago",
    status: "pending",
  },
  {
    id: "3",
    type: "hire",
    message: "Emily Davis accepted offer for Product Manager",
    time: "1 hour ago",
    status: "completed",
  },
  {
    id: "4",
    type: "job",
    message: "New job posted: UX Designer",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: "5",
    type: "application",
    message: "3 new applications for Marketing Lead",
    time: "3 hours ago",
    status: "new",
  },
];

const iconMap = {
  application: FileText,
  interview: Calendar,
  hire: CheckCircle,
  job: UserPlus,
};

const statusColors = {
  new: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  pending:
    "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  completed:
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
};

export const RecentActivity = () => {
  return (
    <div className="rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Recent Activity
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          <span>Live updates</span>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-2">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type];

          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/50 animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Icon */}
              <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-700">
                <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                  {activity.message}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activity.time}
                </p>
              </div>

              {/* Status */}
              {activity.status && (
                <span
                  className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[activity.status]}`}
                >
                  {activity.status}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
