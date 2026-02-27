'use client'

import React, { useEffect, useRef, useState } from 'react'
import RichText from '@/components/RichText'
import type { HubspotFormHeroBlock as HubspotFormHeroBlockType } from '@/payload-types'
import '@/blocks/HubspotForm/hubspot-form.css'

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string
          formId: string
          target: string
          css?: string
          onFormReady?: (form: HTMLFormElement) => void
          onFormSubmitted?: () => void
        }) => void
      }
    }
  }
}

export const HubspotFormHero: React.FC<HubspotFormHeroBlockType> = ({
  label,
  richText,
  formId,
  portalId,
  disableHubspotStyles,
}) => {
  const formContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  const effectivePortalId = portalId || process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID

  useEffect(() => {
    if (!effectivePortalId) {
      setError(
        'HubSpot Portal ID is not configured. Please set NEXT_PUBLIC_HUBSPOT_PORTAL_ID in your environment variables.',
      )
      setIsLoading(false)
      return
    }

    if (window.hbspt) {
      setScriptLoaded(true)
      setIsLoading(false)
      return
    }

    const script = document.createElement('script')
    script.src = '//js.hsforms.net/forms/embed/v2.js'
    script.charset = 'utf-8'
    script.type = 'text/javascript'
    script.async = true

    script.onload = () => {
      setScriptLoaded(true)
      setIsLoading(false)
    }

    script.onerror = () => {
      setError('Failed to load HubSpot forms script')
      setIsLoading(false)
    }

    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [effectivePortalId])

  useEffect(() => {
    if (scriptLoaded && window.hbspt && formContainerRef.current && effectivePortalId) {
      try {
        window.hbspt.forms.create({
          portalId: effectivePortalId,
          formId: formId,
          target: `#hubspot-hero-form-${formId}`,
          css: disableHubspotStyles ? '' : undefined,
        })
      } catch (err) {
        console.error('Error creating HubSpot form:', err)
        setError('Failed to create HubSpot form. Please check your Form ID.')
      }
    }
  }, [scriptLoaded, formId, effectivePortalId, disableHubspotStyles])

  return (
    <div className="w-full header-offset">
      <div className="container py-20 flex flex-col items-center gap-10">
        {/* Eyebrow + heading */}
        <div className="flex flex-col items-center gap-4 text-center max-w-3xl">
          {label && (
            <p className="text-sm font-medium tracking-widest uppercase opacity-70">{label}</p>
          )}
          {richText && <RichText data={richText} enableGutter={false} />}
        </div>

        {/* HubSpot form */}
        <div className="w-full max-w-xl">
          {isLoading && (
            <div className="flex items-center justify-center min-h-[400px]">
              <svg
                className="animate-spin h-12 w-12 text-brand-gray"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}
          <div
            ref={formContainerRef}
            id={`hubspot-hero-form-${formId}`}
            className={isLoading || error ? 'hidden' : ''}
          />
        </div>
      </div>
    </div>
  )
}
