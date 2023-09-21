import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const LoadingModalStyle = styled('div')(({ theme }: any) => {
  return {
    '.ld-modal': {
      padding: '2rem 0',
      maxHeight: '100%',
      background: theme.contrast,
      boxShadow: 'rgba(27, 32, 50, 0.1) 0px 6px 16px',
      border: `1px solid rgba(22, 22, 26, 0.08)`,
      color: theme.primary,

      [theme.breakpoints.up('sm')]: {
        height: 'auto'
      },

      '.ld-modal-spinner': {
        marginBottom: '1.5rem',

        '& > div': {
          position: 'relative',
          width: '48px',
          height: '48px',
          borderRadius: '48px',
          borderWidth: '4px',
          margin: 'auto',
          animation: '0.66s linear 0s infinite normal none running spin',
          borderStyle: 'solid',
          borderColor: 'rgb(230, 230, 230) rgb(230, 230, 230) rgb(230, 230, 230) rgb(0, 0, 0)',
          transform: 'translateZ(0px)',
          userSelect: 'none'
        }
      },

      '.ld-modal-header': {
        position: 'relative',
        textAlign: 'center',
        padding: '0 2rem',
        marginBottom: '0.5rem',
        marginLeft: '-8px',
        fontSize: '1.375rem',
        lineHeight: '1.75rem',
        fontWeight: 600,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: '100%',

        '&:after': {
          position: 'absolute',
          content: '"\\2026"',
          display: 'inline-block',
          verticalAlign: 'bottom',
          animation: 'ellipsis steps(4, end) 0.9s infinite',
          width: 0,
          overflow: 'hidden'
        }
      },

      '.ld-modal-body': {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 2rem',

        '.content': {
          textAlign: 'center',
          marginBottom: '0.75rem',
          color: rgba(theme.primary, 0.6),
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 500,

          [theme.breakpoints.up('sm')]: {
            fontSize: '15px',
            lineHeight: '22px'
          },

          '&:last-of-type': {
            marginBottom: '2rem'
          }
        }
      }
    },

    '@keyframes spin': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(360deg)'
      }
    },

    '@keyframes ellipsis': {
      to: {
        width: '20px'
      }
    }
  }
})
