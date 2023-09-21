import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const QuantityPickerStyle = styled('div')(({ theme }: any) => {
  return {
    '.quantity-input': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px solid ${rgba(theme.contrast, 0.6)}`,
      borderRadius: '0.375rem',
      backgroundColor: rgba(theme.contrast, 0.2)
    },

    '.quantity-input-modifier, .quantity-input-screen': {
      height: '2.25rem',
      userSelect: 'none',
      outline: 'none'
    },

    '.quantity-input-modifier': {
      padding: '.7rem',
      width: '2.25rem',
      fontSize: '1.5rem',
      color: theme.primary,
      textAlign: 'center',
      cursor: 'pointer',

      '&:hover': {}
    },

    '.quantity-input-screen': {
      width: '3rem',
      padding: '.7rem',
      fontSize: '1.25rem',
      color: theme.primary,
      fontWeight: 600,
      border: 0,
      textAlign: 'center',
      backgroundColor: 'inherit'
    }
  }
})
