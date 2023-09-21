import { EmotionCache } from '@emotion/cache'
import createEmotionServer from '@emotion/server/create-instance'
import { AppType } from 'next/app'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext
} from 'next/document'
import React from 'react'

import createEmotionCache from '~/utils/createEmotionCache'

interface DocumentProps extends DocumentInitialProps {
  emotionStyleTags: React.ReactNode[]
}

// https://stackoverflow.com/questions/67087999/how-to-properly-type-the-document-tsx-file-from-next-js
const MyDocument = (props: DocumentProps) => {
  return (
    <Html lang="en">
      <Head>
        {/* Inject MUI styles first to match with the prepend: true configuration. */}
        {props.emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<DocumentProps> => {
  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: AppType | React.ComponentType<{ emotionCache: EmotionCache }>) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        }
    })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags
  }
}

export default MyDocument
