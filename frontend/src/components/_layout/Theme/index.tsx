import { Global } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { PropsWithChildren } from 'react'

import lightTheme from '~/styles/theme/lightTheme'
import { AppStyle, ThemeStyle } from './index.style'

const ThemeLayout = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Global styles={ThemeStyle} />
      <AppStyle className="main-layout">{children}</AppStyle>
    </ThemeProvider>
  )
}

export default ThemeLayout
