'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, NY',
    rating: 5,
    text: 'StyleStore has completely transformed my wardrobe! The quality is amazing and the prices are unbeatable. Every purchase truly feels like a blessing!',
    image: '/placeholder.svg?height=80&width=80&text=SJ',
    product: 'Summer Dress Collection',
  },
  {
    id: 2,
    name: 'Emily Chen',
    location: 'Los Angeles, CA',
    rating: 5,
    text: "I've been shopping here for months and I'm never disappointed. The customer service is excellent and shipping is always fast. Highly recommend!",
    image: '/placeholder.svg?height=80&width=80&text=EC',
    product: 'Casual Wear',
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    location: 'Miami, FL',
    rating: 5,
    text: 'The variety and style options are incredible. I found my perfect wedding guest dress here and received so many compliments. Thank you StyleStore!',
    image: '/placeholder.svg?height=80&width=80&text=MR',
    product: 'Formal Collection',
  },
  {
    id: 4,
    name: 'Jessica Williams',
    location: 'Chicago, IL',
    rating: 5,
    text: 'As a busy mom, I love how easy it is to find stylish, comfortable clothes here. The quality is fantastic and the prices fit my budget perfectly.',
    image: '/placeholder.svg?height=80&width=80&text=JW',
    product: 'Everyday Essentials',
  },
  {
    id: 5,
    name: 'Amanda Davis',
    location: 'Seattle, WA',
    rating: 5,
    text: "StyleStore is my go-to for trendy pieces that don't break the bank. The new arrivals section is always full of surprises. Love this store!",
    image: '/placeholder.svg?height=80&width=80&text=AD',
    product: 'Trendy Collection',
  },
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy customers who have found their perfect style
            with StyleStore
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-card border rounded-2xl p-8 md:p-12 mx-4 shadow-lg">
                    <div className="flex flex-col items-center text-center space-y-6">
                      {/* Quote Icon */}
                      <Quote className="h-12 w-12 text-primary/30" />

                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-lg md:text-xl text-foreground leading-relaxed max-w-3xl">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Customer Info */}
                      <div className="flex flex-col items-center space-y-4">
                        <img
                          src={testimonial.image || '/placeholder.svg'}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div>
                          <div className="font-semibold text-foreground text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {testimonial.location}
                          </div>
                          <div className="text-primary text-sm font-medium mt-1">
                            Purchased: {testimonial.product}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-primary'
                    : 'bg-muted-foreground/30'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-foreground">10K+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">4.9★</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">99%</div>
            <div className="text-sm text-muted-foreground">
              Satisfaction Rate
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">24/7</div>
            <div className="text-sm text-muted-foreground">
              Customer Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
