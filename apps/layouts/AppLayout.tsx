import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}
