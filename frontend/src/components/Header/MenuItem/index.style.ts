import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const MenuItemStyle = styled('div')(({ theme }: any) => {
  return {
    height: '100%',

    '.menu-item': {
      display: 'flex',
      height: '100%',

      '.menu-item-link': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minWidth: '7.5rem',
        padding: '0 1rem',
        borderBottom: '2px solid transparent',
        textDecoration: 'none',

        p: {
          color: rgba(theme.primary, 0.6),
          fontSize: '0.875rem',
          fontWeight: 600,
          lineHeight: '1.5rem'
        },

        '&:hover': {
          backgroundColor: rgba(theme.primary, 0.04),
          borderBottomColor: rgba(theme.primary, 0.9),

          p: {
            color: rgba(theme.primary, 0.9)
          }
        }
      }
    }
  }
})
