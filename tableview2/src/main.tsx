// ----------------------------------------------

// IMPORTS

// REACT
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// COMPONENTS
import App from './App.tsx'

// STYLES
import './index.css'

// CONTEXT PROVIDERS
import LoadingStatusContextProvider from './contexts/loadingStatus/LoadingStatusContextProvider.tsx'

// ----------------------------------------------

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <LoadingStatusContextProvider children={
      [<App />]
    } /> */}
    <App />
  </StrictMode>,
)
