import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import OnboardingLayout from './pages/onboarding/OnboardingLayout'
import { OnboardingPage, ErrorPage } from './pages'
import LazyTerms from './pages/terms/LazyTerms'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <OnboardingLayout />,
        children: [
          {
            index: true,
            element: <OnboardingPage />,
          },
        ],
      },
      {
        path: '/terms',
        element: <LazyTerms />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
])
