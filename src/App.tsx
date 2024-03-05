import './globals.css'
import { Suspense, lazy } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AppLayout from './components/shared/AppLayout'
import AuthLayout from './features/authentication/AuthLayout'
import LoginForm from './features/authentication/LoginForm'
import SignupForm from './features/authentication/SignupForm'
import AddProductPage from './features/products/AddProductPage'
import EditProduct from './features/products/EditProduct'
import { ProtectedRoute } from './components/shared/ProtectedRoute'
import LoadingScreen from './components/shared/componants not used/LoadingScreen'

import { Toaster } from '@/components/ui/sonner'

const Home = lazy(() => import('./pages/Home'))
const Account = lazy(() => import('./pages/Account'))
const Cart = lazy(() => import('./pages/Cart'))
const Orders = lazy(() => import('./pages/Orders'))
const WishList = lazy(() => import('./pages/Wishlist'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />

              <Route path="account" element={<Account />} />

              <Route path="add-product" element={<AddProductPage />} />

              <Route path="edit-product/:productId" element={<EditProduct />} />
              <Route path="cart" element={<Cart />} />

              <Route path="orders/:orderId" element={<Orders />} />

              <Route path="account" element={<Account />} />

              <Route path="wishlist" element={<WishList />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="sign-in" element={<LoginForm />} />

              <Route path="sign-up" element={<SignupForm />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <Toaster position="top-right" />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
