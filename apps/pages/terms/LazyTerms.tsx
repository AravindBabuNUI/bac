import { lazy, Suspense } from 'react'

const Terms = lazy(() => import('./Terms'))

export default function LazyTerms() {
  return (
    <Suspense fallback={null}>
      <Terms />
    </Suspense>
  )
}
