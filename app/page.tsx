import { Suspense } from "react"
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import ProductGrid from "./components/ProductGrid"
import TestimonialsSlider from "./components/TestimonialsSlider"
import NewsletterSignup from "./components/NewsletterSignup"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<div className="text-center py-20">Loading products...</div>}>
          <ProductGrid />
        </Suspense>
        <TestimonialsSlider />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  )
}
