import DashBoardLayout from "./MainLayout/DashBoardLayout";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import "@radix-ui/themes/styles.css";

function App() {
  return (
    <>
      <ThemeProvider attribute="class">
        <Theme appearance="light">
          <DashBoardLayout />
        </Theme>
      </ThemeProvider>
    </>
  );
}

export default App;
