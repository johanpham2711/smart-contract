import styled from '@emotion/styled'
import { rgba } from 'emotion-rgba'

export const ConfirmationModalStyle = styled('div')(({ theme }: any) => {
  return {
    '.cf-modal': {
      padding: '2rem 0',
      maxHeight: '100%',
      background: theme.contrast,
      boxShadow: 'rgba(27, 32, 50, 0.1) 0px 6px 16px',
      border: `1px solid rgba(22, 22, 26, 0.08)`,
      color: theme.primary,

      [theme.breakpoints.up('sm')]: {
        height: 'auto'
      },

      '.cf-modal-header': {
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

      '.cf-modal-body': {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 2rem',

        '.content': {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.75rem',
          color: theme.primary,
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 500,

          [theme.breakpoints.up('sm')]: {
            fontSize: '15px',
            lineHeight: '22px'
          },

          '&:last-of-type': {
            marginBottom: '2rem'
          },

          span: {
            color: rgba(theme.primary, 0.6)
          },

          b: {
            fontSize: '1rem'
          }
        },

        '.cf-btn': {
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
      }
    }
  }
})
