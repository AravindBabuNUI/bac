import { Benefits, FeatureBanner, Footer, NotificationBanner } from '@/components'
import { AFFILIATION_MESSAGE } from '@/constants/banner'
import { Outlet } from 'react-router-dom'

export default function OnboardingLayout() {
    return (
        <div className="min-h-screen">
            <div
                className="background-container"
            >
                <div className="fixed top-0 left-0 w-full z-50">
                    <NotificationBanner message={AFFILIATION_MESSAGE} />
                </div>
                <div className="flex min-h-screen items-center justify-center px-4 py-10">
                    <main className="w-full max-w-2xl rounded-2xl shadow-2xl">
                        <Outlet />
                    </main>
                </div>
                <div className="pb-4 md:hidden block">
                    <FeatureBanner />
                </div>
            </div>
            <div className="py-10">
                <Benefits />
                <Footer />
            </div>
        </div>
    )
}
