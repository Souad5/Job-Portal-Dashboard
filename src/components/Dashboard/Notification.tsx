import React from "react";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type NotificationType = "info" | "success" | "warning";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                Fake Data                                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                               Config Maps                                  */
/* -------------------------------------------------------------------------- */

const ICON_MAP: Record<NotificationType, React.ElementType> = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
};

const COLOR_MAP: Record<NotificationType, string> = {
  info: "bg-blue-100 text-blue-600",
  success: "bg-emerald-100 text-emerald-600",
  warning: "bg-amber-100 text-amber-600",
};

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

const Notification = () => {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      {/* Header */}
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Notifications</h3>
        <Bell className="h-5 w-5 text-slate-400" />
      </header>

      {/* Notification List */}
      <ul className="space-y-3">
        {NOTIFICATIONS.map((notification) => {
          const Icon = ICON_MAP[notification.type];

          return (
            <li
              key={notification.id}
              className={`flex items-start gap-3 rounded-xl p-3 transition
                ${
                  notification.read
                    ? "bg-slate-50"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
            >
              <div className={`rounded-lg p-2 ${COLOR_MAP[notification.type]}`}>
                <Icon className="h-4 w-4" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">
                  {notification.title}
                </p>
                <p className="text-sm text-slate-600">{notification.message}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {notification.time}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <footer className="mt-4 text-center">
        <button className="text-sm font-medium text-indigo-600 hover:underline cursor-pointer">
          View all notifications
        </button>
      </footer>
    </section>
  );
};

export default Notification;
