
import { AppProvider } from './context'
import { ProviderTheme } from './context/theme'
import AppRoutes from './routes'


function App() {


  return (
    <AppProvider>
      <ProviderTheme>
        <AppRoutes />
      </ProviderTheme>
    </AppProvider>
  )
}

export default App
