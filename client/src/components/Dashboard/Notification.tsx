import React from "react";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

type NotificationType = "info" | "success" | "warning";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read?: boolean;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "New Application",
    message: "John Doe applied for Frontend Developer.",
    time: "2 min ago",
    type: "info",
  },
  {
    id: "2",
    title: "Interview Scheduled",
    message: "Interview scheduled with Sarah Johnson.",
    time: "30 min ago",
    type: "warning",
  },
  {
    id: "3",
    title: "Candidate Hired",
    message: "Michael Chen accepted the Product Manager offer.",
    time: "1 hour ago",
    type: "success",
    read: true,
  },
];

const ICON_MAP: Record<NotificationType, React.ElementType> = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
};

const COLOR_MAP: Record<NotificationType, string> = {
  info: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  success:
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  warning:
    "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
};

const Notification = () => {
  return (
    <section className="rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 dark:bg-slate-800">
      {/* Header */}
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Notifications
        </h3>
        <Bell className="h-5 w-5 text-slate-500 dark:text-slate-400" />
      </header>

      {/* Notification List */}
      <ul className="space-y-2">
        {NOTIFICATIONS.map((notification) => {
          const Icon = ICON_MAP[notification.type];

          return (
            <li
              key={notification.id}
              className={`flex items-start gap-3 rounded-xl p-3 transition-colors
                ${
                  notification.read
                    ? "opacity-70"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700/50"
                }`}
            >
              {/* Icon */}
              <div className={`rounded-lg p-2 ${COLOR_MAP[notification.type]}`}>
                <Icon className="h-4 w-4" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {notification.title}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {notification.message}
                </p>
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  {notification.time}
                </p>
              </div>

              {/* Unread dot */}
              {!notification.read && (
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
              )}
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <footer className="mt-4 text-center">
        <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
          View all notifications
        </button>
      </footer>
    </section>
  );
};

export default Notification;
