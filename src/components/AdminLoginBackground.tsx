import React from 'react'

/**
 * Rendered only on the Payload admin login screen via `admin.components.beforeLogin`.
 * Uses global CSS so the background can extend beyond the login form container.
 */
export const BeforeLogin: React.FC = () => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          html, body {
            height: 100%;
          }

          body {
            background-image:
              radial-gradient(circle at center, rgba(26, 23, 19, 0.5) 0%, rgba(61, 56, 45, 0.5) 100%),
              linear-gradient(to top right, #3d382d 0%, #1a1713 50%, #3d382d 100%) !important;
            background-repeat: no-repeat !important;
            background-size: cover !important;
          }

          /* Ensure admin containers don't paint over the body background */
          body > * {
            background: transparent !important;
          }
        `,
      }}
    />
  )
}

