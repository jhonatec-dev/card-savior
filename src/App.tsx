import { SnackbarProvider } from "notistack";
import { AppProvider } from "./context";
import { ProviderTheme } from "./context/theme";
import AppRoutes from "./routes";

function App() {
  return (
    <AppProvider>
      <ProviderTheme>
        <SnackbarProvider maxSnack={3}>
          <AppRoutes />
        </SnackbarProvider>
      </ProviderTheme>
    </AppProvider>
  );
}

export default App;
