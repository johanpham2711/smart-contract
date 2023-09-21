import styled from '@emotion/styled'
import { Menu } from '@mui/material'
import { rgba } from 'emotion-rgba'

export const UserIndicatorStyle = styled('div')(({ theme }: any) => {
  return {
    '.user-indicator': {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '1rem',
      borderRadius: '0.375rem',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      color: theme.primary,
      border: `1px solid ${rgba(theme.primary, 0.18)}`,
      transition: 'all 0.15s ease-in-out 0s',
      transformOrigin: 'center center',
      textTransform: 'unset',

      [theme.breakpoints.up('md')]: {
        padding: '0.25rem 0.875rem',
        fontSize: '0.813rem'
      },

      '&:hover': {
        borderColor: rgba(theme.primary, 0.2)
      },

      '&:active': {
        transform: 'scale(0.95)'
      },

      p: {
        fontSize: '0.75rem',
        fontWeight: 600,
        color: theme.primary,
        marginLeft: '0.375rem'
      }
    }
  }
})

export const UserIndicatorDropdownMenuStyle = styled(Menu)(({ theme }: any) => {
  return {
    '.MuiBackdrop-root': {
      [theme.breakpoints.down('sm')]: {
        backgroundColor: rgba(theme.primary, 0.9)
      }
    },

    '.MuiPaper-root': {
      maxWidth: 'unset',
      width: '100%',
      background: theme.bg.primary,
      border: `1px solid ${rgba(theme.primary, 0.1)}`,
      boxShadow: '0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05)',
      backdropFilter: 'blur(40px)',
      borderRadius: 0,
      borderTopLeftRadius: '0.75rem',
      borderTopRightRadius: '0.75rem',
      marginTop: '0.5rem',

      [theme.breakpoints.down('sm')]: {
        top: 'unset!important',
        left: '0!important',
        bottom: 0,
        minHeight: '60vh'
      },

      [theme.breakpoints.up('sm')]: {
        maxWidth: '320px',
        width: '320px',
        borderRadius: '0.75rem'
      },

      '.user-indicator-wrapper': {
        display: 'flex',
        flexDirection: 'column',
        padding: '0.5rem',
        overflowX: 'hidden',
        overflowY: 'auto'
      },

      '.profile-header': {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '0.25rem',
        padding: '0.5rem',
        overflowX: 'hidden',
        textDecoration: 'none',
        marginBottom: '1rem',

        img: {
          borderRadius: '50%'
        },

        '.labels': {
          margin: '0 0 0 1rem',
          width: '200px',

          h1: {
            color: theme.primary,
            fontSize: '1rem',
            lineHeight: '1.625rem',
            letterSpacing: '-.15px',
            fontWeight: 600
          },

          h2: {
            color: rgba(theme.primary, 0.6),
            letterSpacing: '-.15px',
            fontSize: '0.875rem',
            lineHeight: '1.375rem'
          }
        }
      },

      '.wallet-info-container': {
        flexFlow: 'column',
        padding: '0 0.5rem',

        '& > p': {
          color: rgba(theme.primary, 0.6),
          fontSize: '13px',
          fontWeight: 500,
          marginBottom: '1rem'
        },

        '.wallet-info': {
          border: `1px solid ${rgba(theme.primary, 0.08)}`,
          padding: '1rem',
          borderRadius: '1rem',
          margin: '0 -0.5rem',
          maxWidth: 'none'
        },

        '.wallet-info-header': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',

          '.wallet-info-account': {
            display: 'flex',
            alignItems: 'center',

            '.wallet-info-address': {
              marginLeft: '1rem',

              p: {
                fontSize: '13px',
                lineHeight: '20px',
                fontWeight: 500,
                color: rgba(theme.primary, 0.6)
              },

              h6: {
                fontSize: '0.625rem',
                fontWeight: 600,
                color: theme.primary
              }
            }
          },

          '.wallet-info-actions': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            whiteSpace: 'nowrap',
            background: rgba(theme.primary, 0.04),
            width: '40px',
            height: '40px',
            border: '1px solid transparent',
            fontSize: '14px',
            borderRadius: '12px',
            padding: '6px 16px',
            userSelect: 'none'
          }
        }
      }
    }
  }
})
