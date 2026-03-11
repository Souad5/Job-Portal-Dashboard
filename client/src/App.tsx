import DashBoardLayout from "./MainLayout/DashBoardLayout";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "next-themes";
import ProtectedRoute from "./guards/ProtectedRoute";

function App() {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        themes={["light", "dark"]}
      >
        <ProtectedRoute>
          <DashBoardLayout />
        </ProtectedRoute>
      </ThemeProvider>
    </>
  );
}

export default App;
