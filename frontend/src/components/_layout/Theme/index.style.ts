import { css } from '@emotion/react'
import styled from '@emotion/styled'
import localFont from 'next/font/local'

const audiowide = localFont({
  src: [
    {
      path: '../../../../public/fonts/Audiowide/Audiowide-Regular.woff2',
      weight: '400',
      style: 'normal'
    }
  ]
})

const exo = localFont({
  src: [
    {
      path: '../../../../public/fonts/Exo/Exo-Thin.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../../../public/fonts/Exo/Exo-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../../../public/fonts/Exo/Exo-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ]
})

const martianMono = localFont({
  src: [
    {
      path: '../../../../public/fonts/MartianMono/MartianMono-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../../../public/fonts/MartianMono/MartianMono-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    }
  ]
})

export const AppStyle = styled('main')(({ theme }: any) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '100vh',
    backgroundColor: theme.bg.primary
  }
})

export const ThemeStyle = css`
  html,
  body,
  input.MuiInputBase-input,
  button.MuiButton-root,
  p.MuiTypography-root,
  h3.MuiTypography-root,
  h4.MuiTypography-root {
    font-family: ${exo.style.fontFamily};
  }

  h1.MuiTypography-root,
  h2.MuiTypography-root {
    font-family: ${audiowide.style.fontFamily};
  }

  .wallet-address {
    font-family: ${martianMono.style.fontFamily}!important;
  }

  button.MuiButton-root {
    min-width: unset;
  }

  .MuiInputBase-root.MuiInput-root:before,
  .MuiInputBase-root.MuiInput-root:after {
    display: none;
  }

  a {
    color: inherit;
  }
`
