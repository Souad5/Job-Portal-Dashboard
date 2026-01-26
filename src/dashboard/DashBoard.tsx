import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "../components/Sidebar";

const DashBoard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <Sidebar />
        <main>
          <SidebarTrigger className="cursor-pointer" />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashBoard;
