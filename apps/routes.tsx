import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import OnboardingLayout from './pages/onboarding/OnboardingLayout';
import { OnboardingPage, ErrorPage } from './pages';
import UnsubscribePage from './pages/unsubscribe/UnsubscribePage';
import PrivacyPage from './pages/privacy/PrivacyPage';
import ProgramRequirementsPage from './pages/programRequirements/ProgramRequirementsPage';
import DoNotSellMyInfoPage from './pages/doNotSellMyInfo/DoNotSellMyInfoPage';
import ContactPage from './pages/contact/ContactPage';
import Terms from './pages/terms/Terms';

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
        element: <Terms />,
      },
      {
        path: '/unsubscribe',
        element: <UnsubscribePage />,
      },
      {
        path: '/privacy',
        element: <PrivacyPage />,
      },
      {
        path: '/program-requirements',
        element: <ProgramRequirementsPage />,
      },
      {
        path: '/do-not-sell-my-info',
        element: <DoNotSellMyInfoPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
