'use client'

import Script from 'next/script'

const isThirdPartyScriptsEnabled = process.env.NEXT_PUBLIC_ENABLE_THIRD_PARTY_SCRIPTS === 'true'
const hubspotPortalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID

export function ThirdPartyScripts() {
  if (!isThirdPartyScriptsEnabled) return null

  return (
    <>
      {/* CLYM - cookie consent must initialize before most tracking scripts */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        id="clym-blocking"
        src="https://widget.clym-sdk.net/blocking.js"
        strategy="beforeInteractive"
      />
      <Script id="clym-embed" strategy="afterInteractive">
        {`(function(d,s,i,w,o){var js,cjs=d.getElementsByTagName(s)[0];if(d.getElementById(i))return;js=d.createElement('script');js.id=i;js.src="https://widget.clym-sdk.net/clym.js";js.onload=function(){Clym&&Clym.load(i,w,o);};cjs.parentNode.insertBefore(js,cjs);}(document,'script','clym-privacy','556c4f6015d1495e8736ac08xgucovtj',{}));`}
      </Script>

      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WK6N6RD');`}
      </Script>

      {hubspotPortalId && (
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src={`//js.hs-scripts.com/${hubspotPortalId}.js`}
        />
      )}

      <Script id="ms-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i+'?ref=gtm2';y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script','i8hec65rr7');`}
      </Script>

      <Script id="apollo" strategy="lazyOnload">
        {`(function(){var n=Math.random().toString(36).substring(7),o=document.createElement('script');o.src='https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache='+n;o.async=true;o.defer=true;o.onload=function(){window.trackingFunctions.onLoad({appId:'663116ee96e925030021cb0c'});};document.head.appendChild(o);})();`}
      </Script>

      <Script id="zoominfo" strategy="lazyOnload">
        {`(function(){var zi=document.createElement('script');zi.type='text/javascript';zi.async=true;zi.referrerPolicy='unsafe-url';zi.src='https://ws.zoominfo.com/pixel/3wASLAeM7uG3tPzPZJfA';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(zi,s);})();`}
      </Script>

      <Script id="reddit-pixel" strategy="lazyOnload">
        {`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement('script');t.src='https://www.redditstatic.com/ads/pixel.js';t.async=true;var s=d.getElementsByTagName('script')[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_dhhq0irmvp27',{optOut:false,useDecimalCurrencyValues:true});rdt('track','PageVisit');`}
      </Script>
    </>
  )
}
