'use client'

import React, { useEffect, useRef, useState } from 'react'
import './hubspot-form.css'

export type HubspotFormBlockType = {
  blockName?: string
  blockType?: 'hubspotForm'
  formId: string
  portalId?: string
  formTitle?: string
  disableHubspotStyles?: boolean
}

// Extend the Window interface to include hbspt
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

export const HubspotFormBlock: React.FC<
  {
    id?: string
  } & HubspotFormBlockType
> = (props) => {
  const { formId, portalId, formTitle, disableHubspotStyles } = props
  const formContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // Get portal ID from props or environment variable
  const effectivePortalId = portalId || process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID

  useEffect(() => {
    // Check if portal ID is available
    if (!effectivePortalId) {
      setError(
        'HubSpot Portal ID is not configured. Please set NEXT_PUBLIC_HUBSPOT_PORTAL_ID in your environment variables.',
      )
      setIsLoading(false)
      return
    }

    // Check if the script is already loaded
    if (window.hbspt) {
      setScriptLoaded(true)
      setIsLoading(false)
      return
    }

    // Load the HubSpot forms script
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
      // Cleanup: remove script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [effectivePortalId])

  useEffect(() => {
    // Create the form once the script is loaded
    if (scriptLoaded && window.hbspt && formContainerRef.current && effectivePortalId) {
      try {
        window.hbspt.forms.create({
          portalId: effectivePortalId,
          formId: formId,
          target: `#hubspot-form-${formId}`,
          css: disableHubspotStyles ? '' : undefined,
          onFormReady: () => {
            console.log('HubSpot form ready:', formId)
          },
          onFormSubmitted: () => {
            console.log('HubSpot form submitted:', formId)
          },
        })
      } catch (err) {
        console.error('Error creating HubSpot form:', err)
        setError('Failed to create HubSpot form. Please check your Form ID.')
      }
    }
  }, [scriptLoaded, formId, effectivePortalId, disableHubspotStyles])

  return (
    <div className="container lg:max-w-[48rem] py-10">
      {formTitle && <h2 className="text-3xl font-bold mb-6">{formTitle}</h2>}
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem] min-h-[500px] relative">
        {isLoading && (
          <div className="flex items-center justify-center min-h-[500px]">
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
          id={`hubspot-form-${formId}`}
          className={isLoading || error ? 'hidden' : ''}
        />
      </div>
    </div>
  )
}
