import DashBoardLayout from "./MainLayout/DashBoardLayout";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        themes={["light", "dark"]}
      >
        <DashBoardLayout />
      </ThemeProvider>
    </>
  );
}

export default App;
