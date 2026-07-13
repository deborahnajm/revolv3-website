import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { Home } from './pages/Home'

// Resources routes carry the CMS content (incl. the article-body JSON) —
// split them out so the home bundle stays lean.
const Resources = lazy(() => import('./pages/Resources').then((m) => ({ default: m.Resources })))
const ResourceArticle = lazy(() =>
  import('./pages/ResourceArticle').then((m) => ({ default: m.ResourceArticle })),
)
const LegalPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })))

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-skylla-200 border-t-skylla-600" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<ResourceArticle />} />
            <Route path="/legal/:slug" element={<LegalPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
