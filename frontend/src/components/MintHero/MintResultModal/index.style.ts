import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const MintResultModalStyle = styled('div')(({ theme }: any) => {
  return {
    '.mr-modal': {
      padding: '2rem 0',
      maxHeight: '100%',
      background: theme.contrast,
      boxShadow: 'rgba(27, 32, 50, 0.1) 0px 6px 16px',
      border: `1px solid rgba(22, 22, 26, 0.08)`,
      color: theme.primary,

      [theme.breakpoints.up('sm')]: {
        height: 'auto'
      },

      '.mr-modal-header': {
        padding: '0 2rem',
        marginBottom: '1.5rem',
        fontSize: '1.375rem',
        lineHeight: '1.75rem',
        fontWeight: 600,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: '100%'
      },

      '.mr-modal-body': {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 2rem',

        '.mr-modal-info': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '2rem'
        },

        '.checkmark': {
          display: 'block',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          strokeWidth: 2,
          stroke: '#fff',
          strokeMiterlimit: 10,
          boxShadow: 'inset 0px 0px 0px #7ac142',
          animation: 'fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both',

          '.checkmark-circle': {
            strokeDasharray: 166,
            strokeDashoffset: 166,
            strokeWidth: 2,
            strokeMiterlimit: 10,
            stroke: '#7ac142',
            fill: 'none',
            animation: 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards'
          },

          '.checkmark-check': {
            transformOrigin: '50% 50%',
            strokeDasharray: 48,
            strokeDashoffset: 48,
            animation: 'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards'
          }
        },

        '.content': {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          marginLeft: '1rem',
          color: theme.primary,
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 500,

          [theme.breakpoints.up('sm')]: {
            fontSize: '15px',
            lineHeight: '22px'
          },

          span: {
            color: rgba(theme.primary, 0.6)
          },

          b: {
            fontSize: '1rem'
          }
        }
      },

      '.mr-btn': {
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
          marginBottom: '1rem'
        },

        '&.center': {
          justifyContent: 'center'
        },

        '&.bg': {
          background: theme.primary,
          borderColor: rgba(theme.primary, 0.1),

          '.btn-content p': {
            color: theme.contrast
          }
        },

        '&:disabled': {
          background: rgba(theme.primary, 0.08),
          cursor: 'default',

          p: {
            color: rgba(theme.primary, 0.6)
          }
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
    },

    '@keyframes stroke': {
      '100%': {
        strokeDashoffset: 0
      }
    },

    '@keyframes scale': {
      '0%, 100%': {
        transform: 'none'
      },
      '50%': {
        transform: 'scale3d(1.1, 1.1, 1)'
      }
    },

    '@keyframes fill': {
      '100%': {
        boxShadow: 'inset 0px 0px 0px 30px #7ac142'
      }
    }
  }
})
