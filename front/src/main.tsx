import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app'
import { QueryClientProvider } from '@tanstack/react-query'
import { query } from './lib/react-query'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={query}>
      <Toaster richColors position='bottom-right' />
      <App />
    </QueryClientProvider>
  </StrictMode>
)
