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
  new: "bg-blue-100 text-blue-400 px-2 py-1",
  pending: "bg-yellow-200 text-yellow-600 text-warning px-2 py-1",
  completed: "bg-green-100 text-green-600 px-2 py-1 font-bold",
};

export const RecentActivity = () => {
  return (
    <div className="rounded-xl p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Recent Activity
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Live updates</span>
        </div>
      </div>
      <div className="space-y-1">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type];
          return (
            <div
              key={activity.id}
              className="activity-item animate-slide-in flex items-start space-y-5"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-2 rounded-lg bg-muted/50">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              {activity.status && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize
                    ${statusColors[activity.status]}`}
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
