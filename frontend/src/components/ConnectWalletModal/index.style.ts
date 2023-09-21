import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const ConnectWalletModalStyle = styled('div')(({ theme }: any) => {
  return {
    '.cw-modal': {
      padding: '2rem 0',
      maxHeight: '100%',
      background: theme.contrast,
      boxShadow: 'rgba(27, 32, 50, 0.1) 0px 6px 16px',
      border: `1px solid rgba(22, 22, 26, 0.08)`,
      color: theme.primary,

      [theme.breakpoints.up('sm')]: {
        height: 'auto'
      },

      '.cw-modal-header': {
        padding: '0 2rem',
        marginBottom: '1rem',
        fontSize: '1.375rem',
        lineHeight: '1.75rem',
        fontWeight: 600,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: '100%'
      },

      '.cw-modal-body': {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 2rem',

        '.content': {
          marginBottom: '2rem',
          color: rgba(theme.primary, 0.6),
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 500,

          [theme.breakpoints.up('sm')]: {
            fontSize: '15px',
            lineHeight: '22px'
          },

          span: {
            color: theme.primary
          }
        },

        '.wallet-list': {
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '2rem',

          '.heading': {
            fontSize: '13px',
            lineHeight: '20px',
            fontWeight: 400,
            color: rgba(theme.primary, 0.6),
            marginBottom: '0.625rem'
          }
        },

        '.wallet-btn': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          whiteSpace: 'nowrap',
          background: 'transparent',
          textTransform: 'unset',
          lineHeight: '3rem',
          height: '3rem',
          border: '1px solid transparent',
          borderColor: rgba(theme.primary, 0.1),
          minWidth: '192px',
          borderRadius: '1rem',
          padding: '0.5rem 1.125rem',
          transition: 'all 0.15s ease-in-out 0s',
          transformOrigin: 'center center',
          userSelect: 'none',

          '&:not(:last-of-type)': {
            marginBottom: '0.625rem'
          },

          '&.center': {
            justifyContent: 'center'
          },

          '&:disabled': {
            background: rgba(theme.primary, 0.08),
            cursor: 'default',

            p: {
              color: rgba(theme.primary, 0.6)
            }
          },

          '&.loading': {
            svg: {
              display: 'block'
            }
          },

          '.btn-wrapper': {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease-in-out 0s',
            height: '100%'
          },

          svg: {
            display: 'none',
            marginRight: '0.5rem',
            color: rgba(theme.primary, 0.6),
            animation: '1s linear 0s infinite normal forwards running rotate'
          },

          '.btn-content': {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',

            img: {
              marginRight: '0.75rem'
            },

            p: {
              fontSize: '0.875rem',
              fontWeight: 900,
              color: theme.primary
            }
          }
        }
      }
    },

    '@keyframes rotate': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(360deg)'
      }
    }
  }
})
