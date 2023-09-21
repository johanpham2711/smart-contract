import styled from '@emotion/styled'

export const FooterStyle = styled('footer')(({ theme }: any) => {
  return {
    backgroundColor: theme.primary,

    '.footer-container': {
      display: 'flex',
      gridTemplateColumns: '1fr',
      position: 'relative',
      alignItems: 'flex-start',
      maxWidth: '1440px',
      width: '100%',
      padding: '0.5rem 1rem',
      margin: 'auto',

      [theme.breakpoints.up('md')]: {
        padding: '0.75rem 2.5rem'
      },

      p: {
        fontSize: '1rem',
        color: theme.contrast,
        marginBottom: '1.875rem',

        [theme.breakpoints.up('md')]: {
          marginBottom: 0
        }
      }
    }
  }
})
