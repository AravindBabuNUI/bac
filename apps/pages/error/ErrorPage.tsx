import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import { Button } from '@/ui/atoms'
import BAG_LOGO from '@assets/bag_logo.svg'

const ErrorResponse = (is404: boolean) => ({
  statusCode: is404 ? '404' : '500',
  title: is404 ? 'Page Not Found' : 'Something Went Wrong',
  message: is404
    ? "The page you're looking for doesn't exist or has been moved."
    : 'An unexpected error occurred. Please try again or go back home.',
})

export default function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()
  console.error('Route error:', error)
  const is404 = isRouteErrorResponse(error) && error.status === 404
  const { statusCode, title, message } = ErrorResponse(is404)

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 max-w-md w-full text-center">
        <img src={BAG_LOGO} alt="Benefits Access Center" className="h-10" />

        <div className="flex flex-col gap-2">
          <span className="text-8xl font-bold text-primary/10 leading-none">{statusCode}</span>
          <h1 className="font-fira text-2xl text-primary font-bold">{title}</h1>
          <p className="text-muted text-sm leading-relaxed">{message}</p>
        </div>

        {import.meta.env.DEV && !is404 && error instanceof Error && (
          <pre className="text-left text-xs bg-red-50 border border-error rounded-lg p-4 w-full overflow-auto text-error whitespace-pre-wrap">
            {error.stack ?? error.message}
          </pre>
        )}

        <Button
          type="button"
          variant="primary"
          className="w-[200px]"
          onClick={() => navigate('/')}
        >
          Go Home
        </Button>
      </div>
    </div>
  )
}
