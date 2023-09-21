import Head from 'next/head'
import { PropsWithChildren } from 'react'

import { SITE_DESC, SITE_DOMAIN_URL, SITE_KEYWORDS, SITE_TITLE } from '~/utils/constants'

type ISEOLayoutProps = {
  seo?: { title?: string; url?: string; desc?: string; image?: string; keywords?: string[] }
}

const DEFAULT_TITLE = SITE_TITLE
const DEFAULT_URL = SITE_DOMAIN_URL
const DEFAULT_DESC = SITE_DESC
const DEFAULT_META_BANNER = `${SITE_DOMAIN_URL}/mb-meta.jpg`
const DEFAULT_KEYWORDS = SITE_KEYWORDS

const SEOLayout = (props: ISEOLayoutProps & PropsWithChildren) => {
  const { seo, children } = props

  return (
    <>
      <Head>
        <link rel="icon" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" sizes="48x48" href="/favicon.ico" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="site.webmanifest" />

        {/* HTML Meta Tags */}
        <title>{seo?.title || DEFAULT_TITLE}</title>
        <meta name="description" content={seo?.desc || DEFAULT_DESC} key="desc" />
        {!!(seo?.keywords && seo?.keywords.length) ? (
          <meta name="keywords" content={DEFAULT_KEYWORDS.concat(seo?.keywords).join(', ')} />
        ) : (
          <meta name="keywords" content={DEFAULT_KEYWORDS.join(', ')} />
        )}

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content={seo?.title || DEFAULT_TITLE} />
        <meta itemProp="description" content={seo?.desc || DEFAULT_DESC} />
        <meta itemProp="image" content={seo?.image || DEFAULT_META_BANNER}></meta>

        {/* Facebook Meta Tags */}
        <meta property="og:url" content={seo?.url || DEFAULT_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo?.title || DEFAULT_TITLE} />
        <meta property="og:description" content={seo?.desc || DEFAULT_DESC} />
        <meta property="og:image" content={seo?.image || DEFAULT_META_BANNER}></meta>

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo?.title || DEFAULT_TITLE} />
        <meta name="twitter:description" content={seo?.desc || DEFAULT_DESC} />
        <meta name="twitter:image" content={seo?.image || DEFAULT_META_BANNER}></meta>
      </Head>
      {children}
    </>
  )
}

export default SEOLayout
