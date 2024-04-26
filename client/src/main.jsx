import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import "rc-pagination/assets/index.css";
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* All the routes will be here */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
