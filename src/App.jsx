import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const GameDetailsPage = lazy(() => import('./pages/GameDetailsPage'))
const TopDealsPage = lazy(() => import('./pages/TopDealsPage'))
const RandomDealsPage = lazy(() => import('./pages/RandomDealsPage'))
const AuthPage = lazy(() => import('./pages/AuthPage'))

// Add loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
)

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<GameDetailsPage />} />
            <Route path="/top-deals" element={<TopDealsPage />} />
            <Route path="/random-deals" element={<RandomDealsPage />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* Add a 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

// Simple 404 component
const NotFound = () => (
  <div className="text-center py-10">
    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
)

export default App