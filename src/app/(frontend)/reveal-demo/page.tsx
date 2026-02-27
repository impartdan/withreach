import React from 'react'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { RevealList, RevealListItem } from '@/components/ui/reveal-list'
import { Button } from '@/components/ui/button'

export default function RevealDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <RevealOnScroll variant="slideUp" duration={0.8}>
            <h1 className="text-6xl font-bold text-gray-900">Reveal Animations Demo</h1>
          </RevealOnScroll>
          <RevealOnScroll variant="slideUp" delay={0.2} duration={0.8}>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Scroll down to see different animation variants in action
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="slideUp" delay={0.4}>
            <Button size="lg">Get Started</Button>
          </RevealOnScroll>
        </section>

        {/* Animation Variants Showcase */}
        <section className="space-y-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Animation Variants</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Fade In */}
            <RevealOnScroll variant="fadeIn">
              <div className="border border-gray-200 rounded-[8px] p-8 bg-white shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Fade In</h3>
                <p className="text-gray-600">Simple opacity transition. Subtle and professional.</p>
                <code className="block mt-4 text-sm bg-gray-100 p-2 rounded">
                  variant=&quot;fadeIn&quot;
                </code>
              </div>
            </RevealOnScroll>

            {/* Slide Up */}
            <RevealOnScroll variant="slideUp">
              <div className="border border-gray-200 rounded-[8px] p-8 bg-white shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Slide Up</h3>
                <p className="text-gray-600">
                  Fades in while sliding from bottom. Great for cards and sections.
                </p>
                <code className="block mt-4 text-sm bg-gray-100 p-2 rounded">
                  variant=&quot;slideUp&quot;
                </code>
              </div>
            </RevealOnScroll>

            {/* Slide Down */}
            <RevealOnScroll variant="slideDown">
              <div className="border border-gray-200 rounded-[8px] p-8 bg-white shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Slide Down</h3>
                <p className="text-gray-600">Fades in while sliding from top. Good for headers.</p>
                <code className="block mt-4 text-sm bg-gray-100 p-2 rounded">
                  variant=&quot;slideDown&quot;
                </code>
              </div>
            </RevealOnScroll>

            {/* Slide Left */}
            <RevealOnScroll variant="slideLeft">
              <div className="border border-gray-200 rounded-[8px] p-8 bg-white shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Slide Left</h3>
                <p className="text-gray-600">
                  Fades in while sliding from right. Perfect for content blocks.
                </p>
                <code className="block mt-4 text-sm bg-gray-100 p-2 rounded">
                  variant=&quot;slideLeft&quot;
                </code>
              </div>
            </RevealOnScroll>

            {/* Slide Right */}
            <RevealOnScroll variant="slideRight">
              <div className="border border-gray-200 rounded-[8px] p-8 bg-white shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Slide Right</h3>
                <p className="text-gray-600">
                  Fades in while sliding from left. Great for alternating content.
                </p>
                <code className="block mt-4 text-sm bg-gray-100 p-2 rounded">
                  variant=&quot;slideRight&quot;
                </code>
              </div>
            </RevealOnScroll>

            {/* Scale In */}
            <RevealOnScroll variant="scaleIn">
              <div className="border border-gray-200 rounded-[8px] p-8 bg-white shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Scale In</h3>
                <p className="text-gray-600">
                  Fades in while scaling up. Eye-catching for CTAs and important elements.
                </p>
                <code className="block mt-4 text-sm bg-gray-100 p-2 rounded">
                  variant=&quot;scaleIn&quot;
                </code>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Staggered List Demo */}
        <section className="space-y-8">
          <RevealOnScroll variant="slideUp">
            <h2 className="text-4xl font-bold text-center text-gray-900">
              Staggered List Animation
            </h2>
            <p className="text-center text-gray-600 mt-4">
              Items appear one after another with automatic delays
            </p>
          </RevealOnScroll>

          <RevealList className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12" staggerDelay={0.15}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <RevealListItem key={num}>
                <div className="border border-gray-200 rounded-[8px] p-8 bg-white shadow-sm text-center">
                  <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {num}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Item {num}</h3>
                  <p className="text-gray-600 mt-2">
                    This item animates in sequence with the others
                  </p>
                </div>
              </RevealListItem>
            ))}
          </RevealList>
        </section>

        {/* Timing Variations */}
        <section className="space-y-8">
          <RevealOnScroll variant="slideUp">
            <h2 className="text-4xl font-bold text-center text-gray-900">Timing Variations</h2>
          </RevealOnScroll>

          <div className="space-y-8">
            <RevealOnScroll variant="slideUp" duration={0.3}>
              <div className="border border-blue-200 bg-blue-50 rounded-[8px] p-6">
                <strong className="text-blue-900">Fast (0.3s):</strong>
                <span className="text-blue-800"> Quick and snappy</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="slideUp" duration={0.6}>
              <div className="border border-green-200 bg-green-50 rounded-[8px] p-6">
                <strong className="text-green-900">Normal (0.6s):</strong>
                <span className="text-green-800"> Balanced and smooth</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="slideUp" duration={1.2}>
              <div className="border border-purple-200 bg-purple-50 rounded-[8px] p-6">
                <strong className="text-purple-900">Slow (1.2s):</strong>
                <span className="text-purple-800"> Dramatic and attention-grabbing</span>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Delay Demo */}
        <section className="space-y-8">
          <RevealOnScroll variant="slideUp">
            <h2 className="text-4xl font-bold text-center text-gray-900">Sequential Delays</h2>
            <p className="text-center text-gray-600 mt-4">Individual elements with custom delays</p>
          </RevealOnScroll>

          <div className="max-w-2xl mx-auto space-y-4">
            <RevealOnScroll variant="slideLeft" delay={0}>
              <div className="bg-gray-100 rounded-lg p-4 text-gray-900">
                <strong>First:</strong> No delay
              </div>
            </RevealOnScroll>
            <RevealOnScroll variant="slideLeft" delay={0.2}>
              <div className="bg-gray-100 rounded-lg p-4 text-gray-900">
                <strong>Second:</strong> 0.2s delay
              </div>
            </RevealOnScroll>
            <RevealOnScroll variant="slideLeft" delay={0.4}>
              <div className="bg-gray-100 rounded-lg p-4 text-gray-900">
                <strong>Third:</strong> 0.4s delay
              </div>
            </RevealOnScroll>
            <RevealOnScroll variant="slideLeft" delay={0.6}>
              <div className="bg-gray-100 rounded-lg p-4 text-gray-900">
                <strong>Fourth:</strong> 0.6s delay
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 py-16">
          <RevealOnScroll variant="scaleIn" duration={0.8}>
            <h2 className="text-5xl font-bold text-gray-900">Ready to implement?</h2>
          </RevealOnScroll>
          <RevealOnScroll variant="fadeIn" delay={0.3}>
            <p className="text-xl text-gray-600">
              Check the guide and start adding animations to your components
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="slideUp" delay={0.5}>
            <Button size="lg">View Documentation</Button>
          </RevealOnScroll>
        </section>
      </div>
    </div>
  )
}
