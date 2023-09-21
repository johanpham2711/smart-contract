import { createTheme } from '@mui/material/styles'

const themeColors = {
  bg: {
    primary: '#fff'
  },
  primary: '#16161a',
  contrast: '#fff',
  link: '#007fff',
  error: '#ffc14b'
} as const

const lightTheme = createTheme({
  ...themeColors,
  palette: {
    mode: 'light'
  }
})

export default lightTheme
