import { InstallMobile } from "@mui/icons-material";
import { Button } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import { AppProvider } from "./context";
import { ProviderTheme } from "./context/theme";
import AppRoutes from "./routes";

function App() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setInstallPromptEvent(event);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
    }
  };

  useEffect(() => {
    const handleAppInstalled = () => {
      setShowInstallButton(false);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);
  return (
    <AppProvider>
      <ProviderTheme>
        <SnackbarProvider maxSnack={3} autoHideDuration={2000} preventDuplicate>
          {showInstallButton && (
            <Button sx={{margin: "4px auto"}} fullWidth startIcon={<InstallMobile />} onClick={handleInstallClick}>
              Instalar aplicativo
            </Button>
          )}
          <AppRoutes />
        </SnackbarProvider>
      </ProviderTheme>
    </AppProvider>
  );
}

export default App;
