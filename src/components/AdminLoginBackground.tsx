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
            color-scheme: dark;
            background-image:
              radial-gradient(circle at center, rgba(26, 23, 19, 0.5) 0%, rgba(61, 56, 45, 0.5) 100%),
              linear-gradient(to top right, #3d382d 0%, #1a1713 50%, #3d382d 100%) !important;
            background-repeat: no-repeat !important;
            background-size: cover !important;

            /*
             * Force a consistent dark token palette for login so
             * system light mode cannot produce low-contrast text.
             */
            --theme-bg: #1a1713;
            --theme-text: #faf7f5;
            --theme-elevation-0: #1f1c18;
            --theme-elevation-50: #24211d;
            --theme-elevation-100: #2a2722;
            --theme-elevation-150: #3d382d;
            --theme-elevation-500: #c7c2b5;
            --theme-elevation-700: #e6e0d7;
            --theme-elevation-800: #faf7f5;
            --theme-elevation-900: #ffffff;
            --theme-success-500: #6dbf79;
            --theme-warning-500: #dcb35c;
            --theme-error-500: #dd746a;
          }

          /* Ensure admin containers don't paint over the body background */
          body > * {
            background: transparent !important;
          }

          /* Keep form copy and helper links readable on dark background */
          body :is(label, p, a, h1, h2, h3, h4, h5, h6, span) {
            color: var(--theme-elevation-800);
          }
        `,
      }}
    />
  )
}

