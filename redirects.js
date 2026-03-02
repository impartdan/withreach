const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const newsRedirect = {
    source: '/resources/news',
    destination: '/news-insights',
    permanent: true,
  }

  const newsSlugRedirect = {
    source: '/resources/news/:slug*',
    destination: '/news-insights/:slug*',
    permanent: true,
  }

  const redirects = [internetExplorerRedirect, newsRedirect, newsSlugRedirect]

  return redirects
}

export default redirects
