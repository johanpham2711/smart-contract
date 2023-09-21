import styled from '@emotion/styled'
import { Modal } from '@mui/material'
import { rgba } from 'emotion-rgba'

export const AppModalStyle = styled(Modal)(({ theme }: any) => {
  return {
    zIndex: 40,

    '.MuiBackdrop-root': {
      backgroundColor: rgba(theme.primary, 0.9)
    },

    '.close-icon': {
      position: 'fixed',
      top: '24px',
      right: '24px',
      height: '40px',
      width: '40px',
      padding: 0,
      borderRadius: '0.75rem',
      border: `1px solid ${rgba(theme.contrast, 0.08)}`,
      color: theme.contrast,
      background: 'transparent',
      zIndex: 20,

      '&:hover': {
        borderColor: rgba(theme.contrast, 0.18)
      },

      svg: {
        fontSize: '0.875rem',
        fontWeight: 700
      }
    },

    '.app-modal': {
      position: 'absolute',
      inset: 0,

      paddingTop: '4.625rem',
      outline: 'none',
      animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      animationFillMode: 'both',
      animationDuration: '300ms',
      animationName: 'slideUp',

      [theme.breakpoints.up('sm')]: {
        width: '380px',
        margin: '1.25rem auto',
        padding: 0,
        transformOrigin: 'center center'
      },

      '.app-modal-container': {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxHeight: '100%',
        borderRadius: '16px 16px 0px 0px',
        zIndex: 15,

        // Scroll
        overflow: 'hidden scroll',
        scrollbarWidth: 'none' /* Firefox */,
        '&::-webkit-scrollbar': {
          display: 'none'
        },

        [theme.breakpoints.up('sm')]: {
          top: '50%',
          bottom: 'unset',
          transform: 'translate(-50%, -50%)',
          margin: 'auto',
          width: '380px',
          borderRadius: '14px'
        }
      },

      '.app-modal-scroll': {
        position: 'relative',
        width: '100%',
        height: '100%',
        maxHeight: '100%',

        [theme.breakpoints.up('sm')]: {
          maxHeight: '574px'
        }
      }
    },

    '@keyframes slideUp': {
      '0%': {
        opacity: 0,
        transform: 'translateY(20px)'
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)'
      }
    }
  }
})
