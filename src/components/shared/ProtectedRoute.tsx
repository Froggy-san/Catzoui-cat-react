import { useUser } from '@/features/authentication/useUser'
import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import LoadingScreen from './LoadingScreen'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  const { isLoading, isAuthenticated } = useUser()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/sign-in')
  }, [navigate, isAuthenticated, isLoading])

  if (isLoading) return <LoadingScreen />

  if (isAuthenticated) return children
}
