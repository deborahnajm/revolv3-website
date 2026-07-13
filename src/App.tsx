import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { Home } from './pages/Home'
import { Resources } from './pages/Resources'
import { ResourceArticle } from './pages/ResourceArticle'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<ResourceArticle />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
