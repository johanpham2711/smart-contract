import styled from '@emotion/styled'

export const BrandSiteStyle = styled('div')(({ theme }: any) => {
  return {
    '.brand-site': {
      display: 'flex',
      userSelect: 'text',
      cursor: 'pointer',

      '&:focus': {
        outline: 'none',
        boxShadow: 'none'
      },

      '.brand-site-wrapper': {
        display: 'inline-block',
        lineHeight: '0',
        marginTop: '0.65rem',

        h1: {
          width: 0,
          height: 0,
          opacity: 0,
          visibility: 'hidden'
        }
      }
    }
  }
})
